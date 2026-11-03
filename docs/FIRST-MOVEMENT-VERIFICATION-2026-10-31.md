# First Movement verification — 31 October 2026

## Assignment, revision and outcome

Existing source baseline: `1de27d8e11544eca734ead6d180eb53b97ad2c01`. Tested runtime blob: `3a673c294478338b40478c3d0298c16e35960599` (`play/game.js`); final review commit and PR are recorded in the delivery PR description. The candidate changes the existing browser slice only. README, play README, Halloween scope, music-provenance rules, issue #11, current open PRs, Break This Build #108 and canonical ecosystem #37 were inspected. No AGENTS.md or nested repository instruction file was present in the fetched Ren tree. Existing main and concurrent resource PR #12 are preserved.

**October 31 remains the target. The accepted public-preview/community-playtest gate is unmet in this record. Development-showcase fallback is prepared for review.** Independent participants have not supplied completion evidence; actual iPad Safari, assistive-technology acceptance and the corrected public route are unverified. A runnable game and passing automation do not close those gates. No main merge, production promotion, music permission change or story publication was performed.

## Environment and evidence types

- Local candidate URL: `http://127.0.0.1:8041/play/`, served with Python's HTTP server from this repository; baseline was served at the same URL before edits.
- Browser: headless Chromium 154.0.8037.57 on Linux; Node 24.19.0 / Playwright via the existing execution environment. Desktop 1280×900; resize checks at widths 320, 390, 820 and 1280; a separate 820×900 Chromium touch/mobile-emulated context. No physical iPad, Safari, independent human participant, headphones or speakers were available.
- Existing public URL: `https://ibloud.github.io/ren-rhapsody/play/`. Direct execution-network retrieval returned proxy tunnel HTTP 403; the web reader also could not retrieve it. This is an environment access failure, not proof the public page is broken. Public link-chain, source equality and corrected deployed browser behavior were not verified here. The local server is not a public release URL.
- Automated checks use native browser keyboard/pointer input and a real AudioContext. A test-only AudioContext wrapper taps an analyser and counts oscillators; it does not replace synthesis or inject a recording. No gameplay state is teleported or changed in the committed test. A temporary read-only diagnostic was used while investigating the recovery defect, then excluded from deliverables.

## Reproduction, fixes and retest

| Check | Baseline observation | Focused correction / final observation |
| --- | --- | --- |
| Start | Focus Start and press Space: overlay stayed visible because global game handling prevented native button activation | Game keys act only during play in the focused canvas. Space starts; focus moves to the canvas |
| Movement/jump/collection/ending | A right-plus-jump baseline run collected 5/5 and finished in ~8 seconds; this was implementer automation, not independent playtesting | Corrected regression uses real movement/jump keys and rooftop recovery, collects 5/5 and reaches the ending in ~9 seconds; on-beat count varies with timing |
| Final roof recovery | A no-fail route repeatedly returned to x=2020, left of the last roof at x=2075; holding right without another jump could loop indefinitely | Checkpoint clamp now uses the playable world edge, allowing recovery on the actual last roof. Complete route retested |
| Focus/ending/restart | Canvas had no tabindex; start/ending focus landed on the document body | Focusable canvas, visible focus outlines, ending focuses Restart, Space restarts and clears fragment/input state |
| Touch | Existing controls were hidden at tablet widths above the phone breakpoint | Coarse-pointer rule exposes existing controls. Chromium multi-touch move+jump, cancellation/lost capture and Resume passed; no physical-touch acceptance claimed |
| Interruptions | Blur cleared only keyboard flags while the world/time/audio continued | Explicit Pause/Resume, automatic blur/hidden pause, cleared held/pointer controls, frozen active-run time, user-controlled resume and canvas focus |
| Sound | Local oscillator/noise synthesis exists; no external audio assets | Native AudioContext running and non-zero analyser signal observed; sound off suspends, sound on resumes, externally suspended audio can recover. Unsupported AudioContext has explicit status and gameplay still starts |
| Resize | No dimension/control acceptance evidence | Live desktop resizing at 320/390/820/1280 yields non-zero canvas dimensions and no page overflow; scene state survives. Physical rotation/zoom still needs device testing |
| Status/accessibility | Fast beat changes were inside an aria-live HUD | Removed rapidly changing HUD from live region; discrete status uses polite announcement. Canvas remains a visual platforming experience; this is not screen-reader or accessibility conformance acceptance |

