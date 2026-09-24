# Sick Boi Money System / ARG Economic Engine Spec

> **Status:** Design specification / implementation target  
> **Repository:** `ibloud/ren-rhapsody`  
> **Branch:** `docs/sick-boi-money-system-spec`  
> **Version:** 0.1  
> **Last reviewed:** 2026-09-23
>
> This document converts the existing Zone 4 “Money Game” concept into a source-backed economic-survival system suitable for a Fortnite/UEFN prototype, with a separate ARG/research layer and PIXIE-compatible provenance.

---

## 1. Purpose

The existing Ren Rhapsody blueprint describes Zone 4 as a “chaotic casino escape” connected to the *Money Game* trilogy.

This specification replaces the **playable casino/gambling framing** with a fictional economic-survival system:

> **THE LEDGER**

The player navigates a fictional Sick Boi city in which work, time, transportation, operating costs, reputation, uncertainty, debt, and opportunity interact.

The design goal is not to teach players what financial choice they should make. It is to make economic systems **legible, inspectable, and consequential**.

The project should feel GTA-inspired in its urban scale, missions, vehicles, NPCs, and systemic worldbuilding without reproducing GTA-specific protected content or turning the experience into a gambling game.

### Core loop

```
OFFER
  ↓
CHOICE
  ↓
ACTION
  ↓
COSTS + TIME + RISK
  ↓
NET OUTCOME
  ↓
NEW INFORMATION
  ↓
REPUTATION / ACCESS / STATE CHANGE
  ↓
NEXT OFFER
```

The player is not rewarded for guessing the “correct” financial answer. The system records what happened and makes the assumptions inspectable.

---

## 2. Design principles

1. **Simulation before spectacle.** Money mechanics must have explicit variables and explainable outcomes.
2. **Source before number.** A production parameter cannot be treated as authoritative merely because it feels realistic.
3. **Provenance travels with the parameter.** Every important economic value carries source, geography, period, unit, and status.
4. **Uncertainty is a feature.** Estimates may be ranges or confidence bands rather than fake precision.
5. **No financial advice mechanic.** The game presents scenarios, tradeoffs, and consequences; it does not instruct players to invest, borrow, purchase, donate, or open accounts.
6. **No required financial transaction.** ARG participation must never require payment or a financial account.
7. **No sensitive financial collection.** Players should never submit bank credentials, account numbers, tax identifiers, credit credentials, or equivalent information.
8. **Fictional game state is distinct from real-world records.**
9. **Third-party references are not endorsements.** Public tools and sources may be cited without implying sponsorship or participation.
10. **Rights and provenance are separate records.** A source can inform a mechanic without granting permission to use a name, likeness, music, trademark, or other protected asset.
11. **Human review remains the gate.** No autonomous external posting, outreach, solicitation, or partnership claim.
12. **Ship the smallest coherent domain first.** Start with gig-economy mechanics; add other economic domains through an extension protocol.

---

## 3. Relationship to the existing Ren Rhapsody concept

### Existing seed

The repository currently defines:

- Zone 4: **The Money Game**
- a chaotic casino presentation
- music references to *Money Game* Parts 1–3
- trapped NPCs and a release/escape sequence

The redesign preserves the **narrative function**—the player enters a zone about money, power, incentives, and escape—while replacing casino mechanics with systemic economic choices.

### Proposed Zone 4

**Name:** The Ledger

**Visual language:**

- neon financial district
- delivery depots
- vehicle lots
- repair garages
- convenience stores
- apartments and temporary housing
- gig-work hubs
- municipal offices
- pawn/repair/secondhand spaces
- corporate towers
- “optimization” billboards
- public-service spaces
- hidden back-office infrastructure

**Player fantasy:**

> “I can make my own way through this city—but I need to understand what the system is charging me for.”

### Narrative question

> **Who gets paid when everybody else is working?**

This is a narrative question, not a predetermined answer. The game should let the player inspect the mechanisms producing the outcome.

---

## 4. Economic engine architecture

