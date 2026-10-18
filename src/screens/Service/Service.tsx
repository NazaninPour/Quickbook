import './Service.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import Choice from '../../components/Choice/Choice'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { SERVICES } from '../../data'
import { formatLength } from '../../availability'
import type { View } from '../../types'

interface Props {
  view: View
  serviceId?: string
  length?: number
  onSelectService: (id: string) => void
  onSelectLength: (minutes: number) => void
  onBack: () => void
  onNext: () => void
}

export default function Service({ view, serviceId, length, onSelectService, onSelectLength, onBack, onNext }: Props) {
  const service = SERVICES.find((s) => s.id === serviceId)

  const panel = viewPanel(view, {
    empty: 'No services to show.',
    loading: 'Loading the service list…',
    error: 'The service list could not load.',
  })

  return (
    <ScreenFrame
      eyebrow="Book a session · Step 2 of 5"
      title="Choose a service"
      onBack={onBack}
      action={{
        label: 'Choose service and length',
        onClick: onNext,
        disabled: view !== 'default' || !service || !length,
      }}
    >
      <Block title="Services">
        {panel ??
          (SERVICES.length === 0 ? (
            <StatePanel kind="empty" text="No services to show." />
          ) : (
            <div className="service__list">
              {SERVICES.map((s) => (
                <Choice key={s.id} selected={s.id === serviceId} onSelect={() => onSelectService(s.id)}>
                  <span className="service__name">{s.name}</span>
                  <span className="service__lengths">{s.lengths.map(formatLength).join(' or ')}</span>
                </Choice>
              ))}
            </div>
          ))}
      </Block>

      <Block title="Length">
        {view === 'default' && service ? (
          <div className="service__chips" role="group" aria-label={`Length of ${service.name}`}>
            {service.lengths.map((m) => (
              <Choice key={m} compact selected={m === length} onSelect={() => onSelectLength(m)}>
                {formatLength(m)}
              </Choice>
            ))}
          </div>
        ) : (
          <p className="service__hint">Choose a service first.</p>
        )}
      </Block>
    </ScreenFrame>
  )
}
