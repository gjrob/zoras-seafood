"use client";
import Nav from "../../components/Nav";

const RECETAS = [
  { emoji: "🦐", title: "Camarones Hervidos con Especias Zora's", hint: "La receta de camarones fríos de NC con nuestra mezcla de condimentos" },
  { emoji: "🌊", title: "Bolsa al Vapor con Mantequilla Sambal", hint: "Recrea la icónica bolsa al vapor en casa — papas, maíz, almejas y todo" },
  { emoji: "🐟", title: "Dip de Pescado Ahumado y Condimentado", hint: "Pescado ahumado de Carolina, queso crema y el calor justo" },
  { emoji: "🦀", title: "Pinzas de Cangrejo Azul con Mantequilla", hint: "Preparación sencilla para cangrejos azules frescos del mercado de Castle Street" },
  { emoji: "🍞", title: "Hamburguesa de Camarón Frito", hint: "Ensalada dulce y picante, pan brioche, camarones crujientes de NC" },
  { emoji: "🐡", title: "Schnitzel de Pez Espada", hint: "Nuestro giro al clásico — frito con limón y alcaparras" },
];

export default function RecetasMariscos() {
  return (
    <div style={{ background: "#071929", color: "#eef6fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <Nav lang="es" activeKey="recipes" />

      {/* Hero */}
      <div style={{ background: "#0d2b45", padding: "72px 24px 64px", textAlign: "center" }}>
        <p style={{ color: "#4ab8e8", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", margin: "0 0 16px" }}>
          Zora&apos;s Market &amp; Kitchen
        </p>
        <div style={{ fontSize: "3.5rem", margin: "0 0 20px" }}>🎣</div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 900, letterSpacing: "0.06em", color: "#eef6fb", margin: "0 0 20px", lineHeight: 1.1 }}>
          RECETAS DE MARISCOS
        </h1>
        <p style={{ color: "#b8d8f0", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
          Directo de nuestra cocina a la tuya — recetas costeras de Carolina con la captura local más fresca y los condimentos de Zora&apos;s.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: "99px", padding: "10px 22px" }}>
          <span style={{ fontSize: "0.95rem" }}>⏳</span>
          <span style={{ color: "#f5c518", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.1em" }}>RECETAS PRÓXIMAMENTE</span>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 20px 80px" }}>
        <p style={{ color: "#5a8aaa", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", textAlign: "center", margin: "0 0 36px" }}>
          Un adelanto de lo que viene
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "64px" }}>
          {RECETAS.map((receta) => (
            <div key={receta.title} style={{ background: "#0d2b45", borderRadius: "12px", padding: "28px 24px", position: "relative" }}>
              <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(74,184,232,0.12)", border: "1px solid rgba(74,184,232,0.2)", borderRadius: "99px", padding: "2px 10px", fontSize: "0.62rem", color: "#4ab8e8", fontWeight: 700, letterSpacing: "0.08em" }}>
                PRÓXIMAMENTE
              </div>
              <div style={{ fontSize: "2.2rem", margin: "0 0 14px" }}>{receta.emoji}</div>
              <p style={{ fontWeight: 800, fontSize: "1rem", color: "#eef6fb", margin: "0 0 8px", lineHeight: 1.3 }}>{receta.title}</p>
              <p style={{ color: "#5a8aaa", fontSize: "0.82rem", margin: 0, lineHeight: 1.5 }}>{receta.hint}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2b45", borderRadius: "14px", padding: "48px 28px", textAlign: "center", border: "1px solid rgba(74,184,232,0.15)" }}>
          <p style={{ fontSize: "1.8rem", margin: "0 0 16px" }}>🌊</p>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900, color: "#eef6fb", margin: "0 0 12px", letterSpacing: "0.04em" }}>¿LAS QUIERES PRIMERO?</h2>
          <p style={{ color: "#8ab8d8", fontSize: "0.9rem", maxWidth: "380px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            Mientras tanto, pasa por el mercado y pregúntanos — nos encanta hablar de qué hacer con una captura fresca.
          </p>
          <a href="tel:9107630992" style={{ background: "#f5c518", color: "#071929", fontWeight: 900, fontSize: "0.92rem", padding: "13px 26px", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            📞 Llama al Mercado — (910) 763-0992
          </a>
          <p style={{ color: "#4ab8e8", fontSize: "0.75rem", margin: "20px 0 0", letterSpacing: "0.06em" }}>1411 CASTLE ST &nbsp;·&nbsp; WILMINGTON, NC</p>
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
