# Yellow-as-Text Audit

Categorization of every rule that sets yellow as a **text** color, so the
replacement can be decided per category rather than per rule. Read-only; no files
were modified.

**Scope:** `color:` resolving to `--yellow`, `--primary`, `--primary-light`,
`#F7C600`, or `#FFD93D`. Produced by parsing all 1,988 CSS rules out of the 24
`<style>` blocks, not by grep — see *Method* at the end.

---

## Headline numbers

| | |
|---|---:|
| Yellow-as-text declarations | **232** |
| — in `<style>` blocks | 224 |
| — inline `style=` attributes | 8 |
| Distinct selectors | **61** |
| **Distinct categories** | **9** |
| Rules needing 4.5:1 (normal text) | **210** (90%) |
| Rules needing 3:1 (large text) | **22** (10%) |
| Yellow as background/border/fill/stroke (**excluded**) | **194** |

**Only 22 of 232 qualify as large text.** The "it's a big heading, 3:1 is fine"
escape hatch applies to under 10% of the work — and even those fail: `#F7C600` is
**1.61:1 on white** and **1.44:1 on the `#F1F2F4` canvas**, nowhere near either
threshold. Every one of the 232 needs a decision.

### Correction to the earlier figure

Previous reports cited **253** yellow `color:` rules. That number was wrong in
both directions and should be retired:

- It over-counted by matching `color:` as a **substring** of `background-color:`,
  `border-color:`, and `stop-color:` (+5 false positives).
- It under-counted by omitting `--primary-light` / `#FFD93D`, and by missing all
  **8 inline `style=` attributes** in body markup.

Parsed figure: **232**.

---

## The nine categories

Ordered by how much of a judgment call the replacement is — the top of the list
is mechanical, the bottom needs design input.

| # | Category | Rules | Selectors | Large text | Replacement difficulty |
|---|---|---:|---:|---:|---|
| 1 | Nav link | 50 | 5 | 0 | Mechanical → `--link` |
| 2 | Badge on yellow tint | 39 | 8 | 0 | **Hardest — see below** |
| 3 | Heading | 39 | 7 | 22 | Mechanical → `--text` |
| 4 | Hover state | 30 | 11 | 0 | Mechanical → `--link-hover` |
| 5 | Label / eyebrow | 26 | 11 | 0 | Needs a call |
| 6 | Logo wordmark | 22 | 5 | 20 | **Brand decision** |
| 7 | Inline link | 14 | 4 + 8 inline | 0 | Mechanical → `--link` |
| 8 | Stat number | 6 | 6 | 1 | Needs a call |
| 9 | Other | 6 | 6 | 0 | Case by case |
| | **Total** | **232** | **61** | **22** | |

---

### 1. Nav link — 50 rules, 5 selectors

Navigation and card-CTA links in their resting state. All normal-size.

| Count | Selector | Size | Weight | Threshold | Files |
|---:|---|---|---:|---|---|
| 16 | `.nav-tab.active` | 13px | 500 | 4.5:1 | 16 files |
| 16 | `.topic-card .topic-go` | 0.78rem (12.5px) | 600 | 4.5:1 | 16 files |
| 16 | `.pager-title` | 0.95rem (15.2px) | 600 | 4.5:1 | 16 files |
| 1 | `.nav-item.menu-open > a` | 0.9rem (14.4px) — from `.nav > a` | 500 | 4.5:1 | index |
| 1 | `.spotlight-link` | 0.9rem (14.4px) | 600 | 4.5:1 | index |

Straight swap to `--link` (`#1B3A5C`, **11.63:1** on white). Note `.nav-tab.active`
also sets `border-bottom-color: var(--yellow)` — that border is a **fill**, keep it
yellow; it carries the "active" signal without relying on the text color.

### 2. Badge on yellow tint — 39 rules, 8 selectors ⚠️ **worst category**

Yellow text sitting on a **yellow-tinted background**. Today the tint composites
against `#1f2227` and the text still reads at 7–8:1. On the new white card the
tint composites to near-white and contrast **collapses to ~1.5:1**.

