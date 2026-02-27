"use client";
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "Hey! I'm Finn 🐟 Ask me anything about Zora's — our menu, fresh catches, hours, anything!",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    // placeholder for streaming reply
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("Bad response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: accumulated };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry, hit a snag! Give us a call at (910) 763-0992 — we're happy to help.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  const canSend = input.trim().length > 0 && !loading;

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Finn, Zora's seafood assistant"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: open ? "#071929" : "#0d2b45",
          border: "2px solid #4ab8e8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: open ? "1.1rem" : "1.7rem",
          color: open ? "#8ab8d8" : undefined,
          boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
          transition: "background 0.2s, transform 0.15s",
        }}
      >
        {open ? "✕" : "🐟"}
      </button>

      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Finn"
          style={{
            position: "fixed",
            bottom: "96px",
            right: "24px",
            zIndex: 9998,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(520px, calc(100dvh - 120px))",
            background: "#071929",
            border: "1px solid rgba(74,184,232,0.22)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0d2b45",
              padding: "13px 16px",
              borderBottom: "1px solid rgba(74,184,232,0.14)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>🐟</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: "0.95rem", color: "#eef6fb", lineHeight: 1.2 }}>Finn</p>
              <p style={{ margin: 0, fontSize: "0.62rem", color: "#4ab8e8", letterSpacing: "0.08em", fontWeight: 700 }}>
                ZORA&apos;S SEAFOOD ASSISTANT
              </p>
            </div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
              title="Online"
            />
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isLastLoading = loading && i === messages.length - 1 && !isUser;
              return (
                <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "84%",
                      background: isUser ? "#1a5f8a" : "#0d2b45",
                      color: "#eef6fb",
                      borderRadius: isUser ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      padding: "9px 13px",
                      fontSize: "0.875rem",
                      lineHeight: 1.55,
                      border: isUser ? "none" : "1px solid rgba(74,184,232,0.12)",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {isLastLoading && !msg.content ? (
                      <span style={{ color: "#4ab8e8", letterSpacing: "0.15em" }}>···</span>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(74,184,232,0.1)",
              display: "flex",
              gap: "8px",
              background: "#071929",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about the menu, hours, catch…"
              disabled={loading}
              autoComplete="off"
              style={{
                flex: 1,
                background: "#0d2b45",
                border: "1px solid rgba(74,184,232,0.18)",
                borderRadius: "8px",
                padding: "9px 12px",
                color: "#eef6fb",
                fontSize: "0.875rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={!canSend}
              style={{
                background: canSend ? "#f5c518" : "#0d2b45",
                color: canSend ? "#071929" : "#2a5a7a",
                border: canSend ? "none" : "1px solid rgba(74,184,232,0.1)",
                borderRadius: "8px",
                padding: "9px 14px",
                cursor: canSend ? "pointer" : "not-allowed",
                fontWeight: 900,
                fontSize: "1rem",
                transition: "background 0.15s, color 0.15s",
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
