import Nav from "../components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Free Fish Program | Zora's Seafood Market & Kitchen | Wilmington, NC",
  description:
    "Zora's Free Fish Program gives fresh seafood to Wilmington families in need. Ask us in store to learn more about this community program.",
};

export default function FreeFish() {
  return (
    <div className="min-h-screen w-full bg-[#eef6fb] text-[#0d2b45]">
      <Nav lang="en" activeKey="free-fish" />

      {/* Hero */}
      <section className="w-full bg-[#0d2b45] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">Community Program</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-white">
            Free Fish<br />Program
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#a8d8f0]">
            Fresh seafood for Wilmington families who need it most.
            Because good food shouldn&apos;t be out of reach.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#3a9eca]">What It Is</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#0d2b45]">
                Giving Back to Wilmington
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#1a5f8a]">
                Zora&apos;s has been feeding this city since 1956. The Free Fish Program is our way of
                making sure that everyone in Wilmington has access to fresh, quality seafood —
                regardless of their circumstances.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#1a5f8a]">
                We set aside fresh catch every week for families and individuals in need.
                No paperwork, no judgment. Just good fish for good people.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: "🐟", title: "Fresh Catch", body: "The same quality we sell at the counter — fresh from the coast, never frozen." },
                { icon: "🤝", title: "No Barriers", body: "Ask us at the counter. No forms, no appointments, no questions asked." },
                { icon: "❤️", title: "Community First", body: "Wilmington has supported us for 70 years. This is how we give that back." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-[#0d2b45]/10 bg-[#eef6fb] p-6 text-center">
                  <div className="text-3xl">{icon}</div>
                  <p className="mt-3 font-bold text-[#0d2b45]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1a5f8a]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to participate */}
      <section className="w-full bg-[#0d2b45] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4ab8e8]">How It Works</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">
                Just Ask Us In Store
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#a8d8f0]">
                Come in during regular hours and ask any of our team members about the Free Fish Program.
                We&apos;ll take care of you — it&apos;s that simple.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#7bbcd6]">
                We also work with local community organizations to reach families who may not be able
                to come in. If you know a family in need, or if you represent an organization that
                would like to partner with us, give us a call.
              </p>
              <div className="mt-8 space-y-3">
                <a href="tel:9107630992"
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white transition hover:bg-white/20">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f5c518]">Call Us</p>
                    <p className="font-bold">(910) 763-0992</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f5c518]">Visit Us</p>
                    <p className="font-bold">1411 Castle St, Wilmington, NC</p>
                    <p className="text-sm text-[#a8d8f0]">Wed–Fri 11am–7pm · Sat 9am–5pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-5xl">🐟</p>
              <p className="mt-4 text-2xl font-black uppercase tracking-tight text-white">Since 1956</p>
              <p className="mt-3 text-base leading-relaxed text-[#a8d8f0]">
                Zora&apos;s has been a cornerstone of the Wilmington community for nearly 70 years.
                The Free Fish Program is just one small way we try to honor that relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#eef6fb] py-16 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#0d2b45]">
            Want to Support the Program?
          </h2>
          <p className="mt-3 text-base text-[#1a5f8a]">
            The best way to support the Free Fish Program is to shop at Zora&apos;s.
            Every purchase helps us keep doing what we do for this community.
          </p>
          <Link href="/#seafood"
            className="mt-6 inline-block rounded-xl bg-[#e8821a] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow transition hover:bg-[#d05a10]">
            Shop the Market
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#071929] py-10 text-center">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Zora&apos;s Seafood Market &amp; Kitchen
          &nbsp;·&nbsp; 1411 Castle St, Wilmington, NC
          &nbsp;·&nbsp; (910) 763-0992
        </p>
      </footer>
    </div>
  );
}
