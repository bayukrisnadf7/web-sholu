import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Check, ChevronDown, Compass, Heart, Headphones, Menu, Play, Sparkles, Volume2, Watch, X, Flower2, Smartphone } from 'lucide-react';
import './styles.css';

const steps = [
  { title: 'Berdiri dengan tenang', label: 'Qiyam', image: 'qiyam', caption: 'Ikuti gerakannya, dengarkan bacaannya.', description: 'Sholu menampilkan gerakan dan menuntun bacaan secara bertahap, agar kamu bisa mengikuti dengan tenang.' },
  { title: 'Duduk tasyahud', label: 'Tasyahud akhir', image: 'tasyahud', caption: 'Pelan-pelan, satu bacaan pada satu waktu.', description: 'Lihat posisi duduk dan ikuti panduan bacaan tasyahud. Kamu punya ruang untuk belajar sesuai kemampuanmu.' },
];
const faqs = [
  ['Apakah Sholu cocok untuk yang baru belajar salat?', 'Ya. Sholu dirancang untuk menemani orang yang sedang belajar salat, termasuk mualaf. Panduan gerakan dan bacaan disesuaikan dengan kemampuanmu saat memulai.'],
  ['Apa saja yang dibantu oleh Sholu?', 'Sholu membantu menemukan arah kiblat, menampilkan urutan gerakan, memandu bacaan, dan mengajakmu berefleksi setelah salat untuk menyesuaikan panduan berikutnya.'],
  ['Bagaimana Sholu bekerja dengan Apple Watch?', 'Aplikasi Apple Watch mendampingi sesi salat dengan panduan di pergelangan tangan dan dukungan mikrofon untuk mendengarkan bacaan. Apple Watch terhubung dengan aplikasi Sholu di iPhone.'],
  ['Di mana saya bisa mengunduh Sholu?', 'Landing page ini menampilkan pengenalan dan demo aplikasi Sholu. Tautan unduh resmi belum disertakan. Kamu dapat melihat video demo untuk mengenal pengalamannya terlebih dahulu.'],
];

function Brand({ light = false }) { return <a className={`brand ${light ? 'light' : ''}`} href="#beranda" aria-label="Sholu, kembali ke beranda"><img src="/assets/app-icon.jpg" alt="" /><span>sholu<span className="brand-dot">.</span></span></a>; }

