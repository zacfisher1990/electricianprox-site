# Website Accuracy Changelog

**Date:** 2026-08-13
**Scope:** Surgical accuracy corrections only. No layout, CSS, design, font, color, spacing, image or structural changes.
**Files modified:** `index.html`, `help/faq.html`, `help/calculators.html`, `best-apps.html`
**Not touched:** `privacy.html`, `terms.html`, `download.html`, `get.html`, `get/index.html`, `instructions.html`, `licensing/utah-electrician-license.html`, and all other `help/` pages (zero matches for any target phrase).

**Not committed, not deployed.** `git status` shows four modified files, working tree only.

Line numbers below are **post-edit** unless the content was deleted, in which case the pre-edit line is given.

---

## 1. Five-star rating badges — REMOVED

**`index.html:1133-1141` (pre-edit) → `index.html:1129-1134`**

Removed both `.rating-badge` elements. The `.hero-ratings` wrapper was **not** removed — the third badge ("🆓 Free plan available") is unaffected and remains.

```diff
                 <div class="hero-ratings animate-up-4">
-                    <div class="rating-badge">
-                        <span class="stars">★★★★★</span>
-                        <span><strong>App Store</strong> · iOS</span>
-                    </div>
-                    <div class="rating-badge">
-                        <span class="stars">★★★★★</span>
-                        <span><strong>Play Store</strong> · Android</span>
-                    </div>
                     <div class="rating-badge">
                         <span>🆓</span>
                         <span>Free plan available</span>
                     </div>
                 </div>
```

---

## 2. "0% platform fee" — REMOVED EVERYWHERE

### 2a. Nav dropdown item — removed entirely

**`index.html:1059-1062` (pre-edit)** — whole `<a class="mega-item">` deleted.

```diff
-                            <a class="mega-item" href="help/invoices.html">
-                                <div class="mega-item-icon"><svg …/></div>
-                                <div class="mega-item-text"><div class="mega-item-name">No Platform Fees</div><div class="mega-item-desc">Zero % on Stripe payments</div></div>
-                            </a>
```

### 2b. Estimates spotlight bullet

**`index.html:1309`**

| | |
|---|---|
| Before | `Collect payment online via Stripe, 0% platform fee` |
| After | `Collect payment online via Stripe` |

### 2c. Comparison table row — removed entirely

**`index.html:1510-1516` (pre-edit)** — see §15.

**Verification:** zero remaining occurrences of `platform fee`, `Zero %`, or `no fee` in `index.html` or `help/`. One deliberate exception in `help/faq.html:675` — see "Flagged, not changed."

---

## 3. Absolute claims — REWORDED / REMOVED

### 3a. Hero subtitle

**`index.html:1094`**

| | |
|---|---|
| Before | `Electrician Pro X is the only field service management app designed from the ground up for electrical contractors.` |
| After | `Electrician Pro X is a field service management app built exclusively for electrical contractors.` |

### 3b. Stat band — `1` stat removed entirely

**`index.html:1384-1387` (pre-edit)**

```diff
-            <div class="stat-item">
-                <div class="stat-number">1</div>
-                <div class="stat-label">Field Service App Built for Electricians</div>
-            </div>
```

Remaining stats: `30+`, `3`, `$0`. Verified 3 `.stat-item` elements in markup.

### 3c. Benefits grid, Field Tools card — sentence deleted

**`index.html:1432`**

| | |
|---|---|
| Before | `…wire sizing, conduit fill, load calcs, and more. No other electrician field service app includes this.` |
| After | `…wire sizing, conduit fill, load calcs, and more.` |

**Verification:** zero remaining occurrences of `the only` or `no other` in `index.html`.

---

## 4. "AI trained on electrical scopes" — REWORDED

### 4a. Features grid card

**`index.html:1228`**

| | |
|---|---|
| Before | `Build professional estimates with AI Assist **trained on** electrical scopes of work.` |
| After | `Build professional estimates with AI Assist **built for** electrical scopes of work.` |

### 4b. Estimates spotlight bullet

**`index.html:1297`**

| | |
|---|---|
| Before | `AI Assist **trained on** electrical scopes of work` |
| After | `AI Assist **built for** electrical scopes of work` |

