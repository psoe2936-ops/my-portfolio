"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiSupabase,
} from "@icons-pack/react-simple-icons";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Mail,
  Menu,
  Users,
  X,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    number: "01",
    name: "MMToon",
    category: "FRONTEND WEB APP",
    description:
      "A manga and comics reading website that helps readers find a title and start reading quickly. Built with React, with a clean layout that keeps the focus on the content.",
    technologies: ["React", "JavaScript"],
    highlights: ["Content Browsing", "Responsive Layout", "Live Deployment"],
    href: "https://mmtoon.vercel.app/",
    githubHref: "https://github.com/psoe2936-ops/mmtoon",
    image: "/projects/mmtoon.png",
  },
  {
    number: "02",
    name: "FoxVend",
    category: "FULL-STACK WEB APP",
    description:
      "A C2C marketplace built solo, from database design to deployment. Users list items and negotiate through price offers in real-time chat, and every listing is reviewed by an admin before it goes live.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    highlights: [
      "Real-time Chat & Offers",
      "Admin Moderation",
      "Burmese + English",
      "Row Level Security",
    ],
    href: "https://foxvend.vercel.app/",
    githubHref: "https://github.com/psoe2936-ops/foxvent",
    image: "/projects/foxvend.png",
  },
];

const websites = [
  {
    number: "01",
    name: "Urbn Youth",
    category: "FASHION & E-COMMERCE",
    description:
      "A streetwear website concept featuring clothing categories, product browsing, and a bold visual identity for a modern fashion brand.",
    image: "/projects/urbnyouth.png",
    href: "https://psoe2936.wixsite.com/urbnyouth",
    platform: "Wix · Velo",
    features: ["Product Browsing", "Product Categories", "Member Login"],
    note: "Showcase project. Full checkout and payment processing are not implemented.",
  },
  {
    number: "02",
    name: "La Bella Vita",
    category: "RESTAURANT WEBSITE",
    description:
      "An elegant restaurant website concept featuring menu browsing, member login, and a phone-based table booking flow.",
    image: "/projects/labellavita.png",
    href: "https://psoe2936.wixsite.com/labellavita",
    platform: "Wix · Velo",
    features: ["Interactive Menu Browsing", "Member Login", "Phone-Based Booking"],
    note: "Showcase project. Table bookings are handled by phone, not through an automated reservation system.",
  },
  {
    number: "03",
    name: "UrbanNest Realty",
    category: "REAL ESTATE & RENTALS",
    description:
      "An apartment rental website concept featuring property listings, detailed apartment information, search and filtering, and a login-based dashboard.",
    image: "/projects/urbannest.png",
    href: "https://psoe2936.wixsite.com/urbannestrealty",
    platform: "Wix CMS · Velo",
    features: ["Apartment Listings", "CMS & Search Filters", "Login-Based Dashboard"],
    note: "Showcase project demonstrating CMS-backed property listings and custom website functionality.",
  },
];

const skills = [
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  {name: 'React Native', Icon: SiReact},
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Supabase", Icon: SiSupabase },
];

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Websites", href: "#websites" },
  { label: "Contact", href: "#contact" },
];

/**
 * Splits a text into words, and each word into letters.
 * GSAP can then animate every letter (class "hero-char").
 * Words stay together, so the text still wraps correctly on small screens.
 */
