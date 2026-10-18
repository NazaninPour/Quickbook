// DESIGN TOOL — NOT PART OF THE PRODUCT.
// A floating bar for jumping to any screen and state. Everything about it lives in this one file.
// To remove it: delete the <StateSwitcher … /> line in src/components/App/App.tsx (and this file if you like).

import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { CUSTOMERS, DAYS, SERVICES } from './data'
import type { Booking } from './data'
import { freeStarts, therapistsAtBranch } from './availability'
import { ANY_THERAPIST } from './types'
import type { Draft, ScreenId, View } from './types'

const SCREENS: { id: ScreenId; name: string }[] = [
  { id: 'branch', name: '1 Branch' },
  { id: 'service', name: '2 Service' },
  { id: 'therapist', name: '3 Therapist' },
  { id: 'times', name: '4 Times' },
  { id: 'review', name: '5 Review' },
  { id: 'confirmation', name: '6 Confirmation' },
  { id: 'record', name: '7 Customer record' },
  { id: 'schedule', name: '8 Schedule' },
  { id: 'reminders', name: '9 Reminders' },
]

const VIEWS: { id: View; name: string }[] = [
  { id: 'default', name: 'Default' },
  { id: 'empty', name: 'Empty' },
  { id: 'loading', name: 'Loading' },
  { id: 'error', name: 'Error' },
]

const CUSTOMER_ORDER: ScreenId[] = ['branch', 'service', 'therapist', 'times', 'review', 'confirmation']

interface Props {
  state: { screen: ScreenId; view: View; draft: Draft; bookings: Booking[]; receptionCustomerId?: string }
  set: {
    setScreen: Dispatch<SetStateAction<ScreenId>>
    setView: Dispatch<SetStateAction<View>>
    setDraft: Dispatch<SetStateAction<Draft>>
    setReceptionCustomerId: Dispatch<SetStateAction<string | undefined>>
  }
}

// When jumping ahead, fill in any earlier choices with sample ones so the screen has something to show.
function fillDraft(draft: Draft, bookings: Booking[], upTo: number): Draft {
  const d = { ...draft }
  if (upTo >= 1 && !d.branchId) d.branchId = 'b1'
  if (upTo >= 2 && (!d.serviceId || !d.length)) {
    d.serviceId = SERVICES[1].id
    d.length = SERVICES[1].lengths[SERVICES[1].lengths.length - 1]
  }
  if (upTo >= 3 && !d.therapistId) d.therapistId = therapistsAtBranch(d.branchId!)[0]?.id ?? ANY_THERAPIST
  if (upTo >= 4 && !d.slot) {
    const people = d.therapistId === ANY_THERAPIST ? therapistsAtBranch(d.branchId!) : [{ id: d.therapistId! }]
    for (const date of DAYS) {
      for (const t of people) {
        const start = freeStarts(bookings, t.id, d.branchId!, date, d.length!)[0]
        if (start && !d.slot) d.slot = { date, start, therapistId: t.id }
      }
    }
  }
  return d
}

export default function StateSwitcher({ state, set }: Props) {
  const barRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  // Keep a spacer the same height as the bar, so the bar never covers the end of the page.
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight + 24))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const pickScreen = (id: ScreenId) => {
    const i = CUSTOMER_ORDER.indexOf(id)
    if (i > 0) set.setDraft((d) => fillDraft(d, state.bookings, i))
    if (id === 'schedule' && !state.receptionCustomerId) set.setReceptionCustomerId(CUSTOMERS[1].id)
    set.setScreen(id)
    set.setView('default')
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{ height }} aria-hidden="true" />
      <div ref={barRef} className="qbss" role="toolbar" aria-label="Design tool: screen and state switcher">
        <div className="qbss__row">
          <span className="qbss__label">SCREEN</span>
          {SCREENS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="qbss__btn"
              aria-pressed={state.screen === s.id}
              onClick={() => pickScreen(s.id)}
            >
              {state.screen === s.id ? '▶ ' : ''}
              {s.name}
            </button>
          ))}
        </div>
        <div className="qbss__row">
          <span className="qbss__label">STATE</span>
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              className="qbss__btn"
              aria-pressed={state.view === v.id}
              onClick={() => set.setView(v.id)}
            >
              {state.view === v.id ? '▶ ' : ''}
              {v.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// Deliberately not product styling: black bar, monospace, bright yellow for the current choice.
const CSS = `
.qbss {
  position: fixed;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  z-index: 2147483647;
  width: max-content;
  max-width: calc(100vw - 24px);
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  background: #000;
  color: #fff;
  border: 3px solid #ffd400;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0,0,0,.45);
  font: 600 18px/1.2 ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
.qbss__row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.qbss__label { min-width: 5.5em; color: #ffd400; font-size: 14px; letter-spacing: .1em; }
.qbss__btn {
  padding: 8px 12px;
  font: inherit;
  color: #fff;
  background: #222;
  border: 2px solid #666;
  border-radius: 6px;
  cursor: pointer;
}
.qbss__btn:hover { border-color: #fff; }
.qbss__btn[aria-pressed="true"] {
  color: #000;
  background: #ffd400;
  border-color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.qbss__btn:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
`
