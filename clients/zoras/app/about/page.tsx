"use client";

import Image from "next/image";
import Nav from "../components/Nav";

// ─── Story ───────────────────────────────────────────────────────────────────

const STORY = [
  `Since 1956, Zora's Seafood Market has been a Castle Street institution, serving up fresh local catch with a warmth and charm that makes everyone feel at home. Known for its buzzing market and community energy, Zora's is the place locals and visitors flock to for boiled shrimp, crispy fried fish, fresh fillets, and feisty crabs. It's all about the joy of proper, flavor-packed seafood—with a healthy dash of fun.`,
  `Our seafood market is growing, bringing more of the Carolina coast to your plate. Alongside the usual favorites—fish, shrimp, oysters, and crabs—we're adding carefully picked seasonal and sustainable catches like grouper, tilefish, tuna, and swordfish. Each item is chosen for quality, freshness, and a strong connection to local waters—the perfect balance of tradition and something unexpected.`,
  `The seafood counter remains the beating heart of Zora's. Chat with our fishmongers, explore the bounty of North Carolina waters, and take home ingredients that turn everyday dinners into coastal feasts. Every visit is a chance to discover something new from the sea.`,
  `The restaurant is open, serving a bold, coastal menu that honors Zora's classics while adding fresh energy. The star? Steamer Bags—a hands-on, napkin-heavy celebration of the Carolina coast. Packed with Zora's seasoning, tender potatoes, sweet corn, sambal butter, spiced boiled peanuts, bright lemon, and a buttered roll, all wrapped around plump shrimp and briny clams. Messy, generous, and perfect for sharing.`,
  `Feeling daring? Steamer Bags are built to customize. Add Blue Crab, Stone Crab, Snow Crab clusters, or beef Andouille sausage for extra punch. Hosting a party? "You Buy, We Fry." Pick any seafood from the market, and we'll bread and fry it for you—perfect for a quick, indulgent treat.`,
  `Zora's is more than a seafood shop. It's a Castle Street fixture, a hub for the community, and a taste of Wilmington's soul—louder, bolder, and more delicious than ever.`,
];

// ─── Seafood list ─────────────────────────────────────────────────────────────

const SEAFOOD = [
  "Almaco Jack", "Atlantic Mussels", "Blue Crab", "Bonita", "Bottarga", "Bluefish",
  "Catfish", "Cobia", "Crawfish", "Drum Black", "Drum Red", "Flounder",
  "Grouper Black", "Grouper Gag", "Grouper Red", "Grouper Scamp", "Grouper Snowy", "Grouper Strawberry",
  "Grunt White", "Mahi Mahi", "Monkfish", "Oysters New River Pirates", "Oysters Seabirdies", "Pigfish",
  "Pomfret", "Pompano", "Seabass Black", "Seabass Striped", "Shad & Roe", "Sheepshead",
  "Snapper Vermilion", "Snapper Red", "Spadefish", "Spanish Mackerel", "Swordfish", "Swordfish Schnitzel",
  "Tilefish Golden", "Tilefish Grey", "Tuna Bigeye", "Tuna Bluefin", "Tuna Yellowfin",
  "Triggerfish", "Trout Speckled Sea",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">

      <Nav lang="en" activeKey="about" />

      {/* ── WHO WE ARE header ────────────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 pb-16 pt-20 xl:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">
          Castle Street &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Since 1956
        </p>
        <h1 className="mt-5 text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
          Who We Are
        </h1>
        <div className="mt-6 h-1 w-20 rounded-full bg-[#f5c518]" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#7bbcd6]">
          A Castle Street institution since 1956 — Wilmington&apos;s home for fresh coastal
          seafood, bold flavors, and the kind of community energy you can&apos;t manufacture.
        </p>
      </section>

      {/* ── Two-column story ─────────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[50vw] lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)]">
            <Image
              src="/zoras-about.webp"
              alt="Fresh red snapper held at Zora's Market & Kitchen"
              fill className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2b45]/80 to-transparent px-8 pb-8 pt-20">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">
                Zora&apos;s Seafood Market &amp; Kitchen
              </p>
              <p className="mt-1 text-sm text-white/70">1411 Castle St, Wilmington, NC</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-7 px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
            <blockquote className="border-l-4 border-[#f5c518] pl-5">
              <p className="text-xl font-bold italic leading-snug text-[#0d2b45] md:text-2xl">
                &ldquo;It&apos;s all about the joy of proper, flavor-packed seafood—with a
                healthy dash of fun.&rdquo;
              </p>
            </blockquote>

            {STORY.map((para, i) => (
              <p key={i} className="text-base leading-[1.8] text-[#1a5f8a] md:text-[17px]">{para}</p>
            ))}

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[#0d2b45]/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Location</p>
                <p className="mt-1 font-semibold text-[#0d2b45]">1411 Castle St</p>
                <p className="text-sm text-[#1a5f8a]">Wilmington, NC</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Hours</p>
                <p className="mt-1 text-sm font-semibold text-[#0d2b45]">Wed–Fri 11am–7pm</p>
                <p className="text-sm font-semibold text-[#0d2b45]">Saturday 9am–5pm</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Phone</p>
                <a href="tel:9107630992" className="mt-1 block font-semibold text-[#1a5f8a] transition hover:text-[#e8821a]">
                  (910) 763-0992
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seafood list ─────────────────────────────────────────────────── */}
      <section id="our-catch" className="w-full bg-[#0d2b45] px-6 py-20 xl:px-10">
        <div className="mb-12 border-b border-white/10 pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">At the Counter</p>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
            What We Carry
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#7bbcd6]">
            Fresh from North Carolina waters and beyond. Our selection changes with the season
            and the catch — below is a guide to what you might find at the counter.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#4ab8e8]/30 bg-[#4ab8e8]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ab8e8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4ab8e8]">
              {SEAFOOD.length} species available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {SEAFOOD.map((fish) => (
            <div key={fish} className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-all hover:border-[#f5c518]/50 hover:bg-[#f5c518]/5">
              <div className="mb-1.5 h-0.5 w-4 rounded-full bg-[#f5c518]/40 transition-all group-hover:w-6 group-hover:bg-[#f5c518]" />
              <p className="text-sm font-semibold leading-snug text-white group-hover:text-[#f5c518]">{fish}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#4ab8e8]/60">
          * Availability varies by season and daily catch. Call{" "}
          <a href="tel:9107630992" className="font-bold text-[#f5c518] transition hover:underline">(910) 763-0992</a>{" "}
          to check current stock before making the trip.
        </p>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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
