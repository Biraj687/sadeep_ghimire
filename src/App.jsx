import { useEffect, useRef, useState } from "react";
import "./styles/globals.css";

/* ─────────────────────────────────────────────
   Smooth-scroll helper
───────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "WORK", id: "work" },
    { label: "TESTIMONIALS", id: "testimonials" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-black/80 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="site-container flex items-center justify-between py-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
          className="relative font-orbitron text-lg font-semibold tracking-[0.28em] text-white"
        >
          VIDEO NAI VIDEO
          <span className="absolute -bottom-3 left-0 h-[3px] w-28 rounded-full bg-[linear-gradient(90deg,#ff3b3b,#ffb86b,#7ef5b6,#6be0ff,#b56bff)]" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-orbitron tracking-[0.28em] text-white/70">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
              className="transition hover:text-white hover:text-glow-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Socials + hamburger */}
        <div className="flex items-center gap-5 text-white/80">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 6.5a2.06 2.06 0 1 1-4.12 0 2.06 2.06 0 0 1 4.12 0ZM3.1 9h3.68v12H3.1zM9.05 9h3.52v1.64h.05c.49-.93 1.69-1.9 3.48-1.9 3.72 0 4.41 2.45 4.41 5.64V21h-3.68v-5.12c0-1.22-.02-2.79-1.7-2.79-1.69 0-1.95 1.32-1.95 2.7V21H9.05z" /></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="transition hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15.2V8.8L15.4 12Z" /></svg>
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="flex lg:hidden flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl">
          <nav className="site-container flex flex-col gap-4 py-6">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(l.id); setMenuOpen(false); }}
                className="font-orbitron text-xs tracking-[0.28em] text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoEntered, setVideoEntered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [tagVisible, setTagVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.muted = false;
    try { video.volume = 0.9; } catch (e) {}
    video.playsInline = true;
    let gestureListener = null;

    const handleLoadedMetadata = () => {
      setVideoEntered(true);
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        gestureListener = () => {
          try {
            if (video && video.muted) {
              video.muted = false;
              video.volume = 0.9;
              video.play().catch(() => {});
            }
          } catch (e) {}
        };
        window.addEventListener("pointerdown", gestureListener, { once: true });
      });

      setTextVisible(true);
      const timers = [];
      timers.push(window.setTimeout(() => setTitleVisible(true), 300));
      timers.push(window.setTimeout(() => setTagVisible(true), 700));
      timers.push(window.setTimeout(() => setDescVisible(true), 1100));
      timers.push(window.setTimeout(() => setCtaVisible(true), 1500));
      sectionRef.current.__revealTimers = timers;
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    }

    const handleEnded = () => {
      video.pause();
      video.currentTime = video.duration || 0;
    };
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      const timers = sectionRef.current && sectionRef.current.__revealTimers;
      if (timers && Array.isArray(timers)) timers.forEach((t) => clearTimeout(t));
      if (gestureListener) window.removeEventListener("pointerdown", gestureListener);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[calc(82vh-76px)] overflow-hidden bg-[#030303]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.1),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(0,255,255,0.06),_transparent_22%),linear-gradient(120deg,_#030303_0%,_#050505_42%,_#060606_100%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.88)_34%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.35)_74%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[56%] bg-[linear-gradient(to_right,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_62%,rgba(0,0,0,0)_100%)]" />

      {/* Floating video */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute right-[1.5%] top-[72px] h-[calc(72vh-72px)] w-[min(52vw,56rem)] overflow-hidden rounded-[2.5rem] transition-all duration-1000 ease-out ${
            videoEntered ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
          }`}
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_54%),radial-gradient(circle_at_70%_25%,rgba(0,255,255,0.1),transparent_26%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
          <video
            ref={videoRef}
            src="/images/hero video.mp4"
            playsInline
            preload="auto"
            autoPlay
            muted={false}
            className="h-full w-full object-contain object-center"
          />
          <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.05)_28%,rgba(0,0,0,0)_46%,rgba(0,0,0,0.1)_72%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(82vh-76px)] w-full max-w-[1200px] items-center px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="grid w-full items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6 order-1 lg:order-1">
            <div className={`max-w-2xl pt-6 lg:pt-8 transition-all duration-700 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="mb-4 text-[9px] font-orbitron tracking-[0.32em] text-white/85 sm:text-[11px]">
                SADEEP DAI DON
              </p>

              <h1 className={`max-w-[15ch] font-anton text-[clamp(2.2rem,4.2vw,4.4rem)] leading-[0.92] tracking-wide text-white transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
                PROFESSIONAL
                <span className="block">VIDEO EDITOR</span>
              </h1>

              <div className={`mt-4 text-[0.95rem] text-white/80 italic transition-all duration-600 ${tagVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                Keep making your videos look more smokey.
              </div>

              <p className={`mt-5 max-w-md text-[1rem] leading-[1.7] text-white/86 sm:text-[1.08rem] transition-all duration-700 ${descVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
                Cinematic edits, color grading, and motion design with fast, polished results.
              </p>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                aria-label="Lets talk"
                className={`group relative mt-7 inline-flex min-w-[240px] items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 px-6 py-3 text-[1.1rem] font-anton tracking-[0.08em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 ${ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#9b4bff] via-[#7208b5] to-[#ff7ab6] opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none" />
                <span className="relative z-10">LETS TALK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT + VIDEO EDITS
───────────────────────────────────────────── */
const videoEdits = [
  { id: 1, title: "Cash Cow Edit #1", category: "Cash Cow", duration: "4:32" },
  { id: 2, title: "Brand Reel — Summer 2024", category: "Reels", duration: "0:45" },
  { id: 3, title: "Cinematic Podcast Cut", category: "Podcast", duration: "12:08" },
  { id: 4, title: "Logo Reveal Animation", category: "Logo", duration: "0:12" },
  { id: 5, title: "Cash Cow Edit #2", category: "Cash Cow", duration: "5:17" },
  { id: 6, title: "Product Launch Reel", category: "Reels", duration: "0:30" },
];

const categoryColors = {
  "Cash Cow": "from-[#ff3b3b] to-[#ff7b4b]",
  Reels: "from-[#b56bff] to-[#6be0ff]",
  Podcast: "from-[#32ff9a] to-[#6be0ff]",
  Logo: "from-[#ffb86b] to-[#ff3b3b]",
};

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#020202] py-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,140,0.08),transparent_30%),radial-gradient(circle_at_80%_8%,rgba(0,140,255,0.1),transparent_25%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

      <div className="relative site-container">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/40 mb-4">WHO I AM</p>
          <h2 className="section-title">ABOUT ME</h2>
          <div className="mx-auto mt-5 h-[2px] w-48 rounded-full bg-[linear-gradient(90deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)]" />
        </div>

        {/* Bio + photo row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Text */}
          <div>
            <p className="text-[1.05rem] leading-[1.9] text-white/80 mb-6">
              Welcome to the cinematic world of <span className="text-white font-semibold">Sadeep Dai Don</span>, where creativity meets technology to craft visually stunning narratives.
            </p>
            <p className="text-[1rem] leading-[1.85] text-white/70 mb-8">
              With a passion for storytelling and a keen eye for detail, I transform ordinary footage into extraordinary visual experiences — from cash cow YouTube edits to high-energy brand reels.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "150+", label: "Projects Delivered" },
                { num: "3+", label: "Years Experience" },
                { num: "98%", label: "Client Satisfaction" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center hover:border-white/10 transition-colors duration-300">
                  <div className="font-anton text-[2rem] text-white leading-none mb-1">{s.num}</div>
                  <div className="text-[0.72rem] font-orbitron tracking-[0.15em] text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise pills */}
          <div className="space-y-4">
            <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/40 mb-6">AREAS OF EXPERTISE</p>
            {[
              { skill: "Cash Cow Video Editing", pct: 95 },
              { skill: "Reels & Short-Form Content", pct: 92 },
              { skill: "Cinematic Color Grading", pct: 88 },
              { skill: "Logo Animation & Motion", pct: 82 },
              { skill: "Podcast Editing", pct: 90 },
            ].map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[0.88rem] text-white/80 font-inter">{item.skill}</span>
                  <span className="text-[0.82rem] font-orbitron text-white/40">{item.pct}%</span>
                </div>
                <div className="h-[3px] w-full rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#a855f7,#6be0ff)]"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Best Video Edits ── */}
        <div>
          <div className="text-center mb-12">
            <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/40 mb-3">MY BEST WORK</p>
            <h3 className="font-anton text-[clamp(1.8rem,3.5vw,3rem)] tracking-wide text-white">
              FEATURED EDITS
            </h3>
            <div className="mx-auto mt-4 h-[2px] w-32 rounded-full bg-[linear-gradient(90deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videoEdits.map((edit) => (
              <div
                key={edit.id}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] hover:border-white/10 transition-all duration-400 cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-48 bg-[#0a0a0a] overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[edit.category] || "from-[#a855f7] to-[#6be0ff]"} opacity-10 group-hover:opacity-20 transition-opacity duration-400`} />
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />

                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
                      <svg className="h-6 w-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                    <span className="font-orbitron text-[10px] tracking-wider text-white/80">{edit.duration}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block rounded-full bg-gradient-to-r ${categoryColors[edit.category] || "from-[#a855f7] to-[#6be0ff]"} px-3 py-0.5 text-[10px] font-orbitron tracking-wider text-white`}>
                      {edit.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h4 className="font-anton text-[1.05rem] tracking-wide text-white mb-1 group-hover:text-white/90 transition-colors">
                    {edit.title}
                  </h4>
                  <p className="text-[0.8rem] text-white/40 font-orbitron tracking-wider">VIDEO COMING SOON</p>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none ring-1 ring-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES  (quick strip)
───────────────────────────────────────────── */
function Services() {
  const services = [
    { icon: "🎬", label: "Cash Cow Editing" },
    { icon: "⚡", label: "Reels Editing" },
    { icon: "✨", label: "Logo Animation" },
    { icon: "🎙️", label: "Podcast Editing" },
    { icon: "🎨", label: "Color Grading" },
    { icon: "🚀", label: "Motion Design" },
  ];

  return (
    <section id="work" className="relative bg-[#030303] py-6 overflow-hidden border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_60%)]" />
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {services.map((s) => (
            <div key={s.label} className="flex items-center gap-3 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
              <span className="font-orbitron text-[11px] tracking-[0.22em] text-white/60 group-hover:text-white/90 transition-colors">{s.label}</span>
              <span className="hidden last:hidden mx-3 h-[3px] w-[3px] rounded-full bg-white/20 lg:inline-block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    company: "PixelStorm Media",
    industry: "Digital Marketing Agency",
    quote:
      "Sadeep delivered a cinematic brand reel that absolutely blew us away. The color grading and pacing were on another level. Our engagement tripled after posting it.",
    rating: 5,
    project: "Brand Reel",
  },
  {
    id: 2,
    company: "NovaSphere Productions",
    industry: "YouTube Network",
    quote:
      "We've worked with many editors, but Sadeep's cash cow edits are the cleanest we've ever seen. Consistent quality, always delivered on time, zero revision headaches.",
    rating: 5,
    project: "Cash Cow Channel",
  },
  {
    id: 3,
    company: "GrowthLab Studios",
    industry: "Creator Studio",
    quote:
      "The logo animation Sadeep created for our studio intro became our identity. Clients recognize it instantly now. Absolutely worth every penny.",
    rating: 5,
    project: "Logo Animation",
  },
  {
    id: 4,
    company: "Velox Digital",
    industry: "E-commerce Brand",
    quote:
      "Our product launch reels performed 4x better than our previous content. Sadeep understood our brand voice immediately and delivered without needing much direction.",
    rating: 5,
    project: "Product Reels",
  },
  {
    id: 5,
    company: "EchoMind Podcasts",
    industry: "Podcast Network",
    quote:
      "Professional podcast editing with perfect audio-video sync. The pacing is immaculate — our listeners actually commented on how much more polished the show feels.",
    rating: 5,
    project: "Podcast Editing",
  },
  {
    id: 6,
    company: "Apex Content Co.",
    industry: "Content Creation Agency",
    quote:
      "Incredible turnaround time without sacrificing quality. We now exclusively work with Sadeep for all our client video deliverables. Highly recommended.",
    rating: 5,
    project: "Multi-format Editing",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-[#ffb86b]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#020202] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.07),transparent_35%),radial-gradient(circle_at_75%_25%,rgba(0,255,255,0.05),transparent_30%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.035]" />

      <div className="relative site-container">
        <div className="text-center mb-16">
          <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/40 mb-4">WHAT THEY SAY</p>
          <h2 className="section-title">CLIENT REVIEWS</h2>
          <div className="mx-auto mt-5 h-[2px] w-48 rounded-full bg-[linear-gradient(90deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)]" />
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-[1.75] text-white/55">
            Trusted by studios, agencies, and creators worldwide to deliver cinematic results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-400"
            >
              {/* Quote mark */}
              <div className="mb-5 font-serif text-[3.5rem] leading-none text-[#a855f7]/30 select-none">"</div>

              {/* Quote */}
              <p className="flex-1 text-[0.93rem] leading-[1.8] text-white/70 mb-6">{t.quote}</p>

              {/* Rating */}
              <Stars count={t.rating} />

              {/* Company */}
              <div className="mt-5 flex items-center gap-4 border-t border-white/[0.05] pt-5">
                {/* Company avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7]/30 to-[#6be0ff]/20 text-[0.75rem] font-orbitron text-white shrink-0">
                  {t.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-orbitron text-[0.78rem] tracking-wider text-white">{t.company}</p>
                  <p className="text-[0.72rem] text-white/40 mt-0.5">{t.industry}</p>
                </div>
                <span className="ml-auto rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 text-[10px] font-orbitron tracking-wider text-white/35">
                  {t.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate submission (replace with real API call)
    setTimeout(() => setStatus("sent"), 1800);
  };

  const services = [
    "Cash Cow Video Editing",
    "Reels & Short-Form Content",
    "Cinematic Color Grading",
    "Logo Animation",
    "Podcast Editing",
    "Motion Design",
    "Other",
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#030303] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_60%,rgba(168,85,247,0.1),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.06),transparent_28%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

      <div className="relative site-container">
        <div className="text-center mb-16">
          <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/40 mb-4">GET IN TOUCH</p>
          <h2 className="section-title">LET'S WORK TOGETHER</h2>
          <div className="mx-auto mt-5 h-[2px] w-48 rounded-full bg-[linear-gradient(90deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)]" />
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-[1.75] text-white/55">
            Have a project in mind? I'm ready to bring your vision to life. Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-anton text-[1.5rem] tracking-wide text-white mb-2">Ready to Elevate Your Content?</h3>
              <p className="text-[0.9rem] leading-[1.75] text-white/55">
                Whether you need a single edit or an ongoing partnership, I'm here to help you stand out.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                    </svg>
                  ),
                  label: "Email",
                  value: "sadeepghimire83@gmail.com",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: "Phone / WhatsApp",
                  value: "+977 986-0926262",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Response Time",
                  value: "Within 24 hours",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#a855f7]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-orbitron text-[10px] tracking-wider text-white/35 mb-0.5">{item.label}</p>
                    <p className="text-[0.9rem] text-white/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="font-orbitron text-[10px] tracking-[0.3em] text-white/35 mb-4">FIND ME ON</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", href: "https://facebook.com", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: <path d="M6.94 6.5a2.06 2.06 0 1 1-4.12 0 2.06 2.06 0 0 1 4.12 0ZM3.1 9h3.68v12H3.1zM9.05 9h3.52v1.64h.05c.49-.93 1.69-1.9 3.48-1.9 3.72 0 4.41 2.45 4.41 5.64V21h-3.68v-5.12c0-1.22-.02-2.79-1.7-2.79-1.69 0-1.95 1.32-1.95 2.7V21H9.05z" /> },
                  { label: "YouTube", href: "https://youtube.com", icon: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15.2V8.8L15.4 12Z" /> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-[#a855f7]/30 hover:bg-[#a855f7]/10 hover:text-white"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-10">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#32ff9a]/10 text-[#32ff9a]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-anton text-[1.8rem] tracking-wide text-white mb-2">Message Sent!</h3>
                  <p className="text-[0.95rem] text-white/55 max-w-sm">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", service: "", message: "" }); }}
                    className="mt-8 font-orbitron text-[11px] tracking-[0.25em] text-[#a855f7] hover:text-white transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Required *</label>
                    <select
                      name="service"
                      id="contact-service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="" disabled>Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Details *</label>
                    <textarea
                      name="message"
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative w-full overflow-hidden rounded-xl border border-[#a855f7]/30 bg-[#a855f7]/10 py-4 font-anton text-[1.05rem] tracking-[0.12em] text-white transition-all duration-300 hover:border-[#a855f7]/60 hover:bg-[#a855f7]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/0 via-[#a855f7]/10 to-[#a855f7]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-3">
                      {status === "sending" ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-[0.78rem] text-white/30">
                    By submitting, you agree to be contacted regarding your project inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    Services: [
      "Cash Cow Editing",
      "Reels Editing",
      "Logo Animation",
      "Podcast Editing",
      "Color Grading",
    ],
    Navigation: ["Home", "About", "Work", "Testimonials", "Contact"],
    Connect: ["Facebook", "LinkedIn", "YouTube", "Instagram"],
  };

  return (
    <footer className="relative overflow-hidden bg-[#020202] border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05),transparent_55%)]" />

      <div className="relative site-container pt-16 pb-8">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="relative inline-block font-orbitron text-[1.05rem] font-semibold tracking-[0.28em] text-white mb-4">
              VIDEO NAI VIDEO
              <span className="absolute -bottom-2 left-0 h-[2px] w-24 rounded-full bg-[linear-gradient(90deg,#ff3b3b,#ffb86b,#7ef5b6,#6be0ff,#b56bff)]" />
            </div>
            <p className="mt-6 text-[0.85rem] leading-[1.75] text-white/45 max-w-[240px]">
              Cinematic video editing, color grading, and motion design — turning raw footage into unforgettable stories.
            </p>
            {/* Mini socials */}
            <div className="mt-6 flex gap-3">
              {["FB", "LI", "YT", "IG"].map((s) => (
                <div key={s} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[0.6rem] font-orbitron text-white/35 hover:border-white/15 hover:text-white/70 cursor-pointer transition-all">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <p className="font-orbitron text-[10px] tracking-[0.35em] text-white/35 mb-5">{section.toUpperCase()}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-[0.85rem] text-white/50 hover:text-white/90 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.78rem] text-white/30">
            © {year} <span className="text-white/50">Video Nai Video / Sadeep Dai Don</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[0.78rem] text-white/30">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-darkBg text-white selection:bg-neonViolet selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
