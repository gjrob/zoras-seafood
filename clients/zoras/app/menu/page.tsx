"use client";
import Nav from "../components/Nav";

type MenuItem = {
  category: string;
  item: string;
  description: string;
  price: string;
};

const MENU_ITEMS: MenuItem[] = [
  { category: "Shrimp", item: "Cold-Boiled Spiced NC Shrimp", description: "½ lb, served chilled with cocktail sauce", price: "$15" },
  { category: "Fish Dip", item: "Smoked & Deviled Fish Dip", description: "Served with fried crackers 8 oz", price: "$8" },
  { category: "Soup", item: "Clam Chowder", description: "Served with fried crackers", price: "$5 / $8" },
  { category: "Steamer Bags", item: "Steamer Bag", description: "Includes: Zora's Seasoning, Potato, Corn, Sambal Butter, Lemon, Buttered Roll, 1/4 lb shrimp, 6 clams (No Substitutions)", price: "$16" },
  { category: "Add-Ons", item: "2 Blue Crab", description: "", price: "+$6" },
  { category: "Add-Ons", item: "¼ lb Stone Crab", description: "", price: "+$9" },
  { category: "Add-Ons", item: "¼ lb cluster Snow Crab", description: "", price: "+$16" },
  { category: "Add-Ons", item: "¼ lb beef Andouille sausage", description: "", price: "+$4.50" },
  { category: "Sides", item: "Hush Puppies", description: "", price: "$4" },
  { category: "Sides", item: "Corn Cob", description: "", price: "$4" },
  { category: "Sides", item: "Slaw", description: "", price: "$4" },
  { category: "Sides", item: "Buttered Dinner Roll", description: "", price: "$4" },
  { category: "Sides", item: "Cheese Grits", description: "", price: "$4" },
  { category: "Sides", item: "Spiced Boiled Peanuts", description: "", price: "$5" },
  { category: "Sides", item: "Pickle", description: "", price: "$2" },
  { category: "You Buy We Fry", item: "Fry Service", description: "Buy any seafood from the market and we'll bread it and fry it for you", price: "$4" },
  { category: "You Buy We Fry", item: "3 Sides Deal", description: "dinner roll + choice of 2 sides", price: "$7" },
  { category: "Sandwiches", item: "Fried Shrimp Burger", description: "with sweet & spicy chili slaw, served with chips", price: "$12.50" },
  { category: "Sandwiches", item: "Smoked BBQ Swordfish", description: "with slaw & spicy tomato molasses sauce, served with chips", price: "$12.50" },
];

const CATEGORIES = [
  "Shrimp", "Fish Dip", "Soup", "Steamer Bags",
  "Add-Ons", "Sides", "You Buy We Fry", "Sandwiches", "Sweets",
];

