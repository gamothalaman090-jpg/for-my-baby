/* Story timeline — scroll-triggered alternating slide-in */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initStory(): void {
  // Eyebrow + title
  gsap.to('#story .section-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    onStart() {
      gsap.set('#story .section-eyebrow', { y: 20 })
    },
    scrollTrigger: {
      trigger: '#story',
      start: 'top 75%',
    },
  })

  gsap.to('#story .section-title', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'back.out(1.5)',
    delay: 0.15,
    onStart() {
      gsap.set('#story .section-title', { y: 30 })
    },
    scrollTrigger: {
      trigger: '#story',
      start: 'top 75%',
    },
  })

  // Timeline items — alternate from left/right
  const items = document.querySelectorAll('.timeline-item')

  items.forEach((item, i) => {
    const fromLeft = item.getAttribute('data-from') === 'left'
    const xOffset = fromLeft ? -60 : 60

    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      onStart() {
        gsap.set(item, { x: xOffset })
      },
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      delay: i * 0.05,
    })
  })
}
