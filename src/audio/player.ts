/* Floating audio pill — plays Panata by Tothapi
   Auto-plays on first user interaction (browsers block silent autoplay).
   Falls back to manual play if file is missing. */

export function initAudioPlayer(): void {
  const btn = document.getElementById('audio-player') as HTMLButtonElement | null
  const entryBtn = document.getElementById('entry-btn')
  const overlay = document.getElementById('entry-overlay')
  const envelope = document.getElementById('envelope')

  if (!btn) return

  // Lock scrolling while overlay is active
  document.body.classList.add('overlay-active')

  const audio = new Audio('/audio/panata.mp3')
  audio.loop = true
  audio.volume = 0

  const statusEl = btn.querySelector('.audio-status') as HTMLElement
  let playing = false
  let started = false

  const fade = (targetVol: number, duration = 1200) => {
    const startVol = audio.volume
    const diff = targetVol - startVol
    const steps = 40
    const stepTime = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      audio.volume = Math.max(0, Math.min(1, startVol + diff * (step / steps)))
      if (step >= steps) clearInterval(timer)
    }, stepTime)
  }

  const startPlaying = async () => {
    if (started) return
    started = true
    try {
      await audio.play()
      playing = true
      fade(0.55)
      btn.classList.add('playing')
      statusEl.textContent = 'Pause'
    } catch {
      started = false
    }
  }

  // ENVELOPE OPENING TRIGGER
  if (entryBtn && overlay && envelope) {
    entryBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      
      // 1. Trigger CSS animation
      envelope.classList.add('open')
      
      // 2. Start music ( gesture allowed)
      startPlaying()

      // 3. Fade out overlay after animation
      setTimeout(() => {
        overlay.classList.add('hidden')
        document.body.classList.remove('overlay-active')
      }, 1000)
    })
  }

  // Backup interaction trigger (if they click/touch elsewhere)
  const onFirstInteraction = () => {
    if (!started && !overlay?.classList.contains('hidden')) return
    startPlaying()
    window.removeEventListener('scroll', onFirstInteraction)
    window.removeEventListener('touchstart', onFirstInteraction)
  }

  window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true })
  window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true })

  // Manual pill toggle
  btn.addEventListener('click', async (e) => {
    e.stopPropagation()
    if (!playing) {
      startPlaying()
    } else {
      fade(0)
      setTimeout(() => { audio.pause() }, 1200)
      playing = false
      btn.classList.remove('playing')
      statusEl.textContent = 'Play'
    }
  })

  audio.addEventListener('error', () => {
    statusEl.textContent = '▶ add file'
    btn.title = 'Place panata.mp3 in public/audio/'
    started = false
  })
}