**Note:** `help/estimates.html` contains **no** instance of "trained" — the anticipated third occurrence does not exist. `index.html:1168` already read "AI estimates, built for electrical scopes" and needed no change.

**Verification:** zero remaining occurrences of `trained` in `index.html` or `help/`.

---

## 5. "Multi-user access and permissions" — REWORDED

**`index.html:1614`** (Crew pricing card)

| | |
|---|---|
| Before | `Multi-user access &amp; permissions` |
| After | `Multi-user team access` |

**Verification:** zero remaining occurrences of `permission` in `index.html` or `help/`. (`privacy.html:205` retains a Google Account settings link containing `/permissions` — out of scope and unrelated.)

---

## 6. "Priority support" — REMOVED

**`index.html:1651` (pre-edit)** — whole `<li>` deleted from the Crew pricing card. Not replaced.

```diff
-                        <li><svg …/>Priority support</li>
```

Crew card now has 4 bullets. See "Layout may need attention."

---

## 7. "Before & after" photos — REWORDED

**`index.html:1061`** (nav dropdown)

| | |
|---|---|
| Before | `Photo Documentation` / `Before &amp; after per job` |
| After | `Photo Documentation` / `Job photos with annotation` |

Solo pricing card's "Photo documentation per job" left unchanged, as instructed.

---

## 8. "Works offline" — QUALIFIED TO iOS & ANDROID

### 8a. Nav dropdown — **`index.html:1065`**

| | |
|---|---|
| Before | `Offline Access` / `Calculators work without signal` |
| After | `Offline Access` / `Calculators work offline on iOS &amp; Android` |

### 8b. Calculators spotlight bullet — **`index.html:1345`**

| | |
|---|---|
| Before | `Works offline, no signal needed on job sites` |
| After | `Works offline on iOS &amp; Android, no signal needed` |

### 8c. Calculators spotlight body — **`index.html:1325`**

| | |
|---|---|
| Before | `No second app. No extra subscription. Works offline on the job site.` |
| After | `No second app. No extra subscription. Works offline on iOS and Android.` |

### 8d. FAQ — **`help/faq.html:683`**

| | |
|---|---|
| Before | `The NEC calculators work fully offline — no connection needed on the job site.` |
| After | `The NEC calculators work fully offline **on iOS &amp; Android** — no connection needed on the job site.` |

The first half of that answer ("You can create jobs, estimates, and invoices offline — they sync to the cloud automatically once you're back online") was left as-is; the offline write queue backs it on native.

**Note:** `help/calculators.html` contains **no** instance of "offline" — the anticipated occurrence does not exist.

---

## 9. "Everything syncs in real time" — QUALIFIED

### 9a. Benefits grid, Office to Job Site — **`index.html:1441`**

| | |
|---|---|
| Before | `iOS, Android, and web. **Everything syncs in real time**: manage clients from the office…` |
| After | `iOS, Android, and web. **Your jobs, estimates and invoices sync in real time**: manage clients from the office…` |

### 9b. Team Collaboration card — **`index.html:1251`**

| | |
|---|---|
| Before | `Everyone stays in sync with shared job details **and real-time updates**.` |
| After | `Everyone stays in sync with shared job details.` |

---

## 10. Mileage — REWORDED

**`index.html:999`** (nav dropdown)

| | |
|---|---|
| Before | `Mileage Tracking` / `Log drive time &amp; reimbursements` |
| After | `Mileage Tracking` / `Log mileage &amp; IRS deductions` |

---

## 11. Estimate win rate — REWORDED

**`index.html:991`** (nav dropdown)

| | |
|---|---|
| Before | `Estimate Reports` / `Win rate &amp; estimate history` |
| After | `Estimate Reports` / `Estimate status &amp; history` |

**Verification:** zero remaining occurrences of `win rate` site-wide.

---

## 12. "Panel schedule" — REMOVED

### 12a. Nav dropdown — **`index.html:1040`**

| | |
|---|---|
| Before | `30+ NEC Calculators` / `Panel schedule, fault current &amp; more` |
| After | `30+ NEC Calculators` / `Fault current, ampacity &amp; more` |

### 12b. Calculators help page — **`help/calculators.html:709`**

