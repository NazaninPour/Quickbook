import './Schedule.css'
import { useState } from 'react'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import StatePanel from '../../components/StatePanel/StatePanel'
import { BRANCHES, CUSTOMERS, DAYS, SERVICES } from '../../data'
import type { Booking, Customer } from '../../data'
import { ROW_MINUTES, ROW_TIMES, endTime, formatDay, formatLength, freeStarts, therapistsWorking, toMinutes } from '../../availability'
import type { View } from '../../types'

interface Props {
  view: View
  customer?: Customer
  bookings: Booking[]
  onRecord: (booking: Omit<Booking, 'id'>) => void
}

// Every service + length pair, e.g. "Follow-up session · 30 min".
const OPTIONS = SERVICES.flatMap((s) => s.lengths.map((length) => ({ key: `${s.id}:${length}`, serviceId: s.id, length, label: `${s.name} · ${formatLength(length)}` })))

const rowOf = (time: string) => (toMinutes(time) - toMinutes(ROW_TIMES[0])) / ROW_MINUTES
const nameOf = (id: string) => CUSTOMERS.find((c) => c.id === id)?.name ?? ''
const serviceOf = (id: string) => SERVICES.find((s) => s.id === id)?.name ?? ''

export default function Schedule({ view, customer, bookings, onRecord }: Props) {
  const [branchId, setBranchId] = useState(customer?.primaryBranchId ?? BRANCHES[0].id)
  const [date, setDate] = useState(DAYS[0])
  const [optionKey, setOptionKey] = useState(OPTIONS[0].key)
  const [picked, setPicked] = useState<{ therapistId: string; start: string }>()

  const option = OPTIONS.find((o) => o.key === optionKey) ?? OPTIONS[0]
  const therapists = therapistsWorking(branchId, date)
  const fits = new Map(therapists.map((t) => [t.id, new Set(freeStarts(bookings, t.id, branchId, date, option.length))]))
  const anyFit = [...fits.values()].some((s) => s.size > 0)
  const dayBookings = bookings.filter((b) => b.branchId === branchId && b.date === date)

  const clearPick = () => setPicked(undefined)

  // Empty and Loading replace the grid. Error shows at the button instead (as in the wireframe).
  const emptyPanel = <StatePanel kind="empty" text="No times fit the service length." />
  let gridPanel = null
  if (view === 'empty' || (view === 'default' && !anyFit)) gridPanel = emptyPanel
  else if (view === 'loading') gridPanel = <StatePanel kind="loading" text="Loading the schedule…" />

  // Rows of the grid that are covered by a booking, per therapist, so we don't draw free cells under them.
  const covered = (therapistId: string, row: number) =>
    dayBookings.some((b) => b.therapistId === therapistId && row >= rowOf(b.start) && row < rowOf(b.start) + b.length / ROW_MINUTES)

  const grid = (
    <div
      className="schedule__grid"
      style={{
        gridTemplateColumns: `minmax(3.5rem, auto) repeat(${therapists.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${ROW_TIMES.length}, minmax(2.5rem, auto))`,
      }}
    >
      <div className="schedule__corner" style={{ gridRow: 1, gridColumn: 1 }}>
        Time
      </div>
      {therapists.map((t, i) => (
        <div key={t.id} className="schedule__head" style={{ gridRow: 1, gridColumn: i + 2 }}>
          {t.name}
        </div>
      ))}
      {ROW_TIMES.map((time, r) => (
        <div key={time} className="schedule__time" style={{ gridRow: r + 2, gridColumn: 1 }}>
          {time}
        </div>
      ))}

      {/* Free cells: a button where the chosen length fits, otherwise an empty cell */}
      {therapists.flatMap((t, i) =>
        ROW_TIMES.map((time, r) =>
          covered(t.id, r) ? null : (
            <div key={`${t.id}-${time}`} className="schedule__cell" style={{ gridRow: r + 2, gridColumn: i + 2 }}>
              {fits.get(t.id)?.has(time) && (
                <button
                  type="button"
                  className="schedule__free"
                  aria-label={`Choose ${time} with ${t.name}`}
                  onClick={() => setPicked({ therapistId: t.id, start: time })}
                >
                  + {time}
                </button>
              )}
            </div>
          ),
        ),
      )}

      {/* Existing bookings span one row per 30 minutes */}
      {dayBookings.map((b) => {
        const col = therapists.findIndex((t) => t.id === b.therapistId)
        if (col < 0) return null
        return (
          <div
            key={b.id}
            className={`schedule__booking${b.isNew ? ' schedule__booking--new' : ''}`}
            style={{ gridRow: `${rowOf(b.start) + 2} / span ${b.length / ROW_MINUTES}`, gridColumn: col + 2 }}
          >
            <span className="schedule__booking-label">{b.isNew ? 'New booking' : 'Booked'}</span>
            <span className="schedule__booking-name">{nameOf(b.customerId)}</span>
            <span className="schedule__booking-meta">
              {b.start}–{endTime(b.start, b.length)} · {serviceOf(b.serviceId)}
            </span>
          </div>
        )
      })}

      {/* The time the receptionist has picked, spanning its length */}
      {picked && (
        <div
          className="schedule__picked"
          style={{
            gridRow: `${rowOf(picked.start) + 2} / span ${option.length / ROW_MINUTES}`,
            gridColumn: therapists.findIndex((t) => t.id === picked.therapistId) + 2,
          }}
        >
          <span className="schedule__booking-label">✓ Selected</span>
          <span className="schedule__booking-name">{customer?.name ?? 'No customer chosen'}</span>
          <span className="schedule__booking-meta">
            {picked.start}–{endTime(picked.start, option.length)}
          </span>
          <button type="button" className="schedule__unpick" onClick={clearPick}>
            Clear
          </button>
        </div>
      )}
    </div>
  )

  return (
    <ScreenFrame
      wide
      eyebrow="Reception"
      title="Schedule"
      action={{
        label: 'Record booking',
        disabled: view !== 'default' || !picked || !customer,
        onClick: () =>
          picked &&
          customer &&
          onRecord({
            customerId: customer.id,
            therapistId: picked.therapistId,
            branchId,
            serviceId: option.serviceId,
            date,
            start: picked.start,
            length: option.length,
            isNew: true,
          }),
      }}
      actionError={view === 'error' ? 'The booking could not be recorded.' : undefined}
    >
      <Block title="Chosen branch">
        <div className="schedule__controls">
          <label className="schedule__field">
            <span>Branch</span>
            <select
              value={branchId}
              onChange={(e) => {
                setBranchId(e.target.value)
                clearPick()
              }}
            >
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label className="schedule__field">
            <span>Day</span>
            <select
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                clearPick()
              }}
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {formatDay(d, 'long')}
                </option>
              ))}
            </select>
          </label>
          <p className="schedule__for">
            <span>Booking for</span>
            <strong>{customer ? `${customer.name} · ${customer.phone}` : 'No customer chosen'}</strong>
          </p>
        </div>
      </Block>

      <Block title="Therapists and their times">{gridPanel ?? <div className="schedule__scroll">{grid}</div>}</Block>

      <Block title="Filter by service length">
        <label className="schedule__field">
          <span>Service and length</span>
          <select
            value={optionKey}
            onChange={(e) => {
              setOptionKey(e.target.value)
              clearPick()
            }}
          >
            {OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </Block>
    </ScreenFrame>
  )
}
