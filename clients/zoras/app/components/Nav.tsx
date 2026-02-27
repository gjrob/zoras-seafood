"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FISH_CATALOG } from "../../lib/fish-data";

export type ActiveKey = "home" | "about" | "menu" | "recipes" | "free-fish" | "seafood" | "facts" | "join-fishlist";

const PAGE_MAP: Record<ActiveKey, { en: string; es: string }> = {
  home:            { en: "/",                 es: "/es" },
  about:           { en: "/about",           es: "/es/about" },
  menu:            { en: "/menu",            es: "/es/menu" },
  recipes:         { en: "/seafood-recipes", es: "/es/seafood-recipes" },
  "free-fish":     { en: "/free-fish",       es: "/free-fish" },
  seafood:         { en: "/seafood",         es: "/seafood" },
  facts:           { en: "/facts",           es: "/facts" },
  "join-fishlist": { en: "/join-fishlist",   es: "/join-fishlist" },
};

// ── Grouped fish for "Our Seafood" mega-dropdown ─────────────────────────────
const SEAFOOD_BY_CATEGORY = [
  {
    label: "Local NC",
    icon: "🐟",
    fish: FISH_CATALOG.filter((f) => f.category === "local-nc"),
  },
  {
    label: "Offshore",
    icon: "🌊",
    fish: FISH_CATALOG.filter((f) => f.category === "offshore"),
  },
  {
    label: "Deepwater",
    icon: "🔱",
    fish: FISH_CATALOG.filter((f) => f.category === "deepwater"),
  },
  {
    label: "Shellfish",
    icon: "🦀",
    fish: FISH_CATALOG.filter((f) => f.category === "shellfish"),
  },
];

// Regular nav links
const BASE_LINKS_EN = [
  { key: "about",   label: "About",          href: "/about" },
  { key: "menu",    label: "Menu",           href: "/menu" },
  { key: "facts",   label: "Did You Know?",  href: "/facts" },
  { key: "recipes", label: "Recipes",        href: "/seafood-recipes" },
];

const BASE_LINKS_ES = [
  { key: "about",   label: "Sobre Nosotros",      href: "/es/about" },
  { key: "menu",    label: "Menú",                href: "/es/menu" },
  { key: "facts",   label: "¿Sabías que…?",       href: "/facts" },
  { key: "recipes", label: "Recetas",             href: "/es/seafood-recipes" },
];