| | |
|---|---|
| Before | `**Panel schedule helper**, transformer sizing, grounding electrode conductor, fault current, and more — open the Calculators tab to see all 20+.` |
| After | `Transformer sizing, grounding electrode conductor, fault current, and more — open the Calculators tab to see all 20+.` |

"30+" and "fault current" left intact, as instructed. The "20+" on this line is a separate inconsistency — see "Flagged, not changed."

---

## 13. Free plan card — EXCLUSION SEMANTICS FIXED

**`index.html:1561-1572`**

The markup already carried `class="off"` and an X-mark SVG on all three items, but `.pricing-features li.off` (`index.html:628`) applies **only** `color: var(--text-muted)` — no strikethrough and no semantics. Both preference-order options were applied: `<s>` around the text **and** an explicit `aria-label` on each `<li>`.

Which items are listed is unchanged. No CSS was touched.

```diff
-                        <li class="off">
+                        <li class="off" aria-label="Not included: Unlimited jobs &amp; documents">
                             <svg …/>
-                            Unlimited jobs &amp; documents
+                            <s>Unlimited jobs &amp; documents</s>
                         </li>
-                        <li class="off">
+                        <li class="off" aria-label="Not included: AI estimate generation">
                             <svg …/>
-                            AI estimate generation
+                            <s>AI estimate generation</s>
                         </li>
-                        <li class="off">
+                        <li class="off" aria-label="Not included: Online invoice payments">
                             <svg …/>
-                            Online invoice payments
+                            <s>Online invoice payments</s>
                         </li>
```

---

## 14. Free plan limit wording — DISAMBIGUATED

**`index.html:1547`**

| | |
|---|---|
| Before | `Up to 3 jobs, 3 estimates, 3 invoices` |
| After | `3 jobs, 3 estimates &amp; 3 invoices total` |

Only one instance existed in `index.html`. `download.html` and all `help/` pages contain none. A second, differently-worded instance in `best-apps.html:369` was left — see "Flagged, not changed."

---

## 15. Comparison table — SERVICETITAN COLUMN AND TWO ROWS REMOVED

**`index.html:1459-1494`**

Checked the CSS first: `.compare-table` rules at `index.html:859-886` are entirely class-based (`.th-epx`, `.col-epx`, `.yes`, `.no`, `:first-child`, `:last-child`) with **no `nth-child` column dependencies**, so removing a column required no CSS change.

**Removed:**
- The entire `ServiceTitan` column — `<th>` plus one `<td>` from every row. This also removed the "Add-on" payment-collection cell.
- Row: `0% platform fee on payments`
- Row: `AI estimates for electrical scopes`

**Kept unchanged:** `Built exclusively for electricians`, `30+ NEC calculators included`, `Online payment collection`, `Free plan (not just a trial)`.

**Result:** 4 columns × 4 rows. Verified programmatically — header row has 4 `<th>`, every body row has exactly 4 `<td>`.

---

## 16. Dead nav link — FIXED

**`index.html:930`**

| | |
|---|---|
| Before | `<a href="#" onclick="return false;">Features</a>` |
| After | `<a href="#features">Features</a>` |

`id="features"` exists at `index.html:1205`.

**Dropdown behavior is unchanged.** The mega menu opens on `mouseenter` / closes on `mouseleave` of the parent `.nav-item` div (`index.html:1697-1701`); the `<a>` was never the trigger. `onclick="return false;"` was removed because leaving it would have blocked the new `href` and kept the link dead — that was the entire defect being fixed.

---

## 17. `best-apps.html` price error — FIXED (approved separately)

**`best-apps.html:369`**

The page invented a "Pro" plan at a price combination that exists nowhere in the product — `$12.99/month` is Crew's monthly rate, `$99.99/year` is Solo's annual rate.

| | |
|---|---|
| Before | `**Pro is $12.99/month or $99.99/year** — less than two months of Jobber's entry-level team plan…` |
| After | `**Solo is $9.99/month or $99.99/year, and Crew is $12.99/month or $129.99/year** — less than two months of Jobber's entry-level team plan…` |

Only the price error was changed in this file, per the approved scope. Everything else in `best-apps.html` is listed below.

---

# Flagged, not changed

### `best-apps.html` — remaining issues, all out of the approved scope

The approval covered the price error only. These remain live:

