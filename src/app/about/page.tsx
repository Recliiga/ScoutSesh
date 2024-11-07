import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ExpertiseCard from "@/components/ExpertiseCard";

export default function AboutUs() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-grow">
        <div className="mx-auto py-8 w-[90%] max-w-6xl">
          <h1 className="mb-6 font-bold text-4xl text-accent-black">
            About ScoutSesh
          </h1>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
            <div>
              <p className="mb-4 text-lg">
                At ScoutSesh, we&apos;re more than just a company - we&apos;re a
                team of passionate athletes and coaches dedicated to helping
                fellow athletes reach their highest potential. ScoutSesh, our
                innovative solution, is designed to revolutionize athlete
                development across all sports.
              </p>
              <p className="mb-4 text-lg">
                Founded by a group of sports enthusiasts who have walked in the
                shoes of both players and mentors, we understand the challenges
                and aspirations of athletes at every level.
              </p>
              <p className="mb-4 text-lg">
                Our mission is simple: to provide innovative tools and resources
                through ScoutSesh that empower athletes to become the best
                versions of themselves, both on and off the field, court, or
                ice.
              </p>
            </div>
            <div className="relative w-full h-full aspect-[1.5]">
              <Image
                src="/placeholder.svg"
                alt="ScoutSesh Team"
                fill
                className="shadow-lg rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="mb-4 font-bold text-[1.75rem] text-accent-black sm:text-3xl">
            Our Expertise
          </h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-12">
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
          <div className="bg-green-50 shadow-md p-4 sm:p-8 rounded-lg">
            <h2 className="mb-4 font-bold text-[1.75rem] text-green-600 sm:text-3xl">
              Our Commitment
            </h2>
            <p className="mb-4 text-lg">
              At ScoutSesh, we&apos;re committed to fostering a community where
              athletes from all sports can thrive. Through ScoutSesh, we provide
              the guidance, tools, and support every athlete needs to achieve
              greatness, regardless of their chosen sport.
            </p>
            <p className="mb-6 text-lg">
              Join us on this exciting journey as we revolutionize athlete
              development with ScoutSesh and help you become better than ever
              before.
            </p>
            <Button href="/signup" size="lg" className="px-[1rem] sm:px-8">
              Start Your ScoutSesh Journey
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="mx-auto px-4 w-[90%] max-w-6xl text-center text-gray-600">
          © 2024 ScoutSesh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
