import './Choice.css'
import type { ReactNode } from 'react'

interface Props {
  selected: boolean
  onSelect: () => void
  compact?: boolean // small chip, used for times
  label?: string // spoken label, when the visible text is short
  children: ReactNode
}

// A selectable card. Selected = tick + thick border + the word "Selected" (not colour alone).
export default function Choice({ selected, onSelect, compact, label, children }: Props) {
  return (
    <button
      type="button"
      className={`choice${compact ? ' choice--compact' : ''}`}
      aria-pressed={selected}
      aria-label={label}
      onClick={onSelect}
    >
      <span className="choice__mark" aria-hidden="true">
        {selected ? '✓' : ''}
      </span>
      <span className="choice__body">{children}</span>
      {selected && !compact && <span className="choice__selected">Selected</span>}
    </button>
  )
}
