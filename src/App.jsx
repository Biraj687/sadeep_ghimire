import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/globals.css";

function App() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    gsap.registerPlugin(ScrollTrigger);

    video.muted = true;
    video.pause();
    let scrollTrigger = null;

    const syncVideoToScroll = () => {
      if (!scrollTrigger || !video.duration || Number.isNaN(video.duration)) return;

      const targetTime = scrollTrigger.progress * video.duration;
      if (Math.abs(video.currentTime - targetTime) > 0.015) {
        video.currentTime = targetTime;
      }
    };

    const handleLoadedMetadata = () => {
      setVideoReady(true);
      scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.05, video.duration * 650)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: syncVideoToScroll,
        onRefresh: syncVideoToScroll,
      });

      ScrollTrigger.refresh();
      syncVideoToScroll();
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      scrollTrigger?.kill();
    };
  }, []);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    setSoundEnabled(true);
    video.muted = false;

    try {
      await video.play();
    } catch {
      // The user still gets the visual hero even if browser audio policies are strict.
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-darkBg text-white selection:bg-neonViolet selection:text-white">
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.1),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(0,255,255,0.08),_transparent_24%),linear-gradient(120deg,_#030303_0%,_#050505_42%,_#060606_100%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.72),rgba(0,0,0,0.36)_42%,rgba(0,0,0,0.62)_72%,rgba(0,0,0,0.82))]" />

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
          <video
            ref={videoRef}
            src="/images/hero video.mp4"
            playsInline
            preload="auto"
            muted={!soundEnabled}
            className="h-[78vh] w-[min(92vw,1100px)] object-contain object-center drop-shadow-[0_0_40px_rgba(168,85,247,0.18)]"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[92rem] items-center px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-6 order-1 lg:order-1">
              <div className="max-w-2xl lg:pr-6 xl:pr-10">
                <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-orbitron tracking-[0.32em] text-white/65 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-neonCyan shadow-[0_0_18px_rgba(0,255,255,0.55)]" />
                  SADEEP DAI PORTFOLIO
                </p>

                <h1 className="max-w-xl font-anton text-5xl leading-[0.88] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  VIDEO EDITOR
                  <span className="block text-white/75">WITH A CINEMATIC EDGE</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
                  A focused hero for the client preview: the copy sits above the video atmosphere, and the reel advances smoothly as the page scrolls.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="rounded-full bg-white px-6 py-3 text-xs font-orbitron font-semibold tracking-[0.3em] text-black transition hover:bg-white/90"
                  >
                    BOOK A CALL
                  </button>
                  <button
                    type="button"
                    onClick={enableSound}
                    className="rounded-full border border-white/15 bg-black/25 px-5 py-3 text-[10px] font-orbitron tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white/10"
                  >
                    {soundEnabled ? "AUDIO ENABLED" : "ENABLE AUDIO"}
                  </button>
                </div>

                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-xs font-orbitron tracking-[0.28em] text-white/55 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-md">
                    REELS
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-md">
                    ADS
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-md">
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
