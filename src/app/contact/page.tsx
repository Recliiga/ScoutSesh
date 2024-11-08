"use client";
import ContactForm from "@/components/ContactForm";
import React from "react";

export default function ContactPage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="mx-auto py-8 w-[90%] max-w-6xl">
        <h1 className="mb-6 font-bold text-3xl text-black sm:text-4xl">
          Contact Us
        </h1>
        <p className="mb-6 text-base text-gray-600 sm:text-lg">
          Have questions about ScoutSesh or need assistance? We&apos;re here to
          help! Fill out the form below, and our team will get back to you as
          soon as possible.
        </p>
        <div className="flex flex-col gap-6 mx-auto p-4 sm:p-6 border rounded-lg max-w-md">
          <div>
            <h2 className="font-semibold text-2xl">Get in Touch</h2>
            <p className="text-accent-gray-300 text-sm">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
