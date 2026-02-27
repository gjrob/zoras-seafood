"use client";
import Link from "next/link";
import Nav from "../../components/Nav";

const PRODUCTOS = [
  { name: "Condimento Zora's", tagline: "La mezcla detrás de todo", description: "Nuestro condimento seco exclusivo — la misma mezcla que va en cada bolsa al vapor, cada hervido y cada plato que hemos servido desde Castle Street. Una mezcla de la costa de Carolina equilibrada para mariscos.", hint: "Combina con: hervidos de camarones, pescado a la parrilla, maíz asado, hush puppies", emoji: "🧂", accent: "#f5c518" },
  { name: "Mantequilla Sambal", tagline: "Calor. Riqueza. Espíritu de Carolina.", description: "Pasta de chile cocida a fuego lento mezclada con mantequilla cultivada. Es el alma de nuestra bolsa al vapor — derretida sobre almejas, rociada en cangrejo, o untada en un pan mantequillado directo de la bolsa.", hint: "Combina con: bolsas al vapor, almejas, patas de cangrejo, pan a la parrilla", emoji: "🌶️", accent: "#e8821a" },
  { name: "Salsa de Ensalada Dulce y Picante", tagline: "La salsa de la hamburguesa de camarón", description: "Ácida, dulce, con un calor lento — esto es lo que hace cantar a la Hamburguesa de Camarón Frito. Próximamente disponible en botella.", hint: "Combina con: mariscos fritos, tacos, ensaladas, pollo a la parrilla", emoji: "🍋", accent: "#4ab8e8" },
  { name: "Tomate y Melaza Picante", tagline: "Ahumado, picante y dulzura de Carolina", description: "La salsa de nuestro sándwich de Pez Espada BBQ Ahumado. Profunda, afrutada, con un calor lento que se construye — hecha para pescados con carácter.", hint: "Combina con: pez espada, mahi, camarones a la parrilla, BBQ", emoji: "🍅", accent: "#e8821a" },
];

export default function EspeciasSalsas() {
  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="es" activeKey="menu" />

      {/* Hero */}
      <div style={{ background: "#0d2b45", padding: "72px 24px 64px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 16px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <div style={{ fontSize: "3.5rem", margin: "0 0 20px" }}>🧂</div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 20px", lineHeight: 1.1 }}>
          ESPECIAS &amp;<br />SALSAS DE ZORA&apos;S
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Los sabores que definen nuestra cocina — embotellados para la tuya. Desde el condimento que va en cada bolsa al vapor hasta la Mantequilla Sambal que no puedes dejar de pensar.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: "99px", padding: "10px 22px" }}>
          <span style={{ fontSize: "0.95rem" }}>⏳</span>
          <span style={{ color: "#f5c518", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.1em" }}>DISPONIBLE EN TIENDA PRÓXIMAMENTE</span>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 20px 80px" }}>
        <p style={{ color: "#5a8aaa", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", textAlign: "center", margin: "0 0 40px" }}>La línea de productos</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
          {PRODUCTOS.map((producto) => (
            <div key={producto.name} style={{ background: "#0d2b45", borderRadius: "14px", padding: "32px 28px", borderLeft: `4px solid ${producto.accent}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
              <div style={{ fontSize: "2.8rem", lineHeight: 1 }}>{producto.emoji}</div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
                  <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#eef6fb", margin: 0 }}>{producto.name}</h2>
                  <span style={{ color: producto.accent, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em" }}>{producto.tagline}</span>
                </div>
                <p style={{ color: "#8ab8d8", fontSize: "0.88rem", margin: "0 0 14px", lineHeight: 1.65 }}>{producto.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: producto.accent, flexShrink: 0 }} />
                  <p style={{ color: "#4a7a9b", fontSize: "0.75rem", margin: 0, fontStyle: "italic" }}>{producto.hint}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(245,197,24,0.18)" }}>
          <p style={{ fontSize: "1.8rem", margin: "0 0 16px" }}>🏪</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 12px", letterSpacing: "0.04em" }}>ENCUÉNTRALOS EN LA TIENDA</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto 28px", lineHeight: 1.65 }}>
            El Condimento Zora&apos;s y la Mantequilla Sambal están disponibles en el mercado de Castle Street. Pregúntanos cómo añadirlos a tu pedido.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              📞 Llámanos — (910) 763-0992
            </a>
            <Link href="/es/menu" style={{ background: "#1a5f8a", color: "#eef6fb", fontWeight: 800, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", border: "2px solid rgba(74,184,232,0.3)" }}>
              Ver el Menú
            </Link>
          </div>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "22px 0 0", letterSpacing: "0.07em" }}>
            MIÉ–VIE 11AM–7PM &nbsp;·&nbsp; SÁB 9AM–5PM &nbsp;·&nbsp; 1411 CASTLE ST, WILMINGTON NC
          </p>
        </div>
      </div>

      <footer style={{ background: "#050f1a", borderTop: "1px solid rgba(74,184,232,0.08)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontWeight: 900, letterSpacing: "0.12em", fontSize: "0.88rem", margin: "0 0 8px" }}>ZORA&apos;S MARKET &amp; KITCHEN</p>
        <p style={{ color: "#3a6a8a", fontSize: "0.78rem", margin: "0 0 16px" }}>1411 Castle St · Wilmington, NC · (910) 763-0992</p>
        <p style={{ color: "#1e3a52", fontSize: "0.72rem", margin: 0 }}>© {new Date().getFullYear()} Zora&apos;s Seafood Market. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
