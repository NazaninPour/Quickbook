import './StatePanel.css'
import type { View } from '../../types'

type Kind = Exclude<View, 'default'>

interface Props {
  kind: Kind
  text: string
}

const LABEL: Record<Kind, string> = { empty: 'Nothing to show', loading: 'Loading', error: 'Error' }
const ICON: Record<Kind, string> = { empty: '○', loading: '', error: '!' }

// Empty, Loading and Error. Each is told apart by its label, icon and border — never by colour alone.
export default function StatePanel({ kind, text }: Props) {
  return (
    <div
      className={`state state--${kind}`}
      role={kind === 'error' ? 'alert' : kind === 'loading' ? 'status' : undefined}
    >
      {kind === 'loading' ? (
        <span className="state__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <span className="state__icon" aria-hidden="true">
          {ICON[kind]}
        </span>
      )}
      <p className="state__label">{LABEL[kind]}</p>
      <p className="state__text">{text}</p>
    </div>
  )
}

// Returns the panel for a non-default view, or null for the default view.
export function viewPanel(view: View, texts: Record<Kind, string>) {
  return view === 'default' ? null : <StatePanel kind={view} text={texts[view]} />
}
