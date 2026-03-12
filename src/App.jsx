import { useState, useRef } from 'react'
import './index.css'

// ──────────────────────────────────────────────
// DATA — dễ thay thế toàn bộ content tại đây
// ──────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 1,
    label: 'Chương 1',
    eyebrow: 'Khởi Đầu Hành Trình',
    title: 'Ổ Bánh Mì — Từ Hạt Lúa Mì Đến Bàn Ăn',
    media: {
      type: 'image',          // 'image' | 'video'
      src: '/hero.png',
      alt: 'Bánh mì thủ công vàng giòn trên thớt gỗ',
      // posterSrc: '/poster.jpg',   // dùng khi type='video'
    },
    paragraphs: [
      'Bánh mì không chỉ là thức ăn — đó là cả một cuộc hành trình. Từ những hạt lúa mì vàng óng dưới nắng đồng bằng, qua bàn tay của người thợ nhào bột, đến mẻ lửa thơm ngát của lò nướng, mỗi ổ bánh mang trong mình hàng trăm giờ lao động và tình yêu thủ công.',
      'Nền kinh tế hàng hóa bắt đầu chính từ những điều giản dị như vậy. Khi ổ bánh mì không còn chỉ để ăn mà được mang ra chợ đổi lấy thứ khác, khái niệm "hàng hóa" ra đời — sản phẩm của lao động được tạo ra để trao đổi.',
      'Theo Karl Marx, một hàng hóa phải có hai thuộc tính song song: giá trị sử dụng (thỏa mãn nhu cầu) và giá trị (lao động xã hội kết tinh bên trong). Ổ bánh mì là minh chứng hoàn hảo cho lý luận này.',
    ],
    bullets: [
      { icon: '🌾', text: 'Nguyên liệu từ thiên nhiên — lúa mì, nước, muối, men' },
      { icon: '👨‍🍳', text: 'Lao động thủ công của người thợ bánh lành nghề' },
      { icon: '🔥', text: 'Lò nướng truyền thống — nhiệt độ chuẩn, thời gian đúng' },
      { icon: '⚖️', text: 'Sản phẩm cuối: được trao đổi, mua bán trên thị trường' },
    ],
    quote: 'Mỗi ổ bánh mì chứa đựng cả một nền kinh tế thu nhỏ.',
  },
  {
    id: 2,
    label: 'Chương 2',
    eyebrow: 'Hai Mặt Của Một Ổ Bánh',
    title: 'Giá Trị Sử Dụng & Giá Trị — Hai Linh Hồn Của Hàng Hóa',
    media: {
      type: 'image',
      src: '/hero.png',
      alt: 'Ổ bánh mì cắt đôi, ruột vàng xốp',
    },
    paragraphs: [
      'Khi bạn cầm ổ bánh mì trên tay, bạn đang nắm giữ hai thứ cùng một lúc. Một mặt là cái bụng đói được thỏa mãn — đó là giá trị sử dụng. Mặt kia là cái giá 12,000 đồng bạn phải trả — đó là biểu hiện của giá trị.',
      'Giá trị sử dụng mang tính chất tự nhiên: ổ bánh cung cấp năng lượng, no bụng, ngon miệng — ai cũng có thể thụ hưởng điều đó. Nhưng giá trị lại là phạm trù xã hội: nó chỉ xuất hiện khi có trao đổi, khi lao động của người thợ bánh được quy đổi ra tiền tệ chung.',
      'Điều thú vị là hai thuộc tính này vừa thống nhất, vừa mâu thuẫn. Bạn không thể bán không khí (dù có giá trị sử dụng) vì không có lao động. Ngược lại, nếu ổ bánh không ai muốn ăn, thì lao động của người thợ cũng vô ích.',
    ],
    bullets: [
      { icon: '🍞', text: 'Giá trị sử dụng — công dụng thực tế của hàng hóa' },
      { icon: '💰', text: 'Giá trị — lao động xã hội cần thiết để sản xuất' },
      { icon: '🔗', text: 'Hai thuộc tính tồn tại không thể tách rời' },
    ],
    quote: 'Bạn ăn ổ bánh vì nó ngon, bạn trả tiền vì người thợ đã vất vả làm ra nó.',
  },
  {
    id: 3,
    label: 'Chương 3',
    eyebrow: 'Nơi Gặp Gỡ Của Cung & Cầu',
    title: 'Chợ Bánh Mì — Thị Trường Đơn Giản Nhất Thế Giới',
    media: {
      type: 'image',
      src: '/hero.png',
      alt: 'Quầy bánh mì tấp nập buổi sáng sớm',
    },
    paragraphs: [
      'Mỗi buổi sáng sớm, hàng dài người xếp trước quầy bánh mì. Người bán cặm cụi gắp nhân, nướng bánh; người mua lo liệu chọn loại, trả tiền rồi tất tả đi làm. Đây chính là thị trường — đơn giản, hiệu quả, và sống động.',
      'Thị trường là nơi người mua và người bán gặp nhau để thực hiện giao dịch. Tại đây, ba yếu tố quyết định mọi thứ: cung (lượng bánh bán ra), cầu (lượng người muốn mua), và giá cả (điểm cân bằng giữa hai lực lượng này).',
      'Khi cầu vượt cung — hết bánh trước 8 giờ sáng — giá có xu hướng tăng hoặc người bán sẽ sản xuất nhiều hơn. Khi cung vượt cầu — bánh ế còn thừa chiều tối — giá giảm hoặc người bán sẽ điều chỉnh sản xuất. Thị trường tự điều tiết chính là vậy.',
    ],
    bullets: [
      { icon: '📦', text: 'Cung — rổ bánh đầy ắp của người thợ' },
      { icon: '👥', text: 'Cầu — hàng dài người chờ mua buổi sáng' },
      { icon: '💱', text: 'Giá cả — điểm cân bằng cung và cầu' },
      { icon: '🏛️', text: 'Nhà nước — giám sát, bảo vệ người tiêu dùng' },
    ],
    quote: 'Tại cửa hàng này, ổ bánh mì rũ bỏ lớp áo "bột mì" để biến thành tiền.',
  },
  {
    id: 4,
    label: 'Chương 4',
    eyebrow: 'Hệ Sinh Thái Bánh Mì',
    title: 'Ai Đã Giúp Ổ Bánh Mì Đến Tay Bạn?',
    media: {
      type: 'image',
      src: '/hero.png',
      alt: 'Chuỗi cung ứng bánh mì từ đồng lúa đến tay người dùng',
    },
    paragraphs: [
      'Bạn nghĩ bạn chỉ đang mua ổ bánh mì từ một người bán. Thực ra, bạn đang tiếp nhận công sức của hàng chục người: nông dân trồng lúa, nhà máy xay bột, người thợ nhào bột, người lái xe giao hàng — mỗi người một mắt xích không thể thiếu.',
      'Đây là bức tranh của thị trường đầy đủ: người sản xuất tạo ra giá trị; người tiêu dùng tạo ra nhu cầu; người trung gian kết nối cung với cầu; và nhà nước đảm bảo cuộc chơi diễn ra công bằng, sạch sẽ và trật tự.',
      'Mỗi chủ thể đều vừa là người mua vừa là người bán ở một góc độ nào đó. Người thợ bánh mua bột mì, men, muối từ nhà cung cấp, rồi bán bánh cho khách hàng. Vòng tròn kinh tế cứ thế xoay, tạo nên sự thịnh vượng chung.',
    ],
    bullets: [
      { icon: '👨‍🍳', text: 'Người sản xuất — biến lúa mì thành ổ bánh thơm ngon' },
      { icon: '🧒', text: 'Người tiêu dùng — nhu cầu của bạn tạo ra thị trường' },
      { icon: '🛵', text: 'Trung gian — cầu nối lưu thông hàng hóa' },
      { icon: '🏛️', text: 'Nhà nước — giữ cho cuộc trao đổi công bằng và minh bạch' },
    ],
    quote: 'Ổ bánh mì ngon cần tay người thợ, bụng người đói, bước chân người giao và sự bảo vệ của pháp luật.',
  },
]