function SplitChars({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="hero-char inline-block"
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
const [currentYear, setCurrentYear] = useState<number | null>(null);

useEffect(() => {
  setCurrentYear(new Date().getFullYear());
}, []);
  /* ------------------------------------------------------------------ */
  /* Main GSAP animations (no scroll effects)                            */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // People who turned off animations in their system see a still page.
      if (reduceMotion) return;

      const q = gsap.utils.selector(container);
      const cleanups: Array<() => void> = [];

      // 1. Page intro: plays once on load ------------------------------
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".site-nav", { y: -24, opacity: 0, duration: 0.7 })
        .from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(
          ".hero-char",
          {
            y: 70,
            opacity: 0,
            rotate: 6,
            transformOrigin: "0% 100%",
            duration: 0.8,
            stagger: 0.025,
          },
          "-=0.25",
        )
        .from(
          ".hero-description, .hero-actions, .hero-meta",
          { y: 20, opacity: 0, duration: 0.65, stagger: 0.12 },
          "-=0.5",
        )
        .from(
          ".orbit-core",
          { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out" },
          "-=1",
        )
        .from(
          ".orbit-tag",
          { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.6",
        );

      // 2. Floating loops for the hero orbit (repeat forever) ----------
      gsap.to(".orbit-core", {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".orbit-tag", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
      });

      gsap.to(".orbit-ring", {
        scale: 1.05,
        opacity: 0.6,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // 3. Mouse effects: only for devices with a real mouse -----------
      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      if (finePointer) {
        // 3a. Cursor glow + orbit parallax (one shared mouse listener)
        const glow = q(".cursor-glow")[0];
        const glowX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
        const glowY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });
        gsap.set(glow, { xPercent: -50, yPercent: -50 });

        const coreX = gsap.quickTo(q(".orbit-core"), "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const tagX = gsap.quickTo(q(".orbit-tag"), "x", {
          duration: 1.1,
          ease: "power3.out",
        });

        let glowVisible = false;

        const onMouseMove = (event: MouseEvent) => {
          glowX(event.clientX);
          glowY(event.clientY);

          if (!glowVisible) {
            glowVisible = true;
            gsap.to(glow, { opacity: 1, duration: 0.6 });
          }

          const offsetX = event.clientX / window.innerWidth - 0.5;
          coreX(offsetX * -30);
          tagX(offsetX * -18);
        };

        const onMouseLeaveWindow = () => {
          glowVisible = false;
          gsap.to(glow, { opacity: 0, duration: 0.4 });
        };

        window.addEventListener("mousemove", onMouseMove);
        document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
        cleanups.push(() => {
          window.removeEventListener("mousemove", onMouseMove);
          document.documentElement.removeEventListener(
            "mouseleave",
            onMouseLeaveWindow,
          );
        });

        // 3b. Magnetic buttons: they move a little toward the mouse
        q(".magnetic").forEach((element) => {
          const onMove = (event: Event) => {
            const mouse = event as MouseEvent;
            const rect = element.getBoundingClientRect();
            gsap.to(element, {
              x: (mouse.clientX - (rect.left + rect.width / 2)) * 0.3,
              y: (mouse.clientY - (rect.top + rect.height / 2)) * 0.3,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          const onLeave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.4)",
              overwrite: "auto",
            });
          };

          element.addEventListener("mousemove", onMove);
          element.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            element.removeEventListener("mousemove", onMove);
            element.removeEventListener("mouseleave", onLeave);
          });
        });

        // 3c. Card tilt: cards turn in 3D under the mouse
        q(".tilt").forEach((card) => {
          gsap.set(card, { transformPerspective: 900 });

          const onMove = (event: Event) => {
            const mouse = event as MouseEvent;
            const rect = card.getBoundingClientRect();
            const percentX = (mouse.clientX - rect.left) / rect.width - 0.5;
            const percentY = (mouse.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
              rotationY: percentX * 8,
              rotationX: percentY * -8,
              y: -4,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const onLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: container },
  );

  /* ------------------------------------------------------------------ */
  /* Mobile menu animation: runs every time the menu opens               */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      if (!menuOpen) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".mobile-menu", { y: -12, opacity: 0, duration: 0.3 })
        .from(
          ".mobile-menu-item",
          { x: -16, opacity: 0, duration: 0.35, stagger: 0.06 },
          "-=0.15",
        );
    },
    { scope: container, dependencies: [menuOpen] },
  );

  /* Close the mobile menu with the Escape key */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main ref={container} className="relative overflow-x-clip">
      {/* Background */}
      <div
        className="portfolio-grid pointer-events-none absolute inset-x-0 top-0 h-[850px] opacity-70"
        aria-hidden="true"
      />
      <div
        className="glow pointer-events-none absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2"
        aria-hidden="true"
      />

      {/* Cursor glow (follows the mouse on desktop) */}
      <div
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 hidden h-[420px] w-[420px] rounded-full opacity-0 lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.14), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/70 shadow-lg shadow-black/5 backdrop-blur-2xl transition-colors duration-300 supports-[backdrop-filter]:bg-[#09090b]/60">
        <nav
          className="site-nav mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="flex items-center gap-3"
            onClick={closeMenu}
            aria-label="Paing Soe home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-300/10 text-sm font-bold text-violet-200">
              PS
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Paing Soe<span className="text-violet-300">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="magnetic inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-violet-300/50 hover:bg-violet-300/10"
            >
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-200 md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu border-t border-white/10 bg-[#09090b]/95 px-5 py-5 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="mobile-menu-item rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mobile-menu-item mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-violet-300 px-4 py-3 text-sm font-semibold text-zinc-950"
              >
                Let&apos;s talk <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[760px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-12"
      >
        <div className="relative z-10 max-w-4xl">
          <div className="hero-eyebrow mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-zinc-300">
              Computer Science Student · Aspiring Software Developer
            </span>
          </div>

          <h1
            className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[56px] xl:text-[72px]"
            aria-label="Building digital experiences with purpose."
          >
            <span className="block">
              <SplitChars text="Building digital" />
            </span>
            <span className="block">
              <SplitChars text="experiences with" />
            </span>
            <span className="block text-violet-300">
              <SplitChars text="purpose" />
              <span
                className="hero-char inline-block text-white"
                aria-hidden="true"
              >
                .
              </span>
            </span>
          </h1>

          <p className="hero-description mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            I&apos;m Paing Soe, a Computer Science student from Myanmar who
            enjoys turning ideas into useful, thoughtful, and accessible
            digital products through code.
          </p>

          <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="magnetic group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-300 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-violet-200"
            >
              Explore my work
              <ArrowDownRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="magnetic inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="hero-meta mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Code2 size={15} className="text-violet-300" />
              Web Development
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Users size={15} className="text-violet-300" />
              Open to learning and collaboration
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-violet-300" />
              Based in Myanmar
            </div>
          </div>
        </div>

        {/* Hero photo (floating card + rings + mouse parallax) */}
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:ml-auto lg:mr-0 lg:max-w-[400px]">
          {/* Decorative rings and glow behind the photo */}
          <div
            className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
            aria-hidden="true"
          >
            <div className="orbit-ring absolute h-[520px] w-[520px] rounded-full border border-white/[0.05]" />
            <div className="orbit-ring absolute h-[420px] w-[420px] rounded-full border border-violet-300/10" />
            <div className="absolute h-[300px] w-[300px] rounded-full bg-violet-400/15 blur-3xl" />
          </div>

          {/* Photo card */}
          <div className="orbit-core relative rounded-[30px] border border-white/10 bg-white/[0.04] p-2.5 shadow-2xl shadow-violet-950/50 backdrop-blur">
            <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[22px] bg-zinc-900">
              <Image
                src="/projects/profile.png"
                alt="Portrait of Paing Soe"
                fill
                priority
                sizes="(max-width: 640px) 320px, 400px"
                className="object-cover object-top"
              />

              {/* Soft violet tint: makes the white photo background less harsh */}
              <div
                className="pointer-events-none absolute inset-0 bg-violet-300/20 mix-blend-multiply"
                aria-hidden="true"
              />

              {/* Dark fade at the bottom for the name label */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/85 to-transparent"
                aria-hidden="true"
              />

              {/* Name label */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-zinc-950/60 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-sm font-semibold text-white">Paing Soe</p>
                  <p className="text-xs text-zinc-400">
                    Computer Science Student
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Myanmar
                </span>
              </div>
            </div>
          </div>

          {/* Floating tags */}
          <span
            className="orbit-tag absolute -left-3 top-24 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/90 px-3 py-2 text-xs text-zinc-300 shadow-lg shadow-black/30 backdrop-blur sm:-left-6 lg:-left-10"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
            Build
          </span>
          <span
            className="orbit-tag absolute -right-3 bottom-32 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/90 px-3 py-2 text-xs text-zinc-300 shadow-lg shadow-black/30 backdrop-blur sm:-right-6 lg:-right-8"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
            Create
          </span>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative border-t border-white/[0.07] bg-white/[0.015]"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:px-12 lg:py-32">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              About me
            </p>
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              Curious by nature.
              <span className="block text-zinc-500">
                Developer in progress.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-zinc-400">
              I&apos;m currently a third-year Computer Science student,
              developing my skills in modern web technologies and software
              development. I enjoy learning how applications work, solving
              problems, and building projects that people can actually use.
            </p>
            <p className="mt-5 text-base leading-8 text-zinc-400">
              My goal is to grow into a professional software developer by
              strengthening my fundamentals, building real projects, and
              learning from practical experience. I believe consistent
              practice and finishing what I start are important parts of
              becoming a better developer.
            </p>

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">
                  Technologies I&apos;m learning
                </h3>
                <span className="text-xs text-zinc-500">
                  {skills.length} technologies
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {skills.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="group flex min-h-[76px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-300/[0.06]"
                  >
                    <Icon
                      size={25}
                      color="currentColor"
                      className="shrink-0 text-zinc-400 transition-colors group-hover:text-violet-300"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software projects */}
      <section
        id="projects"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Software projects<span className="text-violet-300">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              A selection of projects where I&apos;ve been learning, building,
              and improving my development skills.
            </p>
          </div>
          <a
            href="https://github.com/psoe2936-ops"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-violet-300"
          >
            More on GitHub <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.number}
              className="tilt group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-violet-300/30"
            >
              {/* Project Screenshot */}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900"
                aria-label={`Visit ${project.name} live website`}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-zinc-950/70 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-zinc-200 backdrop-blur">
                  {project.category}
                </span>

                <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-zinc-950/70 text-white backdrop-blur transition-all group-hover:border-violet-300/50 group-hover:bg-violet-300 group-hover:text-zinc-950">
                  <ArrowUpRight size={18} />
                </span>
              </a>

              {/* Project Details */}
              <div className="p-6 sm:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs tabular-nums text-zinc-500">
                    PROJECT / {project.number}
                  </span>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} source code on GitHub`}
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Code2 size={18} />
                    </a>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} live website`}
                      className="text-zinc-500 transition-colors hover:text-violet-300"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {project.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Tech Stack
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1.5 text-xs font-medium text-violet-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] text-zinc-400"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Explicit Links */}
                <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-violet-200"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>

                  <a
                    href={project.githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    Source Code
                    <Code2 size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Wix websites */}
      <section
        id="websites"
        className="border-y border-white/[0.07] bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              Website design
            </p>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Websites for real-world ideas
                  <span className="text-violet-300">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Website concepts created for different business needs, from
                  fashion and dining to property rentals.
                </p>
              </div>
              <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400">
                Built with Wix
              </span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {websites.map((website) => (
              <article
                key={website.number}
                className="tilt group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition-colors duration-300 hover:border-violet-300/30"
              >
                <a
                  href={website.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${website.name} live website`}
                  className="relative block aspect-[4/3] overflow-hidden border-b border-white/10 bg-zinc-900"
                >
                  <Image
                    src={website.image}
                    alt={`${website.name} website screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-zinc-950/80 px-3 py-1.5 text-[10px] tracking-[0.12em] text-zinc-200 backdrop-blur">
                    {website.category}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 text-white transition-all group-hover:border-violet-300/50 group-hover:bg-violet-300 group-hover:text-zinc-950">
                    <ArrowUpRight size={18} />
                  </span>
                </a>

                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs tabular-nums text-zinc-500">
                      WEBSITE / {website.number}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {website.platform}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {website.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {website.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {website.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] text-zinc-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-xs leading-6 text-zinc-500">
                    {website.note}
                  </p>

                  <a
                    href={website.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
                  >
                    View live website <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-70" />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-400/[0.06] blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              Contact
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Have an idea?
              <span className="block text-zinc-500">Let&apos;s build it.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              I&apos;m interested in learning opportunities, meaningful
              projects, and connecting with people who enjoy building useful
              digital products.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="mailto:psoe2936@gmail.com"
                className="magnetic inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-300 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-violet-200"
              >
                <Mail size={17} /> Email me <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/psoe2936-ops"
                target="_blank"
                rel="noreferrer"
                className="magnetic inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                <Code2 size={18} /> GitHub <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open to opportunities and collaboration
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <a
            href="#home"
            className="w-fit text-sm font-semibold tracking-wide text-white"
          >
            Paing Soe<span className="text-violet-300">.</span>
          </a>

          <p className="text-xs text-zinc-500">
  © {currentYear ?? 2026} Paing Soe. Built with Next.js.
</p>

          <a
            href="#home"
            className="inline-flex w-fit items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            Back to top <ArrowDown className="rotate-180" size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}