Version: v1.7 · Date: 2026-10-18 · Time: 17:57 UTC · Created by: Nauz

# QuickBook — State

## Status

| Area | Status | Notes |
|---|---|---|
| Dev server (`npm run dev`) | Works | Restarted 2026-10-18 at about 16:05 UTC on http://localhost:5173. No errors in the terminal. Screen not checked by Claude. |
| Production build (`npm run build`) | Works | Built with no errors. |
| Customer flow: Branch → Service → Therapist → Times → Review → Confirmation | Built | Each screen has Default, Empty, Loading and Error. Choices travel through the flow; Back keeps them. Clicked through end to end by script with no errors. |
| Receptionist flow: Customer record → Schedule → Reminders | Built | Each screen has Default, Empty, Loading and Error. Schedule is a single CSS time grid (30 min = 1 row). Clicked through end to end by script with no errors. |
| StateSwitcher (design tool) | Built | Floating bar: 9 screen buttons + 4 state buttons. All 36 combinations render with no errors. |
| Narrow window | Checked by script | No sideways overflow on any screen at 640 px wide. Not checked by eye. |
| GitHub | Pushed | Code is on github.com/NazaninPour/Quickbook (public), without the research. On GitHub the app builds with no errors. |
| Live site (GitHub Pages) | Live | https://nazaninpour.github.io/Quickbook/ — publishes automatically on every push to main. Page and files load; first screen renders with no console errors. Not checked by eye. The StateSwitcher shows on the live site too. |
| Vercel | Fix pushed | Was a blank page: the build pointed at /Quickbook/assets/, which only exists on GitHub Pages. Fixed in `vite.config.js`; Vercel's own redeploy not checked by Claude (address unknown). |
| Phone version | Not started | You will ask for it separately. |
| Back end / real data | Not started | All data is fake, in `src/data.ts`. Bookings made in the app are lost on reload. |
| Edge cases (failures, long names, double clicks, coming back later) | Not built | Listed in the chat for you to decide on. |
| Design system (`design-system.md`) | Applied | All tokens are CSS variables in `src/global.css`; every component and screen CSS uses only them (layout widths excepted). Roboto loads from Google Fonts. All 36 screen/state combinations and both flows re-checked by script: no errors, same behaviour, no overflow at 640 px. Not checked by eye. |

## Decisions

