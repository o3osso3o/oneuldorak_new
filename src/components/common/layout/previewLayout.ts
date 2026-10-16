/** Fit the entire bezel into the viewport, leaving 24px on every side. */
export function calculatePreviewScale(width: number, height: number, frameWidth: number, frameHeight: number) {
  return Math.max(0, Math.min(0.85, (width - 48) / frameWidth, (height - 48) / frameHeight))
}

export function observePreviewLayout() {
  const frame = document.querySelector<HTMLElement>('.device-preview')
  if (!frame) return

  const update = () => {
    const isDesktop = getComputedStyle(frame).getPropertyValue('--desktop-preview').trim() === '1'
    if (!isDesktop) {
      frame.style.removeProperty('--preview-scale')
      document.body.style.removeProperty('--preview-half-width')
      return
    }
    const scale = calculatePreviewScale(
      document.body.clientWidth, document.body.clientHeight, frame.offsetWidth, frame.offsetHeight,
    )
    frame.style.setProperty('--preview-scale', String(scale))
    document.body.style.setProperty('--preview-half-width', `${frame.offsetWidth * scale / 2}px`)
  }

  update()
  const observer = new ResizeObserver(update)
  observer.observe(document.body)
  observer.observe(frame)
  window.addEventListener('resize', update)
  return () => {
    observer.disconnect()
    window.removeEventListener('resize', update)
    frame.style.removeProperty('--preview-scale')
    document.body.style.removeProperty('--preview-half-width')
  }
}

/** DOMRect uses scaled pixels; scrolling and animation styles use layout pixels. */
export function getAppScale() {
  const root = document.getElementById('root')
  return root && root.offsetWidth ? root.getBoundingClientRect().width / root.offsetWidth : 1
}
