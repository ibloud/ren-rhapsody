# First Movement low-vision correction — preview review

Reconstructed from PR #15 head b39a907597f288af43bb8aa9bbfd46ca4486f7b6. The unavailable unpushed workspace was not reused or assumed to exist remotely. Main remained 3893fc43006a6496f8fbab75a16c2b8c3adfab58 before editing. No AGENTS.md exists in this repository; README, provenance, existing verification record and canonical brand guidance were inspected.

## Implementation

`play/style.css` is the sole presentation authority, consolidated instead of adding an override layer. Readable HTML text inherits a 20px baseline and 1.6 line height. Paragraph gaps are 2em. Prose has a 65ch maximum; columns have 40ch measures. Text is left aligned without automatic hyphenation. Neutral primary/on-primary, surface/on-surface, outline, hover, selection and focus roles distinguish actions. Amber remains a signal rather than a background, consistent with the Design Bible. Selected controls have a double border as well as a color change; disabled controls retain readable text and a dashed boundary. Actions have 56px minimum height and game controls 64px targets.

HUD and beat instructions occupy opaque panels outside the canvas scenery. Menus and completion flow in the document instead of clipping inside a fixed canvas overlay. Options retain native dialog scrolling and Escape/focus recovery. Original decorative cover rules, procedural level, game JavaScript, audio and dependencies are unchanged. Reduced-motion CSS removes animations including beat pulse ripples.

System fonts prefer Verdana, then DejaVu Sans, Segoe UI and system-ui. A visual specimen covers I/l/1, O/0, rn/m and x/e/a/o. Linux rendering was inspected; font availability and character distinction must be reviewed again on iPad/Windows/macOS. A font stack cannot guarantee identical glyphs across systems.

## References and exact criteria

