import React from "react";
import FeatureSection from "@/components/FeatureSection";
import Button from "@/components/Button";

export default function FeaturesPage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex-grow">
        <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
          <h1 className="mb-4 sm:mb-6 font-bold text-3xl sm:text-4xl">
            ScoutSesh Features
          </h1>
          <p className="mb-4 sm:mb-8 text-base sm:text-lg">
            Discover the powerful tools and resources that ScoutSesh offers to
            help you elevate your performance in your sport.
          </p>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
            <FeatureSection
              title="Athlete Evaluation"
              description="Receive comprehensive evaluations from experienced coaches, combining quantitative analytical metrics with thorough feedback. Our platform provides a holistic view of your performance, helping you identify strengths and areas for improvement with precision."
              imageSrc="/placeholder.svg"
            />
            <FeatureSection
              title="Goal Setting"
              description="Set ambitious yet achievable goals and complete weekly reflections to ensure you're on track for success. Our intuitive goal-setting tools help you stay focused and motivated throughout your development journey, providing regular check-ins and adjustments as needed."
              imageSrc="/placeholder.svg"
            />
            <FeatureSection
              title="Group Classes"
              description="Join virtual group classes led by professional coaches across various sports. Enhance your technique, strategy, game understanding, and mental approach through interactive sessions. Collaborate with peers and learn from experts to elevate every aspect of your performance."
              imageSrc="/placeholder.svg"
            />
            <FeatureSection
              title="Daily Journal"
              description="Maintain an intentional focus on your athletic journey with our daily journaling feature. Record your thoughts, track your progress, and ensure you're consistently moving towards your goals. This tool helps you stay accountable and mindful of your daily efforts and achievements."
              imageSrc="/placeholder.svg"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-4 font-bold text-2xl sm:text-3xl">
              Ready to Experience These Features?
            </h2>
            <p className="mb-6 text-base sm:text-lg">
              Join ScoutSesh today and start your journey to becoming an elite
              player in your sport.
            </p>
            <Button href="/signup" size="lg">
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100 py-6">
        <div className="mx-auto px-4 w-[90%] max-w-6xl text-center text-gray-600">
          © 2024 ScoutSesh. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
