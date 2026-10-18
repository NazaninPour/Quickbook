Version: v1.1 · Date: 2026-10-18 · Time: 16:05 UTC · Created by: Nauz

# QuickBook — Design system

Built on the **foundations** of Material Design 3: colour roles, type scale, spacing scale and corner radii. Material's components, icons, illustrations and brand colours are not used.

All sources were read on 2026-10-17/18 from the official documentation:

| Code | Page |
|---|---|
| **M3-colour** | https://m3.material.io/styles/color/roles |
| **M3-baseline** | https://m3.material.io/styles/color/static/baseline |
| **M3-type** | https://m3.material.io/styles/typography/type-scale-tokens |
| **M3-fonts** | https://m3.material.io/styles/typography/fonts |
| **GF-Roboto** | https://fonts.google.com/specimen/Roboto/license |
| **M3-spacing** | https://m3.material.io/styles/spacing/tokens |
| **M3-shape** | https://m3.material.io/styles/shape/corner-radius-scale |

In the **Source** column, **Read** means the value is copied from the page. **Own** means I chose it, and the reason is given.

---

## 1. Colour roles

**What I read:** the role names and what each role is for (M3-colour). **What I did not use:** M3's baseline colour values (M3-baseline). They exist, but they are tinted purple, which is Material's own look, and you asked for no brand colours and no colour direction yet. So every value below is a neutral grey **chosen by me**. The pairing rules come from M3-colour: "On" colours go on top of their partner, and *outline* must have 3:1 contrast with the surface.

Light theme only. Dark theme is not designed yet.

| Token | Value | Source | Where to use it in QuickBook |
|---|---|---|---|
| `color-primary` | `#1C1C1B` | Role: Read (M3-colour, "high-emphasis fills, texts, and icons against surface"). Value: Own | The one main action button at the bottom of each screen |
| `color-on-primary` | `#FFFFFF` | Role: Read ("text and icons against primary"). Value: Own | Text on the main action button |
| `color-primary-container` | `#E2E2DF` | Role: Read ("standout fill color against surface"). Value: Own | Fill of a selected card or time chip |
| `color-on-primary-container` | `#1C1C1B` | Role: Read ("text and icons against primary container"). Value: Own | Text and tick on a selected card or chip |
| `color-error` | `#1C1C1B` | Role: Read ("indicating urgency"). Value: Own, placeholder | Border and "!" of the Error state. Swap for a red once there is a colour direction |
| `color-on-error` | `#FFFFFF` | Role: Read ("text and icons against error"). Value: Own | Text on a filled error element (none yet) |
| `color-error-container` | `#F0F0EE` | Role: Read ("attention-grabbing fill color against surface"). Value: Own, placeholder | Fill of the Error panel |
| `color-on-error-container` | `#1C1C1B` | Role: Read ("text and icons against error container"). Value: Own | Text inside the Error panel |
| `color-surface` | `#F7F7F6` | Role: Read ("default color for backgrounds"). Value: Own | Page background |
| `color-on-surface` | `#1C1C1B` | Role: Read ("text and icons against any surface or surface container color"). Value: Own | All main text |
| `color-on-surface-variant` | `#5C5C58` | Role: Read ("lower-emphasis color for text and icons"). Value: Own (6.7:1 on white) | Secondary text: addresses, phone numbers, hints, intro lines |
| `color-surface-container-lowest` | `#FFFFFF` | Role: Read ("lowest-emphasis container color"). Value: Own | Blocks (the wireframe boxes), cards, inputs |
| `color-surface-container-low` | `#F2F2F0` | Role: Read ("low-emphasis container color"). Value: Own | Groups inside a block, e.g. the "preferred therapist" group on Times |
| `color-surface-container` | `#ECECEA` | Role: Read ("default container color"). Value: Own | The "reschedule or cancel at any time" note on Review |
| `color-surface-container-high` | `#E6E6E3` | Role: Read ("high-emphasis container color"). Value: Own | Time grid background and gaps on Schedule |
| `color-surface-container-highest` | `#D6D6D2` | Role: Read ("highest-emphasis container color"). Value: Own | Existing bookings in the time grid; disabled button fill |
| `color-outline` | `#82827E` | Role: Read ("important boundaries, such as a text field outline"; needs 3:1 with surface). Value: Own (3.9:1 on white, 3.6:1 on surface) | Card borders, input borders, unselected chip borders, dashed Empty border |
| `color-outline-variant` | `#C9C9C5` | Role: Read ("decorative elements, such as dividers"). Value: Own | Dividers, e.g. the line above the reminder note on Confirmation |

