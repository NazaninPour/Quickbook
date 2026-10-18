import './App.css'
import { useState } from 'react'
import { BOOKINGS, CUSTOMERS, SERVICES, SIGNED_IN_CUSTOMER_ID } from '../../data'
import type { Booking } from '../../data'
import type { Draft, ScreenId, Slot, View } from '../../types'
import Branch from '../../screens/Branch/Branch'
import Service from '../../screens/Service/Service'
import Therapist from '../../screens/Therapist/Therapist'
import Times from '../../screens/Times/Times'
import Review from '../../screens/Review/Review'
import Confirmation from '../../screens/Confirmation/Confirmation'
import CustomerRecord from '../../screens/CustomerRecord/CustomerRecord'
import Schedule from '../../screens/Schedule/Schedule'
import Reminders from '../../screens/Reminders/Reminders'
import StateSwitcher from '../../StateSwitcher'

// No routing library: App holds which screen is showing, and screens hand over through callbacks.
// The customer's choices live in `draft`, so they travel through the flow and are never asked twice.
export default function App() {
  const [screen, setScreen] = useState<ScreenId>('branch')
  const [view, setView] = useState<View>('default')
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [bookings, setBookings] = useState(BOOKINGS)
  const [receptionCustomerId, setReceptionCustomerId] = useState<string>()

  const me = customers.find((c) => c.id === SIGNED_IN_CUSTOMER_ID)!
  const [draft, setDraft] = useState<Draft>({ branchId: me.primaryBranchId, savePrimary: false })

  const go = (next: ScreenId) => {
    setScreen(next)
    setView('default')
    window.scrollTo(0, 0)
  }

  // Changing an earlier choice clears only the later choices that depend on it.
  const chooseBranch = (branchId: string) =>
    setDraft((d) => (d.branchId === branchId ? d : { ...d, branchId, therapistId: undefined, slot: undefined }))

  const chooseService = (serviceId: string) =>
    setDraft((d) => {
      if (d.serviceId === serviceId) return d
      const lengths = SERVICES.find((s) => s.id === serviceId)?.lengths ?? []
      return { ...d, serviceId, length: lengths.length === 1 ? lengths[0] : undefined, slot: undefined }
    })

  const chooseLength = (length: number) =>
    setDraft((d) => (d.length === length ? d : { ...d, length, slot: undefined }))

  const chooseTherapist = (therapistId: string) =>
    setDraft((d) => (d.therapistId === therapistId ? d : { ...d, therapistId, slot: undefined }))

  const chooseSlot = (slot: Slot) => setDraft((d) => ({ ...d, slot }))

  const confirmBranch = () => {
    if (draft.savePrimary && draft.branchId) {
      const branchId = draft.branchId
      setCustomers((list) => list.map((c) => (c.id === me.id ? { ...c, primaryBranchId: branchId } : c)))
      setDraft((d) => ({ ...d, savePrimary: false }))
    }
    go('service')
  }

  const addBooking = (b: Omit<Booking, 'id'>) =>
    setBookings((list) => [...list, { ...b, id: `new-${list.length + 1}` }])

  const confirmBooking = () => {
    const { branchId, serviceId, length, slot } = draft
    if (!branchId || !serviceId || !length || !slot) return
    addBooking({
      customerId: me.id,
      therapistId: slot.therapistId,
      branchId,
      serviceId,
      date: slot.date,
      start: slot.start,
      length,
      isNew: true,
    })
    go('confirmation')
  }

  let content
  switch (screen) {
    case 'branch':
      content = (
        <Branch
          view={view}
          primaryBranchId={me.primaryBranchId}
          selectedId={draft.branchId}
          savePrimary={draft.savePrimary}
          onSelect={chooseBranch}
          onSavePrimary={(savePrimary) => setDraft((d) => ({ ...d, savePrimary }))}
          onNext={confirmBranch}
        />
      )
      break
    case 'service':
      content = (
        <Service
          view={view}
          serviceId={draft.serviceId}
          length={draft.length}
          onSelectService={chooseService}
          onSelectLength={chooseLength}
          onBack={() => go('branch')}
          onNext={() => go('therapist')}
        />
      )
      break
    case 'therapist':
      content = (
        <Therapist
          view={view}
          branchId={draft.branchId ?? me.primaryBranchId}
          therapistId={draft.therapistId}
          onSelect={chooseTherapist}
          onBack={() => go('service')}
          onNext={() => go('times')}
        />
      )
      break
    case 'times':
      content = (
        <Times
          view={view}
          bookings={bookings}
          branchId={draft.branchId ?? me.primaryBranchId}
          length={draft.length ?? 60}
          therapistId={draft.therapistId ?? 'any'}
          slot={draft.slot}
          onSelect={chooseSlot}
          onBack={() => go('therapist')}
          onNext={() => go('review')}
        />
      )
      break
    case 'review':
      content = <Review view={view} draft={draft} onBack={() => go('times')} onConfirm={confirmBooking} />
      break
    case 'confirmation':
      content = <Confirmation view={view} draft={draft} />
      break
    case 'record':
      content = (
        <CustomerRecord
          view={view}
          customers={customers}
          bookings={bookings}
          selectedId={receptionCustomerId}
          onSelect={setReceptionCustomerId}
          onNext={() => go('schedule')}
        />
      )
      break
    case 'schedule':
      content = (
        <Schedule
          key={receptionCustomerId}
          view={view}
          customer={customers.find((c) => c.id === receptionCustomerId)}
          bookings={bookings}
          onRecord={(b) => {
            addBooking(b)
            go('reminders')
          }}
        />
      )
      break
    case 'reminders':
      content = <Reminders view={view} customers={customers} bookings={bookings} />
      break
  }

  return (
    <div className="app">
      {content}
      <StateSwitcher state={{ screen, view, draft, bookings, receptionCustomerId }} set={{ setScreen, setView, setDraft, setReceptionCustomerId }} />
    </div>
  )
}