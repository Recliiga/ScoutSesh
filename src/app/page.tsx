import React from "react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import LinkButton from "@/components/LinkButton";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl">
          Welcome to ScoutSesh
        </h1>
        <p className="mb-4 text-base sm:mb-8 sm:text-lg">
          ScoutSesh is a comprehensive athlete development platform designed to
          elevate your game to the next level. Whether you&apos;re an aspiring
          youth athlete or a seasoned pro in any sport, our tools and resources
          are tailored to help you reach your full potential.
        </p>
        <div className="mb-6 sm:mb-12">
          <Image
            src="/homepage.png"
            alt="Athlete in action"
            width={800}
            height={400}
            className="aspect-[2] w-full rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Take Your Athletic Performance to the Next Level?
          </h2>
          <p className="mb-6 text-xl">
            Join ScoutSesh today and start your journey to becoming a better
            athlete in your sport.
          </p>
          <LinkButton size="lg" href="/signup">
            Sign Up Now
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