| Count | Selector | Size | Weight | Tint | Files |
|---:|---|---|---:|---|---|
| 16 | `.header-badge` | 12px | 500 | `--yellow-dim` (0.08) | 16 files |
| 16 | `.step-tip` | 13px | 400 | `--yellow-dim` (0.08) | 16 files |
| 2 | `.article-label` | 11px | 700 | `rgba(247,198,0,0.1)` | best-apps, licensing |
| 1 | `.hero-eyebrow` | 0.8rem | 600 | `rgba(247,198,0,0.08)` | index |
| 1 | `.toggle-save` | 11px | 700 | `rgba(247,198,0,0.15)` | index |
| 1 | `.track-step.unlim` | 0.8rem | 600 | `rgba(247,198,0,0.1)` | licensing |
| 1 | `.tag-unlim` | 0.68rem (10.9px) — from `.tag` | 700 | `rgba(247,198,0,0.12)` | licensing |
| 1 | `.step-badge` | 0.78rem | 600 | `rgba(247,198,0,0.1)` | licensing |

Measured, `#F7C600` text on its own tint over white:

| Tint alpha | Composited bg | Contrast | Today on `#1f2227` |
|---|---|---:|---:|
| 0.08 | `#FEFAEB` | **1.54:1** | 8.37:1 |
| 0.10 | `#FEF9E6` | **1.53:1** | 8.37:1 |
| 0.12 | `#FEF8E0` | **1.51:1** | 7.56:1 |
| 0.15 | `#FEF6D9` | **1.49:1** | 7.01:1 |

Changing only the text color is not enough here — the tint has to change too, or
these become the chip bg/text pairs already in `tokens.css`
(`--chip-pending-bg` + `--chip-pending-text` is the closest match at
`#FEF3C7` / `#92400E`). **32 of the 39 are two selectors** (`.header-badge`,
`.step-tip`) repeated across 16 files, so the fix is cheap once decided.

### 3. Heading — 39 rules, 7 selectors

Accent spans inside headings (`<span>` / `<em>` around one highlighted word).
**This is where all 22 large-text rules live.**

| Count | Selector | Size | Weight | Threshold | Files |
|---:|---|---|---:|---|---|
| 16 | `.hero h1 span` | `clamp(32px, 5vw, 52px)` | 900 | **3:1** | 16 files |
| 16 | `.callout-body h3` | 14px | 600 | 4.5:1 | 16 files |
| 2 | `.article-hero h1 span` | 2.8rem (44.8px) | 800 | **3:1** | best-apps, licensing |
| 2 | `.article-cta h2 span` | 2rem (32px) | 800 | **3:1** | best-apps, licensing |
| 1 | `.hero-content h1 em` | 4.4rem (70.4px) | 900 | **3:1** | index |
| 1 | `.founder h2 span` | 2.8rem (44.8px) | 800 | **3:1** | index |
| 1 | `.why-text h3` | 1.1rem (17.6px) | 700 | 4.5:1 | index |

`.hero h1 span` uses `clamp()`; the **32px floor** is what makes it large text at
every viewport, so 3:1 holds throughout. `.callout-body h3` at 14px/600 is a
heading by tag only — it needs the full 4.5:1.

### 4. Hover state — 30 rules, 11 selectors

Rules that apply **only** on `:hover`. Broken out separately because they can all
take one token (`--link-hover`) regardless of what the resting state becomes.

| Count | Selector | Size | Weight | Files |
|---:|---|---|---:|---|
| 16 | `.all-topics-link:hover` | 0.82rem (13.1px) | 600 | 16 files |
| 2 | `.nav a:hover` | 0.95rem | 500 | best-apps, licensing |
| 2 | `.toc li a:hover` | 0.95rem | 400 | best-apps, licensing |
| 2 | `.btn-secondary:hover` | 1rem — from `.btn` | 700 | best-apps, licensing |
| 2 | `.footer-links a:hover` | 0.85rem | 400 | best-apps, licensing |
| 1 | `.nav > a:hover, .nav-item > a:hover` | 0.9rem — from `.nav > a` | 500 | index |
| 1 | `.nav-login:hover` | 0.875rem | 500 | index |
| 1 | `.mega-item:hover .mega-item-name` | 0.82rem | 600 | index |
| 1 | `.btn-outline:hover` | 1rem — from `.btn` | 700 | index |
| 1 | `.footer-col a:hover` | 0.88rem | 400 | index |
| 1 | `.prose a:hover` | 1.02rem — from `.prose p` | 400 | licensing |

