"use client";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <div className="gap-4 grid grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="font-medium text-sm">
            First Name
          </label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="font-medium text-sm">
            Last Name
          </label>
          <Input id="lastName" name="lastName" placeholder="Doe" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="font-medium text-sm">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
