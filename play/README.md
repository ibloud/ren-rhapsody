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
- **Restart:** available on the ending screen

The jump gets a little extra lift on the beat. A forgiving mid-air jump and rooftop recovery make this a short, no-fail prototype rather than a precision challenge. Collect five light fragments and reach the last stage; the ending records fragments, on-beat jumps, and time. A best on-beat-jump count is stored locally in that browser only.

## Scope and provenance

- Original, procedural canvas scenery and locally synthesized tones; no artist recordings, external game assets, third-party libraries, or asset downloads.
- Fan-made concept; not affiliated with, sponsored by, or endorsed by Ren or Epic Games.
- This is an experimental browser prototype, **not** a published Fortnite island or an independently validated playtest. Touch, accessibility, and cross-browser acceptance still need human testing on target devices.
