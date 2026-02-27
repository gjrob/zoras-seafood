"use client";

import { useState } from "react";
import Image from "next/image";
import Nav from "../components/Nav";

// ─── Bullet list items ────────────────────────────────────────────────────────
const BULLETS = [
  "The day's fresh catches",
  "Flavor notes to help you pick the perfect fish",
  "Cooking tips and prep know-how",
  "Spot-on drink pairings",
  "Handpicked recipe ideas",
  "Fun fish facts you'll actually want to share",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function JoinFishListPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/fishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 1rem",
    background: "#fde68a",
    border: "1px solid #e8c84a",
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: "#1a1a1a",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <div className="min-h-screen w-full bg-[#1a3a5c] text-white">
      <Nav lang="en" activeKey="join-fishlist" />

      {/* ── Main section ─────────────────────────────────────────────────── */}
      <section className="w-full px-6 py-16 xl:px-12 2xl:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:items-start">

          {/* ── LEFT: copy ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <p className="text-xs font-black uppercase tracking-[0.45em] text-[#4ab8e8] mb-4">
              Zora&apos;s Market &amp; Kitchen &nbsp;·&nbsp; Weekly Drop
            </p>

            {/* Giant heading */}
            <h1 className="text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-none tracking-tight text-[#f5c518]">
              GET TO<br />KNOW US
            </h1>

            <div className="mt-5 h-1 w-20 rounded-full bg-[#f5c518]" />

            {/* Subheading */}
            <p className="mt-6 text-xl font-black text-[#f5c518] leading-snug">
              Join Us for a Fishy Adventure!
            </p>

            {/* Body */}
            <p className="mt-4 text-[17px] leading-relaxed text-white/80">
              On a Wednesday, we reel in something special just for you. Subscribe to{" "}
              <span className="font-bold text-white">The Fish List</span> — Zora&apos;s Market&apos;s
              weekly drop — and get the day&apos;s freshest fish and seafood delivered straight
              from the docks to your inbox.
            </p>

            <p className="mt-4 text-[17px] leading-relaxed text-white/80">
              Whether you&apos;re a seafood fanatic, a curious home cook, or just hunting for
              midweek meal inspiration, The Fish List is your go-to guide. Each email includes:
            </p>

            {/* Bullet list */}
            <ul className="mt-5 space-y-2.5">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] text-white/90">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#f5c518]" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Closing line */}
            <p className="mt-7 text-[17px] leading-relaxed font-semibold text-[#f5c518]">
              No spam. No fluff. Just great fish, smart ideas, and a community that loves
              cooking what&apos;s fresh and in season. Dive in!
            </p>
          </div>

          {/* ── RIGHT: photo + form ────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-8">

            {/* Circular photo */}
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-[3px] border-[#f5c518] shadow-xl shadow-black/40 sm:h-72 sm:w-72">
              <Image
                src="/knowus.png"
                alt="Zora's fishmonger holding a fresh red snapper"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 256px, 288px"
                priority
              />
            </div>

            {/* Signup form card */}
            <div
              style={{
                width: "100%",
                background: "#f5f0e8",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              {success ? (
                /* ── Success state ─────────────────────────────────────── */
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🐟</div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0d2b45", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                    You&apos;re on The List!
                  </h2>
                  <p style={{ fontSize: "0.95rem", color: "#1a5f8a", lineHeight: 1.7 }}>
                    Every Wednesday, fresh catches straight to your inbox.
                    Check your email for a confirmation.
                  </p>
                </div>
              ) : (
                /* ── Form ──────────────────────────────────────────────── */
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a5f8a", marginBottom: "0.4rem" }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Zora"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a5f8a", marginBottom: "0.4rem" }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Williams"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a5f8a", marginBottom: "0.4rem" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  {error && (
                    <p style={{ fontSize: "0.8rem", color: "#dc2626", fontWeight: 600 }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem",
                      background: submitting ? "#333" : "#0a0a0a",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                      fontFamily: "inherit",
                      transition: "opacity 0.15s",
                      marginTop: "0.25rem",
                    }}
                  >
                    {submitting ? "Subscribing…" : "Subscribe to The Fish List"}
                  </button>

                  <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#888", marginTop: "0.25rem" }}>
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#071929] py-10 text-center">
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
