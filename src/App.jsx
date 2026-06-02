import { useEffect, useRef, useState } from "react";
import "./styles/globals.css";

function App() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoEntered, setVideoEntered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.muted = true;
    video.playsInline = true;

    const handleLoadedMetadata = () => {
      setVideoEntered(true);
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {
          // If autoplay is still blocked, the page remains visually intact.
        });
      });
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
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-darkBg text-white selection:bg-neonViolet selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/65 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#" onClick={(e) => e.preventDefault()} className="font-orbitron text-lg font-semibold tracking-[0.28em] text-white">
            VIDEO NAI VIDEO
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
        className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.1),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(0,255,255,0.06),_transparent_22%),linear-gradient(120deg,_#030303_0%,_#050505_42%,_#060606_100%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.88)_34%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.35)_74%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[56%] bg-[linear-gradient(to_right,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_62%,rgba(0,0,0,0)_100%)]" />

        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute right-[3%] top-[86px] h-[calc(100vh-132px)] w-[min(50vw,54rem)] overflow-hidden rounded-[3rem] transition-all duration-1000 ease-out ${videoEntered ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}>
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_54%),radial-gradient(circle_at_70%_25%,rgba(0,255,255,0.12),transparent_26%),linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.45))]" />
            <video
              ref={videoRef}
              src="/images/hero video.mp4"
              playsInline
              preload="auto"
              autoPlay
              muted={false}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 rounded-[3rem] bg-[linear-gradient(135deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_28%,rgba(0,0,0,0)_46%,rgba(0,0,0,0.12)_72%,rgba(0,0,0,0.34)_100%)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[92rem] items-start px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
          <div className="grid w-full items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-6 order-1 lg:order-1">
              <div className="max-w-2xl pt-2 lg:pt-4">
                <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-black/35 px-0 py-0 text-[10px] font-orbitron tracking-[0.32em] text-white/72">
                  <span className="h-1.5 w-1.5 rounded-full bg-neonCyan" />
                  SADEEP DAI PORTFOLIO
                </p>

                <h1 className="max-w-xl font-anton text-5xl leading-[0.88] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  VIDEO EDITOR
                  <span className="block text-white/80">WITH A CINEMATIC EDGE</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-white/74 sm:text-lg sm:leading-9">
                  A focused hero for the client preview: the copy stays on the left, the reel sits on the right, and the video plays once with a soft entry instead of scroll effects.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="rounded-full bg-white px-6 py-3 text-xs font-orbitron font-semibold tracking-[0.3em] text-black transition hover:bg-white/90"
                  >
                    BOOK A CALL
                  </button>
                </div>

                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-xs font-orbitron tracking-[0.28em] text-white/60 sm:gap-4">
                  <div className="rounded-2xl bg-white/5 px-4 py-4">
                    REELS
                  </div>
                  <div className="rounded-2xl bg-white/5 px-4 py-4">
                    ADS
                  </div>
                  <div className="rounded-2xl bg-white/5 px-4 py-4">
                    MOTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
