import './Times.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import Choice from '../../components/Choice/Choice'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { DAYS, THERAPISTS } from '../../data'
import type { Booking, Therapist } from '../../data'
import { formatDay, formatLength, freeStarts, therapistsAtBranch } from '../../availability'
import { ANY_THERAPIST } from '../../types'
import type { Slot, View } from '../../types'

interface Props {
  view: View
  bookings: Booking[]
  branchId: string
  length: number
  therapistId: string
  slot?: Slot
  onSelect: (slot: Slot) => void
  onBack: () => void
  onNext: () => void
}

export default function Times({ view, bookings, branchId, length, therapistId, slot, onSelect, onBack, onNext }: Props) {
  const preferred = THERAPISTS.find((t) => t.id === therapistId)
  const others = therapistsAtBranch(branchId).filter((t) => t.id !== therapistId)

  // For each day, the free start times of each therapist in the list.
  const byDay = (people: Therapist[]) =>
    DAYS.map((date) => ({
      date,
      rows: people
        .map((t) => ({ therapist: t, starts: freeStarts(bookings, t.id, branchId, date, length) }))
        .filter((row) => row.starts.length > 0),
    })).filter((day) => day.rows.length > 0)

  const preferredDays = preferred ? byDay([preferred]) : []
  const otherDays = byDay(others)
  const nothingFree = preferredDays.length === 0 && otherDays.length === 0

  const panel = viewPanel(view, {
    empty: 'No free times to show.',
    loading: 'Loading free times…',
    error: 'Free times could not load.',
  })

  const chip = (t: Therapist, date: string, start: string) => (
    <Choice
      key={start}
      compact
      label={`${start} with ${t.name} on ${formatDay(date, 'long')}`}
      selected={slot?.date === date && slot.start === start && slot.therapistId === t.id}
      onSelect={() => onSelect({ date, start, therapistId: t.id })}
    >
      {start}
    </Choice>
  )

  const dayList = (days: ReturnType<typeof byDay>, showNames: boolean) => (
    <div className="times__days">
      {days.map((day) => (
        <div key={day.date} className="times__day">
          <h4 className="times__date">{formatDay(day.date, 'long')}</h4>
          {day.rows.map((row) => (
            <div key={row.therapist.id} className="times__row">
              {showNames && <span className="times__who">{row.therapist.name}</span>}
              <div className="times__chips">{row.starts.map((s) => chip(row.therapist, day.date, s))}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <ScreenFrame
      eyebrow="Book a session · Step 4 of 5"
      title="Pick a time"
      intro={`Free times for a ${formatLength(length)} session over the next ${DAYS.length} days`}
      onBack={onBack}
      action={{ label: 'Pick this time', onClick: onNext, disabled: view !== 'default' || !slot }}
    >
      <Block title="Free times">
        {panel ??
          (nothingFree ? (
            <StatePanel kind="empty" text="No free times to show." />
          ) : (
            <>
              {preferred && (
                <section className="times__group">
                  <h3 className="times__heading">
                    {preferred.name} <span className="times__note">· your preferred therapist</span>
                  </h3>
                  {preferredDays.length > 0 ? (
                    dayList(preferredDays, false)
                  ) : (
                    <p className="times__none">
                      {preferred.name} has no free times for this length. Other therapists are below.
                    </p>
                  )}
                </section>
              )}
              {otherDays.length > 0 && (
                <section className="times__group">
                  <h3 className="times__heading">
                    {therapistId === ANY_THERAPIST ? 'All therapists' : 'Other therapists'}
                  </h3>
                  {dayList(otherDays, true)}
                </section>
              )}
            </>
          ))}
      </Block>
    </ScreenFrame>
  )
}
