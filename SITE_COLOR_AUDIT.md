# Site Color Audit

Read-only inventory of how color is applied across the marketing site, ahead of a
dark-to-light redesign. No files were modified.

**Scope:** 24 HTML files, 15,979 lines, 14 PNG assets. No build step, no CSS files,
no JS framework, no package manifest beyond an empty `package-lock.json`.

---

## Executive summary

The site is **100% hand-written static HTML with one `<style>` block per file**. There
is no shared stylesheet, so every page carries its own private copy of the design
system. CSS custom properties are used heavily (229 declarations, 1,722 `var()` reads),
but they are **duplicated per file rather than shared**, and they have **forked into
three mutually incompatible naming vocabularies**.

The three things that will dominate the redesign effort:

1. **No single source of truth.** Changing `--bg` from dark to light requires editing
   22 separate `:root` blocks across 22 files. There is no file you can edit once.
2. **Token names collide across vocabularies.** `--text-muted` means `#7a8899` on 17
   pages and `#4a5263` on 2 pages — a 3.9x difference in luminance. A find-and-replace
   on token *names* will silently corrupt pages.
3. **~1,000 color references bypass the tokens entirely.** 253 `color:` rules hardcode
   the yellow, and 480 raw `rgba(247,198,0,…)` / `rgba(0,0,0,…)` literals are written
   inline with no token behind them.

---

## 1. How colors are defined

A mix, dominated by per-file CSS custom properties with heavy raw-literal leakage.

| Mechanism | Count | Where |
|---|---|---|
| `:root` custom property declarations (color-valued) | **229** | 22 of 24 files |
| `var(--token)` reads | **1,722** | 22 of 24 files |
| Raw hex literals in `<style>` blocks | **~430** | all 24 files |
| Raw `rgba()` / `rgb()` literals in `<style>` blocks | **~250** | all 24 files |
| Inline `style="…"` attributes on elements | **30** | 7 files |
| SVG presentation attributes (`stroke=`, `fill=`) | **646** | 17 files |
| Tailwind / Bootstrap / any CSS framework | **0** | — none present |
| External `<link rel="stylesheet">` | **0** | — none present |

### Per-file breakdown

| File | Lines | `:root` color vars | `var()` reads | Hex literals | `rgba()` literals |
|---|---:|---:|---:|---:|---:|
| `index.html` | 1732 | 13 (L20–34) | 159 | 83 | 33 |
| `licensing/utah-electrician-license.html` | 1163 | 13 (L22–28) | 119 | 21 | 43 |
| `instructions.html` | 792 | 11 (L15–31) | 83 | 24 | 14 |
| `best-apps.html` | 531 | 11 (L22–27) | 64 | 19 | 17 |
| `terms.html` | 342 | 9 (L18–28) | 24 | 8 | 1 |
| `privacy.html` | 312 | 7 (L18–26) | 27 | 7 | 0 |
| `help/calculators.html` | 748 | 11 (L15–31) | 84 | 24 | 14 |
| `help/faq.html` | 768 | 11 (L15–31) | 83 | 24 | 14 |
| `help/*.html` (13 more) | ~704–732 ea. | 11 ea. (L15–31) | 83 ea. | 24 ea. | 14 ea. |
| `download.html` | 126 | **0** | 0 | 4 | 5 |
| `get.html` | 76 | **0** | 0 | 4 | 2 |
| `get/index.html` | 76 | **0** | 0 | 4 | 2 |

`download.html`, `get.html`, and `get/index.html` are redirect interstitials with **no
tokens at all** — they hardcode `background: #272D34` and `color: #fff`. `get.html` and
`get/index.html` are byte-similar duplicates of each other.

### The three forked vocabularies

The same design intent is expressed under three different token sets. This is the single
biggest hazard in the redesign.

**Vocabulary A — "yellow/bg/text"** (17 files: `index.html`, `instructions.html`, all 15
`help/*.html`). Declared identically at lines 15–31 of each help page and 20–34 of index:

```
--yellow #F7C600   --yellow-glow rgba(247,198,0,0.18)   --yellow-dim rgba(247,198,0,0.07–0.08)
--bg #1f2227       --bg-mid #252b33   --bg-card #282d35   --bg-card-hover #2f3540
--text #dde1ea     --text-sub #a8b4c4  --text-muted #7a8899
--border #3c4350
```
`index.html` additionally declares `--border-bright: #3c4350` (**identical to `--border`
— a dead token**) and `--success: #22c55e`.