The first playable release should implement one coherent domain:

### Domain 01 — Gig economy

Initial activity types:

- rideshare-style passenger jobs
- delivery jobs
- courier jobs
- short freelance contracts
- equipment/vehicle maintenance
- waiting/search time between offers

The engine should be domain-neutral enough to add later:

- retail employment
- creator income
- contract work
- unemployment/income interruption
- housing
- debt
- retirement
- healthcare/insurance
- AI-related labor disruption

Those are **extensions**, not launch requirements.

### Engine layers

```
SOURCE REGISTRY
     ↓
PARAMETER LEDGER
     ↓
SCENARIO GENERATOR
     ↓
PLAYER STATE
     ↓
OUTCOME CALCULATOR
     ↓
PROVENANCE EXPLANATION
     ↓
GAME/ARG DISCOVERY
```

The game should never depend on a hidden spreadsheet that cannot be reconstructed from the ledger.

---

## 5. Parameter provenance schema

The economic ledger should mirror the repository’s existing provenance-packet philosophy.

Each production parameter SHOULD have these fields:

| Field | Required | Meaning |
|---|---:|---|
| `parameter_id` | yes | Stable machine identifier |
| `label` | yes | Human-readable name |
| `value` | yes | Current value or range |
| `unit` | yes | USD/hour, USD/mile, minutes, %, etc. |
| `geography` | yes | Country, state, metro, or market |
| `population` | yes | Population represented by the source |
| `period_start` | yes | Beginning of measurement period |
| `period_end` | yes | End of measurement period |
| `source_type` | yes | Government, company, research, nonprofit, journalism, etc. |
| `source_url` | yes | Canonical source |
| `source_title` | yes | Human-readable source name |
| `retrieved_at` | yes | Date the project reviewed the source |
| `method` | yes | How the value is used in the model |
| `confidence` | yes | Operational confidence class |
| `staleness_policy` | yes | When re-verification is required |
| `status` | yes | verified / provisional / stale / retired |
| `notes` | no | Caveats and modeling assumptions |
| `rights_status` | yes | Reference-only / permission required / cleared, as applicable |

### Confidence classes

These are **model-management states**, not statistical confidence intervals.

- **A — Direct:** Primary source directly measures the parameter needed.
- **B — Strong proxy:** Primary source measures a close proxy with an explicit transformation.
- **C — Derived:** Parameter is calculated from multiple documented sources.
- **D — Scenario assumption:** Fictional/game-design assumption clearly labeled as such.
- **X — Unverified:** Do not use for a production mechanic.

A parameter may be numerically precise while still being class C or D.

### Staleness

A parameter is **stale** when its defined review interval has elapsed, even if the underlying value may still be true.

Suggested defaults:

- fast-changing prices/rates: 30–90 days
- company/platform mechanics: 90–180 days
- annual tax/mileage rules: recheck each applicable tax year
- structural research: 12 months
- fictional assumptions: no external refresh; version with the game build

No stale parameter should silently continue to present itself as current.

---

## 6. Example ledger records

These examples demonstrate schema only. They are not final gameplay balance values.

### Offer

```yaml
parameter_id: offer.mobility.upfront_fare
label: Example trip offer
value: 23.40
unit: USD/trip
geography: fictional-city-calibration
population: scenario
period_start: 2026-01-01
period_end: 2026-12-31
source_type: derived
source_url: https://www.uber.com/us/en/drive/driver-app/earnings/
source_title: Uber driver earnings information
retrieved_at: 2026-09-23
method: calibration_reference
confidence: B
staleness_policy: 90d
status: provisional
rights_status: reference-only
notes: Fictional game offer; source is used to inform variable design, not to reproduce a real trip.
```

### Operating cost

