import './Branch.css'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import Choice from '../../components/Choice/Choice'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { BRANCHES } from '../../data'
import type { View } from '../../types'

interface Props {
  view: View
  primaryBranchId: string
  selectedId?: string
  savePrimary: boolean
  onSelect: (id: string) => void
  onSavePrimary: (save: boolean) => void
  onNext: () => void
}

export default function Branch({ view, primaryBranchId, selectedId, savePrimary, onSelect, onSavePrimary, onNext }: Props) {
  const primary = BRANCHES.find((b) => b.id === primaryBranchId)
  const canSave = view === 'default' && !!selectedId && selectedId !== primaryBranchId

  const panel = viewPanel(view, {
    empty: 'No branches to show.',
    loading: 'Loading the branch list…',
    error: 'The branch list could not load.',
  })

  return (
    <ScreenFrame
      eyebrow="Book a session · Step 1 of 5"
      title="Choose a branch"
      action={{ label: 'Choose this branch', onClick: onNext, disabled: view !== 'default' || !selectedId }}
    >
      <Block title="Branches">
        {panel ??
          (BRANCHES.length === 0 ? (
            <StatePanel kind="empty" text="No branches to show." />
          ) : (
            <div className="branch__list">
              {BRANCHES.map((b) => (
                <Choice key={b.id} selected={b.id === selectedId} onSelect={() => onSelect(b.id)}>
                  <span className="branch__name">
                    {b.name}
                    {b.id === primaryBranchId && <span className="branch__tag">Your primary branch</span>}
                  </span>
                  <span className="branch__address">{b.address}</span>
                </Choice>
              ))}
            </div>
          ))}
      </Block>

      <Block title="Your saved primary branch">
        <p className="branch__primary">
          {primary ? (
            <>
              <strong>{primary.name}</strong> · {primary.address}
            </>
          ) : (
            'You have not saved a primary branch yet.'
          )}
        </p>
      </Block>

      <label className={`branch__save${canSave ? '' : ' branch__save--off'}`}>
        <input
          type="checkbox"
          checked={canSave && savePrimary}
          disabled={!canSave}
          onChange={(e) => onSavePrimary(e.target.checked)}
        />
        <span>Save my choice as my primary branch</span>
      </label>
    </ScreenFrame>
  )
}
