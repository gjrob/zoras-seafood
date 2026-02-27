"use client";

import Image from "next/image";
import Nav from "../components/Nav";

// ─── Catálogo del mercado ─────────────────────────────────────────────────────

type MarketProduct = {
  category: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  badge?: string;
};

const marketProducts: MarketProduct[] = [
  { category: "Pescado Fresco", name: "Lenguado Entero", description: "Lenguado local de barca, limpiado a pedido", price: "$8", unit: "/ lb", badge: "Local" },
  { category: "Pescado Fresco", name: "Atún de Aleta Amarilla", description: "Filetes grado sashimi, del océano profundo", price: "$22", unit: "/ lb" },
  { category: "Pescado Fresco", name: "Caballa Española", description: "Ideal para asar a la parrilla o ahumar entero", price: "$10", unit: "/ lb", badge: "De Temporada" },
  { category: "Pescado Fresco", name: "Filetes de Tambor Negro", description: "Captura costera de NC, suave y hojaldrada", price: "$12", unit: "/ lb" },
  { category: "Pescado Fresco", name: "Filete de Pargo Colorado", description: "Porciones con piel, proveniente del Golfo", price: "$18", unit: "/ lb" },
  { category: "Mariscos y Cangrejos", name: "Cangrejo Azul Vivo", description: "Fresco del estuario, vendido por pieza", price: "$5", unit: "/ c/u", badge: "Local" },
  { category: "Mariscos y Cangrejos", name: "Pinzas de Cangrejo de Piedra", description: "Pre-partido y listo, servido frío", price: "$18", unit: "/ lb" },
  { category: "Mariscos y Cangrejos", name: "Racimos de Cangrejo de Nieve", description: "Racimos grandes, perfectos para cocinar al vapor", price: "$24", unit: "/ lb" },
  { category: "Mariscos y Cangrejos", name: "Camarón Blanco de NC", description: "Recién capturado, con cabeza o pelado disponible", price: "$12", unit: "/ lb", badge: "Local" },
  { category: "Mariscos y Cangrejos", name: "Almejas Littleneck", description: "Cultivadas en las aguas de Cape Fear", price: "$16", unit: "/ docena" },
  { category: "Mariscos y Cangrejos", name: "Ostras", description: "Local de copa individual, desgranado o en concha", price: "$18", unit: "/ docena", badge: "De Temporada" },
  { category: "Artículos del Mercado", name: "Condimento de Mariscos Zora's", description: "Nuestra mezcla exclusiva — perfecta para todo", price: "$8", unit: "/ frasco" },
  { category: "Artículos del Mercado", name: "Dip de Pescado Ahumado", description: "Ahumado en casa, pinta de 8 oz con galletas", price: "$10", unit: "/ pinta" },
  { category: "Artículos del Mercado", name: "Salsa Cóctel", description: "Hecha en casa con rábano picante y limón", price: "$5", unit: "/ frasco" },
  { category: "Artículos del Mercado", name: "Mantequilla Sambal", description: "Nuestra mantequilla compuesta para bolsa al vapor", price: "$6", unit: "/ frasco" },
];

const groupedMarket = marketProducts.reduce<Record<string, MarketProduct[]>>((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item);
  return acc;
}, {});

// ─── Menú de cocina ───────────────────────────────────────────────────────────

type MenuItem = { category: string; item: string; description: string; price: string };