// ──────────────────────────────────────────────
// MEDIA COMPONENT
// ──────────────────────────────────────────────
function MediaBlock({ media }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  if (media.type === 'video') {
    return (
      <div className="media-wrapper">
        <video
          ref={videoRef}
          src={media.src}
          poster={media.posterSrc}
          className="media-asset"
          onEnded={() => setPlaying(false)}
          playsInline
        />
        <button
          className={`play-btn${playing ? ' playing' : ''}`}
          onClick={togglePlay}
          aria-label={playing ? 'Dừng video' : 'Phát video'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="media-wrapper">
      <img src={media.src} alt={media.alt} className="media-asset" />
      <div className="media-overlay" />
    </div>
  )
}

// ──────────────────────────────────────────────
// CHAPTER PAGE COMPONENT
// ──────────────────────────────────────────────
function ChapterPage({ chapter, totalChapters, onNext, onPrev, isAnimating }) {
  return (
    <article className={`chapter-page${isAnimating ? ' animate-in' : ''}`}>
      {/* ── HERO MEDIA ── */}
      <header className="chapter-hero">
        <MediaBlock media={chapter.media} />
        <div className="hero-badge">
          <span className="bread-icon">🥖</span>
          <span>{chapter.label}</span>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div className="chapter-body">
        <div className="chapter-inner">
          {/* Eyebrow */}
          <p className="eyebrow">{chapter.eyebrow}</p>

          {/* Title */}
          <h1 className="chapter-title">{chapter.title}</h1>

          {/* Divider */}
          <div className="title-divider">
            <span className="divider-icon">✦</span>
          </div>

          {/* Paragraphs */}
          <div className="paragraphs">
            {chapter.paragraphs.map((p, i) => (
              <p key={i} className="body-text">{p}</p>
            ))}
          </div>

          {/* Bullets */}
          {chapter.bullets && (
            <ul className="bullet-list">
              {chapter.bullets.map((b, i) => (
                <li key={i} className="bullet-item">
                  <span className="bullet-icon">{b.icon}</span>
                  <span className="bullet-text">{b.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Quote */}
          {chapter.quote && (
            <blockquote className="chapter-quote">
              <span className="quote-mark">&ldquo;</span>
              {chapter.quote}
              <span className="quote-mark">&rdquo;</span>
            </blockquote>
          )}

          {/* Progress + label only */}
          <div className="progress-section">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(chapter.id / totalChapters) * 100}%` }}
              />
            </div>
            <p className="progress-label">{chapter.id} / {totalChapters} chương</p>
          </div>
        </div>
      </div>
    </article>
  )
}

// ──────────────────────────────────────────────
// ROOT APP
// ──────────────────────────────────────────────
export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [animating, setAnimating] = useState(false)

  const navigate = (nextIdx) => {
    if (nextIdx < 0 || nextIdx >= CHAPTERS.length || animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrentIdx(nextIdx)
      setAnimating(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 320)
  }

  const chapter = CHAPTERS[currentIdx]

  return (
    <div className="app-root">
      {/* Top progress strip */}
      <div className="top-strip">
        <div
          className="top-strip-fill"
          style={{ width: `${((currentIdx + 1) / CHAPTERS.length) * 100}%` }}
        />
      </div>

      {/* ── Side arrow navigation ── */}
      {currentIdx > 0 && (
        <button
          className="side-arrow side-arrow--left"
          onClick={() => navigate(currentIdx - 1)}
          aria-label="Chương trước"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {currentIdx < CHAPTERS.length - 1 && (
        <button
          className="side-arrow side-arrow--right"
          onClick={() => navigate(currentIdx + 1)}
          aria-label="Chương tiếp theo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {currentIdx === CHAPTERS.length - 1 && (
        <button
          className="side-arrow side-arrow--right finish"
          onClick={() => alert('🎉 Bạn đã hoàn thành tất cả các chương!')}
          aria-label="Hoàn thành"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      <ChapterPage
        key={currentIdx}
        chapter={chapter}
        totalChapters={CHAPTERS.length}
        onNext={() => navigate(currentIdx + 1)}
        onPrev={() => navigate(currentIdx - 1)}
        isAnimating={animating}
      />

      {/* Dot navigation */}
      <div className="dot-nav" role="tablist" aria-label="Chọn chương">
        {CHAPTERS.map((c, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentIdx}
            aria-label={`${c.label}`}
            className={`dot-btn${i === currentIdx ? ' active' : ''}`}
            onClick={() => navigate(i)}
          />
        ))}
      </div>
    </div>
  )
}