```yaml
parameter_id: operating.vehicle.mileage_cost
label: Example mileage-cost proxy
value: 0.76
unit: USD/mile
geography: United States
population: IRS standard-mileage users
period_start: 2026-07-01
period_end: 2026-12-31
source_type: government
source_url: https://www.irs.gov/tax-professionals/standard-mileage-rates
source_title: IRS Standard Mileage Rates
retrieved_at: 2026-09-23
method: cost_proxy
confidence: A
staleness_policy: annual
status: verified
rights_status: reference-only
notes: Tax deduction rate is not identical to a player’s actual cash cost. It is a modeling proxy and must be labeled as such.
```

The second example is intentionally important: **a tax mileage rate must not be presented as “what your car costs to drive.”** The engine must preserve the distinction between a source’s actual meaning and the game’s transformation.

---

## 7. Scenario model

A scenario is a bundle of parameter references plus fictional state.

### Required scenario fields

```yaml
scenario_id:
market:
clock_minutes:
offer:
  gross_amount:
  estimated_duration_minutes:
  estimated_distance_miles:
  pickup_distance_miles:
  demand_state:
costs:
  fuel:
  mileage_proxy:
  maintenance:
  platform_or_market_fee:
opportunity_cost:
risk_events:
player_state:
  cash:
  debt:
  vehicle_condition:
  reputation:
  time_remaining:
outcome_rules:
provenance:
  parameter_ids: []
  assumptions: []
```

### Example player-facing offer

> **JOB OFFER**
>
> Pay: **$23.40**
>
> Estimated time: **31 min**
>
> Estimated distance: **14.2 mi**
>
> Pickup: **2.1 mi**
>
> Demand: **HIGH**
>
> **TAKE IT** / **LEAVE IT**

The player should not see a hidden “correct” choice.

After resolution, the game reveals:

- gross income
- time consumed
- operating-cost estimate
- opportunity cost
- net scenario result
- reputation change
- new information
- which assumptions were used

---

## 8. Outcome calculation

The baseline calculation is:

```
NET OUTCOME
= GROSS INCOME
- DIRECT CASH COSTS
- ALLOCATED OPERATING COST
- OPPORTUNITY COST
- PENALTIES / LOSSES
+ BONUSES / TIPS
```

But the engine must preserve separate concepts.

### Gross income

Money associated with completing the scenario.

### Direct cash cost

Immediate expenditure during the scenario:

- fuel purchase
- repair payment
- parking/toll-like fictional cost
- equipment rental
- food or supply purchase

### Operating-cost allocation

A modeled cost associated with using an asset.

This may be informed by real-world proxies but is not automatically equivalent to cash spent during the mission.

### Opportunity cost

Value of time or another opportunity displaced by the chosen action.

This is a game-model variable and should be labeled as such.

### Risk/loss

Unexpected scenario outcomes.

Examples:

- vehicle issue
- canceled job
- low-demand period
- delayed pickup
- equipment failure
- missed higher-value opportunity

Risk must be represented as scenario design, not fabricated real-world probability unless a source supports the probability.

---

## 9. Source hierarchy

Use the strongest practical source available.

### Tier 1 — Primary authoritative sources

Examples:

- government agencies
- official statistical releases
- official tax authorities
- official company documentation for company-specific mechanics
- official nonprofit calculators/policy/research pages when the topic is within their stated scope

### Tier 2 — High-quality research and journalism

Use when Tier 1 does not provide the needed variable or for methodological context.

The Financial Times’ **The Uber Game** is a design-methodology reference: reporting and anecdotes were converted into structured variables and consequential choices, with playthrough outcomes recorded for analysis.

Reference:

https://source.opennews.org/articles/how-and-why-financial-times-made-uber-game/

### Tier 3 — Secondary analysis

Use as context or triangulation. Never silently promote it to primary evidence.

### Tier 4 — Community/social sources

Useful for discovery of questions or edge cases, not authoritative for production parameters unless independently verified.

---

## 10. Initial source registry

The registry is a starting point, not an endorsement list.

