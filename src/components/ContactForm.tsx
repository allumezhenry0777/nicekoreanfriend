"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-300 bg-green-50 p-6 text-green-900">
        <p className="font-bold">Message sent — thank you! 💌</p>
        <p className="mt-1 text-sm">We read everything and usually reply within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Honeypot field — bots fill it, humans never see it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-ink">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className="w-full rounded-lg border border-sand bg-white px-4 py-3 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="w-full rounded-lg border border-sand bg-white px-4 py-3 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="topic" className="mb-1 block text-sm font-semibold text-ink">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="w-full rounded-lg border border-sand bg-white px-4 py-3 text-ink outline-none focus:border-accent"
          defaultValue="question"
        >
          <option value="question">Question about a guide</option>
          <option value="correction">Correction / something is outdated</option>
          <option value="suggestion">Topic suggestion</option>
          <option value="partnership">Partnership / advertising</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="w-full rounded-lg border border-sand bg-white px-4 py-3 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
