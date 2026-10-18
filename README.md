Version: v1.0 · Date: 2026-10-13 · Time: 17:40 UTC · Created by: Nauz

# QuickBook

Written from the approved files in `researches/`: Discovery Brief v1, Discovery Dashboard v1, Interview Analysis v1, Problem Statement v1, Persona v1, Flows v1 and Wireframes v1.

## What the product is

QuickBook is a web app for booking sessions at a therapy practice with three branches (K2). All three branches follow the same booking process (K10).

Today customers can only book, change or cancel by phone or WhatsApp, and there is no online self-service booking (K4). Receptionists record appointments by hand in a shared calendar (K5) and phone customers to confirm and remind them (K11).

QuickBook aims to address four problems (Problem Statement v1):

1. Customers can only book, change or cancel by phone or WhatsApp, and reaching someone isn't always easy (K4; E15; P5 sim).
2. Booking, rescheduling and reminder calls take a large share of receptionists' time on top of serving customers in the branch (K8, K9; E24).
3. Some customers don't show up, and nobody knows how often or why (K6, K7; E01).
4. A booking that works must match the therapist, the service length and the customer's own constraints, not just a free slot (K3; E29; P1, P2 sim).

## Who the users are

**Customer** — wants to book or change a session at a time they can actually attend, sometimes with a specific therapist (K3; P1, P2 sim). Finds it hard to get through by phone, waits for WhatsApp replies, and doesn't know the cancellation and no-show rules (E15, E16; P4, P5, P8 sim).

**Receptionist** — handles booking, cancellation, rescheduling and reminder calls while also serving customers in the branch (K8). These calls take a large but unmeasured share of their time (K9). They switch between records while being interrupted and lose track of requests between branches and shifts (E24; P11, P12 sim).

Not defined as user groups yet: therapists, Elena (Operations Manager) and family members who help with bookings. Customer segments are unknown (RQ13 open).

## Screens we plan to build

From Approved — Flows v1 and Approved — Wireframes v1. Each screen has Empty, Loading and Error states.

### Customer flow

| # | Screen | Flow step | Main parts | Can do |
|---|---|---|---|---|
| 1 | Branch | 2 | Branch list; saved primary branch; save as primary | Choose a branch |
| 2 | Service | 3 | Service list; length of each service | Choose a service and its length |
| 3 | Therapist | 4 | Therapist list; "any therapist" option | Choose a preferred therapist, or any |
| 4 | Times | 5 | Free times for all therapists, preferred therapist's first | Pick a time |
| 5 | Review | 6 | Booking details; note that they can reschedule or cancel at any time; Confirm | Confirm the booking |
| 6 | Confirmation | 7 | Booking confirmed message | See the confirmation |

Off-screen: checking their own week first (step 1); a reminder email with an add-to-calendar request (step 8).

### Receptionist flow

| # | Screen | Flow step | Main parts | Can do |
|---|---|---|---|---|
| 7 | Customer record | 2 | Find customer; customer record | Find the customer's record |
| 8 | Schedule | 3 and 5 | Chosen branch; therapists and their times; filter by service length; record booking | Record the booking |
| 9 | Reminders | 7 | Reminders to call customers before their session | See who to call |

Off-screen: taking the request by phone, WhatsApp or at the desk; agreeing an option with the customer; confirming; making the reminder call.

## How sure we are

- K facts come from Elena's brief.
- E claims come from GP, hospital and psychotherapy settings, mostly in the UK. They are not evidence about QuickBook users.
- P patterns ("sim") come from role-play of other businesses. They are not real interviews.
- Still open with Elena: other systems to work with (RQ8), timeline and privacy (RQ9), success targets (RQ10), and whether a cancellation or no-show policy exists. Many screen states are marked "Ask Elena" in the wireframes.

## Start the app

```bash
npm run dev
```

Then open http://localhost:5173.
