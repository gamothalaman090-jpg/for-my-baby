/* Confetti burst — fires when YES is clicked */

interface Confetti {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotSpeed: number
  gravity: number
  alpha: number
  shape: 'rect' | 'circle' | 'heart'
}

const CONFETTI_COLORS = [
  '#8B5CF6', '#C084FC', '#F472B6', '#FDE68A',
  '#FBCFE8', '#A78BFA', '#E879F9', '#ffffff',
]

export function startConfetti(canvasId = 'confetti-canvas'): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  canvas.width = canvas.offsetWidth || window.innerWidth
  canvas.height = canvas.offsetHeight || window.innerHeight

  const pieces: Confetti[] = []
  const TOTAL = 160
  const cx = canvas.width / 2
  const cy = canvas.height / 3

  for (let i = 0; i < TOTAL; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 8
    const shapes: Confetti['shape'][] = ['rect', 'circle', 'heart']
    pieces.push({
      x: cx + (Math.random() - 0.5) * 40,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 6 + Math.random() * 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.18 + Math.random() * 0.1,
      alpha: 1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    })
  }

  let frame = 0
  const MAX_FRAMES = 200

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of pieces) {
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.vx *= 0.99
      p.rotation += p.rotSpeed
      if (frame > 80) p.alpha -= 0.012
      p.alpha = Math.max(0, p.alpha)

      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      } else if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Heart
        const s = p.size * 0.08
        ctx.beginPath()
        ctx.moveTo(0, 2 * s)
        ctx.bezierCurveTo(-1 * s, -1 * s, -6 * s, -1 * s, -6 * s, 3 * s)
        ctx.bezierCurveTo(-6 * s, 7 * s, 0, 10 * s, 0, 10 * s)
        ctx.bezierCurveTo(0, 10 * s, 6 * s, 7 * s, 6 * s, 3 * s)
        ctx.bezierCurveTo(6 * s, -1 * s, 1 * s, -1 * s, 0, 2 * s)
        ctx.closePath()
        ctx.fill()
      }

      ctx.restore()
    }

    frame++
    if (frame < MAX_FRAMES) {
      requestAnimationFrame(draw)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  draw()
}
