import './Block.css'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

// One labelled box on a screen — matches one box in the wireframes.
export default function Block({ title, children }: Props) {
  return (
    <section className="block">
      <h2 className="block__title">{title}</h2>
      {children}
    </section>
  )
}
