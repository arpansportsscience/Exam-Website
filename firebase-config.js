// Replace these values with the ones from your own Firebase project:
// Firebase Console -> Project settings -> General -> "Your apps" -> Web app -> SDK setup and configuration
// See README.md, Step 1, for exactly where to find each value.

const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

// The single teacher login. Create this exact user in
// Firebase Console -> Authentication -> Users -> Add user.
// This is NOT a secret stored in this file — it's just used to
// pre-fill the email field on the teacher login page.
const TEACHER_EMAIL = "teacher@example.com";
