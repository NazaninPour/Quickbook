import './ScreenFrame.css'
import type { ReactNode } from 'react'
import StatePanel from '../StatePanel/StatePanel'

interface Action {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface Props {
  eyebrow: string
  title: string
  intro?: string
  onBack?: () => void
  wide?: boolean
  action?: Action
  actionError?: string // shown in place of the action button
  children: ReactNode
}

// The page around every screen: back link, heading, the screen's blocks, and the action at the bottom.
export default function ScreenFrame({ eyebrow, title, intro, onBack, wide, action, actionError, children }: Props) {
  return (
    <main className={`frame${wide ? ' frame--wide' : ''}`}>
      {onBack && (
        <button type="button" className="frame__back" onClick={onBack}>
          ← Back
        </button>
      )}
      <p className="frame__eyebrow">{eyebrow}</p>
      <h1 className="frame__title">{title}</h1>
      {intro && <p className="frame__intro">{intro}</p>}
      <div className="frame__body">{children}</div>
      {actionError ? (
        <StatePanel kind="error" text={actionError} />
      ) : (
        action && (
          <button type="button" className="frame__action" onClick={action.onClick} disabled={action.disabled}>
            {action.label}
          </button>
        )
      )}
    </main>
  )
}
