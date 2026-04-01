/* Photos section — staggered pop-in cards */
import gsap from 'gsap'

export function initPhotos(): void {
  const cards = document.querySelectorAll('.photo-card')

  gsap.to('#photos .section-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    onStart() {
      gsap.set('#photos .section-eyebrow', { y: 20 })
    },
    scrollTrigger: {
      trigger: '#photos',
      start: 'top 75%',
    },
  })

  gsap.to('#photos .section-title', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'back.out(1.5)',
    delay: 0.15,
    onStart() {
      gsap.set('#photos .section-title', { y: 30 })
    },
    scrollTrigger: {
      trigger: '#photos',
      start: 'top 75%',
    },
  })

  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.8)',
      delay: i * 0.1,
      onStart() {
        gsap.set(card, { scale: 0.85 })
      },
      scrollTrigger: {
        trigger: '#photo-grid',
        start: 'top 80%',
      },
    })
  })
}