- [Canonical Loptr Lab Design Bible](https://github.com/Loptr-Lab/veiled-dominion-engine/blob/main/docs/design/DESIGN_BIBLE.md), fetched blob 4d8fd7fd446145688dfc85d2a27fc2ecb695a8a8.
- [Official Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md), fetched blob 07884d2a9702919408ced745ffff60656e7af22e: descriptive actions, primary/secondary hierarchy, native disabled behavior and semantic color tokens. Reference only; no library or dependencies added.
- Official W3C WCAG source: [1.4.6 Contrast (Enhanced)](https://github.com/w3c/wcag/blob/main/guidelines/sc/20/contrast-enhanced.html), [1.4.8 Visual Presentation](https://github.com/w3c/wcag/blob/main/guidelines/sc/20/visual-presentation.html), [1.4.4 Resize Text](https://github.com/w3c/wcag/blob/main/guidelines/sc/20/resize-text.html), [1.4.10 Reflow](https://github.com/w3c/wcag/blob/main/guidelines/sc/21/reflow.html), [1.4.11 Non-text Contrast](https://github.com/w3c/wcag/blob/main/guidelines/sc/21/non-text-contrast.html), [1.4.12 Text Spacing](https://github.com/w3c/wcag/blob/main/guidelines/sc/21/text-spacing.html), [2.5.8 Target Size (Minimum)](https://github.com/w3c/wcag/blob/main/guidelines/sc/22/target-size-minimum.html).

The hosted W3C/Material catalog domains were denied by network policy; the official source repositories supplied accessible requirement text. No essential criterion text remains missing. W3C main may evolve; this review concerns the named WCAG 2.2 criteria, not a claim to conform to all current draft content.

20px default text, 7:1 for all readable UI, 2em default paragraph gaps and 48/56px targets are project requirements. 1.4.6 AAA permits 4.5:1 for large text. 1.4.8 AAA calls for a mechanism supporting user-selected colors, measures, nonjustified text, 1.5 line spacing and paragraph spacing at least 1.5 times line spacing; the project's default 2em paragraph gap does not establish that complete criterion. 1.4.12 AA requires surviving 1.5 line-height, 2em paragraph, .12em letter and .16em word spacing overrides. 2.5.8 AA uses 24 CSS pixels with exceptions; 2.5.5 AAA uses 44 CSS pixels with exceptions. The project asks for larger targets. No full AAA or Material conformance is claimed.

## Reproduce and acceptance boundaries

Serve the repository at port 8041. Run `node --check play/game.js`, `node --check play/tests/browser.cjs`, `node --check play/tests/readability.cjs`, `git diff --check`, then the existing browser regression and new readability audit with externally supplied Playwright/Chromium as documented in play/README.md.

The readability audit traverses visible HTML text nodes, resolves opaque background ancestors and checks font size, contrast, horizontal clipping and page overflow. It covers menu, options, selected options, live HUD and actual pointer-driven completion at 320/390/820/1440 widths, 100%/200% text and spacing overrides separately and combined. It checks native Escape returns focus to Input options. Screenshots capture all five states at all four default widths. This is DOM/computed-color Chromium evidence; it does not prove every canvas pixel, perceptual readability, screen-reader semantics or real touch accuracy. Decorative aria-hidden artwork is excluded from text measurements.

The existing regression covers real keyboard completion (5/5 fragments), pointer completion, missed-ledge recovery, Replay, pause/resume, interruption and touch cancellation, native audio signal, unavailable audio, optional assists and best-record exclusion. No report is submitted.

Physical iPad Safari, VoiceOver, MouthPad, VOX, independent participants and human audio listening remain unverified. Native keyboard tab order follows source order; moving the HUD visually does not change focus order. On narrow/enlarged screens, the page scrolls vertically and the game/control panels may require scrolling; simultaneous visibility of the complete interface is not claimed.

## Multiplayer Duet consistency

Apply the same project requirements to [the multiplayer demo](https://duet-multiplayer-production.up.railway.app): landing/lobby, room creation/join, player/turn/status labels, move input, rules, error/reconnect/expiry messages, completion, Replay and feedback navigation. Preserve multiplayer rules, authoritative server state, room isolation, reconnect behavior, temporary-memory disclosure and input alternatives.

Source inspection identifies Loptr-Lab/duet-solo-hackathon `demoPage.js` as the demo wrapper, with `public/style.css` and `public/interaction.css` as existing presentation authorities. Consolidate those authorities rather than injecting another page override. Reuse semantic roles, readable typography, opaque board-adjacent status panels, non-color selected/focus states and large controls; do not resize the chess board by treating Material as game design. Keep typed/keyboard move alternatives available when the full board cannot fit large targets.

Review at the same widths/text/spacing settings, plus two independent clients through create/join/move/reconnect/completion/Replay. Measure every readable node and all control states. Separate local two-client Chromium from physical-device and assistive-input acceptance. The live Railway URL was denied by network policy in this session; no deployed Duet measurements or code changes are claimed here. This checklist carries the shared guidelines; a separate Duet code review is needed before claiming ecosystem-wide implementation.

## Measured local result

Chromium 154.0.8037.57 / Node 24.19.0, November 4, 2026: 80 combinations passed, with 3,600 visible text-node observations. Minimum readable text contrast was 8.16:1; smallest measured action height was 56px. Default/hover/focus/selected action text measured 10.50:1–17.91:1. Opaque panel outline #aab6d0 against surface #101421 and control backgrounds visibly separates boundaries; selected controls additionally use a double border. There was no measured page horizontal overflow or text-node clipping in this matrix. Options at 320px with combined text/spacing overrides had 761px client height and 7,426px scroll height; Close remained reachable and Escape restored the launcher. Reduced motion computed animation-name none.

Screenshots were inspected for narrow menu, gameplay HUD, options/selected controls, font specimen and completion; full default-width state captures are retained with the review artifacts. Local audit results are not a claim that the prior hosted preview contains this correction. A new preview and exact source commit must be paired in the PR handoff.
