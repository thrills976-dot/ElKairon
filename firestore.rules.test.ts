import { initializeTestEnvironment, assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-elkairon',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Phase 1A Security Tests', () => {
  // Test 1: Normal user cannot modify their own authorization role (Role Escalation Blocked)
  it('Scenario 1: Prevents user from modifying their own role', async () => {
    const db = testEnv.authenticatedContext('candidate_123', { email: 'cand@test.com' }).firestore();
    
    // First create a candidate profile securely
    await assertSucceeds(db.collection('users').doc('candidate_123').set({ role: 'candidate', name: 'Cand' }));

    // Try to escalate privileges to 'employer'
    await assertFails(db.collection('users').doc('candidate_123').update({ role: 'employer' }));
  });

  // Test 2: Candidate cannot promote themselves to employer (via employers collection bypass)
  it('Scenario 2: Prevents candidates from bypassing auth via employers collection', async () => {
    const db = testEnv.authenticatedContext('candidate_456').firestore();
    // Set up standard candidate
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('users').doc('candidate_456').set({ role: 'candidate' });
    });
    // Creating employer document should fail because user's true role in users collection is 'candidate'
    await assertFails(db.collection('employers').doc('candidate_456').set({ companyName: 'Fake' }));
  });

  // Test 3: Employers must not be able to promote themselves to recruiter/admin
  it('Scenario 3: Prevents employers from assigning admin roles to themselves', async () => {
    const db = testEnv.authenticatedContext('employer_123').firestore();
    await assertFails(db.collection('users').doc('employer_123').set({ role: 'admin' }));
  });

  // Test 4: Recruiters and admins must not be able to self-register
  it('Scenario 4: Prevents self-registration of recruiters', async () => {
    const db = testEnv.authenticatedContext('random_123').firestore();
    await assertFails(db.collection('users').doc('random_123').set({ role: 'recruiter' }));
  });

  // Test 5: A user's editable profile information must be separated from security-sensitive authorization fields
  it('Scenario 5: Allows users to update profile details without changing role', async () => {
    const db = testEnv.authenticatedContext('user_789').firestore();
    await assertSucceeds(db.collection('users').doc('user_789').set({ role: 'candidate', name: 'Original Name' }));
    await assertSucceeds(db.collection('users').doc('user_789').update({ name: 'Updated Name', role: 'candidate' }));
  });

  // Test 6: Authorization must NOT depend on trusting a client-writable role field
  it('Scenario 6: Prevents candidates from creating jobs (relies on verified employer status)', async () => {
    const db = testEnv.authenticatedContext('candidate_user').firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('users').doc('candidate_user').set({ role: 'candidate' });
    });
    // Candidate cannot create a job
    await assertFails(db.collection('jobs').doc('job_1').set({ employerId: 'candidate_user', title: 'Hacking Job' }));
  });

  // Test 7: Existing candidate/employer registration functionality works securely
  it('Scenario 7: Allows valid employers to create their profiles and jobs', async () => {
    const db = testEnv.authenticatedContext('verified_employer').firestore();
    
    // Valid employer creation flow
    await assertSucceeds(db.collection('users').doc('verified_employer').set({ role: 'employer', name: 'Corp' }));
    await assertSucceeds(db.collection('employers').doc('verified_employer').set({ company: 'Corp' }));
    
    // Valid job creation
    await assertSucceeds(db.collection('jobs').doc('job_1').set({ employerId: 'verified_employer', title: 'Job' }));
  });

  // Test 8: Admins retain global overrides
  it('Scenario 8: Allows admins full access to update users', async () => {
    const adminDb = testEnv.authenticatedContext('admin_uid', { email: 'thrills976@gmail.com' }).firestore();
    await assertSucceeds(adminDb.collection('users').doc('some_candidate').delete());
  });
});
