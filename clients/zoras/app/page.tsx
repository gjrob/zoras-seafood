"use client";

import Image from "next/image";
import Nav from "./components/Nav";

// ─── Market product catalog ──────────────────────────────────────────────────

type MarketProduct = {
  category: string;
  categorySlug: string;
  name: string;
  description: string;
  price?: string;
  unit?: string;
  badge?: string;
  bestFor?: string;
};

const marketProducts: MarketProduct[] = [
  // ── Fresh Finfish ─────────────────────────────────────────────────────────
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Whole Flounder", description: "Local day-boat flounder, mild and sweet. Cleaned to order.", price: "$8", unit: "/ lb", badge: "Local", bestFor: "Pan-frying, stuffing, grilling" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Mahi Mahi", description: "Firm, slightly sweet flesh with a clean ocean flavor.", price: "$16", unit: "/ lb", bestFor: "Grilling, tacos, searing" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Cobia", description: "Rich, buttery NC coast catch — underrated and outstanding.", price: "$14", unit: "/ lb", badge: "Local", bestFor: "Sashimi, grilling, baking" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Triggerfish", description: "White, delicate, flaky — one of the coast's best-kept secrets.", price: "$16", unit: "/ lb", badge: "Local", bestFor: "Sautéing, frying, ceviche" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Spanish Mackerel", description: "Oily, bold, and ideal for grilling or smoking whole.", price: "$10", unit: "/ lb", badge: "In Season", bestFor: "Grilling, smoking, curing" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "King Mackerel", description: "Meaty, full-flavored steaks from the Carolina coast.", price: "$11", unit: "/ lb", bestFor: "Grilling, smoking, steaks" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Red Snapper", description: "Firm, moist flesh with a subtly sweet, nutty flavor.", price: "$18", unit: "/ lb", bestFor: "Whole roasting, pan-frying, ceviche" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Vermilion Snapper", description: "Sweet, delicate flavor — a lighter alternative to red snapper.", price: "$16", unit: "/ lb", bestFor: "Sautéing, broiling, light preparations" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Black Drum", description: "Mild, flaky NC coastal catch with a clean, slightly sweet taste.", price: "$12", unit: "/ lb", badge: "Local", bestFor: "Blackening, baking, steaming" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Pompano", description: "Rich, buttery whole fish — one of the finest eating fish on the Atlantic coast.", price: "$15", unit: "/ lb", bestFor: "Whole roasting, en papillote, pan-frying" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Speckled Sea Trout", description: "Tender, mild local fish — excellent pan-ready portions.", price: "$13", unit: "/ lb", badge: "Local", bestFor: "Pan-frying, broiling, light seasoning" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Swordfish", description: "Thick, meaty steaks with a mild, slightly sweet flavor.", price: "$19", unit: "/ lb", bestFor: "Grilling, schnitzel, searing" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Monkfish", description: "Firm, lobster-like texture — the \"poor man's lobster.\"", price: "$14", unit: "/ lb", bestFor: "Roasting, stews, braising" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Sheepshead", description: "Sweet, firm local fish with a mild, almost shellfish-like flavor.", price: "$13", unit: "/ lb", badge: "Local", bestFor: "Pan-frying, baking, chowder" },
  { category: "Fresh Finfish", categorySlug: "finfish", name: "Black Sea Bass", description: "Sustainably farmed at UNCW Aquaculture. High in protein, B12, and omega-3s.", price: "$17", unit: "/ lb", badge: "Sustainably Farmed", bestFor: "Steaming, roasting, pan-searing" },

  // ── The Tuna Family ───────────────────────────────────────────────────────
  { category: "The Tuna Family", categorySlug: "tuna", name: "Yellowfin Tuna", description: "Clean, mild, slightly sweet taste. Leaner and firmer. Bright red, versatile.", bestFor: "Searing, grilling, hearty cooked dishes" },
  { category: "The Tuna Family", categorySlug: "tuna", name: "Bigeye Tuna", description: "Bold, buttery flavor with a slightly sweet, nutty undertone. Higher fat content. Deep reddish-pink.", bestFor: "Raw dishes, sashimi, light searing" },
  { category: "The Tuna Family", categorySlug: "tuna", name: "Bluefin Tuna", description: "Intense marbling, extremely rich and buttery. Silky, melt-in-your-mouth texture. Deep red flesh.", badge: "Premium", bestFor: "Sushi, sashimi, lightly seared" },
  { category: "The Tuna Family", categorySlug: "tuna", name: "Albacore Tuna", description: "Gentle, mild flavor with subtle nuttiness. Tender, almost silky texture. Pale pink to light red.", bestFor: "Light searing, salads, delicate preparations" },
  { category: "The Tuna Family", categorySlug: "tuna", name: "Skipjack Tuna", description: "Lean, more assertive flavor. Firm texture that holds up well when cooked. Darker red flesh.", bestFor: "Cooked dishes, stews, bold preparations" },

  // ── The Grouper Family ────────────────────────────────────────────────────
  { category: "The Grouper Family", categorySlug: "grouper", name: "Gag Grouper", description: "Mild, slightly sweet flesh with tender yet firm texture. Versatile and reliable.", bestFor: "Grilling, pan-searing, blackening" },
  { category: "The Grouper Family", categorySlug: "grouper", name: "Red Grouper", description: "Firm, moist flesh with a sweet, nutty undertone. Crowd-pleasing balance of texture and flavor.", bestFor: "Fried, sautéed, grilled, baked" },
  { category: "The Grouper Family", categorySlug: "grouper", name: "Black Grouper", description: "Thick, moist fillets with a pronounced, buttery flavor. Rich and dense — made for bold preparations.", bestFor: "Blackening, roasting, robust stews" },
  { category: "The Grouper Family", categorySlug: "grouper", name: "Snowy Grouper", description: "Extra-firm, dense fillets with a subtly sweet flavor hinting at mild shellfish. Elegant presentation.", bestFor: "Roasting, steaming, poaching" },
  { category: "The Grouper Family", categorySlug: "grouper", name: "Strawberry Grouper", description: "Soft, buttery flesh with a hint of minerality and natural sweetness. Pairs beautifully with Mediterranean flavors.", bestFor: "Pan-searing, baking, gentle poaching" },
  { category: "The Grouper Family", categorySlug: "grouper", name: "Scamp Grouper", description: "Delicate yet firm, with clean sweet flavor. A prized eating fish along the southeastern coast.", bestFor: "Pan-frying, sautéing, light preparations" },

  // ── Shellfish & Crabs ─────────────────────────────────────────────────────
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Live Blue Crab", description: "Fresh from the sound, sold by the piece. Cleaned on request.", price: "$5", unit: "/ each", badge: "Local" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Stone Crab Claws", description: "Pre-cracked & ready, served chilled with mustard sauce.", price: "$18", unit: "/ lb" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Snow Crab Clusters", description: "Large clusters, perfect for steaming or boiling.", price: "$24", unit: "/ lb" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "NC White Shrimp", description: "Fresh-caught local shrimp. Head-on or peeled available.", price: "$12", unit: "/ lb", badge: "Local" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Atlantic Mussels", description: "Plump, briny, and tender. Perfect for steaming in white wine or broth.", price: "$7", unit: "/ lb" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Littleneck Clams", description: "Farmed from Cape Fear waters. Sweet, clean, and fresh.", price: "$16", unit: "/ dozen" },
  { category: "Shellfish & Crabs", categorySlug: "shellfish", name: "Crawfish", description: "Seasonal Louisiana crawfish — great for boils and étouffée.", price: "$8", unit: "/ lb", badge: "Seasonal" },

  // ── Named Oysters ─────────────────────────────────────────────────────────
  { category: "Named Oysters", categorySlug: "oysters", name: "New River Pirates", description: "Grown in the New River estuary, NC. Briny, clean, with a fresh cucumber finish.", price: "$18", unit: "/ dozen", badge: "NC Variety" },
  { category: "Named Oysters", categorySlug: "oysters", name: "Seabirdies", description: "NC farmed single-cup oysters. Sweet, meaty, with a mild salty finish.", price: "$18", unit: "/ dozen", badge: "NC Variety" },

  // ── Specialty Cuts ────────────────────────────────────────────────────────
  { category: "Specialty Cuts", categorySlug: "specialty", name: "Fish Collars", description: "The cut behind the gills. Buttery, rich, naturally marbled. Cooks up juicy inside, crispy outside.", bestFor: "Grilling, broiling, roasting, air frying" },
  { category: "Specialty Cuts", categorySlug: "specialty", name: "Bottarga", description: "Premium cured and dried fish roe — intensely savory, umami-rich. A true delicacy.", bestFor: "Shaved over pasta, eggs, toast" },
  { category: "Specialty Cuts", categorySlug: "specialty", name: "Shad & Roe", description: "Seasonal spring delicacy — the roe is rich, creamy, and deeply prized.", badge: "Seasonal", bestFor: "Pan-fried in butter, simply seasoned" },
  { category: "Specialty Cuts", categorySlug: "specialty", name: "Fish Cheeks", description: "Small, tender nuggets from the fish's face. Surprisingly rich and sweet.", bestFor: "Sautéing, quick pan-fry, ceviche" },

  // ── House-Made ────────────────────────────────────────────────────────────
  { category: "House-Made", categorySlug: "house", name: "Zora's Seafood Seasoning", description: "Our signature spice blend — great on everything from shrimp to veggies.", price: "$8", unit: "/ jar" },
  { category: "House-Made", categorySlug: "house", name: "Smoked Fish Dip", description: "House-smoked, 8 oz pint. Served with fried crackers.", price: "$10", unit: "/ pint" },
  { category: "House-Made", categorySlug: "house", name: "Sambal Butter", description: "Our signature steamer bag compound butter. Spicy, rich, addictive.", price: "$6", unit: "/ jar" },
  { category: "House-Made", categorySlug: "house", name: "Cocktail Sauce", description: "Housemade with fresh horseradish and lemon. No shortcuts.", price: "$5", unit: "/ jar" },
];

