# Issue #11 — three proposed blocking compositions

Prepared 31 October 2026 for [existing issue #11](https://github.com/ibloud/ren-rhapsody/issues/11). **Proposed staging only, not accepted Rhapsody canon or implemented gameplay.** No motion test, story publication or First Movement 3D conversion. Dominique's review of meaning/canon and maintainer review of integration remain open.

Existing work checked: repository README, Halloween scope, play source, issue #11 and its comments, canonical ecosystem PR #37 and Break This Build PR #108. Reuse the issue's three-shot brief; no new assignment. The referenced [creative contribution record](https://ibloud.github.io/provenance/ai-assisted-story-development/) could not be fetched in this environment on 31 October; historical authorship is therefore attributed to issue #11's account, not reconstructed from that unavailable page.

## Review the compositions

1. [Wide rear three-quarter](01-wide.svg): one seated anonymous adult in charcoal clothing, hands resting, facing the same unmarked console and three far-wall light displays. No other person is visible.
2. [Medium side / approach](02-approach.svg): the same room, figure, costume, chair, console and lights; the torso advances slightly and the right hand approaches the console without contact. This gesture is a staging proposal, not an assertion that an event happened.
3. [Closer side / withdraw](03-withdraw.svg): the same figure returns the hand to the original chair's armrest and remains oriented toward the displays. The closer crop excludes part of the far wall; all three displays remain at the same coordinates in the scene source. No contact, message, procedure or offscreen action is implied.

One scene source is shared: [scene.json](scene.json) records dimensions/cameras/poses; [render.py](render.py) builds editable SVG diagrams with original primitive geometry. Run `python assets/storyboard-issue-11/render.py` from repository root; then open each SVG in a browser/vector editor. These are diagrammatic matte blocks in a rectangular charcoal room, with cool-white panels and restrained amber abstract marks. All cameras stay on the same side of the figure-to-console axis. No celebrity likeness, Ren audio/lyrics, logos, additional characters or readable display text. The woman/PIXIE remains offscreen; nothing depicts her condition or establishes a crossover.

The SVGs were reopened and rendered in local Chromium; room/prop positions and pose changes were checked visually. These are original composition proxies, **not renders of the Polyfork assets**. The chair proxy has armrests because shot 3 calls for one; the candidate Meeting Chair has no documented arms. A vendor-asset adaptation would need its own reviewed fit/pose pass.

## Asset provenance and access register

Access/review date: **31 October 2026**. Vendor creation dates and individual asset authorship are not established by the retrieved pages. Credit candidate assets to **Polyfork**; this does not assign their individual creation to the site's developer. No vendor mesh/source file was downloaded, copied into this repository or used to generate these diagrams.

| Candidate | Official page / vendor claim | Fit and observed access |
| --- | --- | --- |
| Meeting Chair, `meeting-chair-731ce0` | [Page](https://polyfork.dev/asset/meeting-chair-731ce0), free low-poly GLB; four-leg upholstered chair | Visually relevant, but no armrests documented. Direct GLB request blocked by execution proxy HTTP 403; web reader reached a binary-content response it could not parse. Byte integrity/import unverified. Source-download link redirects to sign-in. |
| Field Console, `field-console-a92adc` | [Page](https://polyfork.dev/asset/field-console-a92adc), free low-poly GLB, pivoted screen head | Useful console candidate, but standing proportions/coloured trim need a seated-reach and palette review. Direct GLB request blocked by proxy HTTP 403; web reader could not retrieve the download. Actual import unverified. |
| Meeting Room Display, `meeting-room-display-fddfc3` | [Page](https://polyfork.dev/asset/meeting-room-display-fddfc3), free low-poly wall display | Three copies could support the brief; use abstract content rather than call tiles. Direct GLB request blocked by proxy HTTP 403; web reader could not retrieve the download. Actual import unverified. |
| Room, mannequin, chair/console/display proxies | Original assistant-authored Python/SVG blocking geometry in this PR, based on issue #11's brief | No vendor files. Editable source and diagrams supplied under repository code/design terms; not a clearance claim over third-party assets or the underlying narrative. |

[Official licensing](https://polyfork.dev/licensing), last-updated label **October 2026**, permits project use and modification, without required attribution, while restricting standalone redistribution and competing commercial generators. Free low-poly models differ from paid HD editions. The [official access documentation](https://polyfork.dev/llms.txt) describes anonymous low-poly CDN loading and GLB downloads; source/zipped downloads require a free account. These are vendor terms/access claims, not proof of successful file import here. Do not mirror GLB/module files into this public MIT repository as standalone asset downloads. Recheck terms before integration. No purchase, login, subscription or paid generation was attempted.

Recommendation: **continue testing the three low-poly candidates after anonymous download/import can be verified; use these original diagrams for present composition review.** Do not infer free access means unrestricted redistribution. No ArtCraft tool or bundled material was used; its earlier trial history and NOTICE checks remain unresolved, not superseded by this manual route.

## Choices, cost and acceptance

Issue #11 attributes the chair/rescuer premise and Dr. Meyers association to Dominique; its placement in Rhapsody is proposed. The three gestures/art direction were already recorded as AI proposals in that issue. The assistant selected these proxy dimensions, camera positions, crops and diagram geometry on 31 October; those additions remain proposals. No statement here establishes recovered events, canon acceptance, affiliation or permission for music.

Tools: Python standard library for editable vector geometry; local Chromium for reopening/inspection. No generative-image model or generation settings; no image-generation prompts, credits, paid tools or artist recordings used. Actual generation-credit spend: **0**. Earlier rendering attempt hid a display behind a wall due to coarse depth sorting; corrected by separating background walls and panel marks. Two local SVG rendering passes were used before final review. No vendor export, rig, mesh integrity or accessibility of vendor tools was tested.

Completed: three still blocking diagrams, editable source, text descriptions, consistent room/props, provenance/access assessment and separate human/assistant choices. Outstanding: Dominique's meaning/canon review, maintainer integration review, actual vendor-file access/import/fit, and any later motion test. Nothing is automatically published or integrated into the game by this proposal.
