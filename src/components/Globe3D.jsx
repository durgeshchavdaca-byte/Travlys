import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import LAND_DOTS from '../data/globeDots.json'
import { HOME_GEO, DEST_GEO } from '../data/destinationGeo'

// Interactive 3D globe for the homepage hero: navy Earth with dotted land,
// coral flight arcs from Ahmedabad to each destination, drag to spin, click a
// marker to select it. Loaded lazily (three.js is heavy), so only devices that
// show it pay for it. Selecting a destination from outside (props) turns the
// globe to face it.

const R = 1
const NAVY = 0x0b1640
const CORAL = 0xff7849
const GOLD = 0xffd6a5

function toVec(lat, lon, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

// Rotation that brings (lat, lon) to face the camera: y spin on the inner
// group, x tilt on the outer group.
function facing(lat, lon) {
  const lonR = THREE.MathUtils.degToRad(lon)
  return { y: -Math.atan2(Math.cos(lonR), -Math.sin(lonR)), x: THREE.MathUtils.degToRad(lat) * 0.85 }
}

function arcPoints(a, b, segments = 64) {
  const angle = a.angleTo(b)
  const alt = 0.06 + 0.16 * (angle / Math.PI)
  const pts = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = new THREE.Vector3().copy(a).lerp(b, t).normalize()
    pts.push(p.multiplyScalar(R * (1 + alt * Math.sin(Math.PI * t))))
  }
  return pts
}

const ARC_VERT = `
  varying float vU;
  void main() { vU = uv.x; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const ARC_FRAG = `
  uniform float uTime; uniform float uActive; uniform vec3 uColor;
  varying float vU;
  void main() {
    float head = fract(uTime * 0.35);
    float d = vU - head; if (d > 0.0) d -= 1.0;
    float pulse = smoothstep(-0.28, 0.0, d) * step(d, 0.0);
    float base = mix(0.16, 0.5, uActive);
    float a = base + pulse * mix(0.55, 1.0, uActive);
    gl_FragColor = vec4(uColor, a);
  }
`
const GLOW_VERT = `
  varying vec3 vNormal;
  void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const GLOW_FRAG = `
  varying vec3 vNormal;
  void main() {
    float i = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    gl_FragColor = vec4(0.42, 0.55, 1.0, 1.0) * i;
  }
`

