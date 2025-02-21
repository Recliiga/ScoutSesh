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
    icon: <BarChart className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Goal Setting",
    description:
      "Set ambitious yet achievable goals and track your journey towards success.",
    icon: <Target className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Virtual Training",
    description:
      "Access expert-led virtual sessions to improve your skills and techniques.",
    icon: <Video className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Daily Journaling",
    description:
      "Reflect on your progress and mindset with guided daily journal entries.",
    icon: <BookOpen className="h-10 w-10 text-green-600" />,
  },
];

const cards2 = [
  {
    title: "Accelerated Growth",
    description:
      "Track your progress, identify areas for improvement, and witness your skills develop faster than ever before.",
    icon: <TrendingUp className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Expert Guidance",
    description:
      "Gain insights and personalized advice from experienced coaches to refine your technique and strategy.",
    icon: <Award className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Structured Development",
    description:
      "Follow a well-organized training regimen that ensures consistent improvement and helps you reach your full potential.",
    icon: <Calendar className="h-10 w-10 text-green-600" />,
  },
];

export const metadata = {
  title: "For Athletes",
  description:
    "Discover the tools and features ScoutSesh offers to help athletes track their progress, set goals, and connect with top coaches.",
};

export default function ForAthletesPage() {
  return (
    <main className="flex-1">
      <section className="bg-green-50 py-10 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-green-800 sm:text-4xl md:text-5xl">
              Athletes, Unlock Your Full Potential with ScoutSesh
            </h1>
            <p className="mb-8 text-lg text-gray-700 sm:text-xl">
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
        <div className="mx-auto w-[90%] max-w-6xl px-4">
          <h2 className="mb-8 text-center text-[1.75rem] font-bold sm:text-3xl">
            Key Features for Athletes
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <CardHeader className="pb-2">
                  <div className="mb-4 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
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
            <h2 className="mb-4 text-[1.75rem] font-bold sm:text-3xl">
              Comprehensive Athlete Development Tools
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              ScoutSesh equips you with everything you need to take your game to
              the next level.
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-video h-full min-h-40 w-full">
              <Image
                src="/for-athletes2.png"
                alt="Coach using ScoutSesh platform"
                fill
                className="h-full w-full rounded-lg object-cover object-top shadow-lg"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
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
          <h2 className="mb-8 text-center text-[1.75rem] font-bold sm:text-3xl">
            How ScoutSesh Empowers Athletes
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {cards2.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <CardHeader className="pb-2">
                  <div className="mb-4 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
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
            <h2 className="mb-6 text-[1.75rem] font-bold sm:text-3xl">
              Start Your Journey to Excellence
            </h2>
            <p className="mb-8 text-xl text-gray-600">
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