All 30 are normal-size → 4.5:1. `.prose a:hover` is the **only** consumer of
`--primary-light` (`#FFD93D`, **1.38:1** on white — the worst single value on the
site). `.btn-secondary:hover` / `.btn-outline:hover` also set
`border-color` to yellow — keep the border, change only the text.

### 5. Label / eyebrow — 26 rules, 11 selectors

Small uppercase section labels with **no** background. All tiny and all bold-ish,
all needing 4.5:1.

| Count | Selector | Size | Weight | Files |
|---:|---|---|---:|---|
| 16 | `.hero-tag` | 11px | 600 | 16 files |
| 1 | `.verdict-label` | 0.72rem (11.5px) | 700 | best-apps |
| 1 | `.mega-col-title` | 0.7rem (11.2px) | 700 | index |
| 1 | `.founder-label` | 0.8rem (12.8px) | 700 | index |
| 1 | `.section-label` | 0.8rem (12.8px) | 700 | index |
| 1 | `.pricing-card.featured .pricing-plan` | 11px | 700 | index |
| 1 | `.pricing-note span` | 12.5px | 600 | index |
| 1 | `.spotlight-label` | 0.75rem (12px) | 700 | index |
| 1 | `.track-label.unlim` | 0.68rem (10.9px) | 700 | licensing |
| 1 | `.step-eyebrow` | 0.68rem (10.9px) | 700 | licensing |
| 1 | `.part-code .exam-part-label` | 0.72rem (11.5px) | 700 | licensing |

**Smallest text on the site** — 10.9px to 12.8px. These carry no meaning beyond
"this is a section marker," so `--text-muted` (`#737373`, 4.7:1) is the cheap
answer; `--text-sub` (8.1:1) is safer given the size. Whichever you pick, the
site loses its yellow eyebrow motif — that's the design call in this category.

### 6. Logo wordmark — 22 rules, 5 selectors ⚠️ **brand decision**

| Count | Selector | Size | Weight | Threshold | Files |
|---:|---|---|---:|---|---|
| 16 | `.logo-name` | 1.35rem (21.6px) | 900 | **3:1** | 16 files |
| 2 | `.logo h1` | 1.5rem (24px) | 800 | **3:1** | best-apps, licensing |
| 2 | `.header .app-name` | 16px | 600 | 4.5:1 | privacy, terms |
| 1 | `.logo-name` | 1.45rem (23.2px) | 900 | **3:1** | index |
| 1 | `.footer-brand-name` | 1.8rem (28.8px) | 900 | **3:1** | index |

20 of 22 are large text (≥18.66px at weight ≥700). Still fails: 1.61:1 vs the 3:1
minimum. **This is the brand identity, not a utility color** — the wordmark going
navy or near-black is the single most visible change in the whole redesign, and it
should be decided by someone who owns the brand rather than defaulted. Note
`.header .app-name` (privacy/terms) is 16px/600 and needs the stricter 4.5:1.

### 7. Inline link — 14 declarations, 4 selectors + 8 inline attributes

Links in running prose, mostly in the legal pages.

| Count | Selector | Size | Weight | Files |
|---:|---|---|---|---|
| 8 | **inline `style="color: var(--primary)"`** | 16px (inherited) | 400 | privacy (7), terms (1) |
| 2 | `.back-link` | 16px | 500 | privacy, terms |
| 2 | `.contact a` | 16px (inherited) | 400 | privacy, terms |
| 1 | `.contact-email a` | 1rem | 500 | index |
| 1 | `.prose a` | 1.02rem (16.3px) — from `.prose p` | 400 | licensing |

The **8 inline attributes are the trap in this pass**: they sit in body markup, not
in any `<style>` block, so a stylesheet-only edit will not touch them and they will
survive as yellow-on-white at 1.61:1. Exact locations:

- `privacy.html` — lines 197, 198, 207, 251, 252, 255, 282
- `terms.html` — line 231

