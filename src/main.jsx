import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  ChevronDown,
  Headphones,
  Heart,
  Menu,
  Play,
  X,
} from "lucide-react";
import "./styles.css";
import { indonesian } from "./translations";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const screens = [
  {
    "image": "takbir-latest.jpeg",
    "name": "Movement guide",
    "caption": "Takbiratul Ihram",
    "text": "Raise both hands to the level of your ears or shoulders."
  },
  {
    "image": "home-latest.jpeg",
    "name": "Home",
    "caption": "Prayer times",
    "text": "See prayer times for your location and start the current prayer from the home screen."
  }
];
const questions = [
  [
    "Who is Sholu for?",
    "Sholu is an iPhone salah companion for people learning to pray, especially new Muslims. It guides movements and recitations during salah."
  ],
  [
    "How does personalization work?",
    "Sholu first asks how well you know the salah movements. If you are just starting, it begins with stage 1. Otherwise, it asks about Al-Fatihah, Final Tashahhud, and other recitations to determine your starting guidance."
  ],
  [
    "What guidance does Sholu provide?",
    "Each stage includes movement guidance. Stage 1 uses tasbih recitations while standing and during Tashahhud; stage 2 includes Al-Fatihah and Final Tashahhud; stage 3 includes all recitations. Listen to Sholu, then repeat the words shown on screen."
  ],
  [
    "Does Sholu listen to my recitation?",
    "With microphone access enabled, Sholu listens to your recitation and guides you to the next movement or recitation."
  ],
  [
    "How does reflection affect my guidance?",
    "In reflection, you rate your recitation fluency from 1 to 5. Based on your recorded reflections, Sholu may offer longer recitation passages or the next stage. You can accept the offer or keep the same guidance."
  ]
];
const features = [
  [
    "Movements and their meanings",
    "Explore the movement guide to see the position and meaning of each salah movement."
  ],
  [
    "Listen to the recitation",
    "Just listen to Sholu and repeat the words shown on your screen."
  ],
  [
    "Listens to your recitations",
    "With your microphone on, Sholu will listen to your recitation and guide you to the next step."
  ]
];
const steps = [
  [
    "Prayer Movements",
    "Choose whether you are just starting, know a few movements, or know all the salah movements."
  ],
  [
    "Salah recitations",
    "If you already know some movements, Sholu asks about Al-Fatihah, Final Tashahhud, and other recitations. Choose: “I don’t know it yet”, “I can recite it, but still struggle”, or “I can recite it fluently”."
  ],
  [
    "Guidance for your stage",
    "Sholu determines your starting stage from your movement knowledge and fluency in Al-Fatihah and Final Tashahhud."
  ]
];
const personalizationScreens = [
  {
    "image": "personalization-latest.jpeg",
    "label": "Movements",
    "caption": "How well do you know the salah movements?"
  },
  {
    "image": "personalization-fatihah.jpeg",
    "label": "Al-Fatihah",
    "caption": "How well do you know Surah Al-Fatihah?"
  },
  {
    "image": "personalization-tashahhud.jpeg",
    "label": "Final Tashahhud",
    "caption": "How well do you know the recitation for the Final Tashahhud?"
  },
  {
    "image": "personalization-other.jpeg",
    "label": "Other recitations",
    "caption": "How well do you know the other salah recitations?"
  }
];
const team = [
  { image: "member-01.jpg", name: "Bayu Krisna D.F", role: "iOS Developer" },
  { image: "member-02.jpg", name: "Bintang Marsyuma R", role: "iOS Developer" },
  { image: "member-03.jpg", name: "M. Syafiq Irzaqy", role: "iOS Developer" },
  { image: "member-04.jpg", name: "M. Muthi Nuritzan", role: "iOS Developer" },
  { image: "member-05.jpg", name: "Rizki Fitriani", role: "UI/UX Designer" },
  { image: "member-06.jpg", name: "Mahfiraturrahmi", role: "UI/UX Designer" },
];
function Brand({ t }) {
  return (
    <a className="brand" href="#home" aria-label={t("Sholu home")}>
      <img src={asset("app-icon.jpg")} alt="" width="38" height="38" />
      <span>sholu</span>
    </a>
  );
}
function AppImage({ name, alt, eager = false }) {
  return (
    <img
      src={asset(`screens/${name}`)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      width={1206}
      height={2622}
    />
  );
}
function VideoModal({ onClose, t }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="video-modal"
      aria-labelledby="video-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-header">
        <h2 id="video-title">{t("Meet Sholu")}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={t("Close video")}
        >
          <X />
        </button>
      </div>
      <video controls autoPlay playsInline>
        <source src={asset("sholu-demo.mp4")} type="video/mp4" />
        {t("Your browser does not support this video.")}
      </video>
    </dialog>
  );
}
function App() {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("sholu-language") === "id" ? "id" : "en";
    } catch {
      return "en";
    }
  });
  const t = (text) => (language === "id" ? (indonesian[text] ?? text) : text);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t(
      "Sholu — Your Salah Companion",
    );
    document.querySelector('meta[name="description"]').content = t(
      "Your Salah Companion. Salah movement and recitation guidance, personalization, and reflection.",
    );
    try {
      localStorage.setItem("sholu-language", language);
    } catch {
      /* Language switching also works without storage. */
    }
  }, [language]);
  const [menu, setMenu] = useState(false);
  const [video, setVideo] = useState(false);
  const [active, setActive] = useState(0);
  const [personalizationActive, setPersonalizationActive] = useState(1);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("Skip to content")}
      </a>
      <header>
        <div className="container navigation">
          <Brand t={t} />
          <nav
            id="mobile-navigation"
            aria-label={t("Main navigation")}
            className={menu ? "nav-links open" : "nav-links"}
          >
            {[
              ["The experience", "experience"],
              ["How it works", "how-it-works"],
              ["The team", "team"],
              ["FAQs", "faq"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {t(label)}
              </a>
            ))}
          </nav>
          <div
            className="language-toggle"
            role="group"
            aria-label={t("Language")}
          >
            {[
              ["en", "EN", "English"],
              ["id", "ID", "Bahasa Indonesia"],
            ].map(([code, label, name]) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-label={name}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="icon-button mobile-menu"
            aria-label={t(menu ? "Close menu" : "Open menu")}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <div className="hero-intro">
          <section className="hero container" id="home">
            <div className="hero-copy">
              <h1>{t("Your Salah Companion")}</h1>
              <p>{t("Do salah at your own pace")}</p>
              <p className="hero-description">
                {t(
                  "Sholu will guide you through the sequence of salah movements and recitations in real time, so you can do salah with ease and peace of mind.",
                )}
              </p>
              <div className="hero-actions">
                <a href="#experience" className="button">
                  {t("Explore Sholu")}
                </a>
                <button className="text-button" onClick={() => setVideo(true)}>
                  <span className="play-icon">
                    <Play size={13} fill="currentColor" />
                  </span>
                  {t("Watch the demo")}
                </button>
              </div>
            </div>
          </section>
          <div className="promise-strip">
            <div className="container promises">
              <span>
                <BookOpen />
                {t("Prayer Movements")}
              </span>
              <span>
                <Headphones />
                {t("Listen to the recitation")}
              </span>
              <span>
                <Heart />
                {t("Do salah at your own pace")}
              </span>
            </div>
          </div>
        </div>
        <section id="experience" className="experience section">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>{t("Prayer guide")}</h2>
              </div>
              <p>{t("The movements and their meanings, from Takbir to Tashahhud.")}</p>
            </div>
            <div className="experience-grid">
              <div className="screen-gallery">
                <div className="gallery-stage">
                  <AppImage
                    key={screens[active].image}
                    eager
                    name={screens[active].image}
                    alt={t(screens[active].name)}
                  />
                </div>
                <div
                  className="screen-tabs"
                  role="group"
                  aria-label={t("Explore app screens")}
                >
                  {screens.map((screen, i) => (
                    <button
                      key={screen.image}
                      aria-pressed={active === i}
                      onClick={() => setActive(i)}
                      className={active === i ? "selected" : ""}
                    >
                      {t(screen.name)}
                    </button>
                  ))}
                </div>
                <div className="gallery-caption" aria-live="polite">
                  <h3>{t(screens[active].caption)}</h3>
                  <p>{t(screens[active].text)}</p>
                </div>
              </div>
              <div className="experience-details">
                {features.map(([title, text]) => (
                  <article key={title}>
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </article>
                ))}
                <div className="recitation-screenshot">
                  <img
                    src={asset("screens/recitation-latest.jpeg")}
                    alt={t(
                      "Original Sholu Takbiratul Ihram recitation screen displaying Allahu Akbar",
                    )}
                    loading="lazy"
                    width="2622"
                    height="1206"
                  />
                  <span>{t("A recitation screen from Sholu")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="journey container section" id="how-it-works">
          <div className="journey-copy">
            <h2>{t("Do salah at your own pace")}</h2>
            <p>
              {t(
                "So Sholu can guide you based on what you already know and what you’d like to learn.",
              )}
            </p>
            <ol className="journey-list">
              {steps.map(([title, text]) => (
                <li key={title}>
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure className="personalization-figure">
            <AppImage
              name={personalizationScreens[personalizationActive].image}
              alt={t(personalizationScreens[personalizationActive].caption)}
            />
            <div className="screen-tabs personalization-tabs" role="group" aria-label={t("Explore personalization screens")}>
              {personalizationScreens.map(({ image, label }, i) => (
                <button key={image} type="button" aria-pressed={personalizationActive === i} className={personalizationActive === i ? "selected" : ""} onClick={() => setPersonalizationActive(i)}>
                  {t(label)}
                </button>
              ))}
            </div>
            <figcaption aria-live="polite">
              {t(personalizationScreens[personalizationActive].caption)}
            </figcaption>
          </figure>
        </section>
        <section className="reflection-wrap">
          <div className="container reflection section">
            <div className="reflection-copy">
              <h2>{t("A Quick Reflection")}</h2>
              <p>
                {t(
                  "When you choose reflection after salah, rate your recitation fluency from 1 to 5. The questions follow the stage you used during that prayer.",
                )}
              </p>
              <p>
                {t(
                  "Based on your recorded reflections, Sholu may offer longer recitation passages or the next stage. You can accept the offer or keep the same guidance.",
                )}
              </p>
            </div>
            <figure>
              <img
                src={asset("screens/reflection.png")}
                alt={t(
                  "Original Sholu reflection screen asking the user to rate their fluency with tasbih recitations on a scale of one to five",
                )}
                width="994"
                height="457"
                loading="lazy"
              />
              <figcaption>
                {t("Reflection in Sholu · Original app screen")}
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="team container section" id="team" aria-labelledby="team-title">
          <div className="team-heading">
            <h2 id="team-title">{t("Behind Sholu")}</h2>
            <p>{t("Meet the people behind the app.")}</p>
          </div>
          <div className="team-grid">
            {team.map(({ image, name, role }) => (
              <figure key={image}>
                <img src={asset(`team/${image}`)} alt={t("Team member portrait")} width="666" height="1000" loading="lazy" />
                <figcaption>
                  <h3>{name}</h3>
                  <p>{t(role)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="faq container section" id="faq">
          <div>
            <h2>{t("About Sholu")}</h2>
            <p>{t("Personalization, salah guidance, and reflection.")}</p>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer], i) => (
              <details key={i}>
                <summary>
                  {t(question)}
                  <ChevronDown size={20} />
                </summary>
                <p>{t(answer)}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing container">
          <h2>{t("Let’s do salah together with Sholu!")}</h2>
          <p>{t("Just start your salah. Sholu will guide you at your own pace!")}</p>
          <button className="button" onClick={() => setVideo(true)}>
            <Play size={15} fill="currentColor" />
            {t("Meet Sholu")}
          </button>
          <span className="closing-signature">
            {t("Your Salah Companion")}
          </span>
        </section>
      </main>
      <footer className="container">
        <div>
          <Brand t={t} />
          <span>{t("Your Salah Companion")}</span>
        </div>
        <span>
          {"© "}
          {new Date().getFullYear()} Sholu
        </span>
        <a href="#home">{t("Back to top")}</a>
      </footer>
      {video && <VideoModal t={t} onClose={() => setVideo(false)} />}
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
