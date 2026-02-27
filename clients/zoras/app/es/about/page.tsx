"use client";

import Image from "next/image";
import Nav from "../../components/Nav";

const HISTORIA = [
  `Desde 1956, Zora's Seafood Market ha sido una institución en Castle Street, ofreciendo pescado fresco local con una calidez y encanto que hace sentir a todos como en casa. Conocida por su animado mercado y energía comunitaria, Zora's es el lugar al que locales y visitantes acuden para disfrutar camarones hervidos, pescado frito crujiente, filetes frescos y cangrejos vivos. Todo se trata de la alegría de los mariscos auténticos y llenos de sabor—con una buena dosis de diversión.`,
  `Nuestro mercado de mariscos está creciendo, trayendo más de la costa de Carolina a tu plato. Junto a los favoritos de siempre—pescado, camarones, ostras y cangrejos—estamos añadiendo capturas estacionales y sostenibles cuidadosamente seleccionadas como mero, pez azulejo, atún y pez espada. Cada artículo se elige por su calidad, frescura y fuerte conexión con las aguas locales—el equilibrio perfecto entre tradición y algo inesperado.`,
  `El mostrador de mariscos sigue siendo el corazón palpitante de Zora's. Habla con nuestros vendedores de pescado, explora la abundancia de las aguas de Carolina del Norte y lleva a casa ingredientes que convierten las cenas cotidianas en festines costeros. Cada visita es una oportunidad para descubrir algo nuevo del mar.`,
  `El restaurante está abierto, sirviendo un menú costero audaz que honra los clásicos de Zora's mientras añade energía fresca. ¿La estrella? Las Bolsas al Vapor—una celebración práctica y abundante de la costa de Carolina. Repletas de condimento Zora's, papas tiernas, maíz dulce, mantequilla sambal, cacahuetes picantes hervidos, limón fresco y un pan mantequillado, todo envuelto alrededor de camarones jugosos y almejas salinas. Desordenadas, generosas y perfectas para compartir.`,
  `¿Te animas? Las Bolsas al Vapor están hechas para personalizar. Añade Cangrejo Azul, Cangrejo de Piedra, racimos de Cangrejo de Nieve, o salchicha de res Andouille para un sabor extra. ¿Organizando una fiesta? "Tú Compras, Nosotros Freímos." Elige cualquier marisco del mercado y lo empanizamos y freímos para ti—perfecto para un festín rápido e indulgente.`,
  `Zora's es más que una pescadería. Es un referente de Castle Street, un punto de encuentro para la comunidad y el sabor del alma de Wilmington—más ruidosa, más audaz y más deliciosa que nunca.`,
];

const MARISCOS = [
  "Almaco Jack", "Mejillones Atlánticos", "Cangrejo Azul", "Bonita", "Bottarga", "Anjova",
  "Bagre", "Cobia", "Langostino de Río", "Tambor Negro", "Tambor Rojo", "Lenguado",
  "Mero Negro", "Mero Gag", "Mero Rojo", "Mero Scamp", "Mero Nevado", "Mero Fresa",
  "Roncador Blanco", "Mahi Mahi", "Rape", "Ostras New River Pirates", "Ostras Seabirdies", "Pigfish",
  "Palometa", "Pámpano", "Lubina Negra", "Lubina Rayada", "Sábalo y Huevas", "Sargo",
  "Pargo Bermellón", "Pargo Colorado", "Pez Pala", "Caballa Española", "Pez Espada", "Schnitzel de Pez Espada",
  "Blanquillo Dorado", "Blanquillo Gris", "Atún de Ojo Grande", "Atún Rojo", "Atún de Aleta Amarilla",
  "Pez Ballesta", "Trucha de Mar Moteada",
];

export default function AboutES() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">

      <Nav lang="es" activeKey="about" />

      {/* ── Encabezado QUIÉNES SOMOS ──────────────────────────────────────── */}
      <section className="w-full bg-[#0d2b45] px-6 pb-16 pt-20 xl:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">
          Castle Street &nbsp;·&nbsp; Wilmington, NC &nbsp;·&nbsp; Desde 1956
        </p>
        <h1 className="mt-5 text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
          Quiénes Somos
        </h1>
        <div className="mt-6 h-1 w-20 rounded-full bg-[#f5c518]" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#7bbcd6]">
          Una institución de Castle Street desde 1956 — el hogar de Wilmington para mariscos
          costeros frescos, sabores audaces y la energía comunitaria que no se puede fabricar.
        </p>
      </section>

      {/* ── Historia en dos columnas ──────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[50vw] lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)]">
            <Image
              src="/zoras-about.webp"
              alt="Pargo rojo fresco en Zora's Market & Kitchen"
              fill className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2b45]/80 to-transparent px-8 pb-8 pt-20">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">
                Zora&apos;s Seafood Market &amp; Kitchen
              </p>
              <p className="mt-1 text-sm text-white/70">1411 Castle St, Wilmington, NC</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-7 px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
            <blockquote className="border-l-4 border-[#f5c518] pl-5">
              <p className="text-xl font-bold italic leading-snug text-[#0d2b45] md:text-2xl">
                &ldquo;Todo se trata de la alegría de los mariscos auténticos y llenos de
                sabor—con una buena dosis de diversión.&rdquo;
              </p>
            </blockquote>

            {HISTORIA.map((parrafo, i) => (
              <p key={i} className="text-base leading-[1.8] text-[#1a5f8a] md:text-[17px]">{parrafo}</p>
            ))}

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[#0d2b45]/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Dirección</p>
                <p className="mt-1 font-semibold text-[#0d2b45]">1411 Castle St</p>
                <p className="text-sm text-[#1a5f8a]">Wilmington, NC</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Horarios</p>
                <p className="mt-1 text-sm font-semibold text-[#0d2b45]">Mié–Vie 11am–7pm</p>
                <p className="text-sm font-semibold text-[#0d2b45]">Sábado 9am–5pm</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e8821a]">Teléfono</p>
                <a href="tel:9107630992" className="mt-1 block font-semibold text-[#1a5f8a] transition hover:text-[#e8821a]">
                  (910) 763-0992
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lista de mariscos ─────────────────────────────────────────────── */}
      <section id="nuestros-mariscos" className="w-full bg-[#0d2b45] px-6 py-20 xl:px-10">
        <div className="mb-12 border-b border-white/10 pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#4ab8e8]">En el Mostrador</p>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
            Lo Que Ofrecemos
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#7bbcd6]">
            Fresco de las aguas de Carolina del Norte y más allá. Nuestra selección cambia con
            la temporada y la captura — a continuación encontrará una guía de lo que podría
            encontrar en el mostrador.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#4ab8e8]/30 bg-[#4ab8e8]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ab8e8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4ab8e8]">
              {MARISCOS.length} especies disponibles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {MARISCOS.map((pez) => (
            <div key={pez} className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-all hover:border-[#f5c518]/50 hover:bg-[#f5c518]/5">
              <div className="mb-1.5 h-0.5 w-4 rounded-full bg-[#f5c518]/40 transition-all group-hover:w-6 group-hover:bg-[#f5c518]" />
              <p className="text-sm font-semibold leading-snug text-white group-hover:text-[#f5c518]">{pez}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#4ab8e8]/60">
          * La disponibilidad varía según la temporada y la captura diaria. Llame al{" "}
          <a href="tel:9107630992" className="font-bold text-[#f5c518] transition hover:underline">(910) 763-0992</a>{" "}
          para verificar el inventario actual antes de venir.
        </p>
      </section>

      {/* ── Pie de página ─────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#071929] py-10 text-center">
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
