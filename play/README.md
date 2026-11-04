# First Movement — Browser Prototype

A self-contained, original browser-game slice for the Ren Rhapsody concept. It needs no build step, framework, network asset, account, or downloaded audio.

## Run it

Open `index.html` directly in a modern browser, or serve the repository root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/play/`.

## Controls

- **Move:** left/right arrow keys or A/D
- **Jump:** Space, W, or Up Arrow
- **Touch:** on-screen left/right and jump buttons
- **Sound:** toggle from the upper-right control
- **Pause / Resume:** the upper-right control; switching away pauses and clears held controls. Resume explicitly to continue.
- **Focus:** Start/Restart focus the game area; Tab reaches ordinary controls. Space activates focused buttons normally.
- **Restart:** available and focused on the ending screen

The jump gets a little extra lift on the beat. A forgiving mid-air jump and rooftop recovery make this a short, no-fail prototype rather than a precision challenge. Collect five light fragments and reach the last stage; the ending records fragments, on-beat jumps, and time. A best on-beat-jump count is stored locally in that browser only.

## October 31 verification / showcase status

Current summary: [First Movement development record](https://ibloud.github.io/ren-rhapsody/#play-submission), updated November 3. PR #13 is merged; optional Quiet Beat remains on `review/quiet-beat`, outside main and not verified live.

The existing one-scene prototype has automated keyboard/touch-emulation and native synthesized-signal checks. [Dated verification, reproducible steps and remaining acceptance gates](../docs/FIRST-MOVEMENT-VERIFICATION-2026-10-31.md) distinguish these from independent playtests and physical iPad Safari acceptance. The latter remain unmet; the prepared Halloween outcome is a clearly labeled development showcase, not an accepted public release or a new deadline.

Optional maintainer regression check, with Playwright and Chromium already installed externally:

```bash
PLAYWRIGHT_MODULE=/path/to/playwright CHROMIUM_PATH=/path/to/chromium node play/tests/browser.cjs
```

Serve the repository first as above. Set `FIRST_MOVEMENT_URL` for another reviewed origin. No runtime dependency or artist audio is added. The test measures a native Web Audio signal; it does not establish human listening quality.

## Scope and provenance

- Original, procedural canvas scenery and locally synthesized tones; no artist recordings, external game assets, third-party libraries, or asset downloads.
- Fan-made concept; not affiliated with, sponsored by, or endorsed by Ren or Epic Games.
- This is an experimental browser prototype, **not** a published Fortnite island or an independently validated playtest. Touch, accessibility, and cross-browser acceptance still need human testing on target devices.

## Break This Build 2027 input experiment

Goal: start, play, recover and finish. **Click-to-move** is optional and off by default: click a direction to latch it, again to stop, then click Jump independently. Pause, restart, leaving the page and switching modes clear movement. **Timing assist**, also off by default, grants the beat boost without rhythm timing. Assisted runs are labeled and do not update the best-run record. Neither option maps voice input.

The ordinary Linux Chromium proxy reaches the five-fragment ending and tests missed-ledge recovery. Physical MouthPad, VOX, iPad Safari and VoiceOver remain blocked/unverified. See the existing [status and evidence tracks](../index.html#hands-free-2027) and [shared test packet](https://github.com/Loptr-Lab/duet-solo-hackathon/blob/review/ren-development-record/docs/PRODUCTION_PLAYTEST.md). The existing browser regression now also covers the optional input path. Quiet Beat remains its own review branch, not part of this release candidate.


## Play-first onboarding review

Choose the game, check **Input options** beside **Start**, then make a real move and jump. The first-success message is driven by movement/jump state, not by opening help. Input options use a native dialog; Escape closes it and returns focus. Opening it during play pauses the run and clears held input; Resume is explicit. Both assists remain off by default, and the established assisted-run scoring/best-record rules are retained.

**Restart run** is available while stuck. **Replay** follows the ending. **Report a finding** is reachable during play and at completion; its public GitHub draft asks for build/URL, browser/OS, input method, steps, expected and actual behavior. Opening a draft does not submit it. Gameplay requires no sign-in, training or feedback.

The established audio, art, AI disclosure and four MouthPad/VOX cases remain in the project record. Ordinary pointer/keyboard walkthroughs do not establish physical MouthPad, VOX, iPad Safari or VoiceOver acceptance.

## Low-vision preview review

The consolidated stylesheet uses a 20px readable baseline and opaque HUD panels outside the scene. See [requirements, official references, verification boundaries and multiplayer Duet consistency checklist](../docs/LOW-VISION-REVIEW-2026-11-04.md). Run the expanded maintainer audit with externally installed browser tools:

```bash
PLAYWRIGHT_MODULE=/path/to/playwright CHROMIUM_PATH=/path/to/chromium node play/tests/readability.cjs
```

This supplements the existing gameplay regression; it does not establish physical-device, screen-reader, full AAA or Material conformance.
