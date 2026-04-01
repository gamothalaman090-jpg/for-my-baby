/* Proposal section — magnetic YES, runaway NO, celebration */
import gsap from 'gsap'
import { startConfetti } from '../canvas/confetti'

export function initProposal(): void {
  const yesBtn = document.getElementById('yes-btn') as HTMLButtonElement
  const noBtn  = document.getElementById('no-btn')  as HTMLButtonElement
  const celebration = document.getElementById('celebration')!

  let noAttempts = 0
  const MAX_ATTEMPTS = 5

  // ── Entrance animations ─────────────────────────
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#proposal', start: 'top 70%' },
  })

  tl.to('.proposal-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      onStart() { gsap.set('.proposal-eyebrow', { y: 20 }) } })
    .to('.proposal-lead',    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      onStart() { gsap.set('.proposal-lead', { y: 30 }) } }, '-=0.3')
    .to('.proposal-someday', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      onStart() { gsap.set('.proposal-someday', { y: 20 }) } }, '-=0.4')
    .to('.proposal-question',{ opacity: 1, y: 0, duration: 1, ease: 'back.out(1.8)',
      onStart() { gsap.set('.proposal-question', { y: 50 }) } }, '-=0.4')
    .to('#proposal-buttons', { opacity: 1, duration: 0.6 }, '-=0.3')
    .to('.proposal-hint',    { opacity: 1, duration: 0.5 }, '-=0.1')

  // Heartbeat on YES
  gsap.to(yesBtn, {
    scale: 1.04,
    duration: 0.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 2,
  })

  // ── YES — magnetic hover ────────────────────────
  yesBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = yesBtn.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35
    gsap.to(yesBtn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  })

  yesBtn.addEventListener('mouseleave', () => {
    gsap.to(yesBtn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
  })

  // ── NO — runaway button ─────────────────────────
  const flee = () => {
    if (noAttempts >= MAX_ATTEMPTS) {
      gsap.to(noBtn, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.in(2)' })
      return
    }

    noAttempts++

    const container = document.getElementById('proposal-content')!
    const cw = container.offsetWidth
    const ch = container.offsetHeight

    // Random destination within the section, avoiding center
    const newX = (Math.random() - 0.5) * cw * 0.7
    const newY = (Math.random() - 0.5) * Math.min(ch * 0.4, 160)

    gsap.to(noBtn, {
      x: newX,
      y: newY,
      scale: Math.max(0.4, 1 - noAttempts * 0.12),
      duration: 0.45,
      ease: 'back.out(2)',
      overwrite: 'auto',
    })

    // Shrink label text after a few attempts
    if (noAttempts === 3) noBtn.querySelector('span')!.textContent = 'nope'
    if (noAttempts === 4) noBtn.querySelector('span')!.textContent = '...'
  }

  noBtn.addEventListener('mouseenter', flee)
  noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); flee() }, { passive: false })

  // ── YES click — celebration ─────────────────────
  yesBtn.addEventListener('click', () => {
    celebration.classList.add('active')
    celebration.setAttribute('aria-hidden', 'false')

    // Animate celebration body in sequence
    const celebTl = gsap.timeline()
    celebTl
      .to('.celebration-ring',  { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)',
          onStart() { gsap.set('.celebration-ring', { scale: 0.3 }) } })
      .to('.celebration-title', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          onStart() { gsap.set('.celebration-title', { y: 30 }) } }, '-=0.3')
      .to('.celebration-text',  { opacity: 1, duration: 0.5 }, '-=0.1')
      .to('.celebration-names', { opacity: 1, duration: 0.5 }, '-=0.1')
      .to('.celebration-bears', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.8)',
          onStart() { gsap.set('.celebration-bears', { scale: 0.5 }) } }, '-=0.2')

    // Confetti burst
    startConfetti('confetti-canvas')
  })
}