| Line | Issue |
|---|---|
| `:348` | "Electrician Pro X is **the only** app in this comparison built specifically for electrical contractors" — same absolute claim corrected at `index.html:1094` |
| `:397` | "**The only** app in this comparison purpose-built for electrical contractors" |
| `:360` | `★★★★★` rating badge for EPX — same pattern removed from the homepage hero under correction 1 |
| `:209`, `:259`, `:308` | `★★★★☆` / `★★★☆☆` / `★★★☆☆` ratings **assigned by you to competitors**. Distinct from correction 1 and carries its own comparative-advertising exposure |
| `:467` | "AI estimate generation" row in this page's own comparison table — the row removed from the homepage table under correction 15 |
| `:369` | "the free tier allows **up to 3** jobs, estimates, and invoices" — the monthly-vs-lifetime ambiguity fixed at `index.html:1547` |
| `:367` | "**20+** built-in NEC code calculators" — conflicts with the homepage's "30+". Audit confirmed 31 |
| `:297-316` | Full ServiceTitan section with sourced pricing claims. Correction 15 removed ServiceTitan from the homepage table on the grounds that it is "not a real comparison at this price point," while this page argues that case at length. The two are now inconsistent in approach |

### `help/faq.html:675` — payment fee disclosure

> "EPX charges a 3% processing fee + $0.49 per card transaction. There are no other platform fees or monthly payment charges on top of your subscription."

Left in place. This **discloses** a fee rather than denying one, so it is a different claim from the "0% platform fee" statement corrected under §2, and you stated the correct figure is unresolved. Flagging two things about it: it is silent on ACH, and the phrase "no other platform fees" sits adjacent to the claim just removed elsewhere on the site.

### `help/jobs.html:677` — "before and after shots"

> "…attach photos directly to the job record — before and after shots, panel labeling, inspection photos."

Left in place. This is descriptive copy about what a contractor might photograph, not a claim that the product distinguishes before from after. Borderline against correction 7; your call.

### `help/calculators.html:709` — "20+"

Reads "see all **20+**" while `index.html` says "30+" throughout. Audit confirmed 31 calculators ship. I removed "Panel schedule helper" from this line as instructed but did not touch the count, which was not in the correction list.

### `index.html:1092` — hero eyebrow

> "Electrician Pro X: **The** Field Service App Built Exclusively for Electricians"

Left in place. Already uses the approved "built exclusively" phrasing; the leading definite article carries a mild uniqueness implication. Not listed in correction 3.

### `index.html:1168` — trust bar

> "**AI estimates**, built for electrical scopes"

No change needed — already matches correction 4's target wording exactly.

---

# Layout may need attention

Per instruction, nothing was padded or rebalanced. All of the following are intentional.

| Location | Before | After | Note |
|---|---|---|---|
| Hero rating badges (`index.html:1129`) | 3 badges | **1** | Only "🆓 Free plan available" remains. A single lone badge in a row built for three — most likely to read as broken |
| Mega-menu col 4 "Platform" (`index.html:1043-1067`) | 6 items | **5** | Now uneven against the other three columns |
| Stats bar (`index.html:1356-1372`) | 4 stats | **3** | Grid built for 4 |
| Comparison table (`index.html:1459`) | 5 cols × 6 rows | **4 cols × 4 rows** | Columns will widen to fill; substantially shorter block |
| Crew pricing card (`index.html:1610-1615`) | 5 bullets | **4** | Free has 7, Solo has 6, Crew now 4 — the most expensive card is now the shortest, which inverts the usual visual hierarchy |

### Orphaned CSS (not removed — CSS changes were out of scope)

`index.html:345-346` — `.rating-badge .stars` and `.rating-badge strong` are now unused. The one surviving badge uses neither selector. Both are dead rules, harmless, safe to delete in the rebuild.

---

# Verification performed

- Grepped every target phrase across all in-scope HTML post-edit. All eliminated except the one deliberate exception documented above (`help/faq.html:675`).
- Parsed the comparison table programmatically: header row 4 `<th>`, all 4 body rows exactly 4 `<td>`.
- Counted rendered elements: 3 `.stat-item`, 1 `.rating-badge`, 4 Crew bullets — all as intended.
- Open/close tag balance checked for `div`, `ul`, `li`, `table`, `tr`, `section` across all four modified files: **balanced**.
- `git status`: 4 modified files, nothing staged, nothing committed, nothing deployed.

