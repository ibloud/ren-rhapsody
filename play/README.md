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

## Optional asset resources — 31 October 2026

The [existing training game-development track](https://github.com/Loptr-Lab/training/blob/docs/polyfork-project-resources-2026-10-31/docs/tracks/game-development.md#polyfork-asset-resources--reviewed-31-october-2026)
records the reviewed shortlist and license/provenance exercise. Its publication
is pending review; it does not alter this prototype's no-external-assets runtime.

For [existing storyboard/tool study #11](https://github.com/ibloud/ren-rhapsody/issues/11),
the candidate props are:
- [Meeting Chair](https://polyfork.dev/asset/meeting-chair-731ce0), ID `meeting-chair-731ce0`.
- [Field Console](https://polyfork.dev/asset/field-console-a92adc), ID `field-console-a92adc`.
- [Meeting Room Display](https://polyfork.dev/asset/meeting-room-display-fddfc3), ID `meeting-room-display-fddfc3`.

The reviewed catalogue lists free low-poly editions. Recheck
[licensing](https://polyfork.dev/licensing) and actual file access before use.
No files were downloaded, imported or approved as final project art by adding
these references. The proposed chair/rescuer composition remains separate from
the implemented rooftop game, and its narrative placement needs Dominique's
review. Preserve the existing three-shot scope, anonymous figure and original
placeholder material; no artist likeness, recording or new story event is
authorized here.

For Halloween, complete the [existing release acceptance](../docs/HALLOWEEN-2026-FIRST-MOVEMENT.md)
first: a complete run, blocker fixes, actual iPad/input observations, independent
completion and an honest release record. Polyfork is optional later production
learning; it is not a reason to convert the current slice to 3D or create another
storyboard assignment.

[Three proposed original blocking diagrams, editable source, text descriptions and current Polyfork licensing/access findings](../assets/storyboard-issue-11/README.md) continue existing issue #11. These are review artifacts, not imported vendor geometry, accepted canon or game integration.