const menuItems: MenuItem[] = [
  { category: "Camarones", item: "Camarones NC Sazonados, Hervidos y Fríos", description: "½ libra, servido frío con salsa cóctel", price: "$15" },
  { category: "Dip de Pescado", item: "Dip de Pescado Ahumado y Condimentado", description: "Servido con galletas fritas, 8 oz", price: "$8" },
  { category: "Sopa", item: "Chowder de Almejas", description: "Servido con galletas fritas", price: "$5 / $8" },
  { category: "Bolsas al Vapor", item: "Bolsa al Vapor", description: "Incluye: Condimento Zora's, Papa, Maíz, Mantequilla Sambal, Limón, Pan Mantequillado, ¼ lb de camarones, 6 almejas (Sin Sustituciones)", price: "$16" },
  { category: "Bolsas al Vapor Add-On", item: "2 Cangrejos Azules", description: "", price: "+$6" },
  { category: "Bolsas al Vapor Add-On", item: "¼ lb Cangrejo de Piedra", description: "", price: "+$9" },
  { category: "Bolsas al Vapor Add-On", item: "¼ lb Racimo de Cangrejo de Nieve", description: "", price: "+$16" },
  { category: "Bolsas al Vapor Add-On", item: "¼ lb Salchicha Andouille de Res", description: "", price: "+$4.50" },
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

const groupedMenu = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item);
  return acc;
}, {});

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HomeES() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">

      <Nav lang="es" activeKey="home" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center">
        <Image
          src="/zoras-hero.webp"
          alt="Mariscos y pescado fresco en hielo en Zora's Market & Kitchen"
          fill className="object-cover" priority
        />
        <div className="absolute inset-0 bg-[#071929]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d2b45]/30 to-[#0d2b45]" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 py-28 text-center text-white">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-[#f5c518] bg-[#f5c518]/15 px-7 py-3 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#f5c518]" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#f5c518]">
              Reabrimos el 26 de Febrero de 2026
            </span>
          </div>

          <h1 className="text-[clamp(3.5rem,13vw,8.5rem)] font-black uppercase leading-[0.9] tracking-tight drop-shadow-2xl">
            DELICIAS<br />DEL MAR
          </h1>

          <p className="mt-6 text-base font-light tracking-[0.35em] text-[#a8d8f0] md:text-lg">
            Zora&apos;s Seafood Market &amp; Kitchen &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Desde 1956
          </p>

          <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <a href="https://maps.google.com/?q=1411+Castle+St+Wilmington+NC"
              target="_blank" rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition hover:bg-white/20">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Ubicación</p>
              <p className="mt-2 font-bold text-white">1411 Castle St</p>
              <p className="text-sm text-white/60">Wilmington, NC</p>
            </a>
            <a href="tel:9107630992"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition hover:bg-white/20">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Teléfono</p>
              <p className="mt-2 font-bold text-white">(910) 763-0992</p>
              <p className="text-sm text-white/60">Llame para pedidos grandes</p>
            </a>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Horarios</p>
              <p className="mt-2 text-sm font-bold text-white">Mié – Vie &nbsp;11am – 7pm</p>
              <p className="text-sm font-bold text-white">Sábado &nbsp;9am – 5pm</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#menu"
              className="rounded-xl bg-[#e8821a] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#d05a10]">
              Ver Menú
            </a>
            <a href="#nuestros-mariscos"
              className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20">
              Visitar el Mercado
            </a>
          </div>
        </div>
      </section>

      {/* ── Sobre Nosotros ────────────────────────────────────────────────── */}
      <section id="quienes-somos" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="relative h-72 w-72 shrink-0 overflow-hidden rounded-full border-4 border-[#f5c518] shadow-2xl lg:h-80 lg:w-80">
              <Image src="/zoras-about.webp" alt="Zora sosteniendo un pargo rojo fresco" fill className="object-cover" />
            </div>
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Desde 1956</p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">
                Fresco de la Costa
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#a8d8f0]">
                Zora&apos;s ha sido un pilar de Wilmington por generaciones — un mercado de mariscos
                sin pretensiones donde el pescado siempre es fresco, el condimento siempre es el
                correcto, y todos son bienvenidos al mostrador.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#7bbcd6]">
                Ya sea que vengas a buscar pescado fresco para la parrilla, pedir una bolsa al vapor
                para todo el grupo, o llevarte un frasco de nuestra mezcla especial a casa — esto es
                el marisco de Wilmington como debe ser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nuestros Mariscos ─────────────────────────────────────────────── */}
      <section id="nuestros-mariscos" className="w-full bg-white py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-12 flex flex-col gap-2 border-b border-[#0d2b45]/10 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">Fresco Cada Día</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-[#0d2b45]">Nuestros Mariscos</h2>
            <p className="mt-1 max-w-2xl text-base text-[#1a5f8a]">
              Directo de la costa al mostrador. La disponibilidad cambia con la captura diaria —
              llame con anticipación para pedidos grandes.
            </p>
          </div>

          <div className="space-y-14">
            {Object.entries(groupedMarket).map(([category, products]) => (
              <div key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="shrink-0 text-xs font-black uppercase tracking-[0.4em] text-[#e8821a]">{category}</h3>
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
            <Image src="/zoras-crabs.webp" alt="Cangrejos azules vivos del estuario" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b45]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">La Captura del Día</p>
                <p className="mt-1 text-2xl font-black uppercase text-white">Cangrejos Azules Vivos</p>
                <p className="text-sm text-white/70">Frescos del estuario — $5 cada uno</p>
              </div>
            </div>
          </div>

          <p className="mt-8 rounded-2xl border border-[#0d2b45]/10 bg-[#eef6fb] px-6 py-4 text-sm text-[#1a5f8a]">
            <span className="font-bold text-[#0d2b45]">Nota: </span>
            La disponibilidad depende de la captura diaria. Llame al{" "}
            <a href="tel:9107630992" className="font-bold text-[#e8821a] hover:underline">(910) 763-0992</a>{" "}
            para confirmar existencias antes de venir.
          </p>
        </div>
      </section>

      {/* ── Menú de Cocina ───────────────────────────────────────────────── */}
      <section id="menu" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-12 border-b border-white/10 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Cocina</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">Menú</h2>
            <p className="mt-2 max-w-2xl text-base text-[#7bbcd6]">Especialidades del mercado cocinadas al momento.</p>
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

      {/* ── Recetas ───────────────────────────────────────────────────────── */}
      <section id="recetas" className="w-full bg-[#eef6fb] py-20">
        <div className="w-full px-6 xl:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">Próximamente</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#0d2b45]">Recetas de Mariscos</h2>
          <p className="mt-4 max-w-xl text-base text-[#1a5f8a]">
            Las recetas familiares de Zora&apos;s — desde lenguado frito hasta hervidos de cangrejo azul — próximamente.
          </p>
        </div>
      </section>

      {/* ── Especias y Salsas ─────────────────────────────────────────────── */}
      <section id="especias" className="w-full bg-white py-20">
        <div className="w-full px-6 xl:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#e8821a]">Tienda</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#0d2b45]">
            Especias y Salsas de Zora&apos;s
          </h2>
          <p className="mt-4 max-w-xl text-base text-[#1a5f8a]">
            Nuestro Condimento Zora&apos;s, Mantequilla Sambal, Salsa Cóctel y más —
            disponibles en el mostrador y en línea próximamente.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketProducts.filter(p => p.category === "Artículos del Mercado").map(p => (
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

      {/* ── Visítanos ─────────────────────────────────────────────────────── */}
      <section id="order" className="w-full bg-[#0d2b45] py-20">
        <div className="w-full px-6 xl:px-10">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Encuéntranos</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white">Visita el Mercado</h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Dirección</p>
                <p className="mt-1 text-lg font-bold text-white">1411 Castle St, Wilmington, NC</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Horarios</p>
                <p className="mt-1 text-[#a8d8f0]">Miércoles – Viernes: 11am – 7pm</p>
                <p className="text-[#a8d8f0]">Sábado: 9am – 5pm</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">Teléfono</p>
                <a href="tel:9107630992" className="mt-1 block text-lg font-bold text-[#4ab8e8] transition hover:text-[#f5c518]">
                  (910) 763-0992
                </a>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#f5c518] bg-[#f5c518]/10 px-6 py-3">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#f5c518]" />
                <span className="text-xs font-black uppercase tracking-[0.35em] text-[#f5c518]">
                  Reabrimos el 26 de Feb, 2026
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Mapa de Zora's Seafood Market & Kitchen"
                src="https://www.google.com/maps?q=1411%20Castle%20St%20Wilmington%20NC&output=embed"
                className="h-80 w-full" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pie de página ─────────────────────────────────────────────────── */}
      <footer id="free-fish" className="w-full bg-[#071929] py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5c518]">
          🐟 &nbsp; Programa Pescado Gratis — Pregúntanos en la Tienda &nbsp; 🐟
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