export default function Globe3D({ destinations, selected, onSelect, onHover, className = '' }) {
  const wrap = useRef(null)
  const api = useRef({})
  // Latest callbacks, read inside the long-lived three.js handlers.
  const cb = useRef({ onSelect, onHover })
  useEffect(() => {
    cb.current = { onSelect, onHover }
  }, [onSelect, onHover])

  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.touchAction = 'pan-y'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20)
    camera.position.set(0, 0, 4.2)

    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const sun = new THREE.DirectionalLight(0xffffff, 1.1)
    sun.position.set(-3, 2, 4)
    scene.add(sun)

    const outer = new THREE.Group()
    const inner = new THREE.Group()
    outer.add(inner)
    scene.add(outer)

    // Earth body and atmosphere glow.
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshPhongMaterial({ color: NAVY, emissive: 0x070d2a, shininess: 12, specular: 0x223366 }),
    )
    inner.add(body)
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.16, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT,
        fragmentShader: GLOW_FRAG,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    )
    scene.add(glow)

    // Land dots as one instanced mesh.
    const dotGeo = new THREE.CircleGeometry(0.0072, 6)
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xc9d4ff, transparent: true, opacity: 0.62, side: THREE.DoubleSide })
    const dots = new THREE.InstancedMesh(dotGeo, dotMat, LAND_DOTS.length)
    const dummy = new THREE.Object3D()
    LAND_DOTS.forEach(([lat, lon], i) => {
      const p = toVec(lat, lon, R * 1.002)
      dummy.position.copy(p)
      dummy.lookAt(p.clone().multiplyScalar(2))
      dummy.updateMatrix()
      dots.setMatrixAt(i, dummy.matrix)
    })
    inner.add(dots)

    // Home marker (Ahmedabad).
    const home = toVec(HOME_GEO.lat, HOME_GEO.lon)
    const homeDot = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 16), new THREE.MeshBasicMaterial({ color: GOLD }))
    homeDot.position.copy(home.clone().multiplyScalar(1.004))
    inner.add(homeDot)

    // Destination markers, hit areas and arcs.
    const markers = []
    const hitMeshes = []
    destinations.forEach((d) => {
      const geo = DEST_GEO[d.slug]
      if (!geo) return
      const p = toVec(geo.lat, geo.lon)
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.017, 16, 16), new THREE.MeshBasicMaterial({ color: CORAL }))
      dot.position.copy(p.clone().multiplyScalar(1.004))
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.03, 0.037, 32),
        new THREE.MeshBasicMaterial({ color: CORAL, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
      )
      ring.position.copy(p.clone().multiplyScalar(1.006))
      ring.lookAt(p.clone().multiplyScalar(2))
      const hit = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), new THREE.MeshBasicMaterial({ visible: false }))
      hit.position.copy(p)
      hit.userData.slug = d.slug
      const arcMat = new THREE.ShaderMaterial({
        vertexShader: ARC_VERT,
        fragmentShader: ARC_FRAG,
        uniforms: { uTime: { value: Math.random() * 3 }, uActive: { value: 0 }, uColor: { value: new THREE.Color(CORAL) } },
        transparent: true,
        depthWrite: false,
      })
      const curve = new THREE.CatmullRomCurve3(arcPoints(home, p))
      const arc = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.0042, 6, false), arcMat)
      inner.add(dot, ring, hit, arc)
      hitMeshes.push(hit)
      markers.push({ slug: d.slug, lat: geo.lat, lon: geo.lon, dot, ring, arc, arcMat, pos: p })
    })

    // Start facing India and the Gulf, slightly tilted.
    const start = facing(22, 75)
    inner.rotation.y = start.y
    outer.rotation.x = start.x

    // Interaction: drag to spin (with inertia), hover/click markers.
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let dragging = false
    let moved = 0
    let last = { x: 0, y: 0 }
    let vel = { x: 0, y: 0 }
    let target = null
    let hovered = null
    let activeSlug = selected || null

    const pick = (e) => {
      const r = renderer.domElement.getBoundingClientRect()
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      const hits = raycaster.intersectObjects([body, ...hitMeshes], false)
      const first = hits[0]
      return first && first.object.userData.slug ? first.object.userData.slug : null
    }
    const onDown = (e) => {
      dragging = true
      moved = 0
      last = { x: e.clientX, y: e.clientY }
      vel = { x: 0, y: 0 }
    }
    const onMove = (e) => {
      if (dragging) {
        const dx = e.clientX - last.x
        const dy = e.clientY - last.y
        moved += Math.abs(dx) + Math.abs(dy)
        last = { x: e.clientX, y: e.clientY }
        if (moved > 4) target = null
        vel = { x: dx * 0.0055, y: dy * 0.0045 }
        inner.rotation.y += vel.x
        outer.rotation.x = THREE.MathUtils.clamp(outer.rotation.x + vel.y, -0.9, 0.9)
        return
      }
      const slug = pick(e)
      if (slug !== hovered) {
        hovered = slug
        renderer.domElement.style.cursor = slug ? 'pointer' : 'grab'
        cb.current.onHover?.(slug)
      }
    }
    const onUp = (e) => {
      if (dragging && moved < 6) {
        const slug = pick(e)
        if (slug) cb.current.onSelect?.(slug)
      }
      dragging = false
    }
    const onLeave = () => {
      dragging = false
      if (hovered) {
        hovered = null
        cb.current.onHover?.(null)
      }
    }
    const c = renderer.domElement
    c.style.cursor = 'grab'
    c.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    c.addEventListener('pointerleave', onLeave)

    api.current.focus = (slug) => {
      activeSlug = slug
      const m = markers.find((x) => x.slug === slug)
      if (!m) return
      const f = facing(m.lat, m.lon)
      // Take the short way round.
      let y = f.y
      const cur = inner.rotation.y
      while (y - cur > Math.PI) y -= Math.PI * 2
      while (y - cur < -Math.PI) y += Math.PI * 2
      target = { x: f.x, y }
    }
    api.current.clear = () => {
      activeSlug = null
    }
    if (activeSlug) api.current.focus(activeSlug)

    // Size to the container.
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Render loop, paused when off screen or the tab is hidden.
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(el)
    const clock = new THREE.Clock()
    let t = 0
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      const dt = Math.min(clock.getDelta(), 0.05)
      t += dt
      if (target) {
        inner.rotation.y += (target.y - inner.rotation.y) * 0.075
        outer.rotation.x += (target.x - outer.rotation.x) * 0.075
        if (Math.abs(target.y - inner.rotation.y) < 0.001 && Math.abs(target.x - outer.rotation.x) < 0.001) target = null
      } else if (!dragging) {
        if (Math.abs(vel.x) > 0.0002 || Math.abs(vel.y) > 0.0002) {
          inner.rotation.y += vel.x
          outer.rotation.x = THREE.MathUtils.clamp(outer.rotation.x + vel.y, -0.9, 0.9)
          vel.x *= 0.94
          vel.y *= 0.94
        } else if (!activeSlug && !reduce) {
          inner.rotation.y += 0.0018
        }
      }
      markers.forEach((m) => {
        const on = m.slug === activeSlug || m.slug === hovered
        m.arcMat.uniforms.uTime.value += reduce ? 0 : dt + 0.0001
        m.arcMat.uniforms.uActive.value += ((on ? 1 : 0) - m.arcMat.uniforms.uActive.value) * 0.12
        const s = on ? 1.6 + Math.sin(t * 4) * 0.25 : 1 + Math.sin(t * 2 + m.lon) * 0.12
        m.ring.scale.setScalar(s)
        m.dot.scale.setScalar(on ? 1.5 : 1)
      })
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      c.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      c.removeEventListener('pointerleave', onLeave)
      scene.traverse((o) => {
        o.geometry?.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((mt) => mt.dispose())
      })
      renderer.dispose()
      c.remove()
    }
    // Build the scene once; selection changes go through api.current.focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selected) api.current.focus?.(selected)
    else api.current.clear?.()
  }, [selected])

  return <div ref={wrap} className={className} />
}