const STEAMER_INCLUDES = [
  "Zora's Seasoning", "Potato", "Corn", "Sambal Butter",
  "Lemon", "Buttered Roll", "¼ lb shrimp", "6 clams",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div style={{ background: "#0d2b45", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
      <div>
        <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#eef6fb", margin: "0 0 6px" }}>{item.item}</p>
        {item.description && <p style={{ color: "#8ab8d8", fontSize: "0.85rem", margin: 0 }}>{item.description}</p>}
      </div>
      <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.25rem", whiteSpace: "nowrap", flexShrink: 0 }}>{item.price}</span>
    </div>
  );
}

export default function Menu() {
  const grouped = MENU_ITEMS.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="en" activeKey="menu" />

      {/* Page header */}
      <div style={{ background: "#0d2b45", padding: "48px 24px 32px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 12px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 16px", lineHeight: 1.1 }}>
          THE MENU
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
          Fresh from the Carolina coast to your table
        </p>
      </div>

      {/* Fresh banner */}
      <div style={{ background: "#f5c518", color: "#071929", textAlign: "center", padding: "14px 16px", fontWeight: 900, fontSize: "clamp(0.88rem, 2.5vw, 1.1rem)", letterSpacing: "0.14em" }}>
        MADE FRESH DAILY. QUANTITIES LIMITED.
      </div>

      {/* Category tabs */}
      <div style={{ position: "sticky", top: "57px", zIndex: 40, background: "#071929", borderBottom: "2px solid rgba(74,184,232,0.12)", overflowX: "auto" }}>
        <div style={{ display: "flex", padding: "0 16px", minWidth: "max-content" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => scrollTo(`section-${cat.replace(/\s+/g, "-")}`)}
              style={{ background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", color: "#8ab8d8", fontWeight: 600, fontSize: "0.76rem", letterSpacing: "0.07em", padding: "13px 15px", whiteSpace: "nowrap", transition: "color 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = "#f5c518"; el.style.borderBottomColor = "#f5c518"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = "#8ab8d8"; el.style.borderBottomColor = "transparent"; }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {["Shrimp", "Fish Dip"].map(cat => (
          <section key={cat} id={`section-${cat.replace(/\s+/g, "-")}`} style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>
              {cat.toUpperCase()}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(grouped[cat] || []).map(item => <MenuCard key={item.item} item={item} />)}
            </div>
          </section>
        ))}

        {/* SOUP */}
        <section id="section-Soup" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SOUP</h2>
          {(grouped["Soup"] || []).map(item => (
            <div key={item.item} style={{ background: "#0d2b45", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#eef6fb", margin: "0 0 6px" }}>{item.item}</p>
                {item.description && <p style={{ color: "#8ab8d8", fontSize: "0.85rem", margin: 0 }}>{item.description}</p>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.25rem", display: "block" }}>{item.price}</span>
                <span style={{ color: "#5a8aaa", fontSize: "0.68rem", letterSpacing: "0.06em" }}>cup / bowl</span>
              </div>
            </div>
          ))}
        </section>

        {/* STEAMER BAGS */}
        <section id="section-Steamer-Bags" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>STEAMER BAGS</h2>
          {(grouped["Steamer Bags"] || []).map(item => (
            <div key={item.item} style={{ background: "#0d2b45", borderRadius: "12px", padding: "28px", border: "1px solid rgba(245,197,24,0.22)", position: "relative" }}>
              <div style={{ position: "absolute", top: "16px", right: "16px", background: "#f5c518", color: "#071929", fontSize: "0.63rem", fontWeight: 900, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "99px" }}>SIGNATURE DISH</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "48px", marginBottom: "20px" }}>
                <p style={{ fontWeight: 800, fontSize: "1.15rem", color: "#eef6fb", margin: 0 }}>{item.item}</p>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.5rem", flexShrink: 0 }}>{item.price}</span>
              </div>
              <p style={{ color: "#5a8aaa", fontSize: "0.78rem", margin: "0 0 16px", fontStyle: "italic" }}>No Substitutions</p>
              <p style={{ color: "#4ab8e8", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", margin: "0 0 10px" }}>INCLUDES</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {STEAMER_INCLUDES.map(ing => (
                  <span key={ing} style={{ background: "rgba(74,184,232,0.1)", border: "1px solid rgba(74,184,232,0.22)", color: "#b8d8f0", fontSize: "0.78rem", padding: "4px 12px", borderRadius: "99px" }}>{ing}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ADD-ONS */}
        <section id="section-Add-Ons" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 8px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>ADD-ONS</h2>
          <p style={{ color: "#5a8aaa", fontSize: "0.82rem", margin: "0 0 20px" }}>Add to your steamer bag</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "12px" }}>
            {(grouped["Add-Ons"] || []).map(item => (
              <div key={item.item} style={{ background: "#0d2b45", borderRadius: "10px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.4rem" }}>{item.price}</span>
                <span style={{ color: "#eef6fb", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.3 }}>{item.item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SIDES */}
        <section id="section-Sides" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SIDES</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
            {(grouped["Sides"] || []).map(item => (
              <div key={item.item} style={{ background: "#0d2b45", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.1rem" }}>{item.price}</span>
                <span style={{ color: "#eef6fb", fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.3 }}>{item.item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* YOU BUY WE FRY */}
        <section id="section-You-Buy-We-Fry" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>YOU BUY WE FRY</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(grouped["You Buy We Fry"] || []).map(item => (
              <div key={item.item} style={{ background: "#0d2b45", borderRadius: "10px", padding: "24px", borderLeft: "4px solid #e8821a", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#eef6fb", margin: "0 0 6px" }}>{item.item}</p>
                  {item.description && <p style={{ color: "#8ab8d8", fontSize: "0.85rem", margin: 0 }}>{item.description}</p>}
                </div>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.25rem", flexShrink: 0 }}>{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SANDWICHES */}
        <section id="section-Sandwiches" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SANDWICHES</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(grouped["Sandwiches"] || []).map(item => <MenuCard key={item.item} item={item} />)}
          </div>
        </section>

        {/* SWEETS */}
        <section id="section-Sweets" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SWEETS</h2>
          <div style={{ background: "#0d2b45", borderRadius: "10px", padding: "48px 32px", textAlign: "center", border: "1px dashed rgba(74,184,232,0.2)" }}>
            <p style={{ fontSize: "2.4rem", margin: "0 0 14px" }}>🍯</p>
            <p style={{ color: "#f5c518", fontWeight: 800, fontSize: "1.1rem", margin: "0 0 8px", letterSpacing: "0.04em" }}>Coming Soon</p>
            <p style={{ color: "#5a8aaa", fontSize: "0.85rem", margin: 0 }}>Something sweet is on the way</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(245,197,24,0.18)" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 10px", letterSpacing: "0.05em" }}>READY TO ORDER?</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", margin: "0 0 32px" }}>Pick up in-store or order online for easy pickup</p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.95rem", padding: "14px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              📞 Call for Pickup — (910) 763-0992
            </a>
            <a href="#" style={{ background: "#1a5f8a", color: "#eef6fb", fontWeight: 800, fontSize: "0.95rem", padding: "14px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", border: "2px solid rgba(74,184,232,0.35)" }}>
              Order Online
            </a>
          </div>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "24px 0 0", letterSpacing: "0.07em" }}>
            WED–FRI 11AM–7PM &nbsp;·&nbsp; SAT 9AM–5PM &nbsp;·&nbsp; 1411 CASTLE ST, WILMINGTON NC
          </p>
        </section>
      </div>

      <footer style={{ background: "#050f1a", borderTop: "1px solid rgba(74,184,232,0.08)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontWeight: 900, letterSpacing: "0.12em", fontSize: "0.88rem", margin: "0 0 8px" }}>ZORA&apos;S MARKET &amp; KITCHEN</p>
        <p style={{ color: "#3a6a8a", fontSize: "0.78rem", margin: "0 0 16px" }}>1411 Castle St · Wilmington, NC · (910) 763-0992</p>
        <p style={{ color: "#1e3a52", fontSize: "0.72rem", margin: 0 }}>© {new Date().getFullYear()} Zora&apos;s Seafood Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
