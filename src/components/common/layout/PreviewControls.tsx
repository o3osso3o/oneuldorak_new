import { createPortal } from 'react-dom'
import qrCode from '../../../assets/background/qrcode.png'
import './PreviewControls.css'

type PreviewControlsProps = { onReplayOnboarding: () => void }

export default function PreviewControls({ onReplayOnboarding }: PreviewControlsProps) {
  const target = document.getElementById('preview-controls')
  if (!target) return null

  return createPortal(
    <aside className="preview-controls" aria-label="모바일 체험 안내">
      <p className="preview-controls__caption">모바일에서 체험하기</p>
      <img className="preview-controls__qr" src={qrCode} alt="오늘도락 모바일 체험 QR코드" />
      <button className="preview-controls__replay" type="button" onClick={onReplayOnboarding}>
        온보딩 다시 보기
      </button>
    </aside>,
    target,
  )
}