export default function Nav({ lang, activeKey }: { lang: "en" | "es"; activeKey: ActiveKey }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seafoodOpen, setSeafoodOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState<string | null>(null);

  const switchLang = (to: "en" | "es") => {
    if (to === lang) return;
    localStorage.setItem("zoras-lang", to);
    router.push(PAGE_MAP[activeKey][to]);
  };

  const baseLinks = lang === "en" ? BASE_LINKS_EN : BASE_LINKS_ES;
  const seafoodLabel = lang === "en" ? "Our Seafood" : "Nuestros Mariscos";
  const freeFishLabel = lang === "en" ? "Free Fish" : "Pescado Gratis";

  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <div className={`flex items-center overflow-hidden rounded-full border border-white/25 ${mobile ? "text-[10px]" : "text-[10px]"} font-black`}>
      <button
        onClick={() => switchLang("en")}
        className={`px-3 py-1.5 uppercase tracking-widest transition ${
          lang === "en" ? "bg-[#f5c518] text-[#0d2b45]" : "text-white/50 hover:text-white"
        }`}
      >EN</button>
      <button
        onClick={() => switchLang("es")}
        className={`px-3 py-1.5 uppercase tracking-widest transition ${
          lang === "es" ? "bg-[#f5c518] text-[#0d2b45]" : "text-white/50 hover:text-white"
        }`}
      >ES</button>
    </div>
  );

  return (
    <>
      {/* Announcement bar */}
      <a href="/free-fish" className="block w-full bg-[#f5c518] py-2.5 text-center transition hover:bg-[#e0b310]">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0d2b45]">
          🐟&nbsp;&nbsp;Free Fish Program — Ask Us In Store&nbsp;&nbsp;🐟
        </p>
      </a>

      <nav className="sticky top-0 z-50 w-full bg-[#0d2b45] shadow-xl">

        {/* ── Desktop ───────────────────────────────────────────────────── */}
        <div className="hidden xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-4 xl:px-10 xl:py-3">

          {/* Logo */}
          <Link href={lang === "en" ? "/" : "/es"}
            className="shrink-0 text-sm font-black uppercase tracking-[0.14em] text-white">
            Zora&apos;s Market &amp; Kitchen
          </Link>

          {/* Center links */}
          <div className="flex items-center justify-center gap-0.5 flex-wrap">

            {/* About */}
            <Link href={baseLinks[0].href}
              className={`rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${
                baseLinks[0].key === activeKey
                  ? "bg-[#f5c518]/15 font-bold text-[#f5c518]"
                  : "text-[#a8d8f0] hover:bg-white/10 hover:text-white"
              }`}>
              {baseLinks[0].label}
            </Link>

            {/* Our Seafood — mega dropdown */}
            <div className="group relative">
              <Link href="/seafood"
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${
                  activeKey === "seafood"
                    ? "bg-[#f5c518]/15 font-bold text-[#f5c518]"
                    : "text-[#a8d8f0] hover:bg-white/10 hover:text-white"
                }`}>
                {seafoodLabel}
                <svg className="transition-transform duration-200 group-hover:rotate-180" width="9" height="6" viewBox="0 0 9 6" fill="currentColor">
                  <path d="M4.5 6L0 0h9z"/>
                </svg>
              </Link>

              {/* Mega-dropdown panel */}
              <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#091a2b] shadow-2xl">

                  {/* Header row */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4ab8e8]">
                      {FISH_CATALOG.length} species at the counter
                    </span>
                    <Link href="/seafood" className="text-[10px] font-bold text-[#f5c518] hover:underline">
                      View all →
                    </Link>
                  </div>

                  {/* 4-column fish grid by category */}
                  <div className="grid grid-cols-4 gap-0">
                    {SEAFOOD_BY_CATEGORY.map((group) => (
                      <div key={group.label} className="border-r border-white/5 last:border-r-0 px-3 py-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4ab8e8] mb-2 flex items-center gap-1">
                          <span>{group.icon}</span> {group.label}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {group.fish.map((f) => (
                            <Link
                              key={f.id}
                              href={`/seafood/${f.id}`}
                              className="rounded px-2 py-1 text-[11px] text-[#a8d8f0] hover:bg-white/10 hover:text-white transition leading-snug"
                            >
                              {f.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining base links (Menu, Did You Know?, Recipes) */}
            {baseLinks.slice(1).map((link) => (
              <Link key={link.key} href={link.href}
                className={`rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${
                  link.key === activeKey
                    ? "bg-[#f5c518]/15 font-bold text-[#f5c518]"
                    : "text-[#a8d8f0] hover:bg-white/10 hover:text-white"
                }`}>
                {link.label}
              </Link>
            ))}

            {/* Gift Cards */}
            <a
              href="https://www.toasttab.com/zorasmarket/giftcards"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#a8d8f0] hover:bg-white/10 hover:text-white transition"
            >
              Gift Cards
            </a>
          </div>

          {/* Right: Join List + Free Fish + phone + lang */}
          <div className="flex items-center gap-2">
            <Link
              href="/join-fishlist"
              className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeKey === "join-fishlist"
                  ? "border-[#38bdf8] bg-[#38bdf8] text-white"
                  : "border-[#38bdf8] bg-transparent text-[#38bdf8] hover:bg-[#38bdf8] hover:text-white"
              }`}
            >
              Join the List
            </Link>
            <Link href="/free-fish"
              className="rounded-lg bg-[#f5c518] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0d2b45] transition hover:bg-[#e0b310]">
              {freeFishLabel}
            </Link>
            <a href="tel:9107630992"
              className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold text-[#a8d8f0] transition hover:bg-white/15 hover:text-white">
              (910) 763-0992
            </a>
            <LangToggle />
          </div>
        </div>

        {/* ── Mobile header ───────────────────────────────────────────────── */}
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4 xl:hidden">
          <Link href={lang === "en" ? "/" : "/es"}
            className="shrink-0 text-sm font-black uppercase tracking-[0.14em] text-white">
            Zora&apos;s Market &amp; Kitchen
          </Link>
          <div className="flex items-center gap-3">
            <LangToggle mobile />
            <button
              onClick={() => { setMobileOpen(!mobileOpen); setSeafoodOpen(false); }}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {mobileOpen
                  ? <><path d="M5 5l12 12"/><path d="M17 5L5 17"/></>
                  : <><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0b2438] px-6 pb-5 pt-3 xl:hidden">

            {/* About */}
            <Link href={baseLinks[0].href} onClick={() => setMobileOpen(false)}
              className="my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#a8d8f0] transition hover:bg-white/10 hover:text-white">
              {baseLinks[0].label}
            </Link>

            {/* Our Seafood collapsible */}
            <div>
              <button
                onClick={() => setSeafoodOpen(!seafoodOpen)}
                className="my-1 flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#a8d8f0] transition hover:bg-white/10 hover:text-white"
              >
                {seafoodLabel}
                <svg className={`transition-transform duration-200 ${seafoodOpen ? "rotate-180" : ""}`} width="10" height="7" viewBox="0 0 10 7" fill="currentColor">
                  <path d="M5 7L0 0h10z"/>
                </svg>
              </button>
              {seafoodOpen && (
                <div className="ml-4 mb-2 rounded-xl border border-white/10 bg-[#071929] overflow-hidden">
                  <Link
                    href="/seafood"
                    onClick={() => { setMobileOpen(false); setSeafoodOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#f5c518] border-b border-white/10 hover:bg-white/10 transition"
                  >
                    🐟 View All Species →
                  </Link>
                  {SEAFOOD_BY_CATEGORY.map((group) => (
                    <div key={group.label}>
                      <button
                        onClick={() => setMobileCatOpen(mobileCatOpen === group.label ? null : group.label)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#4ab8e8] hover:bg-white/5 transition"
                      >
                        <span className="flex items-center gap-1.5">{group.icon} {group.label}</span>
                        <svg className={`transition-transform duration-200 ${mobileCatOpen === group.label ? "rotate-180" : ""}`} width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
                          <path d="M4 5L0 0h8z"/>
                        </svg>
                      </button>
                      {mobileCatOpen === group.label && (
                        <div className="bg-black/20">
                          {group.fish.map((f) => (
                            <Link
                              key={f.id}
                              href={`/seafood/${f.id}`}
                              onClick={() => { setMobileOpen(false); setSeafoodOpen(false); setMobileCatOpen(null); }}
                              className="flex px-6 py-2 text-sm text-[#7bbcd6] hover:bg-white/10 hover:text-white transition"
                            >
                              {f.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining links */}
            {baseLinks.slice(1).map((link) => (
              <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                className="my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#a8d8f0] transition hover:bg-white/10 hover:text-white">
                {link.label}
              </Link>
            ))}

            {/* Gift Cards */}
            <a
              href="https://www.toasttab.com/zorasmarket/giftcards"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#a8d8f0] transition hover:bg-white/10 hover:text-white"
            >
              Gift Cards
            </a>

            {/* Join the List */}
            <Link
              href="/join-fishlist"
              onClick={() => setMobileOpen(false)}
              className={`my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wider transition ${
                activeKey === "join-fishlist"
                  ? "bg-[#38bdf8] text-white"
                  : "border border-[#38bdf8]/60 text-[#38bdf8] hover:bg-[#38bdf8] hover:text-white"
              }`}
            >
              Join the List
            </Link>

            {/* Buttons */}
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/free-fish" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-[#f5c518] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#0d2b45] transition hover:bg-[#e0b310]">
                {freeFishLabel}
              </Link>
              <a href="tel:9107630992"
                className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-[#a8d8f0]">
                📞 (910) 763-0992
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
