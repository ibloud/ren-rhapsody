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
