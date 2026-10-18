import './BookingSummary.css'
import { BRANCHES, SERVICES, THERAPISTS } from '../../data'
import { ANY_THERAPIST } from '../../types'
import type { Draft } from '../../types'
import { endTime, formatDay, formatLength } from '../../availability'

interface Props {
  draft: Draft
}

// Branch, service, therapist and time — used on Review and Confirmation.
export default function BookingSummary({ draft }: Props) {
  const branch = BRANCHES.find((b) => b.id === draft.branchId)
  const service = SERVICES.find((s) => s.id === draft.serviceId)
  const therapist = THERAPISTS.find((t) => t.id === draft.slot?.therapistId)
  const { slot, length } = draft
  if (!branch || !service || !therapist || !slot || !length) return null

  return (
    <dl className="summary">
      <div className="summary__row">
        <dt>Branch</dt>
        <dd>
          {branch.name}
          <span className="summary__sub">{branch.address}</span>
        </dd>
      </div>
      <div className="summary__row">
        <dt>Service</dt>
        <dd>
          {service.name} · {formatLength(length)}
        </dd>
      </div>
      <div className="summary__row">
        <dt>Therapist</dt>
        <dd>
          {therapist.name}
          {draft.therapistId === ANY_THERAPIST && <span className="summary__sub">You chose any therapist</span>}
        </dd>
      </div>
      <div className="summary__row">
        <dt>When</dt>
        <dd>
          {formatDay(slot.date, 'long')}
          <span className="summary__sub">
            {slot.start}–{endTime(slot.start, length)}
          </span>
        </dd>
      </div>
    </dl>
  )
}
