import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Target,
  Calendar,
  Video,
  BarChart,
  BookOpen,
  Award,
} from "lucide-react";
import { FeatureItem } from "@/components/FeatureItem";
import LinkButton from "@/components/LinkButton";

const cards = [
  {
    title: "Performance Tracking",
    description:
      "Monitor your progress with detailed analytics and visualizations of your key metrics.",
    icon: <BarChart className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Goal Setting",
    description:
      "Set ambitious yet achievable goals and track your journey towards success.",
    icon: <Target className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Virtual Training",
    description:
      "Access expert-led virtual sessions to improve your skills and techniques.",
    icon: <Video className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Daily Journaling",
    description:
      "Reflect on your progress and mindset with guided daily journal entries.",
    icon: <BookOpen className="w-10 h-10 text-green-600" />,
  },
];

const cards2 = [
  {
    title: "Accelerated Growth",
    description:
      "Track your progress, identify areas for improvement, and witness your skills develop faster than ever before.",
    icon: <TrendingUp className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Expert Guidance",
    description:
      "Gain insights and personalized advice from experienced coaches to refine your technique and strategy.",
    icon: <Award className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Structured Development",
    description:
      "Follow a well-organized training regimen that ensures consistent improvement and helps you reach your full potential.",
    icon: <Calendar className="w-10 h-10 text-green-600" />,
  },
];

export default function ForAthletesPage() {
  return (
    <main className="flex-1">
      <section className="bg-green-50 py-10 md:py-16">
        <div className="mx-auto px-4 w-[90%] max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-bold text-3xl text-green-800 sm:text-4xl md:text-5xl">
              Athletes, Unlock Your Full Potential with ScoutSesh
            </h1>
            <p className="mb-8 text-gray-700 text-lg sm:text-xl">
              Take control of your athletic journey, track your progress, and
              connect with top coaches to elevate your game to new heights.
            </p>
            <LinkButton size="lg" href="/signup">
              Join ScoutSesh Today
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="mx-auto px-4 w-[90%] max-w-6xl">
          <h2 className="mb-8 font-bold text-[1.75rem] text-center sm:text-3xl">
            Key Features for Athletes
          </h2>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center items-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-semibold text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="mb-4 font-bold text-[1.75rem] sm:text-3xl">
              Comprehensive Athlete Development Tools
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              ScoutSesh equips you with everything you need to take your game to
              the next level.
            </p>
          </div>
          <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
            <div className="relative w-full h-full min-h-40 aspect-video">
              <Image
                src="/placeholder.svg"
                alt="Coach using ScoutSesh platform"
                fill
                className="shadow-lg rounded-lg w-full h-full object-cover"
              />
            </div>
            <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-1">
              <FeatureItem
                title="Personalized Dashboard"
                description="Access your performance metrics, goals, and upcoming sessions all in one place."
              />
              <FeatureItem
                title="Skill Assessment"
                description="Receive detailed evaluations from top coaches to identify areas for improvement."
              />
              <FeatureItem
                title="Training Programs"
                description="Follow customized training plans designed to enhance your specific skills and attributes."
              />
              <FeatureItem
                title="Coach Connectivity"
                description="Easily communicate with coaches and receive timely feedback on your progress."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl">
          <h2 className="mb-8 font-bold text-[1.75rem] text-center sm:text-3xl">
            How ScoutSesh Empowers Athletes
          </h2>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {cards2.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center items-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-semibold text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-8 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-bold text-[1.75rem] sm:text-3xl">
              Start Your Journey to Excellence
            </h2>
            <p className="mb-8 text-gray-600 text-xl">
              Join ScoutSesh today and take the first step towards becoming the
              athlete you&apos;ve always dreamed of being. Our platform is
              designed to support your growth every step of the way.
            </p>
            <LinkButton href="/signup" size="lg" className="px-8 py-3 text-lg">
              Join ScoutSesh Now
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