| Source | Proposed use | Status |
|---|---|---|
| Uber driver earnings documentation | Upfront-fare variables, demand, pickup/time/distance concepts | Reference |
| Uber marketplace/pricing documentation | Distinguish rider price from driver earnings | Reference |
| IRS standard mileage rates | Mileage-cost proxy; annual refresh | Reference |
| U.S. EIA gasoline data | Fuel-price calibration | Reference |
| AARP Money Tools | Retirement/tax/Social Security/financial-literacy ARG research | Reference |
| AARP financial-resilience research | Resilience/fraud research questions | Reference |
| OpenAI personal-finance documentation | Tool-literacy / AI-assisted research examples | Reference |
| OpenAI financial-services terms | Guardrails for informational financial tooling | Reference |
| Financial Times/OpenNews Uber Game case study | Simulation methodology | Reference |
| Public statistical sources | Future labor/inflation/housing extensions | Candidate |

**Reference does not mean sponsor, partner, endorsement, permission, or participation.**

If a real partnership exists, create a separate participation record.

---

## 11. The Sick Boi Partner Test

An organization can appear as an ARG research destination only when the project can document:

1. **Public benefit** — legitimate educational, civic, creative, scientific, or consumer-interest reason.
2. **Verifiable primary sources** — players can independently inspect underlying information.
3. **No required financial transaction** — no account opening, purchase, investment, donation, subscription, or similar requirement.
4. **No disguised solicitation** — the game does not convert an educational puzzle into a sales funnel.
5. **Transparent affiliation** — sponsorship or partnership is disclosed if it exists.
6. **Data minimization** — no financial-account credentials or unnecessary sensitive data.
7. **Human agency** — the project presents evidence and choices rather than prescribing financial decisions.
8. **No exploitation of vulnerable players** — especially around debt, poverty, fraud, retirement, unemployment, or financial distress.

### Partner states

Use the same explicit-state philosophy as the repository’s music-rights records:

- **Reference** — research use only.
- **Candidate** — under consideration.
- **Contacted** — outreach has occurred.
- **Proposed** — a collaboration has been suggested.
- **Awaiting confirmation** — no authorization/partnership established.
- **Active** — written scope exists.
- **Closed** — proposal ended.
- **Excluded** — failed the Partner Test or creates unacceptable ambiguity.

Never infer endorsement from:

- access to a public website;
- use of a public tool;
- an employee’s public statement unrelated to this project;
- social interaction;
- lack of objection;
- availability of an API or connector.

---

## 12. ARG architecture

The ARG lives **outside** the Fortnite economy.

### Core loop

```
FICTION
  ↓
QUESTION
  ↓
CLUE
  ↓
REAL-WORLD SOURCE
  ↓
PLAYER RESEARCH
  ↓
FINDING / ANSWER
  ↓
FICTIONAL CONSEQUENCE
```

### Example

**In game:**

> “The Bureau says the city's workers are earning more than ever.”

A clue points to a question about how an economic measure is defined.

**Outside the game:**

The player investigates a public source.

**Return path:**

The player supplies a derived answer, code, or category to a pre-built game branch.

**Result:**

The fictional ledger changes state and reveals another layer.

### Important boundary

The published island should not require a live web request in order to calculate its core economy.

The ARG layer should be able to progress through:

- pre-authored branches;
- player-entered answers/codes;
- category selection;
- optional companion web experiences.

This keeps the island playable even if an external source changes or becomes unavailable.

---

## 13. ARG return mechanisms

### Preferred: answer/code gate

The player discovers a fact or transformation outside the game and enters a derived code in a pre-built interaction.

**Advantages:**

- deterministic
- testable
- no live data dependency
- simple failure recovery
- keeps source research separate from game state

**Rule:** Never require a player to submit sensitive personal financial information as the answer.

### Secondary: category discovery

Instead of a single exact answer, the ARG reveals a category:

- wages
- fuel
- retirement
- fraud
- housing
- taxation

The game opens a pre-authored branch corresponding to that category.

### Companion web layer

A web companion can hold:

- source citations
- research prompts
- provenance records
- puzzle state
- accessibility alternatives
- version history

The companion site must not be required to expose personal financial data.

### No hidden dependence