All are `<a>` tags linking to Stripe / Google / Intuit policies inside legal prose.
`.prose a` is also the only yellow text that is **underlined**, so it retains a
non-color affordance; the rest rely on color alone.

### 8. Stat number — 6 rules, 6 selectors

Numeric emphasis. One per selector, spread across index and licensing.

| Count | Selector | Size | Weight | Threshold | File |
|---:|---|---|---:|---|---|
| 1 | `.step-num` | 1.4rem (22.4px) | 900 | **3:1** | index |
| 1 | `.step-num` | 1rem (16px) | 800 | 4.5:1 | licensing |
| 1 | `.stat-card-text strong` | 1rem (16px) | 700 | 4.5:1 | index |
| 1 | `.part-code .exam-part-num` | 0.9rem (14.4px) | 800 | 4.5:1 | licensing |
| 1 | `.fee-table td.fee-val` | 0.9rem (14.4px) — from `.fee-table td` | 700 | 4.5:1 | licensing |
| 1 | `.timeline-seg-val` | 1rem (16px) | 800 | 4.5:1 | licensing |

> **`.step-num` means two opposite things.** In the 16 instructions/help files it is
> `background: var(--yellow); color: #111` — a yellow **fill** with dark text, which
> **survives the light redesign untouched** and is correctly excluded below. In
> `index.html` and `licensing/` the same class name is yellow **text** on a yellow
> tint. Do not treat `.step-num` as one thing.

### 9. Other — 6 rules, 6 selectors

| Count | Selector | Size | Weight | Kind | File |
|---:|---|---|---:|---|---|
| 1 | `.btn-dark` | 0.95rem | 700 | Button text on `#000` | index |
| 1 | `.compare-table th.th-epx` | 0.8rem | 700 | Table header emphasis | index |
| 1 | `.compare-table td.yes` | 0.88rem | 700 | Table cell emphasis | index |
| 1 | `.comparison-table th.epx-col` | 0.78rem — from `.comparison-table th` | 700 | Table header emphasis | best-apps |
| 1 | `.rating-badge .stars` | 0.85rem | 400 | Star glyphs | index |
| 1 | `.rating-stars` | 0.85rem | 400 | Star glyphs | best-apps |

> **`.btn-dark` is the one rule that can stay exactly as it is.** It is yellow text
> on an explicit `background: #000`, which measures **13.03:1** and is unaffected by
> the page background. Leave it alone.

The 3 table-emphasis rules use yellow to mark "this is our product's column" — they
carry meaning by color alone and will need a non-color affordance (weight, icon,
cell background) regardless of which color replaces the yellow. The 2 star-glyph
rules are ★ characters at weight 400; `--amber` (`#C9A200`) is **2.43:1** and is
documented fill-only, so it does **not** rescue these.

---

## Excluded — yellow as background, border, fill, or stroke

**194 declarations. These stay yellow and are out of scope for the next pass.**

### In CSS (164 declarations, 35 selector+property pairs)

| Property | Count |
|---|---:|
| `background` | 71 |
| `stroke` | 67 |
| `border-bottom-color` | 16 |
| `border-color` | 5 |
| `border-left` | 2 |
| `border` | 2 |
| `border-left-color` | 1 |

| Count | Property | Selector |
|---:|---|---|
| 17 | `stroke` | `.feature-icon svg` |
| 16 | `stroke` | `.section-icon svg` |
| 16 | `stroke` | `.callout svg` |
| 16 | `stroke` | `.faq-item.open .faq-chevron` |
| 16 | `background` | `.step-num` *(instructions + help only — yellow fill, `#111` text)* |
| 16 | `background` | `.support-link` |
| 16 | `background` | `.support-link:hover` |
| 16 | `border-bottom-color` | `.nav-tab.active` |
| 3 | `background` | `.btn-primary` |
| 3 | `background` | `.btn-primary:hover` |
| 2 | `background` | `.nav .btn-nav` |
| 2 | `background` | `.nav .btn-nav:hover` |
| 2 | `border-left` | `.toc` |
| 2 | `border-color` | `.btn-secondary:hover` |
| 1 each | `background` | `.epx-badge`, `.nav-cta`, `.nav-cta:hover`, `.feature-card::after`, `.stats-bar`, `.pricing-badge`, `.pricing-btn.pro`, `.pricing-btn.pro:hover`, `.toggle-switch.on`, `.hero-signup-btn`, `.hero-signup-btn:hover`, `.mid-cta`, `.step-card::before` |
| 1 each | `border` / `border-color` | `.app-card.epx-card`, `.pricing-card.featured`, `.btn-outline:hover`, `.contact-email:hover`, `.hero-signup-input:focus` |
| 1 each | `stroke` | `.mega-item-icon svg`, `.trust-item svg` |
| 1 | `border-left-color` | `.exam-part.part-code` |

