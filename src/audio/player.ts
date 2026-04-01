/* Floating audio pill — plays Panata by Tothapi
   Auto-plays on first user interaction (browsers block silent autoplay).
   Falls back to manual play if file is missing. */

export function initAudioPlayer(): void {
  const btn = document.getElementById('audio-player') as HTMLButtonElement | null
  if (!btn) return

  const audio = new Audio('/audio/panata.mp3')
  audio.loop = true
  audio.volume = 0

  const statusEl = btn.querySelector('.audio-status') as HTMLElement
  let playing = false
  let started = false

  // Smooth volume fade
  const fade = (targetVol: number, duration = 900) => {
    const startVol = audio.volume
    const diff = targetVol - startVol
    const steps = 30
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
      // Browser still blocked — user needs to click the pill manually
      started = false
    }
  }

  // Try autoplay on page load (works in some browsers)
  startPlaying()

  // Hook first user interaction as a fallback trigger
  const onFirstInteraction = () => {
    startPlaying()
    window.removeEventListener('click', onFirstInteraction)
    window.removeEventListener('scroll', onFirstInteraction)
    window.removeEventListener('keydown', onFirstInteraction)
    window.removeEventListener('touchstart', onFirstInteraction)
  }

  window.addEventListener('click', onFirstInteraction, { once: true })
  window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true })
  window.addEventListener('keydown', onFirstInteraction, { once: true })
  window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true })

  // Manual pill toggle
  btn.addEventListener('click', async (e) => {
    e.stopPropagation() // Don't double-fire the window click listener

    if (!playing) {
      try {
        await audio.play()
        playing = true
        started = true
        fade(0.55)
        btn.classList.add('playing')
        statusEl.textContent = 'Pause'
      } catch {
        statusEl.textContent = 'No file yet'
      }
    } else {
      fade(0)
      setTimeout(() => { audio.pause() }, 900)
      playing = false
      btn.classList.remove('playing')
      statusEl.textContent = 'Play'
    }
  })

  // Graceful degradation if file missing
  audio.addEventListener('error', () => {
    statusEl.textContent = '▶ add file'
    btn.title = 'Place panata.mp3 in public/audio/ to enable music'
    started = false
  })
}