---

# Amendment 1

**Date:** 2026-08-13
**Scope:** `best-apps.html`, `help/calculators.html`, one line in `index.html`. No edit from the first pass was revisited.
**Not committed, not deployed.** `git status`: 3 modified files, working tree only.

Line numbers are **post-edit**. `best-apps.html` numbering shifted by −4 after the star-badge removal in §A1, so references here will not match the first-pass changelog.

---

## A1. `best-apps.html` — all star ratings REMOVED

Four `<div class="rating-stars">` elements deleted in full, including the competitor ratings. Not replaced with anything.

| Pre-edit line | Removed |
|---|---|
| `:209` | `<div class="rating-stars">★★★★☆</div>` — Jobber |
| `:259` | `<div class="rating-stars">★★★☆☆</div>` — Housecall Pro |
| `:308` | `<div class="rating-stars">★★★☆☆</div>` — ServiceTitan |
| `:360` | `<div class="rating-stars">★★★★★</div>` — Electrician Pro X |

**Wrappers were not removed — they did not become empty.** Each star badge sat inside an `.app-rating` block that also contains a `.rating-score` and a `.rating-label`, both of which survive. See "Flagged, not changed" — this materially limits what the removal achieved.

**Verification:** zero `★` and zero `☆` characters remain in the file. Tag balance re-checked and intact.

---

## A2. `best-apps.html` — "the only" claims REWORDED

### `:345`

| | |
|---|---|
| Before | `Electrician Pro X is **the only app in this comparison** built specifically for electrical contractors.` |
| After | `Electrician Pro X is **built specifically** for electrical contractors.` |

### `:393`

| | |
|---|---|
| Before | `**The only app in this comparison** purpose-built for electrical contractors.` |
| After | `**Purpose-built** for electrical contractors.` |

**Grep result as requested:** zero further instances of `the only` in the file, and zero instances of `no other` at any point. No additional occurrences to report.

---

## A3. `best-apps.html` — free tier wording

### `:365`

| | |
|---|---|
| Before | `The free tier allows **up to 3** jobs, estimates, and invoices — enough to evaluate…` |
| After | `The free tier allows **3 jobs, 3 estimates and 3 invoices total** — enough to evaluate…` |

Now matches `index.html:1547`.

---

## A4. Calculator count — "20+" → "30+"

The grep found **eight** occurrences of `20+`, not two. Seven are the calculator count and were corrected; one is unrelated and was deliberately left.

### `best-apps.html`

| Line | Before → After |
|---|---|
| `:363` | `The defining differentiator is <strong>**20+** built-in NEC code calculators</strong>` → `**30+**` *(specified)* |
| `:372` | `<li>**20+** NEC code calculators — unique to EPX</li>` → `**30+**` |
| `:474` | `<td class="epx-col check">✓ **20+**</td>` → `✓ **30+**` — verified as the `NEC code calculators` table row before editing |
| `:522` | `Jobs, estimates, invoices, and all **20+** NEC calculators — free to start.` → `**30+**` |

### `help/calculators.html`

| Line | Before → After |
|---|---|
| `:7` | `<meta name="description" content="**20+** code-based calculators — free for all users">` → `**30+**` |
| `:583` | `<p>**20+** code-based calculators — free for all users</p>` → `**30+**` |
| `:709` | `open the Calculators tab to see all **20+**.` → `**30+**` *(specified)* |

### Deliberately NOT changed

**`best-apps.html:508`** — `<strong>Large operation (20+ technicians):</strong>` — this is a **headcount**, not a calculator count. Unrelated to the claim being corrected. Left as-is.

**Note on scope:** correction 4 named two instances and instructed a grep "in case there are others." Five others existed and were the same claim, so all seven were corrected — a partial fix would have left the page contradicting both itself and the homepage. `:7` is a `<meta name="description">`, so this change is search-result-facing as well as on-page.

**Verification:** the only remaining `20+` across both files is `best-apps.html:508`.

---

## A5. `index.html` — hero eyebrow

### `:1088` *(was `:1092` before the first pass shifted it)*

| | |
|---|---|
| Before | `Electrician Pro X: **The** Field Service App Built Exclusively for Electricians` |
| After | `Electrician Pro X: **Field Service Software** Built Exclusively for Electricians` |

