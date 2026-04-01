/* Heart particle canvas system - floating ambient hearts */

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  phase: number
  color: string
  type: string
}

const COLORS = ['#8B5CF6', '#C084FC', '#F472B6', '#E879F9', '#A78BFA', '#FBCFE8']
const SYMBOLS = ['♥', '♥', '♥', '✦', '✿', '✦']

function makeParticle(canvasWidth: number, canvasHeight: number, randomY = true): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: randomY ? Math.random() * canvasHeight : canvasHeight + 20,
    size: 10 + Math.random() * 18,
    speedY: 0.3 + Math.random() * 0.6,
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: 0.2 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  }
}

export function initParticles(): void {
  const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement | null
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  const particles: Particle[] = []

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)

  // Seed initial particles spread across full canvas
  for (let i = 0; i < 45; i++) {
    particles.push(makeParticle(canvas.width, canvas.height, true))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.y -= p.speedY
      p.x += Math.sin(p.phase) * 0.4 + p.speedX
      p.phase += 0.018

      // Wrap when off-screen top
      if (p.y < -30) {
        Object.assign(p, makeParticle(canvas.width, canvas.height, false))
      }

      const twinkle = p.opacity + 0.15 * Math.sin(p.phase * 1.5)
      ctx.globalAlpha = Math.max(0, Math.min(1, twinkle))
      ctx.fillStyle = p.color
      ctx.font = `${p.size}px serif`
      ctx.fillText(p.type, p.x, p.y)
    }

    ctx.globalAlpha = 1
    requestAnimationFrame(animate)
  }

  animate()
}