function VideoModal({ onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="video-modal" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal-header"><span>Kenalan dengan Sholu</span><button onClick={onClose} aria-label="Tutup video"><X /></button></div>
    <video controls autoPlay playsInline poster="/assets/video-poster.jpg"><source src="/assets/sholu-demo.mp4" type="video/mp4" />Browser kamu belum mendukung video.</video>
  </dialog>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [video, setVideo] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  return <>
    <a className="skip-link" href="#konten">Lewati ke konten</a>
    <header className="header"><div className="nav container"><Brand />
      <nav className={menu ? 'nav-links open' : 'nav-links'} aria-label="Navigasi utama">
        <a href="#tentang" onClick={() => setMenu(false)}>Tentang Sholu</a><a href="#fitur" onClick={() => setMenu(false)}>Fitur</a><a href="#cara-kerja" onClick={() => setMenu(false)}>Cara kerja</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
      </nav>
      <button className="button nav-cta" onClick={() => setVideo(true)}>Kenalan dengan Sholu <Sparkles size={15} /></button>
      <button className="menu-toggle" aria-label={menu ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </div></header>
    <main id="konten">
      <section className="hero container" id="beranda">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="tiny-star">✧</span> TEMAN DI SETIAP SALATMU</div>
          <h1>Belajar salat,<br />selangkah<br /><span>lebih dekat.</span><span className="heading-spark" aria-hidden="true">✳</span></h1>
          <p>Tidak harus langsung bisa. Tidak harus sendiri.<br className="desktop-break" /> Sholu menemanimu belajar gerakan dan bacaan salat, sesuai langkahmu.</p>
          <div className="hero-actions"><a className="button primary" href="#cara-kerja">Temukan langkah pertamamu <Flower2 size={18} /></a><button className="video-button" onClick={() => setVideo(true)}><span className="play-circle"><Play size={14} fill="currentColor" /></span>Lihat demo</button></div>
          <div className="platforms"><Smartphone size={17} /><span>Dirancang untuk iPhone</span><span className="platform-divider" /><Watch size={17} /><span>Apple Watch</span></div>
        </div>
        <div className="hero-visual" aria-label="Ilustrasi panduan salat di Sholu">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="visual-star star-one" aria-hidden="true">✧</span><span className="visual-star star-two" aria-hidden="true">✦</span>
          <div className="arch-back" />
          <div className="floating-note note-top"><span className="note-icon"><Heart size={19} /></span><div>Mulai dari yang kamu bisa<small>Sholu menemani prosesmu</small></div></div>
          <div className="phone"><div className="phone-screen"><div className="phone-status"><span>9:41</span><span>••• ▰</span></div><div className="phone-island" /><div className="phone-heading"><span>Salat bersama Sholu</span><span>✧</span></div><div className="phone-subhead">Tenang, kamu tidak sendiri.</div><div className="phone-pose"><img src="/assets/qiyam.png" alt="Ilustrasi posisi berdiri dalam salat dari aplikasi Sholu" /></div><div className="phone-instruction"><small>Q I Y A M</small><h3>Berdiri dengan tenang</h3><p>Ikuti gerakan dan bacaan<br />bersama Sholu</p></div><div className="phone-audio"><Volume2 size={15} /><span>Dengarkan, lalu ikuti</span><div className="sound-wave">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ height: `${7 + (i * 7 % 15)}px` }} />)}</div></div><div className="phone-bottom" /></div></div>
          <div className="floating-note note-bottom"><span className="check-badge"><Check size={18} /></span><div>Satu langkah kecil hari ini.<small>Satu langkah lebih dekat.</small></div></div>
          <span className="visual-caption">Pelan-pelan juga sampai. <Heart size={13} /></span>
        </div>
      </section>
      <div className="values-strip"><div className="container values-inner"><span><BookOpen />Panduan sesuai kemampuanmu</span><span><Headphones />Gerakan & bacaan bersama</span><span><Heart />Belajar tanpa merasa sendiri</span></div></div>

      <section className="intro section container" id="tentang"><div className="section-label"><Flower2 size={18} /> KENALAN DENGAN SHOLU</div><h2>Setiap perjalanan dimulai<br />dengan <span>niat yang baik.</span></h2><p>Memulai salat bisa terasa seperti banyak hal yang harus dipelajari sekaligus. Sholu hadir sebagai teman yang menuntunmu, satu gerakan dan satu bacaan pada satu waktu.</p><div className="intro-signature"><span className="signature-line" />Untukmu yang sedang belajar, dan terus berusaha.<span className="signature-line" /></div></section>

      <section className="features section container" id="fitur"><div className="section-heading"><div><div className="section-label">RUANG UNTUK BERTUMBUH</div><h2>Teman belajar.<br /><span>Di setiap langkah.</span></h2></div><p>Dari menemukan arah hingga membangun<br className="desktop-break" /> rasa percaya diri, Sholu ada di sisimu.</p></div>
        <div className="feature-grid"><article className="feature-card movement"><div className="feature-icon"><BookOpen size={22} /></div><h3>Lihat gerakannya.<br />Ikuti dengan tenang.</h3><p>Panduan visual membantumu mengenali setiap posisi dan urutan gerakan salat.</p><div className="movement-art"><div className="mini-arch"><img loading="lazy" src="/assets/qiyam.png" alt="Posisi qiyam" /></div><div className="mini-arch second"><img loading="lazy" src="/assets/tasyahud.png" alt="Posisi tasyahud" /></div><span className="art-flower">✳</span></div><span className="card-footnote">Panduan gerakan, langkah demi langkah</span></article>
        <article className="feature-card recitation"><div className="feature-icon"><Headphones size={22} /></div><h3>Dengarkan.<br />Lalu, coba ucapkan.</h3><p>Ikuti panduan audio dan bacaan di layar. Belajar melafalkan dengan ritmemu sendiri.</p><div className="audio-art"><span className="audio-label"><Volume2 size={16} /> Panduan bacaan</span><div className="waveform">{Array.from({ length: 29 }, (_, i) => <i key={i} style={{ height: `${12 + (Math.sin(i * 1.2) + 1) * 24}px` }} />)}</div><span>Dengarkan · Ikuti · Pelajari</span></div><span className="card-footnote">Ruang untuk mendengar dan mencoba</span></article>
        <article className="feature-card qibla"><div className="feature-icon"><Compass size={22} /></div><h3>Temukan arah.<br />Hadirkan niat.</h3><p>Kompas kiblat membantumu menyiapkan arah sebelum mulai salat.</p><div className="compass-art"><span className="north">U</span><span className="west">B</span><span className="east">T</span><span className="south">S</span><div className="compass-inner"><div className="compass-needle" /><span className="compass-center" /></div></div><span className="card-footnote">Awali salat dengan lebih siap</span></article></div>
      </section>

      <section className="journey-wrap" id="cara-kerja"><div className="container journey section"><div className="guide-preview"><div className="preview-top"><span><Flower2 size={17} /> Sekilas bersama Sholu</span><small>PREVIEW INTERAKTIF</small></div><div className="preview-scene"><span className="preview-arch" /><img key={step.image} src={`/assets/${step.image}.png`} alt={`Ilustrasi gerakan ${step.label}`} /><span className="preview-step-name">{step.label}</span></div><div className="preview-controls">{steps.map((item, i) => <button key={item.label} onClick={() => setActiveStep(i)} aria-pressed={i === activeStep} className={i === activeStep ? 'active' : ''}>{item.label}</button>)}</div><p aria-live="polite">{step.caption}</p></div>
        <div className="journey-copy"><div className="section-label">MULAI DARI DIRIMU</div><h2>Bukan tentang cepat.<br />Tentang <span>terus mendekat.</span></h2><p>Sholu menyesuaikan panduan dengan kemampuanmu. Kamu tidak perlu menguasai semuanya untuk mulai.</p><ol className="journey-list"><li><span className="step-marker"><Sparkles size={20} /></span><div><h3>Kenali titik awalmu</h3><p>Ceritakan bagian yang sudah kamu pahami. Sholu menyiapkan panduan yang sesuai.</p></div></li><li><span className="step-marker"><BookOpen size={20} /></span><div><h3>Salat bersama Sholu</h3><p>Ikuti urutan gerakan, dengarkan audio, dan coba lafalkan bacaan yang ditampilkan.</p></div></li><li><span className="step-marker"><Heart size={20} /></span><div><h3>Refleksi, lalu bertumbuh</h3><p>Kenali yang sudah dikuasai dan yang ingin dipelajari untuk salat berikutnya.</p></div></li></ol></div></div></section>

      <section className="watch-section section container"><div className="watch-copy"><div className="section-label"><Watch size={17} /> SHOLU DI APPLE WATCH</div><h2>Teman kecil.<br /><span>Dekat di pergelangan.</span></h2><p>Bawa panduan salat ke Apple Watch. Tetap terhubung dengan Sholu melalui panduan dan dukungan bacaan di pergelangan tanganmu.</p><span className="device-note"><Smartphone size={16} /> Terhubung dengan aplikasi Sholu di iPhone</span></div><div className="watch-art"><div className="watch-orbit" /><div className="watch-strap" /><div className="watch-body"><span className="watch-crown" /><div className="watch-face"><span className="watch-time">9:41</span><span className="watch-brand">sholu.</span><Flower2 size={36} strokeWidth={1.2} /><h3>Salat bersama</h3><p>Satu bacaan.<br />Satu langkah lebih dekat.</p><span className="watch-pill"><Volume2 size={12} /> Dengarkan & ikuti</span></div></div><span className="watch-spark">✧</span></div></section>

      <section className="faq-section section container" id="faq"><div className="faq-heading"><div className="section-label">KAMU MUNGKIN BERTANYA</div><h2>Yuk, kenali<br /><span>lebih dekat.</span></h2><p>Beberapa hal tentang perjalanan<br />belajarmu bersama Sholu.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="closing container"><div className="closing-flower" aria-hidden="true">✳</div><div className="section-label">LANGKAH KECIL, NIAT YANG BESAR</div><h2>Kamu tidak harus<br />belajar sendirian.</h2><p>Ada Sholu, teman di setiap salatmu.</p><button className="button primary" onClick={() => setVideo(true)}><Play size={16} fill="currentColor" /> Kenalan lewat demo</button><span className="closing-note">Dibuat untuk menemani, sampai kamu lebih mandiri.</span></section>
    </main>
    <footer className="container footer"><Brand /><span>Teman di setiap salatmu.</span><a href="#beranda">Kembali ke atas</a><span className="copyright">© {new Date().getFullYear()} Sholu</span></footer>
    {video && <VideoModal onClose={() => setVideo(false)} />}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
