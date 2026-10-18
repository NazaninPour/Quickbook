// All fake data for QuickBook lives in this one file.
// Names, addresses and phone numbers are made up.

export interface Branch {
  id: string
  name: string
  address: string
}

export interface Service {
  id: string
  name: string
  lengths: number[] // minutes
}

export interface Therapist {
  id: string
  name: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  primaryBranchId: string
}

// Which branch a therapist works at on a given day.
export interface RotaEntry {
  therapistId: string
  branchId: string
  date: string // YYYY-MM-DD
}

export interface Booking {
  id: string
  customerId: string
  therapistId: string
  branchId: string
  serviceId: string
  date: string // YYYY-MM-DD
  start: string // HH:MM
  length: number // minutes
  isNew?: boolean // made in this session
}

export const TODAY = '2026-10-13'
export const DAYS = ['2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17']
export const DAY_START = '09:00'
export const DAY_END = '17:00'

// The customer using the customer flow.
export const SIGNED_IN_CUSTOMER_ID = 'c1'

export const BRANCHES: Branch[] = [
  { id: 'b1', name: 'Riverside', address: '14 Mill Lane' },
  { id: 'b2', name: 'Old Town', address: '3 Market Square' },
  { id: 'b3', name: 'Hillview', address: '88 Station Road' },
]

export const SERVICES: Service[] = [
  { id: 's1', name: 'Initial assessment', lengths: [60] },
  { id: 's2', name: 'Follow-up session', lengths: [30, 60] },
  { id: 's3', name: 'Extended session', lengths: [90] },
]

export const THERAPISTS: Therapist[] = [
  { id: 't1', name: 'Sara Ahmadi' },
  { id: 't2', name: 'Daniel Brooks' },
  { id: 't3', name: 'Mina Rahimi' },
  { id: 't4', name: 'Tom Fischer' },
  { id: 't5', name: 'Lena Okafor' },
]

export const CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alex Morgan', phone: '07700 900101', primaryBranchId: 'b1' },
  { id: 'c2', name: 'Priya Shah', phone: '07700 900102', primaryBranchId: 'b2' },
  { id: 'c3', name: 'James Carter', phone: '07700 900103', primaryBranchId: 'b1' },
  { id: 'c4', name: 'Fatemeh Karimi', phone: '07700 900104', primaryBranchId: 'b3' },
  { id: 'c5', name: 'Olivia Bennett', phone: '07700 900105', primaryBranchId: 'b2' },
  { id: 'c6', name: 'Marcus Lee', phone: '07700 900106', primaryBranchId: 'b3' },
  { id: 'c7', name: 'Hannah Wright', phone: '07700 900107', primaryBranchId: 'b1' },
  { id: 'c8', name: 'Reza Tehrani', phone: '07700 900108', primaryBranchId: 'b2' },
  { id: 'c9', name: 'Sophie Turner', phone: '07700 900109', primaryBranchId: 'b1' },
]

// Some therapists work at two branches (see Interview Analysis P3).
const r = (therapistId: string, branchId: string, dates: string[]): RotaEntry[] =>
  dates.map((date) => ({ therapistId, branchId, date }))

export const ROTA: RotaEntry[] = [
  ...r('t1', 'b1', ['2026-10-14', '2026-10-15', '2026-10-16']),
  ...r('t1', 'b3', ['2026-10-17']),
  ...r('t2', 'b1', ['2026-10-14', '2026-10-15']),
  ...r('t2', 'b2', ['2026-10-16', '2026-10-17']),
  ...r('t3', 'b2', DAYS),
  ...r('t4', 'b3', ['2026-10-14', '2026-10-15']),
  ...r('t4', 'b1', ['2026-10-16', '2026-10-17']),
  ...r('t5', 'b2', ['2026-10-14', '2026-10-15']),
  ...r('t5', 'b3', ['2026-10-16', '2026-10-17']),
]

let n = 0
const b = (
  date: string,
  therapistId: string,
  branchId: string,
  start: string,
  length: number,
  customerId: string,
  serviceId: string,
): Booking => ({ id: `k${++n}`, date, therapistId, branchId, start, length, customerId, serviceId })

