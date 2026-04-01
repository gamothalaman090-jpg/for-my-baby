/* Promise letter — line-by-line scroll-triggered reveal */
import gsap from 'gsap'

export function initPromise(): void {
  gsap.to('#promise .section-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    onStart() {
      gsap.set('#promise .section-eyebrow', { y: 20 })
    },
    scrollTrigger: {
      trigger: '#promise',
      start: 'top 75%',
    },
  })

  gsap.to('#promise .section-title', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'back.out(1.5)',
    delay: 0.15,
    onStart() {
      gsap.set('#promise .section-title', { y: 30 })
    },
    scrollTrigger: {
      trigger: '#promise',
      start: 'top 75%',
    },
  })

  // Letter card slides up
  gsap.to('#letter-card', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    onStart() {
      gsap.set('#letter-card', { y: 50 })
    },
    scrollTrigger: {
      trigger: '#letter-card',
      start: 'top 80%',
    },
  })

  // Each letter line fades in with stagger
  const lines = ['#ll-1', '#ll-2', '#ll-3', '#ll-4', '#ll-5']
  lines.forEach((sel, i) => {
    gsap.to(sel, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: i * 0.18,
      onStart() {
        gsap.set(sel, { x: -20 })
      },
      scrollTrigger: {
        trigger: '#letter-card',
        start: 'top 70%',
      },
    })
  })
}