Synthesized output is original oscillator tones plus generated noise in `play/game.js`; no artist recording, lyric, external asset, service/account or audio download is used. Observed native signal peak is an engineering signal check, not a listening-quality review. Audio scheduling realigns on resume and skips stale scheduling windows rather than replaying a backlog. Existing artist/music permissions documents were not altered.

## Reproducible maintainer checks

Serve the repository, then run `node --check play/game.js`, `git diff --check`, and:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright CHROMIUM_PATH=/path/to/chromium node play/tests/browser.cjs
```

`FIRST_MOVEMENT_URL` selects a reviewed test origin; default is the local URL above. Playwright is an external test tool, not a new game dependency. The script records browser/version/time and fails on page errors, external requests, incomplete collection/ending, focus or input recovery regressions. Native signal taps and simulated interruptions are automated checks, not independent playtesting.

Latest local run:

```text
Environment 2026-10-31T09:42:14.329Z 154.0.8037.57 v24.19.0 http://127.0.0.1:8041/play/
PASS native Web Audio: oscillator scheduling and non-zero rendered signal { count: 2, peak: 0.03281130641698837, state: 'running' }
PASS complete real-keyboard run, five fragments, ending, focused restart FRAGMENTS 5 / 5 ON-BEAT JUMPS 0 TIME 0:09
PASS touch-emulated simultaneous move/jump, cancellation, tablet-width controls, interruption recovery; not physical iPad Safari
PASS unsupported audio remains playable with explicit unavailable status
PASS no page errors or external requests; actual headphone/speaker listening and independent playtesting remain unperformed.
```

Review captures: `docs/evidence/first-movement-ending.png` and `docs/evidence/first-movement-touch-emulation.png` in the PR. They show local automation only. Existing background/scene style is preserved; the new static banner labels development-showcase status.

## Acceptance and next actions

| Gate | State | Owner / observable next action |
| --- | --- | --- |
| Runnable one-scene beginning/action/ending; local regression blockers | Automated local pass | Maintainer reviews exact candidate and reproduces command |
| Original placeholder audio provenance | Source and synthesized-signal check pass | Human tester still assesses audibility, comfort and timing on actual hardware |
| Independent completion | Unmet | Independent participant records build URL/SHA, device/browser/input, completion result and expected vs observed findings in existing project tracker |
| Actual iPad Safari, touch/rotation/interruption and accessibility | Unmet | Named participant performs real-device run; record OS/browser, input, focus/zoom/orientation and accessibility findings; do not relabel Chromium emulation as iPad |
| Public corrected URL and hub route | Unverified | After owner-reviewed merge/publication, verify Break This Build → First Movement on target device and compare serving revision/artifacts |
| October 31 release acceptance | Unmet | Prepare reviewed development showcase and findings now; accept a playable release only after required evidence exists, without changing the target date |
| Optional visual production | Separate issue #11 / existing PR #12 | Review original blocking diagrams and asset/access register; no gameplay or canon integration |

Safe to pause with source/evidence in focused PRs. Dominique owns release and canon decisions; maintainer owns reviewed publication; independent testers supply acceptance evidence. A showcase is a transparent fallback, not a claim that the tested-public-preview target passed.


## Source follow-up — 3 November 2026

This follow-up does not rewrite the October 31 observations or turn them into independent acceptance. Source inspected: main `0235ba0094347f03594b9b8c4f0d3f984f59561b`. PR #13 is merged. GitHub's Pages deployment record reports success for that SHA at 2026-10-31T09:57:18Z; the Pages configuration publishes main at the root. Direct public retrieval was blocked (proxy HTTP 403); metadata is not serving-artifact equality or device acceptance.

The current public summary belongs in [the existing First Movement status section](https://ibloud.github.io/ren-rhapsody/#play-submission), linked from Break This Build's owning `Loptr-Lab/duet-solo-hackathon/duet-review.html`. No AGENTS.md or nested instruction file was found in either inspected main tree. Existing README, rights/provenance, verification and publication workflow were read. Concurrent Duet CSS PR #110 and Weaver PR #105 remain separate; this update changes no styling, gameplay or deployment configuration.

| Public claim | Closest source | Limit |
| --- | --- | --- |
| Browser slice and recovery fixes merged | [PR #13](https://github.com/ibloud/ren-rhapsody/pull/13), main SHA above | Source merge and recorded Pages success, not live execution verification |
| Five-fragment ending, focus, interruption, touch-emulation and synthesized-signal checks | October 31 reproduction/results above and `play/tests/browser.cjs` | Implementer automation; not independent playtesting, human listening, physical Safari, or VoiceOver |
| Optional Quiet Beat tapping mode is review work | [Commit e471e6d](https://github.com/ibloud/ren-rhapsody/commit/e471e6db31115020660a885aefab70c32bed1347), `review/quiet-beat`, one commit ahead of main | No merged PR found; main Pages source excludes it; not verified live |
| Quiet Beat uses local timing and optional synthesis | `play/quiet-beat.html` and `play/quiet-beat.js` at that commit | Source inspection, not accessibility acceptance |
| Quiet Beat is Codex-assisted | Project owner's November 3 review brief identifies this implementation | Source artifact is available; individual prompts/human edits are not itemized by repository metadata |
| Earlier concept/draft authorship | Existing blueprint and source history | No complete AI/human contribution ledger; do not infer authorship from account identity |
| Audio and playable art | `play/game.js`, `play/style.css`, play README at inspected main | Local synthesis and procedural art; no additional rights claim for blueprint/social artwork |
| Public sharing and artist response | Public repository and PR artifacts; existing music/participation boundary | No verified private delivery, receipt, response, invitation, or commission in inspected Rhapsody sources |

Codex assisted the November 3 source tracing, status/resource drafting, and automated verification described in the paired review PRs. Human release/canon authority remains Dominique's under the existing record. No independent human playtest or artist approval is attributed.

### Optional resource verification

- Handshake MOVE referral supplied by the owner: https://joinhandshake.com/move-program/referral?referralCode=AB04EB&utm_source=referral . Parameters are preserved; link is labeled as a referral. Direct retrieval returned proxy HTTP 403; the web reader also could not access it. The owner describes a screenshot showing “Vibe Code an App” using Google AI Studio, but the screenshot was not available to inspect in this review. Free training, account requirements, referral benefits/conditions and current mission availability are unverified. No account, enrollment or referral action was taken.
- Opinion AI, *Bookmark This: The Free AI Learning Path for 2026*, published May 31, 2026: https://opinionai.substack.com/p/free-ai-courses-from-anthropic-google . Web-reader access succeeded November 3 (direct shell retrieval was blocked). The guide distinguishes linked free learning material from its paid companion subscription/guides and says some resources require accounts and some certificates cost money. Individual provider offers were not audited; no blanket free-access claim is made.
- Training is optional, independent of contributor approval or employment. No identified instruction in the inspected main trees requires suppressing a neutrally labeled, unverified referral destination; it remains subject to preview review before publication.

The prior original-audio, rights, independent participation, and publication gates remain in force. Review preview and automated source checks must not be described as physical iPad Safari/VoiceOver acceptance.

### November 3 local review checks

The unchanged main First Movement runtime passed its existing browser regression again in Linux Chromium 154.0.8037.57 / Node 24.19.0, served at `http://127.0.0.1:8041/play/`: five fragments and ending, focused restart, interruptions, tablet touch emulation, supported/unsupported audio, and non-zero native synthesized signal. This remains automated evidence, not independent or physical-device acceptance.