Left out on purpose: the *secondary* and *tertiary* roles (they're accent colours, so they wait for a colour direction), the *inverse* roles, and the add-on roles. M3-colour says most products won't need the add-on roles.

---

## 2. Type scale

**What I read:** every size, weight, line height and letter spacing below (M3-type, baseline styles). M3-type also says "No single product will use all the styles", so this table keeps the 8 that QuickBook needs. The page gives sizes in pt and says web sizes are converted as size ÷ 16 = rem. Letter spacing is tracking ÷ font size = em.

**Typeface:** M3 uses **Roboto** for all styles (M3-fonts, M3-type). Roboto **is free to use**: Google Fonts lists it under the SIL Open Font License 1.1 (GF-Roboto). So no replacement is needed.

| Token | Size / line height | Weight | Letter spacing | Source | Where to use it in QuickBook |
|---|---|---|---|---|---|
| `type-headline-medium` | 28 / 36 (1.75rem / 2.25rem) | 400 | 0 | Read (M3-type) | Screen title (h1), e.g. "Choose a branch" |
| `type-title-medium` | 16 / 24 (1rem / 1.5rem) | 500 | 0.15pt (0.009em) | Read (M3-type) | Block headings; names on cards (branch, service, therapist, customer) |
| `type-title-small` | 14 / 20 (0.875rem / 1.25rem) | 500 | 0.1pt (0.007em) | Read (M3-type) | Day headings on Times and Reminders; therapist names at the top of the time grid |
| `type-body-large` | 16 / 24 (1rem / 1.5rem) | 400 | 0.5pt (0.031em) | Read (M3-type) | Default text, booking details, inputs |
| `type-body-medium` | 14 / 20 (0.875rem / 1.25rem) | 400 | 0.25pt (0.018em) | Read (M3-type) | Secondary text: addresses, phone numbers, hints, the eyebrow above the title |
| `type-body-small` | 12 / 16 (0.75rem / 1rem) | 400 | 0.4pt (0.033em) | Read (M3-type) | Text inside time-grid cells (times, service under a booking) |
| `type-label-large` | 14 / 20 (0.875rem / 1.25rem) | 500 | 0.1pt (0.007em) | Read (M3-type) | Button text, time chips, Back link |
| `type-label-medium` | 12 / 16 (0.75rem / 1rem) | 500 | 0.5pt (0.042em) | Read (M3-type) | Small tags: "Selected", "New", "Your primary branch", state labels (Empty / Loading / Error) |

Not used (all were readable on the page): Display Large / Medium / Small, Headline Large, Headline Small, Title Large, and Label Small (11pt is too small for this audience).

Font stack: `Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif`. **Own.** If Roboto isn't loaded, the next font on the list is used.

---

## 3. Spacing scale

**What I read:** M3 spacing is an 8dp scale where `space100` = 8dp, plus smaller "nested" units (M3-spacing). M3-spacing defines 19 values. **I picked 7**, all copied exactly from the page. On the web, 1dp = 1px.

| Token | Value | Source | Where to use it in QuickBook |
|---|---|---|---|
| `space-50` | 4px | Read (M3-spacing, "Space 50") | Tiny gaps: between a name and its address on a card; tick to label |
| `space-100` | 8px | Read (M3-spacing, "Space 100") | Gap between cards in a list; between time chips |
| `space-150` | 12px | Read (M3-spacing, "Space 150") | Gap between elements inside a block; chip padding |
| `space-200` | 16px | Read (M3-spacing, "Space 200") | Padding inside blocks and cards; gap between blocks; page side margin |
| `space-300` | 24px | Read (M3-spacing, "Space 300") | Gap between days on Times and Reminders |
| `space-400` | 32px | Read (M3-spacing, "Space 400") | Space above the screen title (top of page) |
| `space-600` | 48px | Read (M3-spacing, "Space 600") | Space below the last block, above the floating switcher |

---

## 4. Corner radii

**What I read:** M3's ten-step corner radius scale (M3-shape). **I picked 3**, all copied exactly. M3-shape also warns "Be careful not to apply large or full corners to information-dense components, such as cards", so cards use *medium*.

| Token | Value | Source | Where to use it in QuickBook |
|---|---|---|---|
| `radius-small` | 8px | Read (M3-shape, "Small - 8dp") | Buttons, inputs, time chips, cells and bookings in the time grid |
| `radius-medium` | 12px | Read (M3-shape, "Medium - 12dp") | Blocks, selectable cards, state panels (Empty / Loading / Error), the Review note |
| `radius-full` | fully rounded (999px) | Read (M3-shape, "Full - fully rounded corners") | Small tags: "Your primary branch", "New" |

M3-shape also says nested shapes should use a smaller inner radius (outer radius − padding = inner radius). That's why a chip (8) sits inside a block (12).

---

## 5. Border widths

**Not part of Material's foundations.** M3 doesn't give border-width tokens on the pages I read. You approved these three on 2026-10-18, so all three are **Own**. They keep the state differences: thin for normal edges, medium for Empty, Loading and grid lines, thick for Error, a selected item and a booking's left edge.

| Token | Value | Source | Where to use it in QuickBook |
|---|---|---|---|
| `border-thin` | 1px | Own (approved 2026-10-18) | Card, block, input and chip borders; dividers; small tags |
| `border-medium` | 2px | Own (approved 2026-10-18) | Empty (dashed) and Loading (dotted) panels; lines between time-grid cells; a "New" booking (dashed); icon circles; main button border; focus ring |
| `border-thick` | 4px | Own (approved 2026-10-18) | Error panel; selected card, chip or time; left edge of a booking in the grid |

---

## What I read and what I chose

**Read from the official pages**
- The names and purposes of all 18 colour roles in section 1, and the rule that outline needs 3:1 contrast with the surface (M3-colour)
- All 8 type styles: size, line height, weight and letter spacing (M3-type)
- That Roboto is M3's default typeface (M3-fonts), and that it's under the SIL Open Font License 1.1 (GF-Roboto)
- The size → rem and tracking → em conversions (M3-type)
- All 7 spacing values and their names (M3-spacing)
- All 3 corner radii, the warning about large corners on cards, and the nesting rule (M3-shape)

**Chosen by me**
- **Every colour value (all 18 hex codes).** M3's baseline values are tinted purple, which is a brand colour, and there's no colour direction yet. I picked greys that meet M3's pairing and contrast rules.
- **The two error colours are placeholders.** Without a red, Error is told apart by its label, "!" icon and thick border, which already follows the rule that no state is shown by colour alone.
- **Which 8 of the 15 type styles, which 7 of the 19 spacing values and which 3 of the 10 radii to keep.** The values themselves are all read.
- **The fallback font stack.**
- **All three border widths (section 5).** You approved them on 2026-10-18.
- **Every "Where to use it" entry.**

**Could not read**
- Nothing I needed was missing. Every value I copied was shown on the pages. The pages don't give a font-loading method for the web.

**Applied on 2026-10-18:** every token is a CSS variable in `src/global.css`, and the component CSS uses only those variables. Roboto 400 and 500 load from Google Fonts through one line in `index.html` (approved).
