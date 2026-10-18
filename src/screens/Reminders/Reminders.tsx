import './Reminders.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { BRANCHES, DAYS, SERVICES, THERAPISTS, TODAY } from '../../data'
import type { Booking, Customer } from '../../data'
import { endTime, formatDay, formatLength } from '../../availability'
import type { View } from '../../types'

interface Props {
  view: View
  customers: Customer[]
  bookings: Booking[]
}

const nameOf = (list: { id: string; name: string }[], id: string) => list.find((x) => x.id === id)?.name ?? ''

// The day after TODAY, e.g. 2026-10-14.
const tomorrow = new Date(new Date(`${TODAY}T00:00:00Z`).getTime() + 86400000).toISOString().slice(0, 10)

export default function Reminders({ view, customers, bookings }: Props) {
  const days = DAYS.map((date) => ({
    date,
    items: bookings.filter((b) => b.date === date).sort((a, b) => a.start.localeCompare(b.start)),
  })).filter((d) => d.items.length > 0)

  const panel =
    viewPanel(view, {
      empty: 'No reminders to show.',
      loading: 'Loading reminders…',
      error: 'Reminders could not load.',
    }) ?? (days.length === 0 ? <StatePanel kind="empty" text="No reminders to show." /> : null)

  return (
    <ScreenFrame
      eyebrow="Reception"
      title="Reminder calls"
      intro="Call each customer before their session."
    >
      <Block title="Customers to call">
        {panel ?? (
          <div className="reminders__days">
            {days.map((day) => (
              <section key={day.date} className="reminders__day">
                <h3 className="reminders__date">
                  {formatDay(day.date, 'long')}
                  {day.date === tomorrow && <span className="reminders__soon"> · tomorrow</span>}
                </h3>
                <ul className="reminders__list">
                  {day.items.map((b) => {
                    const c = customers.find((x) => x.id === b.customerId)
                    return (
                      <li key={b.id} className={`reminders__item${b.isNew ? ' reminders__item--new' : ''}`}>
                        <span className="reminders__time">
                          {b.start}–{endTime(b.start, b.length)}
                        </span>
                        <span className="reminders__who">
                          <strong>{c?.name}</strong>
                          {b.isNew && <span className="reminders__tag">New</span>}
                          <span className="reminders__phone">{c?.phone}</span>
                        </span>
                        <span className="reminders__what">
                          {nameOf(SERVICES, b.serviceId)} · {formatLength(b.length)}
                          <br />
                          {nameOf(THERAPISTS, b.therapistId)} at {nameOf(BRANCHES, b.branchId)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Block>
    </ScreenFrame>
  )
}