const CATEGORY_META: Record<string, { slug: string; accent: string; note?: string }> = {
  "Fresh Finfish":      { slug: "finfish",   accent: "#3a9eca" },
  "The Tuna Family":    { slug: "tuna",      accent: "#1a5f8a", note: "Descriptions and best-use profiles for each variety" },
  "The Grouper Family": { slug: "grouper",   accent: "#1a5f8a", note: "Six varieties — from mild to bold" },
  "Shellfish & Crabs":  { slug: "shellfish", accent: "#e8821a" },
  "Named Oysters":      { slug: "oysters",   accent: "#4ab8e8", note: "Single-cup NC varieties, shucked or on the shell" },
  "Specialty Cuts":     { slug: "specialty", accent: "#f5c518", note: "Ask the fishmonger — availability varies" },
  "House-Made":         { slug: "house",     accent: "#e8821a" },
};

const groupedMarket = marketProducts.reduce<Record<string, MarketProduct[]>>((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item);
  return acc;
}, {});

// ─── Kitchen menu ────────────────────────────────────────────────────────────

type MenuItem = { category: string; item: string; description: string; price: string };

const csvMenu = `Category,Item,Description,Price
Shrimp,Cold-Boiled Spiced NC Shrimp,"½ lb, served chilled with cocktail sauce",$15
Fish Dip,Smoked & Deviled Fish Dip,Served with fried crackers 8 oz,$8
Soup,Clam Chowder,Served with fried crackers,$5 / $8
Steamer Bags,Steamer Bag,"Includes: Zora's Seasoning, Potato, Corn, Sambal Butter, Lemon, Buttered Roll, 1/4 lb shrimp, 6 clams (No Substitutions)",$16
Steamer Bags Add-On,2 Blue Crab,,+$6
Steamer Bags Add-On,¼ lb Stone Crab,,+$9
Steamer Bags Add-On,¼ lb cluster Snow Crab,,+$16
Steamer Bags Add-On,¼ lb beef Andouille sausage,,+$4.50
Sides,Hush Puppies,,$4
Sides,Corn Cob,,$4
Sides,Slaw,,$4
Sides,Buttered Dinner Roll,,$4
Sides,Cheese Grits,,$4
Sides,Spiced Boiled Peanuts,,$5
Sides,Pickle,,$2
You Buy We Fry,Fry Service,"Buy any seafood from the market and we'll bread it and fry it for you",$4
You Buy We Fry,3 Sides Deal,dinner roll + choice of 2 sides,$7
Sandwiches,Fried Shrimp Burger,"with sweet & spicy chili slaw, served with chips",$12.50
Sandwiches,Smoked BBQ Swordfish,"with slaw & spicy tomato molasses sauce, served with chips",$12.50`;

