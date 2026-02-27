"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type ActiveKey = "home" | "about" | "menu" | "recipes" | "spices";

type NavLink = {
  key: string;
  label: string;
  href: string;
  highlight?: "cta" | "special";
};

const EN_LINKS: NavLink[] = [
  { key: "about",   label: "About",                  href: "/about" },
  { key: "seafood", label: "Our Seafood",             href: "/#seafood" },
  { key: "menu",    label: "Menu",                    href: "/menu" },
  { key: "recipes", label: "Seafood Recipes",         href: "/seafood-recipes" },
  { key: "spices",  label: "Zora's Spices & Sauces",  href: "/spices-sauces" },
  { key: "order",   label: "Order Online",            href: "/#order",     highlight: "cta" },
  { key: "free",    label: "Free Fish",               href: "/#free-fish", highlight: "special" },
];

const ES_LINKS: NavLink[] = [
  { key: "about",   label: "Sobre Nosotros",          href: "/es/about" },
  { key: "seafood", label: "Nuestros Mariscos",       href: "/es#nuestros-mariscos" },
  { key: "menu",    label: "Menú",                    href: "/es/menu" },
  { key: "recipes", label: "Recetas de Mariscos",     href: "/es/seafood-recipes" },
  { key: "spices",  label: "Especias y Salsas",       href: "/es/spices-sauces" },
  { key: "order",   label: "Pedir en Línea",          href: "/es#order",     highlight: "cta" },
  { key: "free",    label: "Pescado Gratis",          href: "/es#free-fish", highlight: "special" },
];

const PAGE_MAP: Record<ActiveKey, { en: string; es: string }> = {
  home:    { en: "/",                 es: "/es" },
  about:   { en: "/about",           es: "/es/about" },
  menu:    { en: "/menu",            es: "/es/menu" },
  recipes: { en: "/seafood-recipes", es: "/es/seafood-recipes" },
  spices:  { en: "/spices-sauces",   es: "/es/spices-sauces" },
};

const ANNOUNCE = {
  en: "🐟\u00a0\u00a0Re-Opening February 26th, 2026\u00a0\u00a0🐟",
  es: "🐟\u00a0\u00a0Reabrimos el 26 de Febrero de 2026\u00a0\u00a0🐟",
};

export default function Nav({ lang, activeKey }: { lang: "en" | "es"; activeKey: ActiveKey }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLang = (to: "en" | "es") => {
    if (to === lang) return;
    localStorage.setItem("zoras-lang", to);
    router.push(PAGE_MAP[activeKey][to]);
  };

  const links = lang === "en" ? EN_LINKS : ES_LINKS;

  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <div className={`flex items-center overflow-hidden rounded-full border border-white/25 ${mobile ? "text-[10px]" : "ml-3 text-[10px]"} font-black`}>
      <button
        onClick={() => switchLang("en")}
        className={`px-3 py-1.5 uppercase tracking-widest transition ${
          lang === "en" ? "bg-[#f5c518] text-[#0d2b45]" : "text-white/50 hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="text-white/20 text-xs select-none">|</span>
      <button
        onClick={() => switchLang("es")}
        className={`px-3 py-1.5 uppercase tracking-widest transition ${
          lang === "es" ? "bg-[#f5c518] text-[#0d2b45]" : "text-white/50 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full bg-[#f5c518] py-2.5 text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0d2b45]">
          {ANNOUNCE[lang]}
        </p>
      </div>

      <nav className="sticky top-0 z-50 w-full bg-[#0d2b45] shadow-xl">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4 xl:px-10">
          {/* Logo */}
          <Link
            href={lang === "en" ? "/" : "/es"}
            className="shrink-0 text-sm font-black uppercase tracking-[0.14em] text-white md:text-base"
          >
            Zora&apos;s Market &amp; Kitchen
          </Link>

          {/* Desktop: links + lang toggle */}
          <div className="hidden items-center gap-1 xl:flex">
            {links.map((link) => {
              const active = link.key === activeKey;
              if (link.highlight === "cta") return (
                <Link key={link.key} href={link.href}
                  className="rounded-lg bg-[#e8821a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#d05a10]">
                  {link.label}
                </Link>
              );
              if (link.highlight === "special") return (
                <Link key={link.key} href={link.href}
                  className="rounded-lg bg-[#f5c518] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0d2b45] transition hover:bg-[#e0b310]">
                  {link.label}
                </Link>
              );
              return (
                <Link key={link.key} href={link.href}
                  className={`rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${
                    active
                      ? "bg-[#f5c518]/15 font-bold text-[#f5c518]"
                      : "text-[#a8d8f0] hover:bg-white/10 hover:text-white"
                  }`}>
                  {link.label}
                </Link>
              );
            })}
            <LangToggle />
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex items-center gap-3 xl:hidden">
            <LangToggle mobile />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {mobileOpen
                  ? <><path d="M5 5l12 12" /><path d="M17 5L5 17" /></>
                  : <><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0b2438] px-6 pb-5 pt-3 xl:hidden">
            {links.map((link) => {
              if (link.highlight === "cta") return (
                <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                  className="my-1 flex items-center rounded-xl bg-[#e8821a] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white">
                  {link.label}
                </Link>
              );
              if (link.highlight === "special") return (
                <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                  className="my-1 flex items-center rounded-xl bg-[#f5c518] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#0d2b45]">
                  {link.label}
                </Link>
              );
              return (
                <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                  className="my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#a8d8f0] transition hover:bg-white/10 hover:text-white">
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
