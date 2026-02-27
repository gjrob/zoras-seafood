"use client";
import Nav from "../../components/Nav";

type MenuItem = { category: string; item: string; description: string; price: string };

const MENU_ITEMS: MenuItem[] = [
  { category: "Camarones", item: "Camarones NC Sazonados, Hervidos y Fríos", description: "½ libra, servido frío con salsa cóctel", price: "$15" },
  { category: "Dip de Pescado", item: "Dip de Pescado Ahumado y Condimentado", description: "Servido con galletas fritas, 8 oz", price: "$8" },
  { category: "Sopa", item: "Chowder de Almejas", description: "Servido con galletas fritas", price: "$5 / $8" },
  { category: "Bolsas al Vapor", item: "Bolsa al Vapor", description: "Incluye: Condimento Zora's, Papa, Maíz, Mantequilla Sambal, Limón, Pan Mantequillado, ¼ lb de camarones, 6 almejas (Sin Sustituciones)", price: "$16" },
  { category: "Adicionales", item: "2 Cangrejos Azules", description: "", price: "+$6" },
  { category: "Adicionales", item: "¼ lb Cangrejo de Piedra", description: "", price: "+$9" },
  { category: "Adicionales", item: "¼ lb Racimo de Cangrejo de Nieve", description: "", price: "+$16" },
  { category: "Adicionales", item: "¼ lb Salchicha Andouille de Res", description: "", price: "+$4.50" },
  { category: "Acompañantes", item: "Hush Puppies", description: "", price: "$4" },
  { category: "Acompañantes", item: "Mazorca de Maíz", description: "", price: "$4" },
  { category: "Acompañantes", item: "Ensalada de Col", description: "", price: "$4" },
  { category: "Acompañantes", item: "Pan Mantequillado", description: "", price: "$4" },
  { category: "Acompañantes", item: "Grits con Queso", description: "", price: "$4" },
  { category: "Acompañantes", item: "Cacahuetes Hervidos Sazonados", description: "", price: "$5" },
  { category: "Acompañantes", item: "Pepinillo", description: "", price: "$2" },
  { category: "Tú Compras Nosotros Freímos", item: "Servicio de Freído", description: "Compra cualquier marisco del mercado y lo empanizamos y freímos para ti", price: "$4" },
  { category: "Tú Compras Nosotros Freímos", item: "Paquete de 3 Acompañantes", description: "pan de cena + elección de 2 acompañantes", price: "$7" },
  { category: "Sándwiches", item: "Hamburguesa de Camarón Frito", description: "con ensalada de col dulce y picante, servido con chips", price: "$12.50" },
  { category: "Sándwiches", item: "Pez Espada BBQ Ahumado", description: "con ensalada de col y salsa picante de tomate y melaza, servido con chips", price: "$12.50" },
];

const CATEGORIAS = [
  "Camarones", "Dip de Pescado", "Sopa", "Bolsas al Vapor",
  "Adicionales", "Acompañantes", "Tú Compras Nosotros Freímos", "Sándwiches", "Postres",
];