**Vocabulary B — "primary/bg-dark/text-primary"** (4 files: `best-apps.html`,
`licensing/utah-electrician-license.html`, `privacy.html`, `terms.html`):

```
--primary #F7C600  --primary-light #FFD93D   --primary-dark #D4AA00 (privacy/terms only)
--bg-dark #1f2227  --bg-card #282d35         --bg-card-hover #2f3540
--text-primary #dde1ea   --text-secondary #7a8394   --text-muted #4a5263
--border #3c4350   --success #10B981   --danger #EF4444
--info #3B82F6  --res #60A5FA        (licensing only)
--amber #F59E0B --amber-soft rgba(245,158,11,0.12)   (terms only)
```

**Vocabulary C — none** (3 files: `download.html`, `get.html`, `get/index.html`).

**Collisions to watch:**

| Token name | Vocabulary A value | Vocabulary B value | Same name, different color |
|---|---|---|---|
| `--text-muted` | `#7a8899` | `#4a5263` | **YES — 3.9x luminance apart** |
| `--success` | `#22c55e` (index) | `#10B981` | **YES** |
| `--bg` / `--bg-dark` | `#1f2227` | `#1f2227` | same value, different name |
| `--text-sub` / `--text-secondary` | `#a8b4c4` | `#7a8394` | same role, different name **and** value |
| `--yellow` / `--primary` | `#F7C600` | `#F7C600` | same value, different name |

---

## 2. Every distinct color value in use

`⚑` marks values appearing in **more than three places** — de-facto tokens whether or not
they are declared as such. All 12 hex values below the fold and 7 rgba values qualify.

### Hex values

| Value | Occurrences | Files | Role |
|---|---:|---:|---|
| ⚑ `#F7C600` | 47 | 21 | Brand yellow. Also written raw 47x *in addition to* the token. |
| ⚑ `#1f2227` | 21 | 21 | Page background |
| ⚑ `#282d35` | 21 | 21 | Card background |
| ⚑ `#dde1ea` | 21 | 21 | Primary text |
| ⚑ `#3c4350` | 22 | 21 | Border (and `.meta-dot` *text* color) |
| ⚑ `#FFD93D` | 22 | 19 | Yellow hover / `--primary-light` |
| ⚑ `#2f3540` | 19 | 19 | Card hover background |
| ⚑ `#a8b4c4` | 17 | 17 | Secondary text (`--text-sub`) |
| ⚑ `#7a8899` | 17 | 17 | Muted text (vocab A) |
| ⚑ `#252b33` | 17 | 17 | Mid background |
| ⚑ `#111` | 35 | 17 | **Text on yellow buttons** — survives light redesign |
| ⚑ `#000` | 204 | 19 | **96 of these are `mask-image` stops, not color** — see note |
| ⚑ `#777` | 12 | 1 (`index.html`) | SVG stroke |
| ⚑ `#fff` | 11 | 4 | Text on dark (`download`, `get`, `get/index`, `index`) |
| ⚑ `#555` | 8 | 1 (`index.html`) | SVG stroke |
| ⚑ `#F59E0B` | 7 | 3 | Amber accent |
| ⚑ `#333` | 6 | 1 (`index.html`) | SVG stroke |
| ⚑ `#7a8394` | 4 | 4 | **Body prose color** on vocab-B pages |
| `#1a1e23` | 3 | 2 | Hero gradient top |
| `#4a5263` | 2 | 2 | Muted text (vocab B) |
| `#D4AA00` | 2 | 2 | `--primary-dark` (declared, **never referenced**) |
| `#EF4444` | 2 | 2 | Danger |
| `#10B981` | 2 | 2 | Success (vocab B) |
| `#272D34` | 2 | 2 | Interstitial background |
| `#222` | 2 | 2 | Button hover |
| `#1c2028` | 2 | 1 | Section background |
| `#22c55e` | 1 | 1 | Success (index) |
| `#60A5FA` | 1 | 1 | `--res` |
| `#3B82F6` | 1 | 1 | `--info` |
| `#161a1f` | 1 | 1 | Section background |
| `#262010` | 1 | 1 | Yellow-tinted dark panel |
| `#0f1117` | 1 | 1 | `download.html` background |

