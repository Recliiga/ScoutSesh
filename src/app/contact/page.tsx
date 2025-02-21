import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ScoutSesh team for any questions or assistance. Fill out the contact form and we'll respond promptly.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-[90%] max-w-6xl py-8">
        <h1 className="mb-6 text-3xl font-bold text-black sm:text-4xl">
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
