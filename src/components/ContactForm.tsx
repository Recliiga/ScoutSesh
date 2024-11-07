import React from "react";

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <div className="gap-4 grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="first-name" className="font-medium text-sm">
            First Name
          </label>
          <input
            className="px-3 py-2 border rounded-md"
            id="first-name"
            placeholder="John"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last-name" className="font-medium text-sm">
            Last Name
          </label>
          <input
            className="px-3 py-2 border rounded-md"
            id="last-name"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <input
          className="px-3 py-2 border rounded-md"
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-medium text-sm">
          Message
        </label>
        <textarea
          className="px-3 py-2 border rounded-md min-h-20"
          id="message"
          placeholder="How can we help you?"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-accent-black px-4 py-3 rounded-md w-full text-white"
      >
        Send Message
      </button>
    </form>
  );
}
