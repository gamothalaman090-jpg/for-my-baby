/* Hero section — GSAP entrance timeline */
import gsap from 'gsap'

export function initHero(): void {
  const tl = gsap.timeline({ delay: 0.2 })

  // Greeting slides in from left
  tl.to('#hero-greeting', {
    opacity: 1,
    x: 0,
    duration: 0.9,
    ease: 'power3.out',
    onStart() {
      gsap.set('#hero-greeting', { x: -40 })
    },
  })
  // Title springs up
  .to(
    '#hero-title',
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'back.out(1.6)',
      onStart() {
        gsap.set('#hero-title', { y: 60 })
      },
    },
    '-=0.5',
  )
  // Subtitle fades in
  .to(
    '#hero-subtitle',
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      onStart() {
        gsap.set('#hero-subtitle', { y: 20 })
      },
    },
    '-=0.5',
  )
  // Bears image pops in with scale
  .to(
    '#hero-bears-img',
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(2)',
      onStart() {
        gsap.set('#hero-bears-img', { scale: 0.6 })
      },
    },
    '-=0.6',
  )
  // Scroll indicator fades
  .to(
    '#scroll-indicator',
    { opacity: 1, duration: 0.6, ease: 'power2.out' },
    '-=0.2',
  )

  // Infinite bounce on scroll indicator
  gsap.to('#scroll-indicator', {
    y: 10,
    duration: 1.1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.5,
  })

  // Bears float gently
  gsap.to('#hero-bears-img', {
    y: -14,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.8,
  })
}
