"use client";
import Nav from "../components/Nav";

const RECIPE_TEASES = [
  { emoji: "🦐", title: "Zora's Spiced Boiled Shrimp", hint: "The cold-boiled NC shrimp recipe with our house seasoning blend" },
  { emoji: "🌊", title: "Sambal Butter Steamer Bag", hint: "Recreate the iconic steamer bag at home — potatoes, corn, clams & all" },
  { emoji: "🐟", title: "Smoked & Deviled Fish Dip", hint: "Carolina smoked fish, cream cheese, and just enough heat" },
  { emoji: "🦀", title: "Blue Crab Claws with Drawn Butter", hint: "Simple prep for fresh local blue crabs from the Castle Street market" },
  { emoji: "🍞", title: "Fried Shrimp Burger", hint: "Sweet & spicy chili slaw, brioche bun, crispy NC shrimp" },
  { emoji: "🐡", title: "Swordfish Schnitzel", hint: "Our twist on the classic — pan-fried with lemon and capers" },
];

export default function SeafoodRecipes() {
  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="en" activeKey="recipes" />

      {/* Hero */}
      <div style={{ background: "#0d2b45", padding: "72px 24px 64px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 16px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <div style={{ fontSize: "3.5rem", margin: "0 0 20px" }}>🎣</div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 20px", lineHeight: 1.1 }}>
          SEAFOOD RECIPES
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
          Straight from our kitchen to yours — Carolina coastal recipes using the freshest local catch and Zora&apos;s own seasonings.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: "99px", padding: "10px 22px" }}>
          <span style={{ fontSize: "0.95rem" }}>⏳</span>
          <span style={{ color: "#f5c518", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.1em" }}>RECIPES COMING SOON</span>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 20px 80px" }}>
        <p style={{ color: "#5a8aaa", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", textAlign: "center", margin: "0 0 36px" }}>
          A taste of what&apos;s coming
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "64px" }}>
          {RECIPE_TEASES.map((recipe) => (
            <div key={recipe.title} style={{ background: "#0d2b45", borderRadius: "12px", padding: "28px 24px", position: "relative" }}>
              <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(74,184,232,0.12)", border: "1px solid rgba(74,184,232,0.2)", borderRadius: "99px", padding: "2px 10px", fontSize: "0.62rem", color: "#4ab8e8", fontWeight: 700, letterSpacing: "0.08em" }}>
                COMING SOON
              </div>
              <div style={{ fontSize: "2.2rem", margin: "0 0 14px" }}>{recipe.emoji}</div>
              <p style={{ fontWeight: 800, fontSize: "1rem", color: "#eef6fb", margin: "0 0 8px", lineHeight: 1.3 }}>{recipe.title}</p>
              <p style={{ color: "#5a8aaa", fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{recipe.hint}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(74,184,232,0.15)" }}>
          <p style={{ fontSize: "1.8rem", margin: "0 0 16px" }}>🌊</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 12px", letterSpacing: "0.04em" }}>WANT THEM FIRST?</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", maxWidth: "380px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            In the meantime, stop by the market and ask us — we love talking shop about what to do with a fresh catch.
          </p>
          <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            📞 Call the Market — (910) 763-0992
          </a>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "20px 0 0", letterSpacing: "0.06em" }}>1411 CASTLE ST &nbsp;·&nbsp; WILMINGTON, NC</p>
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
