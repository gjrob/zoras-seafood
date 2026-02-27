"use client";

import { useState, useMemo } from "react";
import Nav from "../components/Nav";
import FishCard from "../components/FishCard";
import { SORTED_CATALOG, CATEGORY_LABELS } from "../../lib/fish-data";
import type { Fish } from "../../lib/fish-data";

type FilterKey = "all" | Fish["category"];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",       label: "All Species" },
  { key: "local-nc",  label: "Local NC" },
  { key: "offshore",  label: "Offshore" },
  { key: "deepwater", label: "Deepwater" },
  { key: "shellfish", label: "Shellfish" },
];

export default function SeafoodCatalogPage() {
  const [active, setActive] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = SORTED_CATALOG;
    if (active !== "all") list = list.filter((f) => f.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.localName?.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q))
      );
    }
    return list;
  }, [active, query]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: SORTED_CATALOG.length };
    for (const cat of ["local-nc", "offshore", "deepwater", "shellfish"] as Fish["category"][]) {
      result[cat] = SORTED_CATALOG.filter((f) => f.category === cat).length;
    }
    return result;
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">
      <Nav lang="en" activeKey="seafood" />

      {/* ── Hero / Header ──────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 pb-14 pt-20 xl:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">
          Castle Street &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Since 1956
        </p>
        <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
          Our Seafood
        </h1>
        <div className="mt-5 h-1 w-20 rounded-full bg-[#f5c518]" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#7bbcd6]">
          Fresh from North Carolina waters and beyond. Tap any fish to learn more — flavor
          profile, peak season, and recipes straight from our kitchen.
        </p>

        {/* stat chips */}
        <div className="mt-7 flex flex-wrap gap-3">
          {(["local-nc", "offshore", "deepwater", "shellfish"] as Fish["category"][]).map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-2 rounded-full border border-[#4ab8e8]/30 bg-[#4ab8e8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#4ab8e8]"
            >
              {CATEGORY_LABELS[cat]} &nbsp;<span className="text-white/60">{counts[cat]}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-[57px] z-40 w-full border-b border-[#0d2b45]/10 bg-white/90 backdrop-blur px-4 py-3 xl:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  active === f.key
                    ? "bg-[#0d2b45] text-[#f5c518]"
                    : "bg-[#0d2b45]/8 text-[#0d2b45]/60 hover:bg-[#0d2b45]/15 hover:text-[#0d2b45]"
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-[10px] opacity-60">
                  {f.key === "all" ? counts.all : counts[f.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="search"
            placeholder="Search fish…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-xs rounded-full border border-[#0d2b45]/20 bg-white px-4 py-1.5 text-sm text-[#0d2b45] placeholder-[#0d2b45]/30 outline-none focus:border-[#1a7abf] transition sm:w-auto"
          />
        </div>
      </div>

      {/* ── Fish grid ──────────────────────────────────────────────────────── */}
      <section className="w-full px-4 py-10 xl:px-10">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-2xl font-black uppercase text-[#0d2b45]/20">No results</p>
            <p className="mt-2 text-sm text-[#1a5f8a]/50">
              Try a different filter or clear the search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((fish) => (
              <FishCard key={fish.id} fish={fish} />
            ))}
          </div>
        )}
      </section>

      {/* ── Availability note ──────────────────────────────────────────────── */}
      <div className="w-full bg-[#0d2b45] px-6 py-8 xl:px-10">
        <p className="text-sm text-[#4ab8e8]/70 max-w-2xl">
          * Availability varies by season and daily catch. Our selection changes constantly.
          Call{" "}
          <a href="tel:9107630992" className="font-bold text-[#f5c518] hover:underline">
            (910) 763-0992
          </a>{" "}
          to check current stock before making the trip.
        </p>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#071929] py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5c518]">
          🐟 &nbsp; Free Fish Program — Ask Us In Store &nbsp; 🐟
        </p>
        <p className="mt-4 text-xs text-white/30">
          © {new Date().getFullYear()} Zora&apos;s Seafood Market &amp; Kitchen
          &nbsp;·&nbsp; 1411 Castle St, Wilmington, NC
          &nbsp;·&nbsp; (910) 763-0992
        </p>
      </footer>
    </div>
  );
}