> **`#000` caveat:** of the 204 occurrences, **96 are inside `-webkit-mask-image` /
> `mask-image` gradient stops** (edge-fade masks on scrolling rails), where `#000` means
> "opaque" and carries no visual color. Those are theme-independent and must **not** be
> swapped. Only **12** are real color declarations (`color: #000` on yellow buttons ×11,
> `background: #000` ×1). One more, `black`, appears in a `radial-gradient` mask at
> `index.html:251` — also a mask, also theme-independent.

> **`#8209` is not a color.** It matches a hex-like pattern but is the HTML entity
> `&#8209;` (non-breaking hyphen) at `index.html:1292`. Excluded from all counts.

### rgba() values

| Value | Files | Role |
|---|---:|---|
| ⚑ `rgba(247,198,0,0.25)` | 19 | Yellow tint |
| ⚑ `rgba(31,34,39,0.95)` | 18 | Sticky header background (`#1f2227` @ 95%) |
| ⚑ `rgba(247,198,0,0.2)` | 18 | Yellow border |
| ⚑ `rgba(247,198,0,0.15)` | 18 | Yellow tint |
| ⚑ `rgba(247,198,0,0.08)` | 18 | Yellow wash |
| ⚑ `rgba(247,198,0,0.4)` | 17 | Yellow glow |
| ⚑ `rgba(247,198,0,0.18)` | 17 | `--yellow-glow` value, also written raw |
| `rgba(255,255,255,0.55)` | 3 | Interstitial paragraph text |
| `rgba(255,255,255,0.15)` | 3 | Spinner track |
| `rgba(247,198,0,0.3)` | 3 | Button shadow |
| `rgba(255,255,255,0.05 / .02 / .06 / .2 / .3 / .4 / .5)` | 1–2 ea. | Hairlines, borders on dark |
| `rgba(0,0,0,0.2–0.6)` (9 distinct alphas) | 1–2 ea. | Drop shadows |
| `rgba(96,165,250, …)` (6 alphas) | 1 | Licensing blue tints |
| `rgba(16,185,129, …)` (4 alphas) | 1 | Licensing green tints |
| `rgba(245,158,11,0.07 / 0.12)` | 1–2 | Amber tints |
| `rgba(60,67,80,0.5)`, `rgba(68,68,68,0.4)`, `rgba(59,130,246,0.07)`, `rgba(99,183,255,0.4)`, `rgba(31,34,39,0.92)` | 1 ea. | One-offs |

**52 distinct rgba values in total**, of which **28 are yellow at a different alpha**.
These are an unmanaged opacity scale that should collapse into ~5 tokens.

### Named CSS colors
Only `transparent` (5x) and `black` (1x, inside a mask). No `white`, `red`, `gray`, etc.

---

## 3. Existing theming infrastructure

**Effectively none.** The CSS-variable layer exists but is not wired for theming.

| Mechanism | Present? | Evidence |
|---|---|---|
| CSS custom properties | ✅ Yes, 229 declarations | But duplicated per-file, 3 forked vocabularies |
| `@media (prefers-color-scheme: …)` | ❌ **Zero occurrences** | grep across all 24 files |
| `<meta name="theme-color">` | ❌ **Zero occurrences** | Only `description`, `keywords`, `viewport`, `robots`, `application-name` |
| `color-scheme` CSS property | ❌ Zero occurrences | — |
| Theme class / `data-theme` on `<html>` | ❌ No | All 24 files: literally `<html lang="en">` |
| Theme class on `<body>` | ❌ No | All 24 files: literally `<body>` |
| Theme toggle UI or JS | ❌ No | — |
| Shared stylesheet to hook a theme into | ❌ No | 0 `<link rel="stylesheet">` |

**Implication:** the variable layer is a naming convention, not a theming system. Getting
to a switchable light theme means first consolidating 22 `:root` blocks into one shared
stylesheet — otherwise a theme class on `<html>` has nothing site-wide to override.

---

## 4. Assets baked for a dark background

### Logo

**Good news: there is no logo image file.** The header wordmark is live HTML text
(`<span class="logo-name">Electrician Pro X</span>` / `<span class="logo-by">By Pro X
Trades</span>`, e.g. `help/jobs.html:572–574`, `index.html:924`), colored by
`var(--yellow)` / `var(--primary)`. It will retheme with the tokens.

