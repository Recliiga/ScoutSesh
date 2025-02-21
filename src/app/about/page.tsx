import React from "react";
import Image from "next/image";
import ExpertiseCard from "@/components/ExpertiseCard";
import LinkButton from "@/components/LinkButton";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about ScoutSesh, our mission, and our expertise in athlete development. Join us on our journey to revolutionize athlete development.",
};

export default function AboutUs() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-[90%] max-w-6xl py-8">
        <h1 className="mb-6 text-4xl font-bold text-accent-black">
          About ScoutSesh
        </h1>
        <div className="mb-12 grid grid-cols-1 gap-8 text-base sm:text-lg lg:grid-cols-2">
          <div>
            <p className="mb-4">
              At ScoutSesh, we&apos;re more than just a company - we&apos;re a
              team of passionate athletes and coaches dedicated to helping
              fellow athletes reach their highest potential. ScoutSesh, our
              innovative solution, is designed to revolutionize athlete
              development across all sports.
            </p>
            <p className="mb-4">
              Founded by a group of sports enthusiasts who have walked in the
              shoes of both players and mentors, we understand the challenges
              and aspirations of athletes at every level.
            </p>
            <p className="mb-4">
              Our mission is simple: to provide innovative tools and resources
              through ScoutSesh that empower athletes to become the best
              versions of themselves, both on and off the field, court, or ice.
            </p>
          </div>
          <div className="relative aspect-[1.5] h-full max-h-[26rem] w-full">
            <Image
              src="/about.png"
              alt="ScoutSesh Team"
              fill
              className="h-full w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
        <h2 className="mb-4 text-[1.75rem] font-bold text-accent-black sm:text-3xl">
          Our Expertise
        </h2>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ExpertiseCard
            title="Athlete Experience"
            description="Our team comprises former and current athletes who understand the physical and mental demands of competitive sports."
          />
          <ExpertiseCard
            title="Coaching Prowess"
            description="With years of coaching experience, we bring proven strategies and techniques to help athletes improve their skills and performance."
          />
          <ExpertiseCard
            title="Technology Integration"
            description="We harness technology as a powerful tool, enabling athletes to enhance their skills and empowering coaches to provide more effective, personalized guidance to their players."
          />
        </div>
        <div className="rounded-lg bg-green-50 p-4 shadow-md sm:p-8">
          <h2 className="mb-4 text-[1.75rem] font-bold text-green-600 sm:text-3xl">
            Our Commitment
          </h2>
          <p className="mb-4 text-base sm:text-lg">
            At ScoutSesh, we&apos;re committed to fostering a community where
            athletes from all sports can thrive. Through ScoutSesh, we provide
            the guidance, tools, and support every athlete needs to achieve
            greatness, regardless of their chosen sport.
          </p>
          <p className="mb-6 text-base sm:text-lg">
            Join us on this exciting journey as we revolutionize athlete
            development with ScoutSesh and help you become better than ever
            before.
          </p>
          <LinkButton
            href="/signup"
            size="lg"
            className="text-wrap px-[1.25rem] text-center text-[1rem] sm:px-6 sm:text-lg"
            margin="none"
          >
            Start Your ScoutSesh Journey
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
