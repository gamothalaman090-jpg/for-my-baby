/* Floating audio pill — plays Panata by Tothapi */

export function initAudioPlayer(): void {
  const btn = document.getElementById('audio-player') as HTMLButtonElement | null
  if (!btn) return

  const audio = new Audio('/audio/panata.mp3')
  audio.loop = true
  audio.volume = 0

  const statusEl = btn.querySelector('.audio-status') as HTMLElement
  let playing = false

  // Fade volume in/out smoothly
  const fade = (targetVol: number, duration = 800) => {
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

  btn.addEventListener('click', async () => {
    if (!playing) {
      try {
        await audio.play()
        playing = true
        fade(0.6)
        btn.classList.add('playing')
        statusEl.textContent = 'Pause'
      } catch {
        // Autoplay blocked — still update UI
        statusEl.textContent = 'No file yet'
      }
    } else {
      fade(0)
      setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
      }, 800)
      playing = false
      btn.classList.remove('playing')
      statusEl.textContent = 'Play'
    }
  })

  // If audio file missing, gracefully degrade
  audio.addEventListener('error', () => {
    statusEl.textContent = '(add file)'
    btn.title = 'Place panata.mp3 in public/audio/'
  })
}
