import React from "react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";

export default async function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex-grow">
        <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
          <h1 className="mb-4 sm:mb-6 font-bold text-3xl sm:text-4xl">
            Welcome to ScoutSesh
          </h1>
          <p className="mb-4 sm:mb-8 text-base sm:text-lg">
            ScoutSesh is a comprehensive athlete development platform designed
            to elevate your game to the next level. Whether you&apos;re an
            aspiring youth athlete or a seasoned pro in any sport, our tools and
            resources are tailored to help you reach your full potential.
          </p>
          <div className="mb-6 sm:mb-12">
            <Image
              src="/placeholder.svg"
              alt="Athlete in action"
              width={800}
              height={400}
              className="shadow-lg rounded-lg w-full min-h-60 aspect-[2] object-cover"
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
            <h2 className="mb-4 font-bold text-2xl sm:text-3xl">
              Ready to Take Your Athletic Performance to the Next Level?
            </h2>
            <p className="mb-6 text-base sm:text-lg">
              Join ScoutSesh today and start your journey to becoming a better
              athlete in your sport.
            </p>
            <Button href={"/signup"} size="lg">
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