**But the app icon is a baked dark tile with white glyph:**

| File | Size | Issue |
|---|---|---|
| `images/favicon-32.png` | 1024×1024 | Dark slate `#272e32` background tile; **upper half of the "X" mark is white `#f1f1f1`**, lower half yellow. Self-contained, so it renders — but it is a dark square that will read as a heavy black chip against a light page/tab strip. If the redesign wants a transparent or light-backed mark, **the white half becomes invisible.** |
| `images/icon.png` | 1024×1024 | **Byte-identical duplicate** of `favicon-32.png` (same 108,005 bytes, same pixels). **Unreferenced by any HTML.** |

Also note `favicon-32.png` is declared as `sizes="32x32"` in all 21 references but is
actually a **1024×1024** image — a pre-existing bug worth fixing in the same pass.

### App screenshots showing the app in dark mode

All 12 screenshots are dark-mode captures. Measured mean luminance (0–255) and center pixel:

| File | Mean | Referenced | Verdict |
|---|---:|---|---|
| `images/time-card.png` | 23 | ✅ `index.html` | **DARK** — transparent-bg phone mockup, dark bezel + dark app UI |
| `images/estimate-invoice.png` | 25 | ✅ `index.html` | **DARK** — same |
| `images/team-collaboration.png` | 26 | ✅ `index.html` | **DARK** — same |
| `images/jobs.png` | 30 | ✅ `index.html` | **DARK** — verified visually: dark job list, dark nav bar |
| `images/material-database.png` | 30 | ✅ `index.html` | **DARK** — same |
| `images/analytics.png` | 31 | ✅ `index.html` | **DARK** — verified visually: dark reports screen, dark charts |
| `images/job-management.png` | 31 | ❌ **unreferenced** | **DARK** |
| `images/calculators.png` | 34 | ✅ `index.html` | **DARK** |
| `images/3534.png` | 202 | ✅ `index.html` | **MIXED** — white document body, but **dark `#15171b` status bar and dark action-bar footer**. Verified visually. The dark bands will read as slabs on white. |
| `images/3535.png` | 202 | ✅ `index.html` | **MIXED** — same structure |
| `images/Estimate.png` | 251 | ✅ `index.html` | **LIGHT** — white 2550×3300 document. Safe. |
| `images/Invoice.png` | 251 | ✅ `index.html` | **LIGHT** — white 2550×3300 document. Safe. |

**Critical detail:** the 8 phone-mockup PNGs (`analytics`, `calculators`,
`estimate-invoice`, `job-management`, `jobs`, `material-database`, `team-collaboration`,
`time-card`) have an **alpha channel with a fully transparent surround**
(`srgba(0,0,0,0)` at the corners). Today the transparency lets the dark page show
through. On a light page, the dark phone bezel will sit directly on white with **no
containing frame** — visually much harsher than it is today. These need either re-capture
in light mode, or a deliberate light-appropriate device frame.

### SVGs with hardcoded light fills

All SVGs are **inline in HTML** — there are no `.svg` files in the repo. 646 presentation
attributes across 17 files:

| Attribute value | Count | Themeable? |
|---|---:|---|
| `stroke="currentColor"` | 274 | ✅ Yes — inherits `color`, retheme automatically |
| `fill="none"` | 314 | ✅ N/A |
| `fill="currentColor"` | 2 | ✅ Yes |
| `stroke="var(--yellow)"` | 4 | ✅ Yes — token-driven |
| **`stroke="#F7C600"`** | **26** | ⚠️ Hardcoded — bypasses the token |
| **`stroke="#777"`** | **12** | ❌ `index.html` only — mid-gray tuned for dark |
| **`stroke="#555"`** | **8** | ❌ `index.html` only |
| **`stroke="#333"`** | **6** | ❌ `index.html` only |

The 274 `currentColor` strokes are the site's saving grace — the icon layer is largely
theme-ready. The **52 hardcoded strokes** (`#F7C600`, `#777`, `#555`, `#333`) are the
exceptions; the gray trio in `index.html` was picked to sit on `#1f2227` and will need
re-picking.

### favicon, og:image, twitter:image, theme-color

