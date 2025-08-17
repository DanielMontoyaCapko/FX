import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

import ADCB from "@/assets/ADCB_BANK.png";
import FAB from "@/assets/FAB_BANK.png";
import NBD from "@/assets/NBD_BANK.png";

export default function Hero() {
  const [, setLocation] = useLocation();
  const goToContact = () => setLocation("/contacto");

  // 5 logos
  const logos = useMemo(() => [ADCB, FAB, NBD, ADCB, FAB], []);

  // Refs y ancho del grupo A (para fijar el viewport y que solo se vean 5)
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupW, setGroupW] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !groupRef.current) return;

      // Ancho del grupo A (5 logos)
      const half = groupRef.current.getBoundingClientRect().width;
      setGroupW(half); // -> el wrapper tendrá exactamente este ancho

      // Velocidad reducida (px/s)
      const speed = 12;
      const dur = Math.max(half / speed, 12);

      trackRef.current.style.setProperty("--half", `${half}px`);
      trackRef.current.style.setProperty("--dur", `${dur}s`);
    };

    const ro = new ResizeObserver(update);
    if (groupRef.current) ro.observe(groupRef.current);
    update();

    // Recalcular cuando carguen las imágenes
    groupRef.current?.querySelectorAll("img")?.forEach((img) => {
      const el = img as HTMLImageElement;
      if (!el.complete) el.addEventListener("load", update, { once: true });
    });

    return () => ro.disconnect();
  }, []);

  return (
    <section id="inicio" className="min-h-[90svh] flex items-start justify-center pt-32 md:pt-40">
      {/* Keyframes del carrusel */}
      <style>{`
        @keyframes marqueeLoop {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(var(--half, 0px) * -1)); }
        }
      `}</style>

      <div className="container mx-auto px-6 text-center">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
          <span className="text-green">9% Fijo Anual.</span><br />
          Capital Protegido por<br />
          Contrato Bancario Pignorado.
        </h1>

        <p className="text-xl md:text-2xl text-silver-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          Producto exclusivo para perfiles conservadores, sin exposición al mercado.
          Gestionado con estructuras bancarias, firmado digitalmente y auditado legalmente.
        </p>

        <Button
          onClick={goToContact}
          className="bg-green text-black px-12 py-4 text-xl font-bold hover:bg-green/90 transition-colors shadow-xl h-auto"
        >
          Quiero más información
        </Button>

        {/* Métricas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">9%</div>
            <div className="text-silver-100">Rentabilidad Fija Anual</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">100%</div>
            <div className="text-silver-100">Capital Protegido</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">0%</div>
            <div className="text-silver-100">Exposición al Mercado</div>
          </div>
        </div>

        {/* Carrusel (solo 5 logos visibles) */}
        <div
          className="relative mt-14 mx-auto"
          style={{ width: groupW ? `min(100%, ${groupW}px)` : undefined }}
        >
          {/* Fades laterales */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 md:w-16 bg-gradient-to-l from-black to-transparent" />

          <div className="overflow-hidden">
            {/* Track animado de 0 a -anchoGrupoA */}
            <div
              ref={trackRef}
              style={{ animation: "marqueeLoop var(--dur, 28s) linear infinite" }}
              className="flex w-max will-change-transform"
            >
              {/* Grupo A */}
              <div
                ref={groupRef}
                className="flex items-center gap-10 md:gap-14 shrink-0 pr-10 md:pr-14"
              >
                {logos.map((src, i) => (
                  <img
                    key={`a-${i}`}
                    src={src}
                    alt={`logo-${i + 1}`}
                    className="block h-12 md:h-[3.75rem] lg:h-[4.5rem] flex-none opacity-45 hover:opacity-70 transition-opacity duration-300 object-contain grayscale select-none"
                    draggable={false}
                  />
                ))}
              </div>

              {/* Grupo B (clon) */}
              <div className="flex items-center gap-10 md:gap-14 shrink-0" aria-hidden="true">
                {logos.map((src, i) => (
                  <img
                    key={`b-${i}`}
                    src={src}
                    alt=""
                    className="block h-12 md:h-[3.75rem] lg:h-[4.5rem] flex-none opacity-45 object-contain grayscale select-none"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
