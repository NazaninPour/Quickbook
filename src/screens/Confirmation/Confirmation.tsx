import './Confirmation.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import BookingSummary from '../../components/BookingSummary/BookingSummary'
import { viewPanel } from '../../components/StatePanel/StatePanel'
import StatePanel from '../../components/StatePanel/StatePanel'
import type { Draft, View } from '../../types'

interface Props {
  view: View
  draft: Draft
}

export default function Confirmation({ view, draft }: Props) {
  const complete = !!(draft.branchId && draft.serviceId && draft.length && draft.slot)

  const panel =
    viewPanel(view, {
      empty: 'No booking to show.',
      loading: 'Loading your confirmation…',
      error: 'Your confirmation could not load.',
    }) ?? (complete ? null : <StatePanel kind="empty" text="No booking to show." />)

  return (
    <ScreenFrame eyebrow="Book a session" title="Booking confirmed">
      <Block title="Your booking">
        {panel ?? (
          <div className="confirmation">
            <p className="confirmation__message">
              <span className="confirmation__tick" aria-hidden="true">
                ✓
              </span>
              Your session is booked.
            </p>
            <BookingSummary draft={draft} />
            <p className="confirmation__next">
              We'll email you a reminder before your session. You can reschedule or cancel at any time.
            </p>
          </div>
        )}
      </Block>
    </ScreenFrame>
  )
}
