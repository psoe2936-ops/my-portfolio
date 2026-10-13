
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-status", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-title",
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          "-=0.25",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          ".hero-footer",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2",
        );
    },
    { scope: container },
  );

  return <div ref={container} className="hidden" aria-hidden="true" />;
}
