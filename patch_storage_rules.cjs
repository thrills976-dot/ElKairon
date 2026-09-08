const fs = require('fs');
let content = fs.readFileSync('storage.rules', 'utf-8');

const newRules = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isSignedIn() { return request.auth != null; }
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }
    function isAdmin() { return isSignedIn() && request.auth.token.email == 'thrills976@gmail.com'; }
    function isRecruiter() { return false; } // Simplified for now
    
    // Only accept PDFs or Images
    function isSafeFile() {
      return request.resource.contentType.matches('image/.*') || request.resource.contentType.matches('application/pdf');
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }

    // Candidate private documents
    match /candidates/{userId}/documents/{fileName} {
      // Must be owner or staff/employer (we can't verify employer perfectly in storage, but we can verify signed in)
      allow read: if isSignedIn();
      allow write: if isOwner(userId) && request.resource.size < 25 * 1024 * 1024 && isSafeFile();
      allow delete: if isOwner(userId) || isAdmin();
    }
    
    match /candidates/{userId}/avatar/{fileName} {
      allow read: if true;
      allow write: if isOwner(userId) && request.resource.size < 5 * 1024 * 1024 && request.resource.contentType.matches('image/.*');
    }
    
    match /employers/{userId}/brand/{fileName} {
      allow read: if true;
      allow write: if isOwner(userId) && request.resource.size < 5 * 1024 * 1024 && request.resource.contentType.matches('image/.*');
    }
  }
}
`;

fs.writeFileSync('storage.rules', newRules);
console.log("storage.rules secured");