The updated Rhapsody page and owning hub passed local relative-link/fragment checks, navigation/keyboard focus, preserved referral-parameter checks, widths 320/390/820/1440, and an 820px enlarged-root-text check without horizontal page overflow. Both 820px captures were inspected. The hub's existing helper script referenced an absent `pixie-restore` anchor; restoring that existing control's anchor fixes the observed page error and preserves its hide/restore/Escape behavior. No stylesheet or artwork changed.

The existing Duet browser-recovery and Weaver generators completed with no generated source differences. Syntax checks and all 41 existing tests passed, using already installed dependencies; the first restricted run could not complete the loopback WebSocket test, which passed when rerun with socket permission. No dependency was added. Physical iPad Safari, VoiceOver, independent playtesting, and hosted visual review remain separate pending gates at this point. The paired PR handoff identifies the final commits and preview results.

## Break This Build 2027 follow-up — November 3, 2026

Continue PR #14 from `96d80ca4c56e90ce0eb3ec8207841e5c1c78790a`, preserving the owner's added Halloween retrospective, rather than restarting from the earlier draft. Main remains `0235ba0`; Quiet Beat remains separate `e471e6d` review work. Paired hub PR #111 continues from `176c0b3`, with Duet main `ad55c088`. Source claims do not change the older acceptance record.

