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

// True on screens that can comfortably run the WebGL globe: tablet width or
// more, WebGL available, and the user has not asked to save data.
export function useCan3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const test = () => {
      const wide = window.matchMedia('(min-width: 768px)').matches
      const saveData = navigator.connection?.saveData === true
      let gl = false
      try {
        const c = document.createElement('canvas')
        gl = !!(c.getContext('webgl2') || c.getContext('webgl'))
      } catch {
        gl = false
      }
      setOk(wide && gl && !saveData)
    }
    test()
    const mq = window.matchMedia('(min-width: 768px)')
    mq.addEventListener('change', test)
    return () => mq.removeEventListener('change', test)
  }, [])
  return ok
}
