import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import { FISH_CATALOG, CATEGORY_LABELS, CATEGORY_COLORS } from "../../../lib/fish-data";

export function generateStaticParams() {
  return FISH_CATALOG.map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fish = FISH_CATALOG.find((f) => f.id === id);
  if (!fish) return {};
  return {
    title: `${fish.name} | Zora's Seafood Market & Kitchen`,
    description: fish.description.slice(0, 155),
  };
}

export default async function FishDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fish = FISH_CATALOG.find((f) => f.id === id);
  if (!fish) notFound();

  const colors = CATEGORY_COLORS[fish.category];

  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">
      <Nav lang="en" activeKey="seafood" />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 pb-14 pt-20 xl:px-10">
        <Link
          href="/seafood"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#4ab8e8] hover:text-white transition mb-6"
        >
          ← Our Seafood
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="inline-block text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
            style={{ background: colors.bg, color: colors.text }}
          >
            {CATEGORY_LABELS[fish.category]}
          </span>
        </div>

        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
          {fish.name}
        </h1>
        {fish.localName && (
          <p className="mt-2 text-lg italic text-[#7bbcd6]">"{fish.localName}"</p>
        )}
        <div className="mt-5 h-1 w-20 rounded-full bg-[#f5c518]" />
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#7bbcd6]">
          {fish.description}
        </p>
      </section>

      {/* ── Detail cards ────────────────────────────────────────────────────── */}
      <section className="w-full bg-white px-6 py-12 xl:px-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Flavor profile */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e8821a] mb-4">
              Flavor Profile
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Taste",   value: fish.flavorProfile.taste },
                { label: "Texture", value: fish.flavorProfile.texture },
                { label: "Fat",     value: fish.flavorProfile.fat },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#f5f0e8] px-5 py-4 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8821a]">{item.label}</p>
                  <p className="text-sm font-bold text-[#0d2b45] mt-1.5 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Season & weight */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#0d2b45]/10 px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1a5f8a]">Peak Season</p>
              <p className="text-base font-bold text-[#0d2b45] mt-1.5 leading-snug">
                {fish.seasons.join(", ")}
              </p>
            </div>
            {fish.marketWeight && (
              <div className="rounded-2xl border border-[#0d2b45]/10 px-5 py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1a5f8a]">Market Weight</p>
                <p className="text-base font-bold text-[#0d2b45] mt-1.5">{fish.marketWeight}</p>
              </div>
            )}
          </div>

          {/* Recipes */}
          {fish.recipes && fish.recipes.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e8821a] mb-4">
                Recipes from Zora&apos;s Kitchen
              </p>
              {fish.recipes.map((recipe, i) => (
                <div key={i} className="rounded-2xl border border-[#0d2b45]/10 overflow-hidden mb-4">
                  {/* Recipe header */}
                  <div className="bg-[#0d2b45] px-5 py-4">
                    <h3 className="text-lg font-black text-[#f5c518] leading-tight">{recipe.name}</h3>
                    <p className="text-xs text-[#7bbcd6] mt-1">
                      Serves {recipe.serves} &nbsp;·&nbsp; {recipe.time}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white">
                    {/* Ingredients */}
                    <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-[#0d2b45]/8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1a5f8a] mb-3">
                        Ingredients
                      </p>
                      <ul className="space-y-1.5">
                        {recipe.ingredients.map((ing, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#0d2b45]">
                            <span className="text-[#f5c518] shrink-0 mt-0.5 font-bold">·</span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Method */}
                    <div className="px-5 py-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1a5f8a] mb-3">
                        Method
                      </p>
                      <ol className="space-y-3">
                        {recipe.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-[#1a5f8a] leading-relaxed">
                            <span className="text-[10px] font-black text-[#f5c518] bg-[#0d2b45] rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to action */}
          <div className="rounded-2xl bg-[#0d2b45] px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Ready to cook {fish.name}?</p>
              <p className="text-xs text-[#7bbcd6] mt-1">
                Call ahead to check availability and request your cut.
              </p>
            </div>
            <a
              href="tel:9107630992"
              className="shrink-0 rounded-xl bg-[#f5c518] px-6 py-3 text-sm font-black uppercase tracking-wider text-[#0d2b45] hover:bg-[#e0b310] transition text-center"
            >
              (910) 763-0992
            </a>
          </div>
        </div>
      </section>

      {/* ── More fish ───────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#eef6fb] px-6 py-12 xl:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a5f8a] mb-4">
            Explore More
          </p>
          <Link
            href="/seafood"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0d2b45] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#1a4a7a] transition"
          >
            ← Back to Seafood Catalog
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
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