If the companion site is unavailable, the Fortnite core loop must still work.

---

## 14. PIXIE provenance integration

PIXIE should eventually become the orchestration/provenance layer, not the source of truth for external economic facts.

### PIXIE responsibilities

- stable identifiers for parameters and scenarios
- provenance packet references
- source-state tracking
- versioning
- freshness/staleness checks
- transformation history
- relationship graph between source → parameter → scenario → outcome
- audit trail for human changes

### Conceptual graph

```
SOURCE
  │
  ├── defines / measures
  ↓
PARAMETER
  │
  ├── transformed by
  ↓
MODEL RULE
  │
  ├── instantiated as
  ↓
SCENARIO
  │
  ├── experienced by
  ↓
PLAYER OUTCOME
  │
  └── exposed as
     PROVENANCE CLUE
```

The key question for every visible number is:

> **Why does this number exist?**

The answer should resolve to a parameter record and its source lineage.

---

## 15. Provenance packet for economic parameters

Minimum packet:

1. parameter ID
2. exact value/range and unit
3. source title and canonical URL
4. source publisher/owner
5. geography
6. represented population
7. measurement period
8. retrieval date
9. transformation/calculation
10. confidence class
11. staleness policy
12. status
13. modeling assumptions
14. rights/participation status where relevant

This extends the repository’s existing music-rights provenance pattern without conflating economic evidence with intellectual-property permission.

---

## 16. Fortnite implementation boundary

The Fortnite/UEFN version must be designed against the current Epic rules at the time of publication.

The current concept should **not** implement:

- playable casino mechanics
- roulette/slot-machine gameplay
- raffles or gambling mechanics
- real-money wagering
- virtual-currency wagering
- mechanics whose central interaction is betting

The zone should instead use:

- job offers
- route choices
- time pressure
- resource management
- repair/maintenance
- reputation
- information asymmetry
- NPC negotiations
- branching missions
- economic consequences

### ARG boundary

Do not make the island itself a funnel to:

- external financial products;
- account creation;
- donations;
- investments;
- required web transactions;
- private-message requests.

Current Epic developer rules should be rechecked before every public submission because platform requirements can change.

Primary policy reference:

https://legal.epicgames.com/fortnite/developer-rules

---

## 17. Presentation language

### Use

- The Ledger
- Sick Boi Economics
- Economic Survival
- Job Offer
- Net Outcome
- Operating Cost
- Time Cost
- Risk
- Reputation
- Source
- Evidence
- Assumption
- Verified
- Provisional

### Avoid as core mechanic names

- casino
- roulette
- slots
- jackpot
- wager
- bet
- gambling
- “double or nothing”

The artistic language can remain dark, absurd, satirical, and confrontational without making wagering the playable mechanic.

---

## 18. Real-world source use

### Uber

Uber is a **calibration source**, not the identity of the game.

Current Uber documentation can inform concepts such as:

- upfront fares
- estimated time/distance
- pickup distance
- ride type
- real-time demand
- promotions/tips
- separation between rider price and driver earnings

The game should use fictionalized names and values unless a specific use is separately cleared.

Reference:

https://www.uber.com/us/en/drive/driver-app/earnings/

### IRS

IRS mileage rates can provide a documented cost proxy, but the model must explicitly say that a tax mileage rate is not necessarily the player’s actual cash expense.

Reference:

https://www.irs.gov/tax-professionals/standard-mileage-rates

### EIA

Weekly gasoline data can calibrate fuel-price scenarios.

Reference:

https://www.eia.gov/petroleum/gasdiesel/

### AARP

AARP can serve as a research reference for:

- Social Security
- retirement
- taxes
- savings
- financial resilience
- fraud/scam awareness

Reference:

https://www.aarp.org/tools/money/

https://www.aarp.org/about-aarp/policies/fundamentals/financial-security/

No AARP sponsorship, endorsement, or participation should be implied without written documentation.

### OpenAI

OpenAI-related references can support:

- AI-assisted source analysis
- financial-tool literacy
- provenance-aware research
- discussion of the limits of automated financial information