const parseCsv = (input: string) => {
  const lines = input.trim().split("\n");
  return lines.map((line) => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === "," && !inQuotes) { cells.push(current); current = ""; continue; }
      current += char;
    }
    cells.push(current);
    return cells.map((c) => c.trim());
  });
};

const menuItems: MenuItem[] = (() => {
  const [headers, ...rows] = parseCsv(csvMenu);
  return rows
    .filter((row) => row.length >= headers.length)
    .map((row) => ({ category: row[0], item: row[1], description: row[2] ?? "", price: row[3] }));
})();

const groupedMenu = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item);
  return acc;
}, {});

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">

      <Nav lang="en" activeKey="home" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center">
        <Image
          src="/zoras-hero.webp"
          alt="Fresh seafood and fish displayed on ice at Zora's Market & Kitchen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#071929]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d2b45]/30 to-[#0d2b45]" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 py-28 text-center text-white">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-[#4ab8e8] bg-[#4ab8e8]/15 px-7 py-3 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4ab8e8]" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#4ab8e8]">
              Now Open · Est. 1956
            </span>
          </div>

          <h1 className="text-[clamp(3.5rem,13vw,8.5rem)] font-black uppercase leading-[0.9] tracking-tight drop-shadow-2xl">
            CAUGHT TODAY.<br />COOKED TODAY.
          </h1>

          <p className="mt-6 text-base font-light tracking-[0.35em] text-[#a8d8f0] md:text-lg">
            Zora&apos;s Seafood Market &amp; Kitchen &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Since 1956
          </p>

          <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <a href="https://maps.google.com/?q=Zora%27s+Fresh+Seafood+Market+%26+Kitchen+1411+Castle+St+Wilmington+NC"
              target="_blank" rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition hover:bg-white/20">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Location</p>
              <p className="mt-2 font-bold text-white">1411 Castle St</p>
              <p className="text-sm text-white/60">Wilmington, NC</p>
            </a>
            <a href="tel:9107630992"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition hover:bg-white/20">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Phone</p>
              <p className="mt-2 font-bold text-white">(910) 763-0992</p>
              <p className="text-sm text-white/60">Call for large orders</p>
            </a>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Hours</p>
              <p className="mt-2 text-sm font-bold text-white">Wed – Fri &nbsp;11am – 7pm</p>
              <p className="text-sm font-bold text-white">Saturday &nbsp;9am – 5pm</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#seafood"
              className="rounded-xl bg-[#e8821a] px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#d05a10]">
              Shop the Market
            </a>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="relative h-72 w-72 shrink-0 overflow-hidden rounded-full border-4 border-[#f5c518] shadow-2xl lg:h-80 lg:w-80">
              <Image src="/zoras-about.webp" alt="Zora holding a fresh red snapper" fill className="object-cover" />
            </div>
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Since 1956</p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">
                Fresh From the Coast
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#a8d8f0]">
                Zora&apos;s has been a Wilmington staple for generations — a no-frills seafood market
                and kitchen where the fish is always fresh, the seasoning is always right, and
                everyone&apos;s welcome at the counter.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#7bbcd6]">
                Whether you&apos;re picking up fresh catch for the grill, ordering a steamer bag for
                the whole crew, or grabbing a jar of our signature spice blend to take home — this is
                Wilmington seafood the way it&apos;s supposed to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Reviews ───────────────────────────────────────────────── */}
      <section className="w-full bg-[#eef6fb] py-16">
        <div className="w-full px-6 xl:px-10">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Big star badge */}
            <div className="flex shrink-0 flex-col items-center justify-center rounded-3xl border-2 border-[#f5c518] bg-white px-10 py-8 shadow-lg">
              <div className="flex gap-1 text-3xl leading-none">
                {'★★★★½'.split('').map((s, i) => (
                  <span key={i} className="text-[#f5c518]">{s}</span>
                ))}
              </div>
              <p className="mt-3 text-5xl font-black text-[#0d2b45]">4.5</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-widest text-[#3a9eca]">on Google</p>
              <p className="mt-3 text-xs text-[#1a5f8a]">400+ reviews</p>
            </div>

            {/* Review quotes */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">What Wilmington Says</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#0d2b45]">
                  400 Reviews &amp; Counting
                </h2>
                <p className="mt-2 text-base text-[#1a5f8a]">
                  A Wilmington institution since 1956 — and Google knows it.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { quote: "Best seafood market in Wilmington. The steamer bag is unreal — every time.", author: "Jason M." },
                  { quote: "Zora's is the only place I trust for fresh fish. Been coming here for 20 years.", author: "Patricia L." },
                  { quote: "The smoked fish dip alone is worth the trip. Real deal, no pretense.", author: "Marcus T." },
                  { quote: "Freshest shrimp on the coast. The 'You Buy We Fry' deal is genius.", author: "Tanya R." },
                ].map(({ quote, author }) => (
                  <div key={author} className="rounded-2xl border border-[#0d2b45]/10 bg-white p-5 shadow-sm">
                    <p className="text-sm leading-relaxed text-[#1a5f8a]">&ldquo;{quote}&rdquo;</p>
                    <p className="mt-3 text-xs font-bold text-[#0d2b45]">— {author}</p>
                    <div className="mt-1 flex gap-0.5 text-sm text-[#f5c518]">★★★★★</div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.google.com/search?q=Zora%27s+Seafood+Market+Wilmington+NC"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#e8821a] transition hover:underline"
              >
                See all reviews on Google →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Seafood (Marketplace) ─────────────────────────────────────── */}
      <section id="seafood" className="w-full bg-white py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-12 flex flex-col gap-2 border-b border-[#0d2b45]/10 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">Fresh Daily</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-[#0d2b45]">Our Seafood</h2>
            <p className="mt-1 max-w-2xl text-base text-[#1a5f8a]">
              Straight from the coast to the counter. 30+ species in rotation — availability
              changes with the daily catch. Call ahead for large orders.
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(groupedMarket).map(([category, products]) => {
              const meta = CATEGORY_META[category];
              return (
                <div key={category} id={`seafood-${meta?.slug ?? category}`}>
                  {/* Category header */}
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <h3
                      className="shrink-0 text-xs font-black uppercase tracking-[0.4em]"
                      style={{ color: meta?.accent ?? "#e8821a" }}
                    >
                      {category}
                    </h3>
                    <div className="h-px flex-1 bg-[#0d2b45]/10" />
                    {meta?.note && (
                      <span className="text-[10px] italic text-[#3a9eca]">{meta.note}</span>
                    )}
                  </div>

                  {/* Product grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {products.map((product) => (
                      <div
                        key={product.name}
                        className="flex flex-col justify-between rounded-2xl border border-[#0d2b45]/10 bg-[#eef6fb] p-5 transition hover:border-[#3a9eca]/50 hover:shadow-md"
                      >
                        <div className="flex-1">
                          {/* Name + badge */}
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-[#0d2b45]">{product.name}</p>
                            {product.badge && (
                              <span
                                className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                                style={{
                                  background: `${meta?.accent ?? "#3a9eca"}20`,
                                  color: meta?.accent ?? "#1a5f8a",
                                }}
                              >
                                {product.badge}
                              </span>
                            )}
                          </div>
                          {/* Description */}
                          <p className="mt-2 text-sm leading-relaxed text-[#1a5f8a]">{product.description}</p>
                          {/* Best for */}
                          {product.bestFor && (
                            <p className="mt-2 text-[11px] text-[#3a9eca]">
                              <span className="font-bold">Best for:</span> {product.bestFor}
                            </p>
                          )}
                        </div>
                        {/* Price footer (only when price exists) */}
                        {product.price && (
                          <div className="mt-4 flex items-baseline gap-1 border-t border-[#0d2b45]/10 pt-4">
                            <span className="text-xl font-black" style={{ color: meta?.accent ?? "#e8821a" }}>
                              {product.price}
                            </span>
                            {product.unit && (
                              <span className="text-xs text-[#3a9eca]">{product.unit}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative mt-16 h-56 w-full overflow-hidden rounded-3xl">
            <Image src="/zoras-crabs.webp" alt="Live blue crabs fresh from the sound" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b45]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">Today&apos;s Catch</p>
                <p className="mt-1 text-2xl font-black uppercase text-white">Live Blue Crabs</p>
                <p className="text-sm text-white/70">Fresh from the sound — $5 each</p>
              </div>
            </div>
          </div>

          <p className="mt-8 rounded-2xl border border-[#0d2b45]/10 bg-[#eef6fb] px-6 py-4 text-sm text-[#1a5f8a]">
            <span className="font-bold text-[#0d2b45]">Note: </span>
            Availability is subject to the daily catch. Call{" "}
            <a href="tel:9107630992" className="font-bold text-[#e8821a] hover:underline">(910) 763-0992</a>{" "}
            to confirm stock before making a trip.
          </p>
        </div>
      </section>

      {/* ── Kitchen Menu ─────────────────────────────────────────────────── */}
      <section id="menu" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-12 border-b border-white/10 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Kitchen</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">Menu</h2>
            <p className="mt-2 max-w-2xl text-base text-[#7bbcd6]">Market staples cooked fresh to order.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(groupedMenu).map(([category, items]) => (
              <div key={category} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#f5c518]">{category}</h3>
                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    <div key={`${category}-${item.item}`}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-white">{item.item}</p>
                        <span className="shrink-0 text-sm font-bold text-[#4ab8e8]">{item.price}</span>
                      </div>
                      {item.description && <p className="mt-1 text-sm text-[#7bbcd6]">{item.description}</p>}
                      <div className="mt-3 h-px bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recipes placeholder ───────────────────────────────────────────── */}
      <section id="recipes" className="w-full bg-[#eef6fb] py-20">
        <div className="w-full px-6 xl:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">Coming Soon</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#0d2b45]">Seafood Recipes</h2>
          <p className="mt-4 max-w-xl text-base text-[#1a5f8a]">
            Zora&apos;s family recipes — from fried flounder to blue crab boils — coming soon.
          </p>
        </div>
      </section>

      {/* ── Visit / Contact ───────────────────────────────────────────────── */}
      <section id="order" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Find Us</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">Visit the Market</h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Address</p>
                <p className="mt-1 text-lg font-bold text-white">1411 Castle St, Wilmington, NC</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Hours</p>
                <p className="mt-1 text-[#a8d8f0]">Wednesday – Friday: 11am – 7pm</p>
                <p className="text-[#a8d8f0]">Saturday: 9am – 5pm</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Phone</p>
                <a href="tel:9107630992" className="mt-1 block text-lg font-bold text-[#4ab8e8] transition hover:text-[#f5c518]">
                  (910) 763-0992
                </a>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#4ab8e8] bg-[#4ab8e8]/10 px-6 py-3">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4ab8e8]" />
                <span className="text-xs font-black uppercase tracking-[0.35em] text-[#4ab8e8]">
                  Now Open · Wed–Sat
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Zora's Seafood Market & Kitchen Map"
                src="https://www.google.com/maps?q=Zora%27s+Fresh+Seafood+Market+%26+Kitchen+1411+Castle+St+Wilmington+NC&output=embed"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="w-full bg-[#eef6fb] py-16">
        <div className="w-full px-6 xl:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">Stay in the Loop</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#0d2b45]">
              Weekly Fresh Catch
            </h2>
            <p className="mt-3 text-base text-[#1a5f8a]">
              Know before you go. Every week we send out what&apos;s freshest —
              market specials, seasonal catches, and first dibs on the good stuff.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full rounded-xl border border-[#0d2b45]/20 bg-white px-5 py-3.5 text-sm text-[#0d2b45] placeholder-[#3a9eca]/50 outline-none transition focus:border-[#3a9eca] sm:rounded-r-none sm:rounded-l-xl"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#e8821a] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow transition hover:bg-[#d05a10] sm:rounded-l-none sm:rounded-r-xl"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-[#1a5f8a]/60">
              No spam. Unsubscribe anytime. Just fresh fish.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer id="free-fish" className="w-full bg-[#071929] py-10 text-center">
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