const BOLSA_INCLUYE = [
  "Condimento Zora's", "Papa", "Maíz", "Mantequilla Sambal",
  "Limón", "Pan Mantequillado", "¼ lb de camarones", "6 almejas",
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

export default function MenuES() {
  const grouped = MENU_ITEMS.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="es" activeKey="menu" />

      {/* Encabezado */}
      <div style={{ background: "#0d2b45", padding: "48px 24px 32px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 12px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 16px", lineHeight: 1.1 }}>
          EL MENÚ
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
          Fresco de la costa de Carolina a tu mesa
        </p>
      </div>

      {/* Banner fresco */}
      <div style={{ background: "#f5c518", color: "#071929", textAlign: "center", padding: "14px 16px", fontWeight: 900, fontSize: "clamp(0.88rem, 2.5vw, 1.1rem)", letterSpacing: "0.14em" }}>
        PREPARADO FRESCO CADA DÍA. CANTIDADES LIMITADAS.
      </div>

      {/* Pestañas de categorías */}
      <div style={{ position: "sticky", top: "57px", zIndex: 40, background: "#071929", borderBottom: "2px solid rgba(74,184,232,0.12)", overflowX: "auto" }}>
        <div style={{ display: "flex", padding: "0 16px", minWidth: "max-content" }}>
          {CATEGORIAS.map((cat) => (
            <button key={cat} onClick={() => scrollTo(`seccion-${cat.replace(/\s+/g, "-")}`)}
              style={{ background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", color: "#8ab8d8", fontWeight: 600, fontSize: "0.76rem", letterSpacing: "0.07em", padding: "13px 15px", whiteSpace: "nowrap", transition: "color 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = "#f5c518"; el.style.borderBottomColor = "#f5c518"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = "#8ab8d8"; el.style.borderBottomColor = "transparent"; }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Secciones del menú */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {["Camarones", "Dip de Pescado"].map(cat => (
          <section key={cat} id={`seccion-${cat.replace(/\s+/g, "-")}`} style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>
              {cat.toUpperCase()}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(grouped[cat] || []).map(item => <MenuCard key={item.item} item={item} />)}
            </div>
          </section>
        ))}

        {/* SOPA */}
        <section id="seccion-Sopa" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SOPA</h2>
          {(grouped["Sopa"] || []).map(item => (
            <div key={item.item} style={{ background: "#0d2b45", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#eef6fb", margin: "0 0 6px" }}>{item.item}</p>
                {item.description && <p style={{ color: "#8ab8d8", fontSize: "0.85rem", margin: 0 }}>{item.description}</p>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.25rem", display: "block" }}>{item.price}</span>
                <span style={{ color: "#5a8aaa", fontSize: "0.68rem", letterSpacing: "0.06em" }}>taza / tazón</span>
              </div>
            </div>
          ))}
        </section>

        {/* BOLSAS AL VAPOR */}
        <section id="seccion-Bolsas-al-Vapor" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>BOLSAS AL VAPOR</h2>
          {(grouped["Bolsas al Vapor"] || []).map(item => (
            <div key={item.item} style={{ background: "#0d2b45", borderRadius: "12px", padding: "28px", border: "1px solid rgba(245,197,24,0.22)", position: "relative" }}>
              <div style={{ position: "absolute", top: "16px", right: "16px", background: "#f5c518", color: "#071929", fontSize: "0.63rem", fontWeight: 900, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "99px" }}>PLATO ESTRELLA</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "48px", marginBottom: "20px" }}>
                <p style={{ fontWeight: 800, fontSize: "1.15rem", color: "#eef6fb", margin: 0 }}>{item.item}</p>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.5rem", flexShrink: 0 }}>{item.price}</span>
              </div>
              <p style={{ color: "#5a8aaa", fontSize: "0.78rem", margin: "0 0 16px", fontStyle: "italic" }}>Sin Sustituciones</p>
              <p style={{ color: "#4ab8e8", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", margin: "0 0 10px" }}>INCLUYE</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {BOLSA_INCLUYE.map(ing => (
                  <span key={ing} style={{ background: "rgba(74,184,232,0.1)", border: "1px solid rgba(74,184,232,0.22)", color: "#b8d8f0", fontSize: "0.78rem", padding: "4px 12px", borderRadius: "99px" }}>{ing}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ADICIONALES */}
        <section id="seccion-Adicionales" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 8px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>ADICIONALES</h2>
          <p style={{ color: "#5a8aaa", fontSize: "0.82rem", margin: "0 0 20px" }}>Añade a tu bolsa al vapor</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "12px" }}>
            {(grouped["Adicionales"] || []).map(item => (
              <div key={item.item} style={{ background: "#0d2b45", borderRadius: "10px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.4rem" }}>{item.price}</span>
                <span style={{ color: "#eef6fb", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.3 }}>{item.item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ACOMPAÑANTES */}
        <section id="seccion-Acompañantes" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>ACOMPAÑANTES</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
            {(grouped["Acompañantes"] || []).map(item => (
              <div key={item.item} style={{ background: "#0d2b45", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ color: "#f5c518", fontWeight: 900, fontSize: "1.1rem" }}>{item.price}</span>
                <span style={{ color: "#eef6fb", fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.3 }}>{item.item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TÚ COMPRAS NOSOTROS FREÍMOS */}
        <section id={`seccion-Tú-Compras-Nosotros-Freímos`} style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>TÚ COMPRAS NOSOTROS FREÍMOS</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(grouped["Tú Compras Nosotros Freímos"] || []).map(item => (
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

        {/* SÁNDWICHES */}
        <section id="seccion-Sándwiches" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>SÁNDWICHES</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(grouped["Sándwiches"] || []).map(item => <MenuCard key={item.item} item={item} />)}
          </div>
        </section>

        {/* POSTRES */}
        <section id="seccion-Postres" style={{ scrollMarginTop: "116px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "0.14em", color: "#4ab8e8", margin: "0 0 20px", paddingBottom: "10px", borderBottom: "1px solid rgba(74,184,232,0.18)" }}>POSTRES</h2>
          <div style={{ background: "#0d2b45", borderRadius: "10px", padding: "48px 32px", textAlign: "center", border: "1px dashed rgba(74,184,232,0.2)" }}>
            <p style={{ fontSize: "2.4rem", margin: "0 0 14px" }}>🍯</p>
            <p style={{ color: "#f5c518", fontWeight: 800, fontSize: "1.1rem", margin: "0 0 8px", letterSpacing: "0.04em" }}>Próximamente</p>
            <p style={{ color: "#5a8aaa", fontSize: "0.85rem", margin: 0 }}>Algo dulce está en camino</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(245,197,24,0.18)" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 10px", letterSpacing: "0.05em" }}>¿LISTO PARA ORDENAR?</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", margin: "0 0 32px" }}>Recoge en la tienda u ordena en línea fácilmente</p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.95rem", padding: "14px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              📞 Llame para Recoger — (910) 763-0992
            </a>
            <a href="#" style={{ background: "#1a5f8a", color: "#eef6fb", fontWeight: 800, fontSize: "0.95rem", padding: "14px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", border: "2px solid rgba(74,184,232,0.35)" }}>
              Pedir en Línea
            </a>
          </div>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "24px 0 0", letterSpacing: "0.07em" }}>
            MIÉ–VIE 11AM–7PM &nbsp;·&nbsp; SÁB 9AM–5PM &nbsp;·&nbsp; 1411 CASTLE ST, WILMINGTON NC
          </p>
        </section>
      </div>

      <footer style={{ background: "#050f1a", borderTop: "1px solid rgba(74,184,232,0.08)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontWeight: 900, letterSpacing: "0.12em", fontSize: "0.88rem", margin: "0 0 8px" }}>ZORA&apos;S MARKET &amp; KITCHEN</p>
        <p style={{ color: "#3a6a8a", fontSize: "0.78rem", margin: "0 0 16px" }}>1411 Castle St · Wilmington, NC · (910) 763-0992</p>
        <p style={{ color: "#1e3a52", fontSize: "0.72rem", margin: 0 }}>© {new Date().getFullYear()} Zora&apos;s Seafood Market. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
