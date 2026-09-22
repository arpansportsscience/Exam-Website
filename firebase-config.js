// Replace these with YOUR Firebase project's values.
// Firebase Console -> Project settings -> General -> Your apps -> SDK setup and configuration
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

// The one teacher login you create in Firebase Console -> Authentication -> Users.
// Must match the email inside firestore.rules exactly.
const TEACHER_EMAIL = "REPLACE_ME@example.com";
