import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

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
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
