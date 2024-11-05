import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen text-accent-black">
      <header className="flex justify-between items-center px-4 border-b h-16">
        <Link href="/" className="font-bold text-2xl text-green-600">
          ScoutSesh.
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/features"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            Features
          </Link>
          <Link
            href="/for-coaches"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            For Coaches
          </Link>
          <Link
            href="/for-athletes"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            For Athletes
          </Link>
          <Link
            href="/about"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href={"/login"}
            className="bg-white hover:bg-accent-gray mx-auto px-4 p-2 border rounded-md w-fit font-medium text-accent-black text-sm transition-colors duration-200 cursor-pointer"
          >
            Login
          </Link>
          <Link
            href={"/sign-up"}
            className="bg-accent-black hover:bg-accent-black/90 mx-auto px-4 p-2 border rounded-md w-fit font-medium text-sm text-white transition-colors duration-200 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto px-4 py-8 container">
          <h1 className="mb-6 font-bold text-4xl">Welcome to ScoutSesh</h1>
          <p className="mb-8 text-xl">
            ScoutSesh is a comprehensive athlete development platform designed
            to elevate your game to the next level. Whether you&apos;re an
            aspiring youth athlete or a seasoned pro in any sport, our tools and
            resources are tailored to help you reach your full potential.
          </p>
          <div className="mb-12">
            <Image
              src="/placeholder.svg"
              alt="Athlete in action"
              width={800}
              height={400}
              className="shadow-lg rounded-lg w-full aspect-[2] object-cover"
            />
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <FeatureCard
              title="Athlete Evaluation"
              description="Get personalized feedback from experienced coaches and scouts to improve your skills in your sport."
            />
            <FeatureCard
              title="Goal Setting"
              description="Set and track your athletic goals with our intuitive goal-setting tools."
            />
            <FeatureCard
              title="Group Classes"
              description="Join virtual group classes led by professional coaches to enhance your technique and strategy in various sports."
            />
          </div>
          <div className="mt-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">
              Ready to Take Your Athletic Performance to the Next Level?
            </h2>
            <p className="mb-6 text-xl">
              Join ScoutSesh today and start your journey to becoming a better
              athlete in your sport.
            </p>
            <Link
              href={"/sign-up"}
              className="bg-accent-black hover:bg-accent-black/90 mx-auto px-8 py-3 p-2 border rounded-md w-fit font-medium text-sm text-white transition-colors duration-200 cursor-pointer"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-2 font-semibold text-green-600 text-xl">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
