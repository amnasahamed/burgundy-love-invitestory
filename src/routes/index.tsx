import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import hero from "@/assets/palace-hero.jpg";
import foil from "@/assets/gold-foil.jpg";
import chandelier from "@/assets/chandelier.png.asset.json";
import couple from "@/assets/couple-red.png.asset.json";
import floral from "@/assets/roses-corner.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burgundy Love · A Royal Wedding" },
      {
        name: "description",
        content:
          "Aarav Menon and Diya Nair request the pleasure of your company on 10 December 2026, Taj Malabar, Kochi.",
      },
      { property: "og:title", content: "Burgundy Love · A Royal Wedding" },
      {
        property: "og:description",
        content: "10 December 2026 · Taj Malabar Resort & Spa, Kochi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invite,
});

const WEDDING = new Date("2026-12-10T19:15:00+05:30").getTime();
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Taj+Malabar+Resort+%26+Spa+Willingdon+Island+Kochi";
const CAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Aarav+%26+Diya+Wedding&dates=20261210T130000Z/20261210T170000Z&location=Taj+Malabar+Resort+%26+Spa,+Kochi";

/* ---------------- quiet ornament ---------------- */

function Floral({ className, flip = "" }: { className?: string; flip?: string }) {
  return (
    <img
      src={floral.url}
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className ?? ""}`}
      style={{
        transform: flip,
        objectFit: "contain",
        objectPosition: "left top",
        filter: "saturate(0.8) brightness(0.85) drop-shadow(0 10px 20px rgba(0,0,0,.45))",
      }}
    />
  );
}

function Chandelier({ className = "" }: { className?: string }) {
  return (
    <img
      src={chandelier.url}
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      loading="lazy"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}
      style={{
        filter:
          "sepia(.25) saturate(.8) drop-shadow(0 0 28px color-mix(in oklab, var(--gold) 45%, transparent))",
      }}
    />
  );
}

/** Hairline rule with a tiny lozenge — the only flourish used. */
function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`draw-rule flex items-center justify-center gap-3 text-gold ${className}`}
    >
      <span className="h-[0.5px] w-14 bg-gradient-to-r from-transparent to-gold/70" />
      <span className="h-1.5 w-1.5 rotate-45 border-[0.5px] border-gold" />
      <span className="h-[0.5px] w-14 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

/** Embossed hairline frame with notched corners. */
function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`premium-card relative ${className}`}>
      <span aria-hidden className="draw-frame pointer-events-none absolute inset-0 hairline" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[5px] border-[0.5px] border-gold/20"
      />
      {[
        "left-0 top-0",
        "right-0 top-0 rotate-90",
        "right-0 bottom-0 rotate-180",
        "left-0 bottom-0 -rotate-90",
      ].map((p) => (
        <span
          key={p}
          aria-hidden
          className={`pointer-events-none absolute h-3 w-3 border-l-[0.5px] border-t-[0.5px] border-gold ${p}`}
          style={{ margin: -3 }}
        />
      ))}
      {children}
    </div>
  );
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <p data-reveal className="smallcaps text-gold/80">
        {kicker}
      </p>
      <h3
        data-reveal
        className="mt-4 font-display text-5xl font-light italic foil-text sm:text-6xl"
      >
        {title}
      </h3>
      <div data-reveal>
        <Rule className="mt-6" />
      </div>
    </>
  );
}

/* ---------------- countdown ---------------- */

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.max(0, WEDDING - (now ?? WEDDING));
  const parts = [
    ["Days", Math.floor(d / 864e5)],
    ["Hours", Math.floor(d / 36e5) % 24],
    ["Minutes", Math.floor(d / 6e4) % 60],
    ["Seconds", Math.floor(d / 1e3) % 60],
  ] as const;
  return (
    <Frame className="glass px-2 py-8 sm:px-6">
      <div className="grid grid-cols-4">
        {parts.map(([l, v], i) => (
          <div
            key={l}
            className={`flex flex-col items-center ${i ? "border-l-[0.5px] border-gold/30" : ""}`}
          >
            <span className="inline-flex h-[1em] items-center overflow-hidden font-display text-5xl font-light tabular-nums text-gold-soft sm:text-7xl">
              <span key={now === null ? l : v} className="count-roll block">
                {now === null ? "––" : String(v).padStart(2, "0")}
              </span>
            </span>
            <span className="mt-3 h-[0.5px] w-6 bg-gold/60" />
            <span className="smallcaps mt-3 !text-[0.58rem] !tracking-[0.32em] text-gold/80 sm:!text-[0.68rem]">
              {l}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------------- scratch-to-reveal keepsake ---------------- */

const HEART =
  "M0.5,0.94 C0.2,0.72 0.03,0.53 0.03,0.31 C0.03,0.14 0.16,0.04 0.3,0.04 C0.4,0.04 0.46,0.1 0.5,0.18 C0.54,0.1 0.6,0.04 0.7,0.04 C0.84,0.04 0.97,0.14 0.97,0.31 C0.97,0.53 0.8,0.72 0.5,0.94 Z";
const SCRATCH_BURST = [
  [-88, -54],
  [-34, -96],
  [35, -94],
  [90, -48],
  [94, 34],
  [38, 92],
  [-42, 90],
  [-96, 30],
] as const;

function ScratchHeart() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d", { willReadFrequently: true });
    if (!c || !ctx) return;
    let cancelled = false;
    const paint = async () => {
      const img = new Image();
      img.src = foil;
      await Promise.all([
        img.decode().catch(() => {}),
        document.fonts?.load("48px 'Pinyon Script'").catch(() => {}),
      ]);
      if (cancelled) return;
      const W = (c.width = c.offsetWidth * 2);
      const H = (c.height = c.offsetHeight * 2);
      ctx.drawImage(img, 0, 0, W, H);
      // mute the foil to antique champagne
      ctx.globalCompositeOperation = "saturation";
      ctx.fillStyle = "hsl(40, 38%, 50%)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "#e6cf9f";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "soft-light";
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#f3e5c8");
      g.addColorStop(0.5, "#9e7b3b");
      g.addColorStop(1, "#f3e5c8");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      // debossed hairline heart
      ctx.save();
      ctx.translate(W * 0.1, H * 0.1);
      ctx.scale(W * 0.8, H * 0.8);
      ctx.lineWidth = 1.5 / W;
      ctx.strokeStyle = "rgba(60,30,8,.45)";
      ctx.stroke(new Path2D(HEART));
      ctx.restore();
      ctx.fillStyle = "rgba(58,8,14,.82)";
      ctx.textAlign = "center";
      ctx.font = `${W * 0.1}px 'Pinyon Script', cursive`;
      ctx.fillText("Gently scratch", W / 2, H * 0.43);
      ctx.fillText("to reveal", W / 2, H * 0.55);
      ctx.font = `500 ${W * 0.028}px 'Cormorant Garamond', serif`;
      ctx.letterSpacing = `${W * 0.012}px`;
      ctx.fillText("THE DATE", W / 2, H * 0.65);
    };
    paint();

    let last: { x: number; y: number } | null = null;
    let moves = 0;
    const pt = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width) * c.width,
        y: ((e.clientY - r.top) / r.height) * c.height,
      };
    };
    const stroke = (e: PointerEvent) => {
      if (!last) return;
      const p = pt(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = c.width * 0.13;
      ctx.shadowColor = "black";
      ctx.shadowBlur = c.width * 0.03;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
      if (++moves % 10 === 0) {
        const data = ctx.getImageData(0, 0, c.width, c.height).data;
        let clear = 0;
        for (let i = 3; i < data.length; i += 80) if (data[i]! < 40) clear++;
        if (clear / (data.length / 80) > 0.42) setDone(true);
      }
    };
    const down = (e: PointerEvent) => {
      c.setPointerCapture(e.pointerId);
      last = pt(e);
      last.x += 0.1;
      stroke(e);
    };
    const up = () => {
      last = null;
    };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", stroke);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    return () => {
      cancelled = true;
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", stroke);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div
      className={`relative aspect-square ${done ? "scratch-complete" : ""}`}
      style={{
        filter:
          "drop-shadow(0 24px 30px rgba(0,0,0,.55)) drop-shadow(0 0 40px color-mix(in oklab, var(--gold) 22%, transparent))",
      }}
    >
      <svg width="0" height="0" className="absolute">
        <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
          <path d={HEART} />
        </clipPath>
      </svg>
      <span aria-hidden className="scratch-halo absolute inset-[8%] rounded-full" />
      <div aria-hidden className="scratch-burst absolute inset-1/2 z-20">
        {done &&
          SCRATCH_BURST.map(([x, y], i) => (
            <span
              key={i}
              className="scratch-fragment"
              style={
                {
                  "--burst-x": `${x}px`,
                  "--burst-y": `${y}px`,
                  "--burst-delay": `${i * 45}ms`,
                } as CSSProperties
              }
            />
          ))}
      </div>
      <div className="absolute inset-0 foil-fill" style={{ clipPath: "url(#heart-clip)" }}>
        <div
          className="absolute inset-[3.5%] flex flex-col items-center justify-center bg-wine-deep text-center"
          style={{ clipPath: "url(#heart-clip)" }}
        >
          <div className="absolute inset-0 vignette" />
          <div
            className={`relative -mt-[6%] transition-all duration-[1400ms] ${done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"}`}
          >
            <p className="smallcaps !text-[0.58rem] text-gold/80">Thursday</p>
            <p className="mt-1 font-display text-7xl font-light leading-none foil-text sm:text-8xl">
              10
            </p>
            <p className="font-display text-2xl italic text-gold-soft">December</p>
            <p className="smallcaps mt-2 !text-[0.6rem] text-gold/70">MMXXVI</p>
          </div>
        </div>
        <canvas
          ref={canvas}
          aria-label="Gently scratch the gold heart to reveal the date"
          className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-1000 active:cursor-grabbing ${done ? "pointer-events-none opacity-0" : ""}`}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {done ? "The wedding date is revealed." : ""}
      </p>
    </div>
  );
}

/* ---------------- drifting gold flecks ---------------- */

const FLECKS = Array.from({ length: 9 }, (_, i) => ({
  left: (i * 11.3 + 4) % 100,
  size: 4 + (i % 3) * 2,
  delay: (i % 6) * 2,
  dur: 16 + (i % 4) * 5,
  drift: (i % 2 === 0 ? 1 : -1) * (30 + (i % 3) * 20),
}));

function Flecks() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".fleck").forEach((el, i) => {
          const p = FLECKS[i];
          if (!p) return;
          gsap.to(el, {
            y: () => window.innerHeight + 120,
            x: p.drift,
            rotation: 180,
            duration: p.dur,
            ease: "none",
            repeat: -1,
            delay: p.delay,
          });
        });
      }, ref);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {FLECKS.map((p, i) => (
        <span
          key={i}
          className="fleck absolute -top-10 block rotate-45 bg-gold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: 0.35,
            boxShadow: "0 0 8px var(--gold)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- page ---------------- */

function Invite() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fading, setFading] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const openingVideo = useRef<HTMLVideoElement>(null);
  const openingMusic = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;
        gsap.to("[data-scroll-progress]", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            filter: "blur(4px)",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset["parallax"]) || 8;
          gsap.fromTo(
            el,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".foil-text:not([data-hero-name])").forEach((el) => {
          gsap.fromTo(
            el,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "220% 50%",
              duration: 1.45,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".draw-rule, .draw-frame").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 50% 0 50%)", opacity: 0.25 },
            {
              clipPath: "inset(0 0% 0 0%)",
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top 90%", once: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const markOpeningTap = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() });
  };

  const playOpening = async () => {
    if (open || busy) return;
    const video = openingVideo.current;
    if (!video) return;
    const music = openingMusic.current;
    setBusy(true);
    setFading(false);
    video.currentTime = 0;
    if (music) {
      music.currentTime = 0;
      void music.play().catch(() => setMusicPlaying(false));
    }
    try {
      await video.play();
    } catch {
      music?.pause();
      setBusy(false);
    }
  };

  const toggleMusic = async () => {
    const music = openingMusic.current;
    if (!music) return;
    if (music.paused) {
      await music.play().catch(() => setMusicPlaying(false));
    } else {
      music.pause();
    }
  };

  const updateOpening = () => {
    const video = openingVideo.current;
    if (!video || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= 1.05) setFading(true);
  };

  const finishOpening = () => {
    setOpen(true);
    setBusy(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Flecks />
      <audio
        ref={openingMusic}
        src="/media/kaafi-hai-na-40s.mp3"
        preload="auto"
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={musicPlaying}
        className={`music-control ${fading || open ? "is-visible" : ""} ${musicPlaying ? "is-playing" : ""}`}
      >
        <span aria-hidden className="music-control-ring" />
        <span aria-hidden className="music-control-note">
          ♫
        </span>
        <span className="sr-only">{musicPlaying ? "Pause music" : "Play music"}</span>
      </button>
      <div aria-hidden className="scroll-ornament">
        <span className="scroll-ornament-cap scroll-ornament-cap-top" />
        <span className="scroll-ornament-track">
          <span data-scroll-progress className="scroll-progress" />
        </span>
        <span className="scroll-ornament-cap scroll-ornament-cap-bottom" />
      </div>

      {/* ---------- Curtain opening ---------- */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden bg-[#1b0308] transition-opacity duration-1000 ease-out ${fading || open ? "opacity-0" : "opacity-100"} ${open ? "invisible pointer-events-none" : ""}`}
      >
        <img
          src="/media/curtain-opening-poster.webp"
          alt="Closed burgundy velvet curtains with a Tap to Reveal invitation"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <video
          ref={openingVideo}
          src="/media/curtain-opening-h3-max.mp4"
          poster="/media/curtain-opening-poster.webp"
          preload="auto"
          playsInline
          muted
          aria-hidden
          onTimeUpdate={updateOpening}
          onEnded={finishOpening}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {ripple && (
          <span
            key={ripple.id}
            aria-hidden
            className="opening-ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        )}
        {!busy && !open && (
          <button
            type="button"
            onPointerDown={markOpeningTap}
            onClick={playOpening}
            aria-label="Reveal the wedding invitation"
            className="absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
          />
        )}
      </div>

      {/* ---------- Hero ---------- */}
      <section className="grain relative flex h-dvh min-h-[34rem] flex-col items-center overflow-hidden text-center">
        <img
          src={hero}
          alt="Palace at golden hour framed by velvet drapes"
          width={1536}
          height={1024}
          data-parallax="8"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ filter: "saturate(.7) brightness(.62) sepia(.15)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/20 to-background" />
        <div className="absolute inset-0 vignette" />
        <div
          data-hero-bloom
          aria-hidden
          className={`chandelier-glow pointer-events-none absolute inset-0 z-[5] ${fading || open ? "is-lit" : ""}`}
        />
        <Chandelier
          className={`-top-8 z-10 w-32 sm:w-44 ${fading || open ? "chandelier-illuminate" : ""}`}
        />
        <Floral className="absolute left-0 top-0 z-20 h-32 w-32 sm:h-48 sm:w-48" />
        <Floral
          flip="scale(-1,-1)"
          className="absolute bottom-0 right-0 z-20 h-36 w-36 sm:h-56 sm:w-56"
        />
        <div className="relative z-10 shrink-0 px-6 pt-28 sm:pt-32">
          <p data-hero-kicker className="smallcaps text-gold/85">
            Together with their families
          </p>
          <h2
            data-hero-name
            className={`mt-4 font-display text-6xl font-light italic leading-none foil-text sm:text-8xl ${fading || open ? "hero-gold-sweep" : ""}`}
          >
            Aarav <span className="font-script not-italic text-5xl sm:text-7xl">&</span> Diya
          </h2>
          <p data-hero-kicker className="mt-4 font-display text-lg italic text-gold-soft/85">
            request the pleasure of your company
          </p>
        </div>
        <div data-hero-couple data-parallax="-5" className="relative z-10 min-h-0 w-full flex-1">
          <img
            src={couple.url}
            alt="Aarav and Diya in wine and gold"
            width={1024}
            height={1408}
            className="absolute inset-0 h-full w-full object-contain object-bottom"
            style={{ filter: "saturate(.85) drop-shadow(0 20px 40px rgba(0,0,0,.6))" }}
          />
        </div>
        <div className="relative z-10 shrink-0 px-6 pb-12">
          <div data-hero-meta>
            <Rule />
          </div>
          <p
            data-hero-meta
            className="mt-5 font-display text-2xl font-light tracking-[0.4em] text-gold-soft sm:text-4xl"
          >
            10 · XII · 2026
          </p>
          <p data-hero-meta className="smallcaps mt-3 text-gold/70">
            Taj Malabar · Kochi
          </p>
        </div>
      </section>

      {/* ---------- The Couple ---------- */}
      <section className="grain relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 vignette" />
        <div className="relative mx-auto max-w-5xl">
          <Heading kicker="The Couple" title="Two hearts, one thread" />
          <p
            data-reveal
            className="mx-auto mt-6 max-w-md font-display text-lg italic text-gold-soft/75"
          >
            Seven vows, seven steps, and a lifetime of ordinary mornings made beautiful.
          </p>
          <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
            {[
              {
                r: "The Groom",
                n: "Aarav Menon",
                p: "Son of Mr. Ramesh & Mrs. Latha Menon",
                b: "An architect who sketches palaces on café napkins and believes every good story starts with chai.",
              },
              null,
              {
                r: "The Bride",
                n: "Diya Nair",
                p: "Daughter of Mr. Suresh & Mrs. Anjali Nair",
                b: "A classical dancer and paediatrician who hums old melodies while she works.",
              },
            ].map((c, i) =>
              c ? (
                <div key={i} data-reveal>
                  <Frame className="glass px-8 py-12 text-left">
                    <p className="smallcaps text-gold/75">
                      {i === 0 ? "I" : "II"} — {c.r}
                    </p>
                    <h4 className="mt-5 font-display text-4xl font-light text-gold-soft">{c.n}</h4>
                    <p className="mt-2 font-display text-base italic text-gold/70">{c.p}</p>
                    <span className="mt-6 block h-[0.5px] w-10 bg-gold/60" />
                    <p className="mt-6 text-sm leading-relaxed text-gold-soft/75">{c.b}</p>
                  </Frame>
                </div>
              ) : (
                <span key={i} className="font-script text-6xl text-gold/80">
                  &
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ---------- Save the date ---------- */}
      <section className="grain relative overflow-hidden bg-wine-deep px-6 py-28 text-center">
        <div className="absolute inset-0 vignette" />
        <Floral
          flip="scaleY(-1)"
          className="absolute bottom-0 left-0 h-40 w-40 opacity-80 sm:h-56 sm:w-56"
        />
        <div className="relative">
          <Heading kicker="A keepsake for you" title="Save the Date" />
          <div data-reveal className="mx-auto mt-12 w-72 sm:w-80">
            <ScratchHeart />
          </div>
          <p data-reveal className="mt-8 font-display text-base italic text-gold-soft/60">
            Use your fingertip, as you would with gold leaf.
          </p>
        </div>
      </section>

      {/* ---------- Countdown ---------- */}
      <section className="grain relative overflow-hidden pt-28 text-center">
        <div className="absolute inset-0 vignette" />
        <Chandelier className="-top-6 w-28 opacity-90" />
        <div className="relative px-6 pt-10">
          <Heading kicker="Until forever" title="The Countdown Begins" />
          <div data-reveal className="mx-auto mt-12 max-w-2xl">
            <Countdown />
          </div>
        </div>
        <div className="relative mt-16 h-72 sm:h-[26rem]">
          <img
            src={hero}
            alt="Palace glowing at dusk over a reflecting pool"
            width={1536}
            height={1024}
            loading="lazy"
            data-parallax="6"
            className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
            style={{ filter: "saturate(.65) brightness(.6) sepia(.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
      </section>

      {/* ---------- Events ---------- */}
      <section className="grain relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 vignette" />
        <Floral
          flip="scaleX(-1)"
          className="absolute right-0 top-0 h-36 w-36 opacity-80 sm:h-52 sm:w-52"
        />
        <div className="relative mx-auto max-w-xl">
          <Heading kicker="The Programme" title="Wedding Events" />
          <div className="mt-14 space-y-6">
            {[
              {
                n: "I",
                t: "Muhurtham",
                d: "Thursday, 10 December 2026",
                s: "7:15 PM · Doors open at 6:30 PM",
              },
              {
                n: "II",
                t: "Reception",
                d: "Thursday, 10 December 2026",
                s: "Following the ceremony · Dinner & celebration",
              },
              {
                n: "III",
                t: "The Venue",
                d: "Taj Malabar Resort & Spa",
                s: "Willingdon Island, Kochi 682009",
              },
            ].map((e) => (
              <div key={e.t} data-reveal>
                <Frame className="glass flex items-center gap-6 px-6 py-7 text-left sm:px-8">
                  <span className="w-12 shrink-0 border-r-[0.5px] border-gold/40 pr-4 text-center font-display text-2xl font-light italic text-gold">
                    {e.n}
                  </span>
                  <div>
                    <p className="font-display text-3xl font-light italic text-gold-soft">{e.t}</p>
                    <p className="smallcaps mt-2 !text-[0.6rem] !tracking-[0.3em] text-gold/85">
                      {e.d}
                    </p>
                    <p className="mt-1 text-sm text-gold-soft/65">{e.s}</p>
                  </div>
                </Frame>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- RSVP ---------- */}
      <section className="grain relative overflow-hidden text-center">
        <img
          src={hero}
          alt=""
          aria-hidden
          width={1536}
          height={1024}
          loading="lazy"
          data-parallax="8"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ filter: "saturate(.65) brightness(.55) sepia(.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background/80" />
        <div className="absolute inset-0 vignette" />
        <Chandelier className="-top-6 w-28" />
        <Floral
          flip="scale(-1,-1)"
          className="absolute bottom-0 right-0 h-40 w-40 opacity-85 sm:h-56 sm:w-56"
        />
        <div className="relative flex min-h-[44rem] flex-col items-center px-6 pt-40">
          <p data-reveal className="smallcaps text-gold/80">
            Kindly respond
          </p>
          <h3
            data-reveal
            className="mt-5 font-display text-5xl font-light italic leading-tight foil-text sm:text-6xl"
          >
            Will you join
            <br />
            our big day?
          </h3>
          <div data-reveal>
            <Rule className="mt-7" />
          </div>
          <a
            data-reveal
            href="mailto:?subject=RSVP%20%E2%80%94%20Aarav%20%26%20Diya%20Wedding&body=We%20will%20be%20there!%20Number%20of%20guests%3A%20"
            className="premium-action foil-fill smallcaps mt-10 inline-flex items-center gap-4 rounded-full px-12 py-4 !text-[0.75rem] text-primary"
          >
            RSVP <span aria-hidden className="h-[0.5px] w-6 bg-primary/70" />
          </a>
          <a
            data-reveal
            href={MAPS}
            target="_blank"
            rel="noreferrer"
            className="premium-action smallcaps mt-5 inline-flex items-center gap-3 rounded-full border-[0.5px] border-gold/60 bg-background/40 px-8 py-3 text-gold-soft backdrop-blur transition-colors duration-500 hover:border-gold hover:bg-background/60"
          >
            Directions{" "}
            <span aria-hidden className="font-display text-base normal-case tracking-normal">
              →
            </span>
          </a>
          <a
            data-reveal
            href={CAL}
            target="_blank"
            rel="noreferrer"
            className="premium-link smallcaps mt-6 text-gold/60 transition-colors hover:text-gold"
          >
            Add to calendar
          </a>
          <p data-reveal className="mt-16 font-script text-4xl text-gold/80">
            With love, Aarav & Diya
          </p>
        </div>
      </section>
    </main>
  );
}
