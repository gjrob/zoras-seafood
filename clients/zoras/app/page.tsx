"use client";

import Image from "next/image";
import Nav from "./components/Nav";

// ─── Market product catalog ──────────────────────────────────────────────────

type MarketProduct = {
  category: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  badge?: string;
};

const marketProducts: MarketProduct[] = [
  { category: "Fresh Fish", name: "Whole Flounder", description: "Local day-boat flounder, cleaned on request", price: "$8", unit: "/ lb", badge: "Local" },
  { category: "Fresh Fish", name: "Yellowfin Tuna", description: "Sashimi-grade steaks, deep-ocean caught", price: "$22", unit: "/ lb" },
  { category: "Fresh Fish", name: "Spanish Mackerel", description: "Ideal for grilling or smoking whole", price: "$10", unit: "/ lb", badge: "In Season" },
  { category: "Fresh Fish", name: "Black Drum Fillets", description: "Mild, flaky NC coastal catch", price: "$12", unit: "/ lb" },
  { category: "Fresh Fish", name: "Red Snapper Fillet", description: "Gulf-sourced, skin-on portions", price: "$18", unit: "/ lb" },
  { category: "Shellfish & Crabs", name: "Live Blue Crab", description: "Fresh from the sound, sold by the piece", price: "$5", unit: "/ each", badge: "Local" },
  { category: "Shellfish & Crabs", name: "Stone Crab Claws", description: "Pre-cracked & ready, served chilled", price: "$18", unit: "/ lb" },
  { category: "Shellfish & Crabs", name: "Snow Crab Clusters", description: "Large clusters, perfect for steaming", price: "$24", unit: "/ lb" },
  { category: "Shellfish & Crabs", name: "NC White Shrimp", description: "Fresh-caught, head-on or peeled available", price: "$12", unit: "/ lb", badge: "Local" },
  { category: "Shellfish & Crabs", name: "Littleneck Clams", description: "Farmed from Cape Fear waters", price: "$16", unit: "/ dozen" },
  { category: "Shellfish & Crabs", name: "Oysters", description: "Local single-cup, shucked or on the shell", price: "$18", unit: "/ dozen", badge: "In Season" },
  { category: "Market Items", name: "Zora's Seafood Seasoning", description: "Our signature blend — great on everything", price: "$8", unit: "/ jar" },
  { category: "Market Items", name: "Smoked Fish Dip", description: "House-smoked, 8 oz pint with crackers", price: "$10", unit: "/ pint" },
  { category: "Market Items", name: "Cocktail Sauce", description: "Housemade with horseradish & lemon", price: "$5", unit: "/ jar" },
  { category: "Market Items", name: "Sambal Butter", description: "Our signature steamer bag compound butter", price: "$6", unit: "/ jar" },
];

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
            FISHY<br />GOODNESS
          </h1>

          <p className="mt-6 text-base font-light tracking-[0.35em] text-[#a8d8f0] md:text-lg">
            Zora&apos;s Seafood Market &amp; Kitchen &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Since 1956
          </p>

          <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <a href="https://maps.google.com/?q=1411+Castle+St+Wilmington+NC"
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
            <a href="#menu"
              className="rounded-xl bg-[#e8821a] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#d05a10]">
              View Menu
            </a>
            <a href="#seafood"
              className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20">
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
              Straight from the coast to the counter. Availability changes with the daily catch —
              call ahead for large orders.
            </p>
          </div>

          <div className="space-y-14">
            {Object.entries(groupedMarket).map(([category, products]) => (
              <div key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="shrink-0 text-xs font-black uppercase tracking-[0.4em] text-[#e8821a]">
                    {category}
                  </h3>
                  <div className="h-px w-full bg-[#0d2b45]/10" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {products.map((product) => (
                    <div key={product.name}
                      className="flex flex-col justify-between rounded-2xl border border-[#0d2b45]/10 bg-[#eef6fb] p-5 transition hover:border-[#3a9eca]/50 hover:shadow-md">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-[#0d2b45]">{product.name}</p>
                          {product.badge && (
                            <span className="shrink-0 rounded-full bg-[#3a9eca]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1a5f8a]">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-[#1a5f8a]">{product.description}</p>
                      </div>
                      <div className="mt-4 flex items-baseline gap-1 border-t border-[#0d2b45]/10 pt-4">
                        <span className="text-xl font-black text-[#e8821a]">{product.price}</span>
                        <span className="text-xs text-[#3a9eca]">{product.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-14 h-56 w-full overflow-hidden rounded-3xl">
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

      {/* ── Spices & Sauces placeholder ───────────────────────────────────── */}
      <section id="spices" className="w-full bg-white py-20">
        <div className="w-full px-6 xl:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#e8821a]">Shop</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#0d2b45]">
            Zora&apos;s Spices &amp; Sauces
          </h2>
          <p className="mt-4 max-w-xl text-base text-[#1a5f8a]">
            Our signature Zora&apos;s Seasoning, Sambal Butter, Cocktail Sauce, and more —
            available at the counter and online soon.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketProducts.filter(p => p.category === "Market Items").map(p => (
              <div key={p.name} className="rounded-2xl border border-[#e8821a]/20 bg-[#fff8f0] p-5">
                <p className="font-bold text-[#0d2b45]">{p.name}</p>
                <p className="mt-1 text-sm text-[#1a5f8a]">{p.description}</p>
                <div className="mt-3 flex items-baseline gap-1 border-t border-[#0d2b45]/10 pt-3">
                  <span className="font-black text-[#e8821a]">{p.price}</span>
                  <span className="text-xs text-[#3a9eca]">{p.unit}</span>
                </div>
              </div>
            ))}
          </div>
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
                src="https://www.google.com/maps?q=1411%20Castle%20St%20Wilmington%20NC&output=embed"
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