Reference:

https://openai.com/index/personal-finance-chatgpt/

https://openai.com/policies/financial-services-terms/

The project should not represent OpenAI as a financial adviser, bank, broker, sponsor, or participant unless a separate written relationship establishes that status.

---

## 19. Ethical failure modes

The build should explicitly test for these failure modes.

### Failure: false precision

**Problem:** A fictional value is displayed to two decimal places and interpreted as a measured fact.

**Mitigation:** Label derived and scenario-assumption values; preserve ranges where appropriate.

### Failure: source laundering

**Problem:** A secondary article cites a source, and the game cites only the article as if it were primary evidence.

**Mitigation:** Trace the chain to the primary source whenever practical.

### Failure: sponsor implication

**Problem:** A logo or named tool appears in the ARG and players infer endorsement.

**Mitigation:** Use a reference/participation state and explicit disclosure language.

### Failure: financial advice

**Problem:** A game mechanic implies that one investment, debt, or retirement action is universally correct.

**Mitigation:** Show scenario-specific consequences and uncertainty; avoid prescriptive claims.

### Failure: vulnerable-player exploitation

**Problem:** Debt, poverty, fraud, or retirement anxiety becomes a monetization hook.

**Mitigation:** No required transaction, no lead generation, no financial credential collection.

### Failure: stale economics

**Problem:** The game continues using an outdated real-world rate without disclosure.

**Mitigation:** Automated freshness status plus human review before release.

### Failure: rights confusion

**Problem:** A public source is treated as permission to use the source owner’s branding or creative assets.

**Mitigation:** Separate source citation from rights/participation records.

### Failure: ARG accessibility barrier

**Problem:** Players who cannot or do not want to use external web research cannot progress.

**Mitigation:** Provide an in-game alternative path or equivalent information route.

---

## 20. Scope phases

### Phase 0 — Compliance and schema

Deliver:

- economic parameter schema
- source registry
- confidence/staleness rules
- Partner Test
- Fortnite compliance checklist
- fictional-city naming system

**Exit criterion:** every prototype number can be classified as sourced, derived, or fictional.

### Phase 1 — Gig-economy vertical slice

Build:

- one city district
- one player vehicle
- 3–5 job types
- offer screen
- accept/decline decision
- time system
- direct-cost system
- operating-cost proxy
- reputation
- end-of-run ledger

**Exit criterion:** a complete 5–10 minute loop can be played repeatedly and produces explainable outcomes.

### Phase 2 — Provenance reveal

Add:

- source cards
- assumption cards
- “why this number?” interaction
- scenario lineage
- parameter version display

**Exit criterion:** a tester can trace every major economic output back to its inputs.

### Phase 3 — ARG bridge

Add:

- first fictional clue
- companion research page
- source citation
- answer/code gate
- pre-built in-game consequence

**Exit criterion:** the external research step changes the fictional branch without requiring personal financial information.

### Phase 4 — Expansion protocol

Add one new economic domain at a time.

Potential order:

1. delivery
2. freelance/contract work
3. employment interruption
4. housing
5. retirement
6. fraud/scam resilience
7. AI/labor transition

Each domain gets its own source registry and parameter tests.

---

## 21. Testing requirements

### Parameter tests

For each parameter:

- valid unit
- valid geography
- valid period
- source reachable at review time
- status matches review state
- transformation documented
- staleness rule present

### Economic tests

- no negative time unless intentionally modeled
- no hidden costs
- gross/net separation is preserved
- operating-cost proxies are not labeled as cash costs
- scenario assumptions remain distinguishable from source measurements
- repeated playthroughs are deterministic when seeded

### ARG tests

- clue can be solved without sensitive data
- source can be independently inspected
- source failure has a fallback
- answer/code has a documented derivation
- invalid answers fail safely
- accessibility alternative exists

### Fortnite tests

- no prohibited gambling mechanic
- no required external financial transaction
- no required private-message exchange
- no unreviewed external URL presentation inside the island
- current Epic rules reviewed before submission

