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
