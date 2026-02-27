"use client";
import Link from "next/link";
import Nav from "../components/Nav";

const PRODUCTS = [
  { name: "Zora's Seasoning", tagline: "The blend behind everything", description: "Our signature dry seasoning — the same mix that goes into every steamer bag, every boil, and every dish we've served since Castle Street. A Carolina coast blend balanced for seafood.", hint: "Pairs with: shrimp boils, grilled fish, roasted corn, hush puppies", emoji: "🧂", accent: "#f5c518" },
  { name: "Sambal Butter", tagline: "Heat. Richness. Carolina spirit.", description: "Slow-cooked chili paste folded into cultured butter. It's the soul of our steamer bag — melted over clams, drizzled on crab, or spread on a buttered dinner roll straight out of the bag.", hint: "Pairs with: steamer bags, clams, crab legs, grilled bread", emoji: "🌶️", accent: "#e8821a" },
  { name: "Sweet & Spicy Chili Slaw Sauce", tagline: "The sauce on the shrimp burger", description: "Tangy, sweet, with a slow burn — this is what makes the Fried Shrimp Burger sing. Coming soon as a standalone bottle.", hint: "Pairs with: fried seafood, tacos, slaws, grilled chicken", emoji: "🍋", accent: "#4ab8e8" },
  { name: "Spicy Tomato Molasses", tagline: "Smoke, heat, and Carolina sweetness", description: "The sauce on our Smoked BBQ Swordfish sandwich. Deep, jammy, with a slow heat that builds — built for bold fish.", hint: "Pairs with: swordfish, mahi, grilled shrimp, BBQ", emoji: "🍅", accent: "#e8821a" },
];

export default function SpicesSauces() {
  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="en" activeKey="spices" />

      {/* Hero */}
      <div style={{ background: "#0d2b45", padding: "72px 24px 64px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 16px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <div style={{ fontSize: "3.5rem", margin: "0 0 20px" }}>🧂</div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 20px", lineHeight: 1.1 }}>
          ZORA&apos;S SPICES<br />&amp; SAUCES
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          The flavors that define our kitchen — bottled for yours. From the seasoning that goes into every steamer bag to the Sambal Butter you can&apos;t stop thinking about.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: "99px", padding: "10px 22px" }}>
          <span style={{ fontSize: "0.95rem" }}>⏳</span>
          <span style={{ color: "#f5c518", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.1em" }}>AVAILABLE IN-STORE SOON</span>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 20px 80px" }}>
        <p style={{ color: "#5a8aaa", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", textAlign: "center", margin: "0 0 40px" }}>The lineup</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
          {PRODUCTS.map((product) => (
            <div key={product.name} style={{ background: "#0d2b45", borderRadius: "14px", padding: "32px 28px", borderLeft: `4px solid ${product.accent}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
              <div style={{ fontSize: "2.8rem", lineHeight: 1 }}>{product.emoji}</div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
                  <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#eef6fb", margin: 0 }}>{product.name}</h2>
                  <span style={{ color: product.accent, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em" }}>{product.tagline}</span>
                </div>
                <p style={{ color: "#8ab8d8", fontSize: "0.88rem", margin: "0 0 14px", lineHeight: 1.65 }}>{product.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: product.accent, flexShrink: 0 }} />
                  <p style={{ color: "#4a7a9b", fontSize: "0.75rem", margin: 0, fontStyle: "italic" }}>{product.hint}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(245,197,24,0.18)" }}>
          <p style={{ fontSize: "1.8rem", margin: "0 0 16px" }}>🏪</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 12px", letterSpacing: "0.04em" }}>FIND THEM IN-STORE</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto 28px", lineHeight: 1.65 }}>
            Zora&apos;s Seasoning and Sambal Butter are available at the market on Castle Street. Ask us about adding them to your order.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              📞 Call Us — (910) 763-0992
            </a>
            <Link href="/menu" style={{ background: "#1a5f8a", color: "#eef6fb", fontWeight: 800, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", border: "2px solid rgba(74,184,232,0.3)" }}>
              See the Menu
            </Link>
          </div>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "22px 0 0", letterSpacing: "0.07em" }}>
            WED–FRI 11AM–7PM &nbsp;·&nbsp; SAT 9AM–5PM &nbsp;·&nbsp; 1411 CASTLE ST, WILMINGTON NC
          </p>
        </div>
      </div>

      <footer style={{ background: "#050f1a", borderTop: "1px solid rgba(74,184,232,0.08)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontWeight: 900, letterSpacing: "0.12em", fontSize: "0.88rem", margin: "0 0 8px" }}>ZORA&apos;S MARKET &amp; KITCHEN</p>
        <p style={{ color: "#3a6a8a", fontSize: "0.78rem", margin: "0 0 16px" }}>1411 Castle St · Wilmington, NC · (910) 763-0992</p>
        <p style={{ color: "#1e3a52", fontSize: "0.72rem", margin: 0 }}>© {new Date().getFullYear()} Zora&apos;s Seafood Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
