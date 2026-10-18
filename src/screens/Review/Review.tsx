import './Review.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import BookingSummary from '../../components/BookingSummary/BookingSummary'
import StatePanel from '../../components/StatePanel/StatePanel'
import type { Draft, View } from '../../types'

interface Props {
  view: View
  draft: Draft
  onBack: () => void
  onConfirm: () => void
}

export default function Review({ view, draft, onBack, onConfirm }: Props) {
  const complete = !!(draft.branchId && draft.serviceId && draft.length && draft.slot)
  const showEmpty = view === 'empty' || (view === 'default' && !complete)

  let details
  if (view === 'loading') details = <StatePanel kind="loading" text="Loading your booking details…" />
  else if (showEmpty) details = <StatePanel kind="empty" text="No booking details to show." />
  else details = <BookingSummary draft={draft} />

  return (
    <ScreenFrame
      eyebrow="Book a session · Step 5 of 5"
      title="Check your booking"
      onBack={onBack}
      action={{ label: 'Confirm booking', onClick: onConfirm, disabled: view !== 'default' || !complete }}
      actionError={view === 'error' ? 'Your booking could not be confirmed.' : undefined}
    >
      <Block title="Booking details">{details}</Block>
      <p className="review__note">
        <span className="review__icon" aria-hidden="true">
          i
        </span>
        You can reschedule or cancel at any time.
      </p>
    </ScreenFrame>
  )
}
