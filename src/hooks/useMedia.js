import { useEffect, useState } from 'react'

export function useMediaQuery(q) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return match
}