| Date | Decision | Reason |
|---|---|---|
| 2026-10-13 | Use Vite + React (JavaScript) with plain CSS files. | A browser web app with a fast dev server; plain CSS makes "one CSS file per component" simple and readable. |
| 2026-10-13 | Each component lives in its own folder under `src/components/` with one matching `.css` file. `src/global.css` holds only page-wide basics. | Follows the rule "one CSS file per component". |
| 2026-10-13 | No extra libraries beyond React and Vite. | New libraries need your approval first. |
| 2026-10-13 | Rules file named `CLAUDE.md`. | It is the file Claude Code reads automatically at the start of every chat. |
| 2026-10-13 | Installed packages using a temporary npm cache. | The npm cache in the home folder (`~/.npm`) is owned by another user, so normal installs fail. Fixing it needs an admin password. |
| 2026-10-13 | Kept the research folder name as `researches` (lowercase). | Rule: never change or move anything in the research folder. |
| 2026-10-13 | Switched to TypeScript files (.tsx / .ts) without adding the `typescript` package. | You asked for .tsx and data.ts; Vite runs them as they are. No type-checking for now (approved). |
| 2026-10-13 | Screens live in `src/screens/<Name>/` with their own .tsx and .css. Shared pieces (ScreenFrame, Block, Choice, StatePanel, BookingSummary) live in `src/components/`. | Your rule: one folder per screen. |
| 2026-10-13 | No routing library: App holds the current screen and screens hand over through buttons. | Your rule. |
| 2026-10-13 | Follow the Wireframes v1 layout: boxes stacked top to bottom, one action button at the bottom; a state replaces the box the wireframe marks, and the action stays visible but disabled. | Your drawings. |
| 2026-10-13 | Review and Schedule show their Error at the button, not in the details/grid. | That is where the wireframe puts them. |
| 2026-10-13 | States are told apart by a label, an icon and a border style (Empty dashed ○, Loading dotted with moving bars, Error thick solid !). Selected items show a tick, a thick border and "Selected". | Rule: never show a state by colour alone. |
| 2026-10-13 | Back link on customer screens 2–5 only. | Not in the drawings; you approved it. |
| 2026-10-13 | StateSwitcher: two rows (9 screens, 4 states), black and yellow monospace, in `src/StateSwitcher.tsx`. Jumping ahead fills in missing earlier choices with sample ones. | 36 single buttons would not be readable on a projector (approved). Filling in keeps every screen showable. |
| 2026-10-13 | Fake data: 3 branches, 3 services (one with two lengths), 5 therapists (some at two branches), 9 customers, 4 days of bookings from Wed 14 Oct 2026. | Services with different lengths (K3) and therapists at more than one branch (P3). |
| 2026-10-13 | Left off the screens: prices, payment, sign-in, health questions, cancellation policy, map, therapist photos, "mark as called". | Not in the research, or open questions for Elena (RQ8–RQ10), or privacy (P14). |
| 2026-10-18 | Design system based on Material Design 3 foundations only: 18 colour roles, 8 type styles, 7 spacing values, 3 radii. No M3 components, icons, illustrations or brand colours. | Your request. Every value is marked Read (from m3.material.io) or Own. |
| 2026-10-18 | All colour values are my own neutral greys, not M3's baseline values. Error colours are placeholders. | M3's baseline values are tinted purple (a brand colour), and there is no colour direction yet. |
| 2026-10-18 | Keep Roboto as the typeface. | M3's default; Google Fonts lists it under the SIL Open Font License 1.1, so it is free to use. Loading it will need your OK. |
| 2026-10-18 | Added 3 border widths to design-system.md: thin 1px, medium 2px, thick 4px (Own). | The file had none, and borders carry the state differences. You approved. |
| 2026-10-18 | Spacing values between the 7 in the file are rounded to the nearest one (ties go smaller). | You approved. |
| 2026-10-18 | Icon sizes snap to the spacing values (16/24/32); the 18px and 20px text becomes title-medium; layout widths stay as they were. | You approved. |
| 2026-10-18 | Load Roboto 400 and 500 from Google Fonts with one line in index.html. | You approved. No npm package. |
| 2026-10-18 | Bold text (600/700) becomes the type scale's medium weight (500), including `<strong>`. | The type scale has no bold. |
| 2026-10-18 | StateSwitcher keeps its own styling. | It is a design tool, not part of the product. |
| 2026-10-18 | Publish to github.com/NazaninPour/Quickbook and serve the app with GitHub Pages, built by a GitHub Actions workflow (`.github/workflows/deploy.yml`) on every push to main. | You asked for code + live website. |
| 2026-10-18 | Only GitHub's build uses the path `/Quickbook/`; Vercel, local builds and local dev use `/`. (Replaces: every build used `/Quickbook/`.) | GitHub Pages serves the site from a sub-folder; Vercel serves it from the root, and the old setting gave a blank page there. |
| 2026-10-18 | The `researches` and `.claude` folders are not uploaded (added to `.gitignore`). | You chose to keep the research on this Mac only. `.claude` is local app settings. |
| 2026-10-18 | Git author is "Nauz" with your GitHub no-reply email (97505066+NazaninPour@users.noreply.github.com), set for this project only. | Hides your real email in public history (your choice). |
| 2026-10-18 | You push with GitHub Desktop; Claude does not sign in. | No GitHub login on this Mac, and Claude does not handle passwords or tokens. |
| 2026-10-18 | Combined the README GitHub created ("# Quickbook") with the project instead of overwriting it; the project README was kept. | The repo already had one commit; nothing on GitHub was deleted. |
| 2026-10-18 | Keep the repo private, so no live website for now. | Your choice. Pages on a private repo needs a paid plan or making the repo public. |
| 2026-10-18 | GitHub CLI 2.102.0 installed in ~/.local/bin (checksum and GitHub signature checked); signed in as NazaninPour through the browser. | So Claude can push for you. Claude never saw a password or token. |
| 2026-10-18 | Repo made public and GitHub Pages turned on (source: GitHub Actions). | You asked, to get a free live website. Replaces "keep it private" from earlier today. |

## History

| Date | What changed |
|---|---|
| 2026-10-13 | Project created: Vite + React setup, placeholder page, CLAUDE.md, README.md and state.md. No screens built. |
| 2026-10-13 | Built all 9 screens with Default, Empty, Loading and Error; fake data in `src/data.ts`; StateSwitcher design tool. Replaced `main.jsx` / `App.jsx` with `main.tsx` / `App.tsx`. |
| 2026-10-18 | Added `design-system.md` (Material Design 3 foundations: colour roles, type scale, spacing, corner radii). No app files changed. |
| 2026-10-18 | Applied design-system.md: new tokens in `src/global.css`; all 15 component and screen CSS files rewritten to use them; Roboto link in `index.html`; border widths added to design-system.md (v1.1). No content, flow or behaviour changed. |
| 2026-10-18 | Prepared deployment: GitHub Pages workflow, build path in `vite.config.js`, `researches/` and `.claude/` added to `.gitignore`, local Git history with first commit. Not pushed yet. |
| 2026-10-18 | Pushed to github.com/NazaninPour/Quickbook (private). GitHub build passes; publishing to Pages failed because Pages is not available for this private repo. |
| 2026-10-18 | Repo made public, Pages turned on; site published at https://nazaninpour.github.io/Quickbook/. |
| 2026-10-18 | Fixed the blank page on Vercel: `vite.config.js` now uses `/Quickbook/` only for GitHub's build. |
