import './Therapist.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import Choice from '../../components/Choice/Choice'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { BRANCHES } from '../../data'
import { daysAtBranch, formatDay, therapistsAtBranch } from '../../availability'
import { ANY_THERAPIST } from '../../types'
import type { View } from '../../types'

interface Props {
  view: View
  branchId: string
  therapistId?: string
  onSelect: (id: string) => void
  onBack: () => void
  onNext: () => void
}

export default function Therapist({ view, branchId, therapistId, onSelect, onBack, onNext }: Props) {
  const branch = BRANCHES.find((b) => b.id === branchId)
  const therapists = therapistsAtBranch(branchId)

  const panel = viewPanel(view, {
    empty: 'No therapists to show.',
    loading: 'Loading the therapist list…',
    error: 'The therapist list could not load.',
  })

  return (
    <ScreenFrame
      eyebrow="Book a session · Step 3 of 5"
      title="Choose a therapist"
      intro={branch ? `Therapists at ${branch.name}` : undefined}
      onBack={onBack}
      action={{ label: 'Choose therapist', onClick: onNext, disabled: view !== 'default' || !therapistId }}
    >
      <Block title="Therapists">
        {panel ??
          (therapists.length === 0 ? (
            <StatePanel kind="empty" text="No therapists to show." />
          ) : (
            <div className="therapist__list">
              {therapists.map((t) => (
                <Choice key={t.id} selected={t.id === therapistId} onSelect={() => onSelect(t.id)}>
                  <span className="therapist__name">{t.name}</span>
                  <span className="therapist__days">
                    Here on {daysAtBranch(t.id, branchId).map((d) => formatDay(d)).join(', ')}
                  </span>
                </Choice>
              ))}
            </div>
          ))}
      </Block>

      <Block title="No preference">
        <Choice
          selected={view === 'default' && therapistId === ANY_THERAPIST}
          onSelect={() => view === 'default' && onSelect(ANY_THERAPIST)}
        >
          <span className="therapist__name">Any therapist is fine</span>
          <span className="therapist__days">You'll see everyone's free times</span>
        </Choice>
      </Block>
    </ScreenFrame>
  )
}
