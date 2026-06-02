import { useEffect, useRef, useState } from "react";
import "./styles/globals.css";

function App() {
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
        // autoplay with sound blocked -> fall back silently to muted autoplay
        video.muted = true;
        video.play().catch(() => {});

        // Add a one-time gesture listener so if the user interacts with the page
        // we unmute and resume playback (browsers require a user gesture for sound).
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

      // Staggered text reveals
      setTextVisible(true);
      const timers = [];
      timers.push(window.setTimeout(() => setTitleVisible(true), 300));
      timers.push(window.setTimeout(() => setTagVisible(true), 700));
      timers.push(window.setTimeout(() => setDescVisible(true), 1100));
      timers.push(window.setTimeout(() => setCtaVisible(true), 1500));

      // attach timers to the sectionRef for cleanup reference
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
      // clear any pending reveal timers
      const timers = sectionRef.current && sectionRef.current.__revealTimers;
      if (timers && Array.isArray(timers)) timers.forEach((t) => clearTimeout(t));
      // remove gesture listener if still attached
      if (gestureListener) window.removeEventListener("pointerdown", gestureListener);
    };
  }, []);

  // no explicit unmute control; browsers require a user gesture for sound

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-darkBg text-white selection:bg-neonViolet selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/65 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#" onClick={(e) => e.preventDefault()} className="relative font-orbitron text-lg font-semibold tracking-[0.28em] text-white">
            VIDEO NAI VIDEO
            <span className="absolute -bottom-3 left-0 h-1 w-28 rounded-full bg-[linear-gradient(90deg,#ff3b3b,#ffb86b,#7ef5b6,#6be0ff,#b56bff)] opacity-100" />
          </a>

          <nav className="hidden lg:flex items-center gap-10 text-xs font-orbitron tracking-[0.28em] text-white/70">
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-white">HOME</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-white">ABOUT</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-white">PORTFOLIO</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-white">CONTACT</a>
          </nav>

          <div className="flex items-center gap-4 text-white/80">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 6.5a2.06 2.06 0 1 1-4.12 0 2.06 2.06 0 0 1 4.12 0ZM3.1 9h3.68v12H3.1zM9.05 9h3.52v1.64h.05c.49-.93 1.69-1.9 3.48-1.9 3.72 0 4.41 2.45 4.41 5.64V21h-3.68v-5.12c0-1.22-.02-2.79-1.7-2.79-1.69 0-1.95 1.32-1.95 2.7V21H9.05z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="transition hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15.2V8.8L15.4 12Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <section
        ref={sectionRef}
        className="relative min-h-[calc(82vh-76px)] overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.1),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(0,255,255,0.06),_transparent_22%),linear-gradient(120deg,_#030303_0%,_#050505_42%,_#060606_100%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.88)_34%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.35)_74%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[56%] bg-[linear-gradient(to_right,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_62%,rgba(0,0,0,0)_100%)]" />

        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute right-[1.5%] top-[72px] h-[calc(72vh-72px)] w-[min(52vw,56rem)] overflow-hidden rounded-[2.5rem] transition-all duration-1000 ease-out ${videoEntered ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}>
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_54%),radial-gradient(circle_at_70%_25%,rgba(0,255,255,0.1),transparent_26%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
            {/* no unmute control; playback silently falls back to muted autoplay if blocked */}
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

        <div className="relative z-10 mx-auto flex min-h-[calc(82vh-76px)] w-full max-w-[92rem] items-center px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
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
                  aria-label="Lets talk"
                  className={`group relative mt-7 inline-flex min-w-[240px] items-center justify-center overflow-hidden rounded-md px-6 py-3 text-[1.1rem] font-anton tracking-[0.08em] text-white transition-transform duration-300 ${ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                  {/* animated gradient shine */}
                  <span className="absolute inset-0 -translate-x-6 bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.18),rgba(255,255,255,0.06))] opacity-0 group-hover:opacity-100 transform-gpu transition-opacity duration-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#9b4bff] via-[#7208b5] to-[#ff7ab6] opacity-0 group-hover:opacity-30 transition-opacity duration-400 pointer-events-none" />
                  <span className="relative z-10">LETS TALK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#020202] px-5 py-20 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,140,0.14),transparent_24%),radial-gradient(circle_at_80%_8%,rgba(0,140,255,0.16),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(255,235,0,0.08),transparent_18%)]" />
        <div className="relative mx-auto max-w-[92rem]">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-anton text-[clamp(2.4rem,5.8vw,4.6rem)] leading-none tracking-wide text-white sm:text-[4.6rem]">
              ABOUT ME
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-56 rounded-full bg-[linear-gradient(90deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)]" />

            <p className="mx-auto mt-10 max-w-5xl text-center text-[0.98rem] leading-[1.8] text-white/90 sm:text-[1.15rem]">
              Welcome To The Cinematic World Of Sadeep Dai Don, Where Creativity Meets Technology To Craft Visually Stunning Narratives. With A Passion For Storytelling And A Keen Eye For Detail, I Embark On A Journey To Transform Ordinary Footage Into Extraordinary Visual Experiences.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 lg:mt-20 lg:flex-row lg:justify-between lg:gap-6">
            <div className="flex items-center gap-4 text-[0.95rem] font-orbitron tracking-[0.08em] text-white sm:text-[1.15rem]">
              <span>Cash Cow Editing</span>
            </div>
            <span className="hidden h-3 w-3 rounded-full bg-[linear-gradient(180deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)] lg:block" />

            <div className="flex items-center gap-4 text-[0.95rem] font-orbitron tracking-[0.08em] text-white sm:text-[1.15rem]">
              <span>Reels Editing</span>
            </div>
            <span className="hidden h-3 w-3 rounded-full bg-[linear-gradient(180deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)] lg:block" />

            <div className="flex items-center gap-4 text-[0.95rem] font-orbitron tracking-[0.08em] text-white sm:text-[1.15rem]">
              <span>Logo Animation</span>
            </div>
            <span className="hidden h-3 w-3 rounded-full bg-[linear-gradient(180deg,#ff2a2a,#ffd84d,#32ff9a,#2ed4ff,#8a4dff)] lg:block" />

            <div className="flex items-center gap-4 text-[0.95rem] font-orbitron tracking-[0.08em] text-white sm:text-[1.15rem]">
              <span>Podcast Edit</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
