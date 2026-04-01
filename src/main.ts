/* ═══════════════════════════════════════════════
   main.ts — Application entry point
   Registers GSAP plugins, wires all modules
═══════════════════════════════════════════════ */
import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Canvas & Audio
import { initParticles } from './canvas/particles'
import { initAudioPlayer } from './audio/player'

// Sections
import { initHero }     from './sections/hero'
import { initStory }    from './sections/story'
import { initPhotos }   from './sections/photos'
import { initReasons }  from './sections/reasons'
import { initPromise }  from './sections/promise'
import { initProposal } from './sections/proposal'

// ScrollTrigger needs scroll events from window
ScrollTrigger.defaults({ scroller: window })

document.addEventListener('DOMContentLoaded', () => {
  // Start ambient particles immediately
  initParticles()

  // Audio player (floating pill)
  initAudioPlayer()

  // Sections (order matters — each sets up its own scroll triggers)
  initHero()
  initStory()
  initPhotos()
  initReasons()
  initPromise()
  initProposal()

  // Refresh ScrollTrigger after all elements are set
  ScrollTrigger.refresh()
})
