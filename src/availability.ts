// Works out free times from the rota and bookings, and formats dates.

import { DAY_END, DAY_START, ROTA, THERAPISTS } from './data'
import type { Booking, Therapist } from './data'

export const ROW_MINUTES = 30

export const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export const toTime = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

export const endTime = (start: string, length: number): string => toTime(toMinutes(start) + length)

// One entry per 30-minute row of the working day, e.g. 09:00, 09:30 …
export const ROW_TIMES: string[] = (() => {
  const rows: string[] = []
  for (let m = toMinutes(DAY_START); m < toMinutes(DAY_END); m += ROW_MINUTES) rows.push(toTime(m))
  return rows
})()

export const isWorking = (therapistId: string, branchId: string, date: string): boolean =>
  ROTA.some((r) => r.therapistId === therapistId && r.branchId === branchId && r.date === date)

export const therapistsWorking = (branchId: string, date: string): Therapist[] =>
  THERAPISTS.filter((t) => isWorking(t.id, branchId, date))

// Therapists who work at a branch on at least one day.
export const therapistsAtBranch = (branchId: string): Therapist[] =>
  THERAPISTS.filter((t) => ROTA.some((r) => r.therapistId === t.id && r.branchId === branchId))

export const daysAtBranch = (therapistId: string, branchId: string): string[] =>
  ROTA.filter((r) => r.therapistId === therapistId && r.branchId === branchId).map((r) => r.date)

// Start times where a session of `length` minutes fits for this therapist.
export function freeStarts(
  bookings: Booking[],
  therapistId: string,
  branchId: string,
  date: string,
  length: number,
): string[] {
  if (!isWorking(therapistId, branchId, date)) return []
  const taken = bookings
    .filter((b) => b.therapistId === therapistId && b.date === date)
    .map((b) => [toMinutes(b.start), toMinutes(b.start) + b.length])
  const starts: string[] = []
  const dayEnd = toMinutes(DAY_END)
  for (let s = toMinutes(DAY_START); s + length <= dayEnd; s += ROW_MINUTES) {
    const e = s + length
    if (taken.every(([bs, be]) => e <= bs || s >= be)) starts.push(toTime(s))
  }
  return starts
}

export function formatDay(date: string, style: 'short' | 'long' = 'short'): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    weekday: style,
    day: 'numeric',
    month: style,
    timeZone: 'UTC',
  })
}

export const formatLength = (minutes: number): string => `${minutes} min`