One goal now links both games: start, play, recover, finish using hands-free input. Four separate MouthPad/VOX cases and ordinary-input/physical-device/VoiceOver evidence tracks are in the [existing shared test packet](https://github.com/Loptr-Lab/duet-solo-hackathon/blob/review/ren-development-record/docs/PRODUCTION_PLAYTEST.md). Physical MouthPad, VOX, iPad Safari and VoiceOver are blocked by unavailable test setups; no compatibility is claimed. Current VOX first-party material describes macOS/iOS dictation, not verified game key mappings/holds. Augmental's linked chess demonstration is motivation only.

A native ordinary-pointer reproduction found that holding the direction button captures that pointer, so it cannot activate Jump at the same time. The optional, reversible click-to-move mode uses separate clicks: direction toggles, Jump, and cleared movement on pause/mode change/interruption/restart. The existing game scene, platforms and recovery rules are retained. A single mouse completed all five fragments after a missed-ledge recovery. Optional timing assist grants the beat boost without timing the input; assisted runs are labeled and excluded from the best-run record. A keyboard proxy is not VOX latency/hold evidence.

Codex assisted the scoped input changes and automated checks. No human player, independent tester or physical assistive-device test is implied. The browser still uses local canvas and synthesized audio, not a model service. The existing shared stylesheet is reused, with only a visibility rule for the opt-in controls; art, optional training resources, and their verification labels are preserved. Final tested commits and preview readback belong in the paired review PR handoff.

Quiet Beat at `e471e6d` was checked separately in isolated Chromium: Start, tap feedback, browser-automated tempo selection to 72 BPM and Stop passed. This is a branch-only ordinary-control proxy, not a physical MouthPad/VOX test or a merge. The final hub preview rewrites only cross-site links in its staging artifact so both reviewed game paths can be opened from the hub; canonical source destinations remain unchanged.

Final local review: the existing native browser regression passes both the default route and the optional single-pointer path, including timing-assist boost, assisted-run labeling after switching assist off, and exclusion from the best-run record. Duet's existing 41 tests, syntax checks and both static generators pass; the additional browser script completes the same 34-move game by pointer and keyboard, tests held and fresh duplicate confirmation at turn handoff, and restarts. Local links/fragments and widths 320/390/820/1440 pass across hub, status and game pages; both game paths open from the assembled hub preview. Chromium is Linux automation, not physical iPad Safari or independent human evidence. Existing hub/live Duet runtime retrieval remains blocked by proxy HTTP 403.


## Play-first onboarding follow-up — November 3, 2026

Based on current merged main `3893fc43006a6496f8fbab75a16c2b8c3adfab58` after PR #14. The successor review adds Input options beside Start and during play, a native dialog with Escape/focus return and explicit paused recovery, a first-success announcement only after actual movement and a jump, stuck-run restart, Replay and a public GitHub report draft. The first-success announcement changes once per run, not every frame. Assisted scoring and best-run exclusions, original scene/art/audio, retrospective, AI disclosure and training labels remain. Codex assisted implementation and automated verification; no independent human/device acceptance is inferred.

The paired Duet review depends on refreshed CSS PR #110, `1d607ad93a7e05b2396ff181325ff5773c4acdee`, which reconciles merged main with the existing stylesheet consolidation. Its successor uses that shared authority, not new page overrides. Weaver #105 remains outside scope. Canonical Design Bible and Material/UserOnboard references are in the paired onboarding review record.

Local Linux Chromium passes the existing First Movement browser regression and the assembled hub → Input options → real move/jump → recovery → finish → Replay/report walkthrough by pointer and keyboard. Default assists remain off; native dialog closes on Escape and opening it mid-run pauses until Resume. Source link/fragment, 320/390/820/1440 reflow and critical focus/contrast/target checks are reported in the paired review. Physical MouthPad, VOX, iPad Safari and VoiceOver remain blocked; VOX game-key mapping and holds remain unverified. The public report handoff is checked without sending an issue. Exact tested commits and staged artifact checks are recorded in successor PRs before any publication decision.