export const BOOKINGS: Booking[] = [
  // Wed 14 Oct
  b('2026-10-14', 't1', 'b1', '09:00', 60, 'c3', 's1'),
  b('2026-10-14', 't1', 'b1', '10:30', 30, 'c7', 's2'),
  b('2026-10-14', 't1', 'b1', '13:00', 90, 'c2', 's3'),
  b('2026-10-14', 't1', 'b1', '15:00', 60, 'c9', 's2'),
  b('2026-10-14', 't2', 'b1', '09:30', 30, 'c5', 's2'),
  b('2026-10-14', 't2', 'b1', '11:00', 60, 'c6', 's1'),
  b('2026-10-14', 't2', 'b1', '14:00', 60, 'c3', 's2'),
  b('2026-10-14', 't3', 'b2', '09:00', 90, 'c2', 's3'),
  b('2026-10-14', 't3', 'b2', '12:00', 30, 'c5', 's2'),
  b('2026-10-14', 't3', 'b2', '14:30', 60, 'c8', 's1'),
  b('2026-10-14', 't5', 'b2', '10:00', 60, 'c4', 's2'),
  b('2026-10-14', 't5', 'b2', '13:30', 30, 'c1', 's2'),
  b('2026-10-14', 't4', 'b3', '09:00', 60, 'c6', 's2'),
  b('2026-10-14', 't4', 'b3', '11:30', 90, 'c4', 's3'),
  b('2026-10-14', 't4', 'b3', '15:30', 30, 'c7', 's2'),
  // Thu 15 Oct
  b('2026-10-15', 't1', 'b1', '10:00', 60, 'c1', 's2'),
  b('2026-10-15', 't1', 'b1', '12:00', 30, 'c3', 's2'),
  b('2026-10-15', 't1', 'b1', '14:00', 90, 'c7', 's3'),
  b('2026-10-15', 't2', 'b1', '09:00', 30, 'c8', 's2'),
  b('2026-10-15', 't2', 'b1', '09:30', 60, 'c5', 's1'),
  b('2026-10-15', 't2', 'b1', '13:00', 60, 'c2', 's2'),
  b('2026-10-15', 't3', 'b2', '11:00', 60, 'c4', 's1'),
  b('2026-10-15', 't3', 'b2', '15:00', 60, 'c6', 's2'),
  b('2026-10-15', 't5', 'b2', '09:00', 60, 'c2', 's2'),
  b('2026-10-15', 't5', 'b2', '12:30', 30, 'c8', 's2'),
  b('2026-10-15', 't4', 'b3', '10:00', 30, 'c6', 's2'),
  b('2026-10-15', 't4', 'b3', '13:00', 60, 'c4', 's2'),
  // Fri 16 Oct
  b('2026-10-16', 't1', 'b1', '09:00', 30, 'c7', 's2'),
  b('2026-10-16', 't1', 'b1', '11:00', 60, 'c3', 's1'),
  b('2026-10-16', 't4', 'b1', '10:00', 90, 'c1', 's3'),
  b('2026-10-16', 't4', 'b1', '14:00', 30, 'c2', 's2'),
  b('2026-10-16', 't3', 'b2', '09:30', 60, 'c5', 's2'),
  b('2026-10-16', 't3', 'b2', '13:00', 60, 'c8', 's1'),
  b('2026-10-16', 't2', 'b2', '10:00', 30, 'c2', 's2'),
  b('2026-10-16', 't2', 'b2', '15:00', 60, 'c4', 's2'),
  b('2026-10-16', 't5', 'b3', '09:00', 60, 'c6', 's1'),
  b('2026-10-16', 't5', 'b3', '12:00', 60, 'c4', 's2'),
  // Sat 17 Oct
  b('2026-10-17', 't1', 'b3', '09:00', 60, 'c6', 's2'),
  b('2026-10-17', 't1', 'b3', '11:30', 30, 'c4', 's2'),
  b('2026-10-17', 't5', 'b3', '10:00', 60, 'c3', 's2'),
  b('2026-10-17', 't4', 'b1', '09:00', 60, 'c7', 's2'),
  b('2026-10-17', 't4', 'b1', '13:00', 30, 'c1', 's2'),
  b('2026-10-17', 't3', 'b2', '09:00', 30, 'c2', 's2'),
  b('2026-10-17', 't3', 'b2', '14:00', 90, 'c5', 's3'),
  b('2026-10-17', 't2', 'b2', '11:00', 60, 'c8', 's1'),
]
