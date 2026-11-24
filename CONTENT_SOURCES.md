# Sholu website content sources

Reviewed against `/Users/bayudf/Documents/GitHub/SalatBuddy` on 24 November 2026. Paths below are relative to that project. No external product references were used.

Product summaries on the website are faithful paraphrases, not necessarily verbatim app strings. English follows `Sholu/Localizable.xcstrings` where available, with grammatical and typographic cleanup. Indonesian keeps the app's familiar voice and terms. Navigation, accessible labels, and demo controls describe this website's actual actions.

| Website content | Project evidence | Constraint |
| --- | --- | --- |
| Official tagline, title, footer | Owner's explicit wording in this chat | EN: `Your Salah Companion`; ID: `Mulai salat bareng Sholu`. Takes precedence over older demo drafts. |
| Audience: learners, especially new Muslims | `brag-output/brag-plan.md`, What/For | The document supports the audience only. Its older tagline and palette do not override owner instructions. |
| Hero: real-time movement/recitation guidance, learning at one's own pace | `Sholu/Onboarding/View/OnboardingIntroView.swift`, `pageTitle` / `pageSubtitle`; `Sholu/Localizable.xcstrings` | Uses onboarding meaning and language; no guaranteed learning outcome. |
| Movement guide and meanings; Takbiratul Ihram position | `Sholu/Guide/View/GuideView.swift`, `GuideView` / `RukunSalatView`; `Sholu/Guide/View/MovementGuide.swift`, guide items | Describes the existing guide and supplied screenshot. |
| Listen and repeat displayed recitations | `Sholu/Onboarding/View/OnboardingIntroView.swift`; `Sholu/Onboarding/View/OnboardingWalkthroughView.swift`; `Sholu/Localizable.xcstrings` | Recitations depend on the user's stage. |
| Listening through microphone, next-step guidance | `Sholu/Onboarding/View/OnboardingPermissionView.swift`; `Sholu/SalatGuide/View/SalatGuideView.swift`; `Sholu/SalatGuide/Service/SpeechPracticeSession.swift` | Requires microphone permission. No claim of perfect recognition or certification of recitation. |
| Home screen, location-based prayer times, current prayer | `Sholu/Home/View/HomeRoom.swift`, `overlay` / `fivePrayers` / `begin`; `Sholu/Home/Model/PrayerSchedule.swift` | Describes location-based times and the current prayer, not arbitrary prayer selection. |
| Movement and recitation personalization questions/options | `Sholu/Onboarding/View/OnboardingPersonalizeView.swift`, `Step` / `content`; `Sholu/Localizable.xcstrings` | Includes Al-Fatihah, Final Tashahhud, and other recitations, with the three shown options. |
| Beginner route and stage selection | `Sholu/Onboarding/View/OnboardingRoom.swift`, `advanceFromPersonalization` / `savePersonalization`; `Sholu/SalatGuide/Model/SalatLevel.swift`, `fromPersonalization` | Beginners go directly to stage 1. Starting stage is determined by beginner status and Al-Fatihah/Final Tashahhud fluency; do not claim the other-recitation answer determines it. |
| Guidance stages in FAQ | `Sholu/SalatGuide/Model/SalatLevel.swift`, `detail`; `Sholu/Onboarding/View/OnboardingWalkthroughView.swift`, `firstMessage` | Stage 1: tasbih while standing and during Tashahhud; stage 2: Al-Fatihah and Final Tashahhud; stage 3: all recitations. |
| Optional reflection and 1–5 fluency ratings by stage | `Sholu/Reflection/View/ReflectionOfferView.swift`; `Sholu/Reflection/ViewModel/ReflectionViewModel.swift`, `selectRating`; `Sholu/Reflection/Model/ReflectionQuestions.swift`, `questions` | Optional, with questions tied to the prayer's stage. Not a general free-text reflection or guaranteed offer after every prayer. |
| Offers of longer passages / next stage, accept or retain guidance | `Sholu/Reflection/Service/ReflectionProgressStore.swift`, `submit` / `eligibleProposals` / `accept`; `Sholu/Reflection/View/ReflectionResultView.swift`, `Page` / action buttons | Eligibility follows recorded reflections; user acceptance applies the offered change. No automatic advancement claim. |
| Closing invitation | `Sholu/Onboarding/View/OnboardingWalkthroughView.swift`, `messages`; `Sholu/Onboarding/View/OnboardingIntroView.swift`, `pageSubtitle` | Invitation from the app, without new promises. |
| Team identities and roles | Existing owner-updated `src/main.jsx`, `team`, before this audit | Preserve the six actual workspace entries. Not inferred from faces or invented from repository author comments. |
| Original media and captions/alt text | Owner-supplied screenshots, team photos, and `sholu-story.mp4`; `public/assets/screens/SOURCES.md` | Captions describe the actual images. Do not redraw, translate image pixels, or replace the supplied video. |
| Page description metadata | Same onboarding / personalization / reflection sources above | Describes those implemented features only. |

Removed or corrected: generic journey/growth marketing paragraphs; an unverified “Lifestyle” category; download FAQ that described a missing website link instead of app behavior; wording suggesting all users take every personalization question; wording suggesting reflection automatically changes the next prayer's guidance; unused dummy-role translations. No download link, store availability, testimonials, numbers, or extra product features were added.

## Owner-supplied App Store download QR

The owner explicitly supplied `66A0C828-2119-4BAD-BA5F-BEE64DBB3322.png` and requested the QR with App Store download text in the existing closing section before the footer. The original transparent PNG is copied unchanged to `public/assets/app-store-qr.png`, rendered on white. Labels: EN `Download on the App Store`; ID `Unduh di App Store`. This new instruction supersedes the earlier absence of download material. No direct App Store URL has been invented.
