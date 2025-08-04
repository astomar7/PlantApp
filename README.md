# PlantApp
Plant app

1. Executive Summary
Build a mobile-first, Duolingo-style game that teaches Grade-6 CBSE “Plants” in three progressive phases (Learn → Memorise → Exam). The app blends bite-sized teaching cards, playful interactions, and a light-touch exam simulator, wrapped in a familiar path-based map, streaks, and an energy-style life system inspired by Duolingo’s latest shift from hearts to energy. 
The Verge

2. Objectives & Success Metrics
Goal	KPI (90-day post-launch)
Daily habit formation	7-day rolling DAU/WAU ≥ 55 %
Concept mastery	Avg. lesson accuracy ≥ 85 % in Exam phase
Engagement	Avg. time-in-app ≥ 8 min/day; ≥ 3 sessions/day
Retention	Day-30 retention ≥ 35 %
Virality	K-factor ≥ 0.25 (via shareable streaks & badges)

3. Target Users & Personas
Riya (12, CBSE Grade-6) – visual learner, uses emojis & reels; loves small wins.

Parents/Teachers – want curriculum alignment & progress visibility.

4. Learning Model & Content Architecture
Phase	Pedagogy	Content Units	Unlock Rule
Learn	Short “teach cards” ➜ micro-quizzes	5 “Roots”, 5 “Stem”, …	Sequential path nodes
Memorise	Spaced-recall pop-ups (1-tap, 5-sec)	Auto-generated from missed items	Time-gated (24 h)
Exam	Timed, mark-scored drills	4 mock papers	Progress-meter ≥ 60 %

5. High-Level Navigation & Flow
Onboarding (2 screens) → avatar pick, sound check.

Home Map – serpentine path of leaf nodes; each node = 1 mini-lesson.

Tap a node → Lesson Loop

Teach card(s) (image + narration)

3-5 Interactives (Q types, below)

Recap animation → XP, coins, energy delta

After every 3 lessons → Memorise Pop-up (unskippable but 30 s max).

When Progress-Meter = 100 % → unlock Exam Hub (stopwatch icon).

Profile – streak, badges, avatar shop, parent dashboard.

6. Interaction & Question-Type Mapping
#	Question Type in Sheet	Interaction UI	Duolingo Analogue	Assets used
1	Teach-card	Full-bleed image, bold title, TTS voice-over, swipe to next	“Tips” cards before lessons	Image column (photo / diagram)
2	Tap correct picture	3-image grid; haptic tick on correct tap	“Select the matching image”	3 option images
3	Drag-and-drop labels	Drag root/leaf labels onto diagram; snap + confetti	“Label the picture”	Diagram + label tiles
4	Type missing word	Big single-line text field; smart autocomplete off	“Fill the blank”	Keyboard
5	Speak & spell	Mic button → speech-to-text; replay audio	“Speak this sentence”	TTS prompt
6	Audio multiple choice	Play clip, tap text answer	“Which of these is… (audio)”	Audio sprite
7	Match-the-following	Dual columns; drag lines to connect	“Match pairs”	Column lists
8	Timed writing	60-s countdown, type 5 plant names	“Timed challenge”	Timer bar

7. Gamification & Economy
Mechanic	Details	Why kids care	Duolingo Parallel
Energy Bar (25 units)	-1 per attempt, +1 per perfect question; refills 1 unit/5 min (or watch ad).	Feels like fuel; reduces fear of failure.	New energy system 
The Verge
Streak Flame	Daily lesson ≥ 1 ; Streak Freeze purchasable with coins.	Social brag; routine.	Streak & freeze 
Just Another PM
Coins (Seeds)	Earn 10-20 per lesson; spend on avatar accessories, streak freeze.	Collection instinct.	Gems
Stars (XP)	Skill points; unlock leaderboards & leagues.	Competitiveness.	XP
Progress-Meter 0-100 %	Visible only in Exam phase; fills with correct answers.	Clear exam readiness signal.	Unit-level crowns
Badges	“Root Guru”, “Leaf Legend”, … for milestones.	Identity & status.	Achievements
Weekly League	Friends/class leaderboard.	Peer motivation.	Bronze→Diamond leagues

8. UI & Visual Style
Color palette: Fresh greens (#17A96F), sunny yellow (#FFD65C) for rewards, off-white backgrounds.

Typography: Rounded sans (Nunito); 32 pt headings, 20 pt body.

Iconography: Friendly line icons (seed, pot, sun).

Animations:

Teach-card images slide-in.

Correct answer → leaf sprout & “whoosh” sound.

Level-up → seed grows into small tree over 3-frame tween.

Accessibility: Voice-over toggle, dyslexia-friendly font option, color-blind safe palette.

9. Technical Requirements
Layer	Key Points
Client	Flutter (single code-base); offline asset cache; TTS/STT via Google Speech.
Backend	Node.js + Firebase/Firestore; user profiles, streak logic, analytics events.
CMS	Google Sheets → automated ETL to Firestore; supports image URL + metadata from your Excel.
Analytics	Amplitude for funnels; experiment flags for gamification tuning.
Push	FCM scheduled “Memorise Pop-ups” at optimal recall interval.

10. Analytics & A/B Experiments
Experiment	Variant A	Variant B	Success Metric
Energy refill rate	1 unit/5 min	1 unit/3 min	Session length
Progress-meter visibility	Exam-only	All phases	Accuracy delta
Avatar rewards	Cosmetic only	Cosmetic + power-up	D7 retention

11. Launch Roadmap (T-0 = Today)
Milestone	Time-box	Notes
🔍 Discovery & UX research	2 w	Classroom tests, parent surveys
🎨 Hi-fi prototyping	3 w	Figma, usability sessions
🏗️ MVP build – Learn Phase only	6 w	20 lessons, energy, basic streak
🚀 Private beta (2 schools)	2 w	Capture baseline KPIs
📚 Add Memorise & Exam modules	4 w	Integrate pop-ups, progress meter
🌍 Public launch (India)	1 w	Marketing, teacher webinars

12. Risks & Mitigations
Risk	Impact	Mitigation
Over-gamification distracts	Low learning outcomes	Mandatory “Exam Hub” checkpoints
Voice recognition accuracy	Frustration	Calibrate for Indian English; fallback skip
Asset fatigue	Reduced novelty	Monthly “plant theme” packs

13. Open Items for You
Confirm image asset style (cartoon vs. real photos).

Share structured question sheet final schema & S3 bucket path.

Decide on ads vs. subscription for monetising coins/energy.

Duolingo ↔ Our App Feature Comparison (Quick Reference Table)
Feature	Duolingo (2025)	Plants App
Life system	Energy bar (25 units)	Energy bar (25, seeds icon)
Path layout	Serpentine course path	Same; nodes are leaves
Streak	Daily flame, freeze with gems	Daily watering can, freeze with seeds
Gems/Currency	Gems, shop	Seeds, avatar shop
Timed challenges	XP Rush	“Growth Sprint” – 60-s rapid recall
Leaderboards	Bronze → Diamond leagues	Class & global leagues
AI personalization	Smart Lesson picks	Algorithmic weak-area resurfacing

This PRD provides the blueprint to turn your spreadsheet of plant questions into a Duolingo-quality learning adventure—ready for engineering, art, and curriculum teams to execute.
