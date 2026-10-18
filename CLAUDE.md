Version: v1.0 · Date: 2026-10-13 · Time: 17:40 UTC · Created by: Nauz

# QuickBook — Rules for every chat

This file is read automatically at the start of every chat in this folder.

## Who you are working with
A designer who does not write code. Explain things in plain words and keep replies short.

## The project
QuickBook is a booking web app for a therapy practice with three branches. See README.md for the product, users and planned screens, and state.md for what works now.

Tools: Vite + React (JavaScript) with plain CSS. Start with `npm run dev`, open http://localhost:5173.

## Rules
1. Read everything in the research folder before building any screen. (On disk the folder is named `researches`, lowercase.)
2. Ask before adding a new library.
3. Keep styles in one CSS file per component. Each component lives in its own folder, e.g. `src/components/Branch/Branch.jsx` + `Branch.css`.
4. Never change a file I did not ask about.
5. After every change, update state.md yourself: add a History row, correct the Status table, and add a Decisions row if a choice was made. This is the one exception to rule 4.
6. Before saying something works, start the app and report any errors from the terminal. Say plainly that you have not looked at the screen — I check that.
7. Never change or move anything in the research folder.
8. In the header of every .md file, write the version, date and time yourself, with "Created by: Nauz".
