/* Reasons section — staggered card pop-in with magnetic hover */
import gsap from 'gsap'

export function initReasons(): void {
  gsap.to('#reasons .section-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    onStart() {
      gsap.set('#reasons .section-eyebrow', { y: 20 })
    },
    scrollTrigger: {
      trigger: '#reasons',
      start: 'top 75%',
    },
  })

  gsap.to('#reasons .section-title', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'back.out(1.5)',
    delay: 0.15,
    onStart() {
      gsap.set('#reasons .section-title', { y: 30 })
    },
    scrollTrigger: {
      trigger: '#reasons',
      start: 'top 75%',
    },
  })

  // Stagger all reason cards in
  const cards = document.querySelectorAll('.reason-card')

  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(2)',
      delay: i * 0.08,
      onStart() {
        gsap.set(card, { y: 40, scale: 0.88 })
      },
      scrollTrigger: {
        trigger: '#reasons-grid',
        start: 'top 82%',
      },
    })

    // Magnetic hover on each card
    const el = card as HTMLElement
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height

      gsap.to(el, {
        x: dx * 12,
        y: dy * 8,
        rotateX: -dy * 5,
        rotateY: dx * 5,
        duration: 0.35,
        ease: 'power2.out',
      })
    })

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    })
  })
}
