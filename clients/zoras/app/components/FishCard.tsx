"use client";

import { useState } from "react";
import Link from "next/link";
import type { Fish, Recipe } from "../../lib/fish-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "../../lib/fish-data";

// ─── Recipe accordion ─────────────────────────────────────────────────────────

function RecipeBlock({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 rounded-xl border border-[#0d2b45]/15 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-[#f5f0e8] hover:bg-[#ede7d8] transition text-left"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8821a]">Recipe</p>
          <p className="text-sm font-bold text-[#0d2b45] leading-tight mt-0.5">{recipe.name}</p>
          <p className="text-[11px] text-[#1a5f8a] mt-0.5">
            Serves {recipe.serves} &nbsp;·&nbsp; {recipe.time}
          </p>
        </div>
        <svg
          className={`shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="14" height="9" viewBox="0 0 14 9" fill="none"
          stroke="#0d2b45" strokeWidth="2" strokeLinecap="round"
        >
          <path d="M1 1l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pt-4 pb-5 bg-white space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a5f8a] mb-2">Ingredients</p>
            <ul className="space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#0d2b45]">
                  <span className="text-[#f5c518] mt-0.5 shrink-0">·</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a5f8a] mb-2">Method</p>
            <ol className="space-y-2">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#1a5f8a] leading-relaxed">
                  <span className="text-[10px] font-black text-[#f5c518] bg-[#0d2b45] rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fish detail modal ────────────────────────────────────────────────────────

function FishDetailModal({ fish, onClose }: { fish: Fish; onClose: () => void }) {
  const colors = CATEGORY_COLORS[fish.category];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div className="sticky top-0 z-10 bg-[#0d2b45] px-6 pt-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-block text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full mb-2"
                style={{ background: colors.bg, color: colors.text }}
              >
                {CATEGORY_LABELS[fish.category]}
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                {fish.name}
              </h2>
              {fish.localName && (
                <p className="text-sm text-[#7bbcd6] mt-1 italic">"{fish.localName}"</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 mt-1 rounded-full w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Description */}
          <p className="text-[15px] leading-relaxed text-[#1a5f8a]">{fish.description}</p>

          {/* Flavor profile */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Taste",   value: fish.flavorProfile.taste },
              { label: "Texture", value: fish.flavorProfile.texture },
              { label: "Fat",     value: fish.flavorProfile.fat },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#f5f0e8] px-4 py-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8821a]">{item.label}</p>
                <p className="text-sm font-semibold text-[#0d2b45] mt-1 leading-tight">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Seasons & market weight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#0d2b45]/10 px-4 py-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a5f8a]">Peak Season</p>
              <p className="text-sm font-semibold text-[#0d2b45] mt-1 leading-snug">
                {fish.seasons.join(", ")}
              </p>
            </div>
            {fish.marketWeight && (
              <div className="rounded-xl border border-[#0d2b45]/10 px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a5f8a]">Market Weight</p>
                <p className="text-sm font-semibold text-[#0d2b45] mt-1">{fish.marketWeight}</p>
              </div>
            )}
          </div>

          {/* Recipes */}
          {fish.recipes?.map((r, i) => (
            <RecipeBlock key={i} recipe={r} />
          ))}

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#0d2b45]/10">
            <p className="text-xs text-[#7bbcd6]">
              Availability varies by season. Call to check.
            </p>
            <a
              href="tel:9107630992"
              className="shrink-0 rounded-xl bg-[#f5c518] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-[#0d2b45] hover:bg-[#e0b310] transition"
            >
              (910) 763-0992
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Fish card ────────────────────────────────────────────────────────────────

export default function FishCard({ fish }: { fish: Fish }) {
  const [modalOpen, setModalOpen] = useState(false);
  const colors = CATEGORY_COLORS[fish.category];

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="group w-full text-left rounded-2xl bg-white border border-[#0d2b45]/10 overflow-hidden transition-all duration-200 hover:border-[#0d2b45]/30 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7abf]"
      >
        {/* Category bar */}
        <div
          className="px-4 py-2 flex items-center justify-between"
          style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}
        >
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: colors.text }}
          >
            {CATEGORY_LABELS[fish.category]}
          </span>
          {fish.recipes && fish.recipes.length > 0 && (
            <span className="text-[9px] font-bold text-[#e8821a] uppercase tracking-widest">
              Recipe →
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          <h3 className="font-black uppercase text-[#0d2b45] leading-tight tracking-tight text-base group-hover:text-[#1a4a7a] transition-colors">
            {fish.name}
          </h3>
          {fish.localName && (
            <p className="text-[11px] italic text-[#7bbcd6] mt-0.5">"{fish.localName}"</p>
          )}

          <div className="mt-3 h-px w-8 bg-[#f5c518] group-hover:w-12 transition-all duration-200 rounded-full" />

          <p className="mt-3 text-xs leading-relaxed text-[#1a5f8a] line-clamp-3">
            {fish.description}
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-semibold text-[#0d2b45]/40 uppercase tracking-widest">
              {fish.flavorProfile.taste}
            </span>
            <span className="text-[10px] text-[#0d2b45]/25">·</span>
            <span className="text-[10px] font-semibold text-[#0d2b45]/40 uppercase tracking-widest">
              {fish.flavorProfile.fat}
            </span>
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a7abf] group-hover:text-[#0d2b45] transition-colors">
            Tap to explore →
          </p>
        </div>
      </button>

      {/* Detail modal (portal-style) */}
      {modalOpen && (
        <FishDetailModal fish={fish} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
