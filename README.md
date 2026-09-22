# Sports & Exercise Science — Online Proctored Test Site

A simple site for GitHub Pages: students take MCQ + short-answer tests
in a monitored, full-screen session; results (with an auto-graded MCQ
score and a flag count) are saved to Firebase; you review and grade
short answers on a private teacher dashboard.

**Read "What this can and can't do" at the bottom before you rely on
this for real exams.**

---

## 1. Create a Firebase project (free tier is enough for <50 students)

1. Go to https://console.firebase.google.com → **Add project** → give it
   any name (e.g. `ses-tests`) → you can turn off Google Analytics →
   Create.
2. In the left sidebar, go to **Build → Firestore Database → Create
   database**. Choose a location close to you, and start in
   **production mode** (we'll paste in our own rules next).
3. Go to **Build → Authentication → Get started**. Under **Sign-in
   method**, enable:
   - **Anonymous** (this is how students get a secure connection,
     without needing their own account)
   - **Email/Password**
4. Still in Authentication, go to the **Users** tab → **Add user**.
   Create exactly one user — this is your teacher login. Use your real
   email and a strong password you'll remember.
5. Go to **Project settings** (gear icon, top left) → scroll to **Your
   apps** → click the **</>** (web) icon → give it a nickname → **Register
   app**. You'll see a `firebaseConfig` object. Copy the six values into
   `assets/firebase-config.js` in this project (replacing the
   `REPLACE_ME` placeholders), and set `TEACHER_EMAIL` to the email you
   used in step 4.
6. Go to **Firestore Database → Rules**, delete what's there, and paste
   in the entire contents of `firestore.rules` from this project —
   but first edit the email inside it to match your teacher email
   exactly. Click **Publish**.

## 2. Put this on GitHub Pages

1. Create a new **public** GitHub repository (Firebase's security comes
   from its rules, not from hiding the code, so a public repo is fine —
   just don't commit real passwords anywhere).
2. Upload every file in this project, keeping the folder structure
   (`index.html`, `test.html`, `teacher.html`, `firestore.rules`,
   `assets/`, `data/`).
3. Go to the repo's **Settings → Pages** → under **Build and
   deployment**, set **Source** to "Deploy from a branch", branch
   `main`, folder `/ (root)` → **Save**.
4. After a minute, GitHub shows your live URL
   (`https://yourusername.github.io/your-repo-name/`). Students use
   that URL; you use the same URL + `/teacher.html` for grading.

## 3. Add your own classes and questions

Each test is one JSON file in `data/tests/`. Copy an existing one
(e.g. `y1-anatomy-mid.json`) as a template:

- `id` must match the filename (without `.json`).
- `className` must be exactly `First Year`, `Second Year`, or
  `Third Year` (or edit the `<select>` options in `index.html` and
  `teacher.html` if you want different class names).
- `durationMinutes` — countdown length.
- `maxViolations` — how many flags (tab switches, copy attempts, etc.)
  before the test auto-submits.
- `mcq` — array of questions with 2+ `options`, `correctIndex` (0-based),
  and `marks`.
- `shortAnswer` — array of questions with `marks`; these are always
  graded by you afterward.

Then add a line for it in `data/tests/manifest.json` so it shows up in
the student dropdown. To close a test, just remove its line from the
manifest (the file itself can stay).

## 4. Running a test session

- Give students the site URL a few minutes before the test.
- They enter name, roll number, pick their class and test, and click
  **Start test** — this signs them in anonymously and takes them to
  `test.html`.
- They must accept full-screen to begin; the timer starts immediately.
- Tab switches, minimizing, exiting full-screen, right-click, and
  copy/paste are each logged as a flag with an on-screen warning.
  Reaching the `maxViolations` limit, or the timer hitting zero,
  auto-submits whatever they've answered.
- Submissions land in Firestore's `results` collection in real time —
  you can watch them come in on `teacher.html`.

## 5. Grading

- Sign in at `teacher.html` with the one teacher account.
- Filter by class/test, **Load results**. MCQ scores are already
  computed. Click **Grade** on a row to read each short answer and
  enter marks; totals update automatically.
- **Export CSV** downloads everything currently loaded (names, scores,
  flag counts) for your own gradebook.

---

## What this can and can't do (please read)

This is a genuinely useful deterrent and record-keeping tool for a
low-stakes classroom setting, but no browser-based system can make a
test fully cheat-proof — be upfront with students and your institution
about that:

- **What it catches well:** switching tabs or apps, exiting
  full-screen, minimizing the window, right-click, in-browser
  copy/paste, and common devtools shortcuts.
- **What it cannot catch:** a second device (phone, another laptop) used
  off-screen, someone else in the room, a browser extension built to
  suppress these events, or the timer/flag logic being bypassed by
  someone who edits the page's JavaScript before starting (anyone can
  view source on any website). Treat the flag count as "worth a look,"
  not proof of cheating, especially since a genuine app switch or a
  flaky Wi-Fi dropout will also register a flag.
- For anything high-stakes (a final exam, an accreditation
  requirement), pair this with a live proctor (in person or on a video
  call) rather than relying on the software alone.
- The teacher password lives in Firebase Authentication, not in the
  code — so even though the repo is public, nobody can read or guess
  it from the source. Still, use a strong, unique password and don't
  share it with students.
