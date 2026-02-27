import Nav from "../components/Nav";

// ─── Fish facts data ──────────────────────────────────────────────────────────

const FACTS = [
  {
    emoji: "🦷",
    title: "Sheepshead has human teeth",
    body: "Sheepshead (Archosargus probatocephalus) has rows of molar-like teeth that look eerily human. It uses them to crush barnacles, oysters, and crabs — which is exactly why the meat tastes so sweet.",
  },
  {
    emoji: "🔵",
    title: "Bluefin Tuna can be worth over $100,000",
    body: "A single Giant Bluefin Tuna caught off North Carolina can fetch $40,000–$150,000 at the Tsukiji-style auctions in Japan. The fish's fatty belly (toro) is considered the finest sushi ingredient in the world.",
  },
  {
    emoji: "⚡",
    title: "Mahi Mahi can swim 50 mph",
    body: "Dolphinfish (Coryphaena hippurus) are among the fastest fish in the ocean, reaching bursts of 50 mph. They also grow at a blistering pace — up to 1.3 inches per week — which makes them one of the most sustainable large-fish choices.",
  },
  {
    emoji: "🗺️",
    title: "Red Drum is NC's state fish",
    body: "The Red Drum (Sciaenops ocellatus) was designated North Carolina's official state saltwater fish in 1971. It earned the title the hard way — by being caught in every estuary, inlet, and nearshore reef from Hatteras to Brunswick County.",
  },
  {
    emoji: "🦞",
    title: "Triggerfish tastes like lobster",
    body: "Locals keep Triggerfish as a well-guarded secret. Its firm white flesh has a clean, subtly sweet flavor often compared to lobster — the result of a diet rich in crabs, sea urchins, and mollusks. It's one of the best-eating fish on the East Coast.",
  },
  {
    emoji: "🌊",
    title: "The Gulf Stream runs 40 miles offshore",
    body: "Wilmington sits within easy reach of the Gulf Stream — the mighty current that flows north along the outer edge of the continental shelf. It's why we can carry Yellowfin Tuna, Mahi Mahi, and Wahoo caught the same morning they hit our counter.",
  },
  {
    emoji: "🌿",
    title: "Mussels are the cleanest shellfish to farm",
    body: "Rope-grown mussels require zero feed, zero freshwater, and actually improve water quality by filtering phytoplankton. A single mussel can filter up to 25 gallons of water per day, making them one of the most environmentally beneficial foods you can eat.",
  },
  {
    emoji: "🏠",
    title: "Blue Crabs are born in saltwater, raised in fresh",
    body: "Female Blue Crabs migrate to high-salinity offshore water to spawn, releasing up to 8 million eggs. The larvae then ride currents back into estuaries like the Cape Fear River, where they molt and grow — sometimes traveling 200 miles in their lifetime.",
  },
  {
    emoji: "🎨",
    title: "Mahi Mahi glows neon when alive",
    body: "Freshly caught Mahi Mahi cycle through vivid greens, blues, and golds — a biological light show triggered by excitement and stress. The colors fade within minutes of landing. It's one reason experienced anglers say there's nothing more beautiful than a jumping dorado in the sunlight.",
  },
  {
    emoji: "⚓",
    title: "Golden Tilefish lives in clay burrows",
    body: "Golden Tilefish (Lopholatilus chamaeleonticeps) dig elaborate burrows in the soft clay bottom at 400–900 feet deep, in a zone called the 'Tilefish Garden.' They eat shrimp, crabs, and worms from around their burrows — which is why their flesh tastes so sweet.",
  },
  {
    emoji: "🔱",
    title: "Swordfish can heat their eyes",
    body: "Swordfish have a unique organ near their brains that warms their retinas up to 10–15°F above surrounding water temperature. This sharpens their vision in cold, deep water while chasing prey — giving them one of the most advanced visual systems of any fish.",
  },
  {
    emoji: "📅",
    title: "Oyster season follows the 'R months'",
    body: "The old rule — eat oysters only in months containing the letter 'R' (September through April) — exists because summer spawning makes oysters thin and watery. It also predates refrigeration, when warm-water oysters could harbor vibrio bacteria. The rule still holds for flavor: fall and winter oysters are the fattest and finest.",
  },
  {
    emoji: "🐟",
    title: "Zora's has served Wilmington for 70 years",
    body: "Since 1956, Zora's has operated from Castle Street — through hurricanes, recessions, and three generations of the same families at the counter. The fishmongers here have filleted more flounder, shucked more oysters, and steamed more crabs than most restaurants will ever see.",
  },
  {
    emoji: "🧬",
    title: "Cobia is closely related to remora",
    body: "Cobia (Rachycentron canadum) is the sole member of its family, Rachycentridae, and its closest relative is the remora — the hitchhiker fish that clings to sharks. Unlike remoras, Cobia is a powerful predator, pursuing cobia-sized prey across the open ocean at speed.",
  },
  {
    emoji: "🌊",
    title: "Spanish Mackerel migrate hundreds of miles",
    body: "Spanish Mackerel follow the warm water north every spring in a migration that sweeps up the East Coast — appearing off Cape Hatteras and Wilmington in April and May, then pushing north toward New England by summer. By October they're back, heading south. Our season is short but spectacular.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FactsPage() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">
      <Nav lang="en" activeKey="facts" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 pb-16 pt-20 xl:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">
          Zora&apos;s &nbsp;·&nbsp; Did You Know?
        </p>
        <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
          Fish Facts
        </h1>
        <div className="mt-5 h-1 w-20 rounded-full bg-[#f5c518]" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#7bbcd6]">
          {FACTS.length} things worth knowing about the seafood you eat — from the waters of
          North Carolina to the depths of the Gulf Stream.
        </p>
      </section>

      {/* ── Facts grid ────────────────────────────────────────────────────── */}
      <section className="w-full px-4 py-12 xl:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((fact, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-white border border-[#0d2b45]/10 overflow-hidden transition-all hover:border-[#0d2b45]/25 hover:shadow-lg"
            >
              {/* Top color strip */}
              <div className="h-1 w-full bg-gradient-to-r from-[#f5c518] to-[#e8821a]" />

              <div className="px-5 py-5">
                <span className="text-3xl">{fact.emoji}</span>

                <h3 className="mt-3 text-base font-black text-[#0d2b45] leading-snug tracking-tight">
                  {fact.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#1a5f8a]">{fact.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 py-16 xl:px-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">
          Ready to eat?
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight text-[#f5c518] leading-none">
          Come to the Counter
        </h2>
        <p className="mt-4 text-base text-[#7bbcd6] max-w-lg mx-auto">
          1411 Castle St, Wilmington, NC &nbsp;·&nbsp; Wed–Fri 11am–7pm &nbsp;·&nbsp; Sat 9am–5pm
        </p>
        <a
          href="tel:9107630992"
          className="mt-6 inline-block rounded-xl bg-[#f5c518] px-8 py-3.5 text-sm font-black uppercase tracking-wider text-[#0d2b45] hover:bg-[#e0b310] transition"
        >
          (910) 763-0992
        </a>
      </section>

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