---

# Flagged, not changed — Amendment 1

## 1. Numeric review scores survive the star removal — likely not intended

Removing the star badges left the numeric scores untouched, because they are separate sibling elements inside `.app-rating`:

| Line | Surviving markup |
|---|---|
| `:204` | `<div class="rating-score">7<span>/10</span></div>` + `<div class="rating-label">for electricians</div>` — Jobber |
| `:253` | `<div class="rating-score">6.5<span>/10</span></div>` + `for electricians` — Housecall Pro |
| `:301` | `<div class="rating-score">5<span>/10</span></div>` + `for small electrical shops` — ServiceTitan |
| `:354` | `<div class="rating-score">9<span>/10</span></div>` + `for electricians` — Electrician Pro X |

The instruction said not to *replace* the stars with numeric scores. These were not introduced as replacements — they pre-existed the edit and simply remain. The page now scores itself **9/10** and a named competitor **5/10**, which is the same self-assigned ranking device the stars were, stated more precisely. If the goal was to stop publishing self-assigned comparative ratings, this is not yet done. Not touched, because removing them was not authorized and it is a larger call than a copy edit.

## 2. `best-apps.html:360` — a second, uncorrected instance of the price error I fixed last pass

```
<div class="app-price-badge">💰 Free tier available · Pro at $12.99/mo or $99.99/yr</div>
```

This is the **same invented "Pro" plan** corrected at `:365` in the first pass — `$12.99/mo` is Crew's monthly rate, `$99.99/yr` is Solo's annual rate, and no plan combines them. I fixed only the instance the recon inventory surfaced, which means **the page now contradicts itself five lines apart**: the badge advertises "Pro at $12.99/mo or $99.99/yr" directly above prose reading "Solo is $9.99/month or $99.99/year, and Crew is $12.99/month or $129.99/year."

That contradiction is a defect introduced by the first pass. Not corrected here because this amendment states it is the complete spec and does not list it, and because `best-apps.html` boundaries have been drawn tightly and deliberately twice. **Recommend authorizing this one — it is the same error, already agreed to be wrong.**

Two related instances, same "Pro" naming problem, also untouched:

- `:377` — `<li>Free tier · Pro at $99.99/yr</li>`
- `:425` / `:513` — `$99.99/yr` and `$99.99/year` used without a plan name. The figure is correct for Solo annual; only the absent/incorrect plan label is at issue.

## 3. `best-apps.html:363` — "Every other app in this comparison has zero equivalent functionality"

Not matched by the `the only` / `no other` greps, but it is the same category of absolute comparative claim corrected in A2. Left alone — outside the specified terms.

## 4. Orphaned CSS

`best-apps.html:73` — `.rating-stars { color: var(--primary); font-size: 0.85rem; letter-spacing: 2px; }` now matches no element. Dead rule, harmless. Not removed, as CSS changes remain out of scope.

---

# Layout may need attention — Amendment 1

| Location | Change | Note |
|---|---|---|
| `.app-rating` blocks ×4 (`best-apps.html:204, 253, 301, 354`) | 3 children → **2** | `.app-rating` is `display:flex; flex-direction:column; gap:3px` (`:71`), so the block simply becomes shorter — no broken layout expected. At the `:131` mobile breakpoint it switches to `flex-direction:row`, also unaffected. The score now sits directly above the label with the star row gone. |

No other layout impact — all remaining Amendment 1 edits are text-only substitutions within existing elements.

---

# Verification performed — Amendment 1

- Zero `★` / `☆` characters remain in `best-apps.html`.
- Zero `the only` / `no other` remain in `best-apps.html`.
- Only remaining `20+` across both files is the "20+ technicians" headcount at `best-apps.html:508`.
- Table row at `:474` confirmed as the `NEC code calculators` row before editing.
- Open/close tag balance for `div`, `ul`, `li`, `table`, `tr`, `p`, `section` across `best-apps.html`, `help/calculators.html`, `index.html`: **balanced**.
- Out-of-scope items confirmed untouched: `best-apps.html` AI-estimate comparison row, `best-apps.html` ServiceTitan section, `help/faq.html:675`, `help/jobs.html:677`.
- `git status`: 3 modified files, nothing staged, nothing committed, nothing deployed.