| Item | Status |
|---|---|
| `favicon` | ✅ Present — `images/favicon-32.png`, referenced from **21 files**. Dark tile, see above. |
| `apple-touch-icon` | ⚠️ **Referenced but the file does not exist.** `index.html:12` points to `apple-touch-icon.png` at repo root — **404**. Only `index.html` declares it. |
| `og:image` | ❌ **Absent site-wide.** `best-apps.html` and `licensing/utah-electrician-license.html` declare `og:title`/`og:description`/`og:url`/`og:type` but **no `og:image`**. All other 22 files have no OG tags. |
| `twitter:image` | ❌ **Absent site-wide.** No `twitter:*` tags anywhere. |
| `<meta name="theme-color">` | ❌ **Absent site-wide.** Mobile browser chrome currently falls back to default, not to the dark palette. |

The absence of `og:image` / `twitter:image` / `theme-color` is a **net positive for the
redesign** — there is no baked-for-dark social card to regenerate. But it is also a gap
worth filling *while* the new palette is being chosen, rather than after.

### Third-party badge images (external, not in repo)

`index.html` embeds two store badges hotlinked from external hosts:
- `https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg`
- `https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`

Both are the **dark/black badge variants** designed for light *or* dark backgrounds — the
App Store badge in particular is black-on-white and will be fine on light. Worth
re-checking visually after the switch, and worth vendoring locally regardless
(hotlinking Wikimedia for a production badge is fragile).

---

## 5. Text contrast currently carried by the dark background alone

Every value below **passes** on today's `#1f2227` and **fails** on white. Contrast ratios
are WCAG 2.x, normal-size text (AA = 4.5:1, AAA = 7:1).

| Color | Token(s) | vs `#1f2227` | vs `#fff` | On white |
|---|---|---:|---:|---|
| `#dde1ea` | `--text` / `--text-primary` | 12.18:1 ✅ | **1.31:1** | ❌ **FAIL — effectively invisible** |
| `#a8b4c4` | `--text-sub` | 7.59:1 ✅ | **2.10:1** | ❌ **FAIL** |
| `#F7C600` | `--yellow` / `--primary` | 9.90:1 ✅ | **1.61:1** | ❌ **FAIL** |
| `#FFD93D` | `--primary-light` | 11.58:1 ✅ | **1.38:1** | ❌ **FAIL** |
| `#fff` | raw | 15.95:1 ✅ | **1.00:1** | ❌ **FAIL — zero contrast** |
| `#22c55e` | `--success` (index) | 7.00:1 ✅ | **2.28:1** | ❌ **FAIL** |
| `#10B981` | `--success` (vocab B) | 6.29:1 ✅ | **2.54:1** | ❌ **FAIL** |
| `#60A5FA` | `--res` | 6.27:1 ✅ | **2.54:1** | ❌ **FAIL** |
| `#F59E0B` | `--amber` | 7.43:1 ✅ | **2.15:1** | ❌ **FAIL** |
| `#7a8899` | `--text-muted` (vocab A) | 4.41:1 ⚠️ | **3.61:1** | ⚠️ Large text only |
| `#7a8394` | `--text-secondary` (vocab B) | 4.18:1 ⚠️ | **3.82:1** | ⚠️ Large text only |
| `#EF4444` | `--danger` | 4.24:1 ⚠️ | **3.76:1** | ⚠️ Large text only |
| `#3B82F6` | `--info` | 4.34:1 ⚠️ | **3.68:1** | ⚠️ Large text only |
| `#777` | SVG stroke | 3.56:1 | 4.48:1 | ⚠️ Borderline both ways |

### The worst offenders, ranked by blast radius

1. **`#dde1ea` — 1.31:1 on white.** This is the `body` text color on **all 21 tokenized
   pages**. Every paragraph, heading, and label on the site inherits it. It is the single
   highest-impact value in the audit.

2. **`#F7C600` as text — 1.61:1 on white.** There are **253 `color:` rules** setting the
   brand yellow as a text color (nav links, headings, stat numbers, `.article-hero h1
   span`, `.logo h1`, `.track-label.unlim`, TOC hovers). On white this is unreadable.
   Yellow-on-white is a hard constraint of the hue, not a tuning problem — the redesign
   needs a **separate darker "yellow-text" token** (roughly `#8A6D00` or darker reaches
   4.5:1) while keeping `#F7C600` for fills and accents. **This is the largest single
   piece of work in the migration.**

