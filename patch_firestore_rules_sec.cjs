const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf-8');

// The replacement script
const newRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    function isSignedIn() { return request.auth != null; }
    function isOwner(userId) { return request.auth != null && request.auth.uid == userId; }
    function isValidId(id) { return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\\\-]+$'); }
    
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.email == 'thrills976@gmail.com' ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) ||
        (exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin')
      );
    }
    
    function isRecruiter() {
      return isSignedIn() && (
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'recruiter'
      );
    }
    
    function isStaff() { return isAdmin() || isRecruiter(); }
    
    function isRegisteredEmployer() {
      return isSignedIn() && (
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'employer'
      );
    }

    // Unchanged User Profile
    match /users/{userId} {
      allow get: if isOwner(userId) || isStaff();
      allow list: if isStaff();
      allow create: if isOwner(userId) && isValidId(userId) && (request.resource.data.role == 'candidate' || request.resource.data.role == 'employer');
      allow update: if isOwner(userId) && isValidId(userId) && request.resource.data.get('role', '') == resource.data.get('role', '');
      allow delete: if isStaff();
    }

    match /candidates/{candidateId} {
      allow get: if isOwner(candidateId) || isRegisteredEmployer() || isStaff();
      allow list: if isRegisteredEmployer() || isStaff();
      allow create: if isOwner(candidateId) && isValidId(candidateId);
      allow update: if (isOwner(candidateId) || isStaff()) && isValidId(candidateId);
      allow delete: if isOwner(candidateId) || isStaff();
      
      match /private/{document=**} {
        allow read, write: if isOwner(candidateId) || isStaff();
      }
    }

    match /employers/{employerId} {
      allow get: if isSignedIn();
      allow list: if isSignedIn();
      allow create: if isOwner(employerId) && isValidId(employerId) && isRegisteredEmployer();
      allow update: if (isOwner(employerId) || isStaff()) && isValidId(employerId) && isRegisteredEmployer();
      allow delete: if isOwner(employerId) || isStaff();
    }

    match /jobs/{jobId} {
      allow get, list: if true;
      allow create: if isRegisteredEmployer() && request.resource.data.employerId == request.auth.uid && isValidId(jobId);
      // Employer can update, but cannot change employerId
      allow update: if ( (isRegisteredEmployer() && resource.data.employerId == request.auth.uid && request.resource.data.employerId == resource.data.employerId) || isStaff() ) && isValidId(jobId);
      allow delete: if (isRegisteredEmployer() && resource.data.employerId == request.auth.uid) || isStaff();
    }

    match /applications/{applicationId} {
      allow get: if isSignedIn() && (resource.data.candidateId == request.auth.uid || resource.data.employerId == request.auth.uid || isStaff());
      allow list: if isSignedIn() && (resource.data.candidateId == request.auth.uid || resource.data.employerId == request.auth.uid || isStaff());
      
      // Candidate can create, must set initial safe values
      allow create: if isSignedIn() && request.resource.data.candidateId == request.auth.uid && isValidId(applicationId) && request.resource.data.stage == 'screening';
      
      // Employer/Staff can update state. Candidates cannot update applications (no UI does this anyway).
      // Wait, Candidate UI updates it? No, candidate only creates.
      allow update: if isStaff() || (isSignedIn() && resource.data.employerId == request.auth.uid && request.resource.data.candidateId == resource.data.candidateId && request.resource.data.jobId == resource.data.jobId && request.resource.data.employerId == resource.data.employerId);
      allow delete: if isStaff();
    }

    match /relocation_cases/{caseId} {
      allow get: if isSignedIn() && (resource.data.candidateId == request.auth.uid || resource.data.employerId == request.auth.uid || isStaff());
      allow list: if isSignedIn() && (resource.data.candidateId == request.auth.uid || resource.data.employerId == request.auth.uid || isStaff());
      
      // Candidate can only create if they have a 'placed' application.
      allow create: if isSignedIn() && request.resource.data.candidateId == request.auth.uid && isValidId(caseId) &&
                    get(/databases/$(database)/documents/applications/$(request.resource.data.applicationId)).data.candidateId == request.auth.uid &&
                    (get(/databases/$(database)/documents/applications/$(request.resource.data.applicationId)).data.stage == 'placed' || get(/databases/$(database)/documents/applications/$(request.resource.data.applicationId)).data.stage == 'compliance');
      
      // Candidates cannot update relocation stages, only staff/employer can. Wait, Candidates don't update cases?
      // Actually candidate UI doesn't update relocation_case document, only reads it.
      allow update: if isStaff() || (isSignedIn() && resource.data.employerId == request.auth.uid);
      allow delete: if isStaff();
    }

    match /arrival_tasks/{taskId} {
      allow get, list: if isSignedIn() && (resource.data.candidateId == request.auth.uid || isStaff());
      allow create: if isStaff();
      // Candidate can only update status and completedAt.
      allow update: if isStaff() || (isSignedIn() && resource.data.candidateId == request.auth.uid && 
                    request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'completedAt', 'updatedAt']));
      allow delete: if isStaff();
    }
  }
}
`;

fs.writeFileSync('firestore.rules', newRules);
console.log("firestore.rules heavily secured");
