// Schengen 90/180 rule maths for the /schengen-calculator page. A short stay
// may not exceed 90 days in any rolling 180-day period, and both the entry
// and exit days count as days of stay. Dates are ISO strings (YYYY-MM-DD) and
// are handled as whole UTC days so time zones never shift a date.

const DAY = 86400000
export const LIMIT = 90
export const WINDOW = 180

export const toDay = (iso) => Math.floor(Date.parse(`${iso}T00:00:00Z`) / DAY)
export const toIso = (d) => new Date(d * DAY).toISOString().slice(0, 10)

// Every day covered by the stays, de-duplicated so overlapping entries are
// not counted twice. Incomplete or reversed rows are ignored.
function daySet(stays) {
  const set = new Set()
  for (const s of stays) {
    if (!s.entry || !s.exit) continue
    const a = toDay(s.entry)
    const b = toDay(s.exit)
    if (Number.isNaN(a) || Number.isNaN(b) || b < a) continue
    for (let d = a; d <= b; d++) set.add(d)
  }
  return set
}

// Days spent in the 180-day window that ends on (and includes) `day`.
function usedOn(set, day) {
  let n = 0
  for (let d = day - WINDOW + 1; d <= day; d++) if (set.has(d)) n++
  return n
}

export function daysUsed(stays, onIso) {
  return usedOn(daySet(stays), toDay(onIso))
}

// Longest stay starting on `entryIso` that never breaks the 90/180 rule.
// Returns { days, lastIso, usedBefore } where usedBefore counts the days
// already used in the window ending the day before entry.
export function maxStayFrom(stays, entryIso) {
  const set = daySet(stays)
  const entry = toDay(entryIso)
  const usedBefore = usedOn(set, entry - 1)
  let last = entry - 1
  for (let d = entry; d < entry + LIMIT + WINDOW; d++) {
    const had = set.has(d)
    set.add(d)
    if (usedOn(set, d) > LIMIT) {
      if (!had) set.delete(d)
      break
    }
    last = d
  }
  return { days: last - entry + 1, lastIso: last >= entry ? toIso(last) : null, usedBefore }
}

// Checks a planned stay. Returns { ok, days, overstayIso } where overstayIso
// is the first day that would take you over 90 days, if any.
export function checkPlannedStay(stays, entryIso, exitIso) {
  const set = daySet(stays)
  const a = toDay(entryIso)
  const b = toDay(exitIso)
  for (let d = a; d <= b; d++) set.add(d)
  for (let d = a; d <= b; d++) {
    if (usedOn(set, d) > LIMIT) return { ok: false, days: b - a + 1, overstayIso: toIso(d) }
  }
  return { ok: true, days: b - a + 1, overstayIso: null }
}