3. **`#a8b4c4` — 2.10:1 on white.** `--text-sub`, used for secondary prose across 17
   files.

4. **`#7a8899` / `#7a8394` — 3.61:1 / 3.82:1 on white.** These are the *borderline* case
   and the sneakiest. They marginally pass on dark (4.41 / 4.18) and marginally fail on
   white. Note `#7a8394` is the **body prose color** (`.prose p`) on `best-apps.html`
   and `licensing/utah-electrician-license.html` — long-form article text that is
   currently just-barely-passing and would land just-barely-failing. Easy to miss in
   review because it *looks* fine.

5. **Interstitials — `rgba(255,255,255,0.55)` on `#272D34`.** In `download.html`,
   `get.html`, `get/index.html`. Composites to `#9ea0a4` (5.31:1 on its own dark bg).
   On white that same token is **2.62:1** — fails. These three files have no tokens, so
   they will be missed by any token-level migration. **Flagging explicitly.**

### Values that survive the switch

These are already dark-on-light and need no change — mostly because they were chosen as
text-on-yellow-button colors:

- `#000` / `#111` as `color:` (12 + 35 uses) — text on `--primary` buttons. Already
  correct for light. Keep.
- `#4a5263` (`--text-muted`, vocab B) — 7.84:1 on white. **Passes AAA.** Ironically the
  only text token already light-ready, and it fails on the current dark bg (2.03:1)
  where it's actually used.
- `#3c4350` (`--border`) — 9.95:1 on white as text. Note it is also used as a **text
  color** for `.meta-dot`, not just borders.
- `#555` (7.46:1) and `#333` (12.63:1) SVG strokes.

### Also affected by the background flip (not text, but contrast-carried)

- **9 distinct `rgba(0,0,0,0.2–0.6)` drop shadows.** Black shadows read as depth on dark
  but as dirt on white. Need re-tuning to lower alpha / colored shadows.
- **7 distinct `rgba(255,255,255,0.02–0.5)` hairlines and borders.** These are
  *lighter-than-background* separators. On white they become **invisible** — every one
  needs inverting to a dark-on-light hairline.
- **`rgba(31,34,39,0.95)` sticky header** across 18 files — an opaque dark bar that will
  need to become a light translucent bar.
- **28 distinct yellow alpha tints** (`rgba(247,198,0,0.025–0.4)`). Yellow washes that
  read as subtle glow on dark will read as muddy beige on white.

---

## Recommended sequencing (not executed — audit only)

1. **Consolidate before recoloring.** Extract one shared `styles.css`, reconcile the
   three vocabularies into one token set, and resolve the `--text-muted` / `--success` /
   `--text-sub`-vs-`--text-secondary` collisions. Recoloring 22 forked `:root` blocks in
   place will not converge.
2. **Split the yellow.** `--brand-yellow` (fills/accents, stays `#F7C600`) vs
   `--brand-yellow-text` (darkened to reach 4.5:1 on white). Then migrate the 253
   `color:` rules.
3. **Promote the raw literals to tokens** — the 480 `rgba(247,198,0,…)` / `rgba(0,0,0,…)`
   / `rgba(255,255,255,…)` values collapse to roughly 15 tokens.
4. **Do not touch the 96 `mask-image` `#000` stops** or the `black` mask at
   `index.html:251` — they are opacity masks, not colors.
5. **Re-capture the 8 transparent-background phone mockups** in the app's light mode, or
   commission light-appropriate device frames. Re-shoot `3534.png` / `3535.png` (dark
   status/action bars). `Estimate.png` and `Invoice.png` need no work.
6. **Handle the three untokenized interstitials** (`download.html`, `get.html`,
   `get/index.html`) by hand — no token migration will reach them.
7. **Fix while you're in there:** missing `apple-touch-icon.png` (404 from
   `index.html:12`), `favicon-32.png` declared `32x32` but actually `1024×1024`,
   duplicate unreferenced `images/icon.png`, unreferenced `images/job-management.png`,
   dead `--border-bright` and `--primary-dark` tokens, and the byte-duplicate
   `get.html` / `get/index.html` pair.
8. **Add what's missing:** `<meta name="theme-color">`, `og:image`, `twitter:image` — all
   absent today, so they can be authored directly against the new light palette.
