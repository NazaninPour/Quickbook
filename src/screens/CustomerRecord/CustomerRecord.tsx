import './CustomerRecord.css'
import { useState } from 'react'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame'
import Block from '../../components/Block/Block'
import Choice from '../../components/Choice/Choice'
import StatePanel, { viewPanel } from '../../components/StatePanel/StatePanel'
import { BRANCHES, SERVICES, THERAPISTS } from '../../data'
import type { Booking, Customer } from '../../data'
import { endTime, formatDay, formatLength } from '../../availability'
import type { View } from '../../types'

interface Props {
  view: View
  customers: Customer[]
  bookings: Booking[]
  selectedId?: string
  onSelect: (id: string) => void
  onNext: () => void
}

const nameOf = (list: { id: string; name: string }[], id: string) => list.find((x) => x.id === id)?.name ?? ''

export default function CustomerRecord({ view, customers, bookings, selectedId, onSelect, onNext }: Props) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const digits = q.replace(/\D/g, '')
  const matches = q
    ? customers.filter(
        (c) => c.name.toLowerCase().includes(q) || (digits !== '' && c.phone.replace(/\D/g, '').includes(digits)),
      )
    : []
  const customer = customers.find((c) => c.id === selectedId)
  const upcoming = customer
    ? bookings
        .filter((b) => b.customerId === customer.id)
        .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))
    : []

  const panel = viewPanel(view, {
    empty: 'No record found.',
    loading: 'Loading the customer record…',
    error: 'The customer record could not load.',
  })

  let record
  if (panel) record = panel
  else if (q && matches.length === 0) record = <StatePanel kind="empty" text={`No record found for “${query.trim()}”.`} />
  else if (!customer) record = <p className="record__hint">Search, then choose a customer.</p>
  else
    record = (
      <div className="record">
        <p className="record__name">{customer.name}</p>
        <dl className="record__facts">
          <div>
            <dt>Phone</dt>
            <dd>{customer.phone}</dd>
          </div>
          <div>
            <dt>Primary branch</dt>
            <dd>{nameOf(BRANCHES, customer.primaryBranchId)}</dd>
          </div>
        </dl>
        <h3 className="record__subtitle">Upcoming sessions</h3>
        {upcoming.length === 0 ? (
          <p className="record__hint">No upcoming sessions.</p>
        ) : (
          <ul className="record__sessions">
            {upcoming.map((b) => (
              <li key={b.id}>
                <strong>
                  {formatDay(b.date)}, {b.start}–{endTime(b.start, b.length)}
                </strong>{' '}
                · {nameOf(SERVICES, b.serviceId)} ({formatLength(b.length)}) · {nameOf(THERAPISTS, b.therapistId)} ·{' '}
                {nameOf(BRANCHES, b.branchId)}
              </li>
            ))}
          </ul>
        )}
      </div>
    )

  return (
    <ScreenFrame
      eyebrow="Reception"
      title="Find the customer"
      action={{
        label: customer ? `Find a time for ${customer.name}` : 'Find a time',
        onClick: onNext,
        disabled: view !== 'default' || !customer,
      }}
    >
      <Block title="Find customer">
        <label className="record__search">
          <span className="record__label">Name or phone number</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
        </label>
        {matches.length > 0 && (
          <div className="record__results">
            {matches.map((c) => (
              <Choice key={c.id} selected={c.id === selectedId} onSelect={() => onSelect(c.id)}>
                <span className="record__result-name">{c.name}</span>
                <span className="record__result-phone">{c.phone}</span>
              </Choice>
            ))}
          </div>
        )}
      </Block>

      <Block title="Customer record">{record}</Block>
    </ScreenFrame>
  )
}