---

## 22. Data model sketch

A future implementation can represent the ledger as:

```json
{
  "parameter_id": "offer.mobility.upfront_fare",
  "value": 23.4,
  "unit": "USD/trip",
  "geography": "fictional-city-calibration",
  "period": "2026",
  "source": {
    "type": "company-documentation",
    "title": "Uber driver earnings information",
    "url": "https://www.uber.com/us/en/drive/driver-app/earnings/",
    "retrieved_at": "2026-09-23"
  },
  "confidence": "B",
  "status": "provisional",
  "method": "calibration_reference",
  "assumptions": [
    "fictional offer",
    "not a representation of a specific real trip"
  ]
}
```

A scenario references parameter IDs rather than copying their provenance into every scenario record.

---

## 23. Suggested file layout

When implementation begins:

```text
docs/
  SICK-BOI-MONEY-SYSTEM-ARG-ECONOMIC-ENGINE.md
  economic/
    source-registry.md
    parameter-schema.md
    scenario-schema.md
    partner-test.md
    test-plan.md

data/
  economic/
    parameters/
    scenarios/
    sources/

uefn/
  ledger/
    README.md
    scenario-catalog.md

arg/
  README.md
  clues/
  research/
  answer-keys/
```

Do not add live credentials, financial account data, or private participant data to the repository.

---

## 24. Open questions

These are implementation questions, not blockers to the design:

1. What fictional city name and visual identity should replace the literal casino framing?
2. Which three gig-economy job types form the first vertical slice?
3. Should the player begin with a vehicle, rent one, or earn access to one?
4. Which costs are visible before acceptance versus revealed after completion?
5. How much uncertainty should be represented numerically versus narratively?
6. What is the minimum provenance UI that remains understandable in a fast Fortnite session?
7. What companion-web implementation best preserves ARG continuity without becoming a financial lead-generation surface?
8. What accessibility path lets players complete the ARG without external browsing?
9. Which external sources pass the Partner Test for the first public ARG?
10. Which parts of the existing Zone 4 page should be rewritten immediately to reflect the new non-gambling design?

---

## 25. Definition of done for the first public prototype

The first public prototype is ready for review when:

- Zone 4 is no longer a playable casino/gambling sequence.
- The player can complete a coherent economic-survival loop.
- Every major economic value is traceable to a source or explicitly labeled fictional assumption.
- Gross income, direct costs, operating-cost proxies, time, and opportunity cost remain distinct.
- Stale sources are detectable.
- ARG clues lead to public, independently inspectable sources.
- No player financial credentials or sensitive financial data are required.
- No external organization is represented as a sponsor or partner without documented status.
- The project has an explicit Fortnite compliance review dated to the intended submission window.
- The prototype can continue functioning if the external ARG layer is unavailable.
- The economic model can be extended without rewriting the core engine.

---

## 26. Source and participation disclaimer

> The appearance of an organization, company, nonprofit, public agency, publication, tool, or platform in this specification means only that its publicly available material may be useful as a research or calibration reference. It does not establish sponsorship, endorsement, partnership, permission, licensing, or participation.
>
> The project should preserve this distinction in code, documentation, UI, promotional material, and ARG copy.

---

## 27. Immediate implementation target

The next engineering milestone is **not** a full economy.

Build one complete vertical slice:

```
ONE DISTRICT
  ↓
ONE VEHICLE
  ↓
THREE JOB TYPES
  ↓
OFFER SCREEN
  ↓
ACCEPT / DECLINE
  ↓
TIME + COST MODEL
  ↓
NET OUTCOME
  ↓
PROVENANCE CARD
  ↓
ONE ARG CLUE
  ↓
ONE RESEARCH QUESTION
  ↓
ONE ANSWER/CODE
  ↓
ONE PRE-BUILT CONSEQUENCE
```

If that loop is fun, explainable, compliant, and traceable, the rest of **The Ledger** becomes an extension problem rather than a speculative architecture problem.