### In markup (30 SVG presentation attributes)

| Count | Attribute |
|---:|---|
| 26 | `stroke="#F7C600"` |
| 4 | `stroke="var(--yellow)"` |

**Four selectors appear in both lists** and need a split decision, not a blanket
one — change the text color, keep the yellow fill:

- `.nav-tab.active` — yellow text **and** yellow `border-bottom-color`
- `.btn-secondary:hover` — yellow text **and** yellow `border-color`
- `.btn-outline:hover` — yellow text **and** yellow `border-color`
- `.step-num` — yellow **text** in index/licensing, yellow **background** in the other 16 files

---

## Reference: contrast of candidate replacements

| Color | On `#FFFFFF` card | On `#F1F2F4` canvas | Verdict |
|---|---:|---:|---|
| `#F7C600` (current) | 1.61:1 | 1.44:1 | Fails everything |
| `#FFD93D` (`--primary-light`) | 1.38:1 | 1.24:1 | Worst on the site |
| `--amber` `#C9A200` | 2.43:1 | 2.17:1 | Fill-only, not a text option |
| `--text-muted` `#737373` | 4.74:1 | 4.23:1 | **Passes on card, fails on canvas** |
| `--text-sub` `#525252` | 8.10:1 | 7.23:1 | Safe |
| `--link` / `--navy` `#1B3A5C` | 11.63:1 | 10.38:1 | Safe |
| `--text` `#1a1a1a` | 17.40:1 | 15.54:1 | Safe |

**If you want to keep a yellow hue for text**, it has to go much darker than
instinct suggests — and the `#F1F2F4` canvas, not white, is the binding constraint:

| Darkened yellow | On `#FFFFFF` | On `#F1F2F4` |
|---|---:|---:|
| `#8A6D00` | 4.92:1 ✅ | **4.39:1 ❌** |
| `#7A6000` | 6.00:1 ✅ | 5.36:1 ✅ |
| `#6B5400` | 7.26:1 ✅ | 6.48:1 ✅ |

`#8A6D00` passes on cards and **fails on the page canvas** — an easy trap, since
most spot-checking happens against white. The first safe yellow-hue text value is
around `#7A6000`. Same trap applies to `--text-muted` at 4.23:1 on canvas.

---

## Method

Not grep. All 24 `<style>` blocks were tokenized into 1,988 discrete rules with
brace-depth tracking, then filtered for `color` declarations resolving to yellow
via token or literal. Font size and weight come from the same rule block where
present; otherwise from the nearest ancestor or base selector that sets them, with
the source shown in the tables (e.g. "from `.btn`"). Selectors resolving through
inheritance rather than an explicit rule were verified by hand against the markup:
`.btn-secondary` / `.btn-outline` (`class="btn btn-secondary"` → `.btn` 1rem/700),
`.tag-unlim` (`class="tag tag-unlim"` → `.tag` 0.68rem/700), `.prose a`
(inherits `.prose p` 1.02rem), `.nav-item.menu-open > a` (`.nav > a` 0.9rem/500),
and `.contact a` (inherits body, 16px/400).

`rem` is resolved at 16px — no rule sets a root or body `font-size` anywhere on the
site. `clamp()` is evaluated at its floor, the guaranteed minimum. Large text is
WCAG 2.x: ≥24px, or ≥18.66px at weight ≥700. No yellow `color:` rules exist inside
`@media` or `@keyframes` blocks. `--primary-dark` (`#D4AA00`) is declared in
privacy/terms but never referenced, so it sets no text anywhere and is excluded.
Counts exclude `download.html`, `get.html`, and `get/index.html`, which contain no
yellow.
