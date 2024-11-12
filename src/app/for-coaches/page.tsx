import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  Video,
  BarChart,
} from "lucide-react";
import { FeatureItem } from "@/components/FeatureItem";
import LinkButton from "@/components/LinkButton";

const cards = [
  {
    title: "Advanced Player Evaluation",
    description:
      "Conduct comprehensive evaluations combining analytical metrics with thorough feedback.",
    icon: <BarChart className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Goal Setting & Tracking",
    description:
      "Help athletes set and achieve ambitious yet realistic goals with our intuitive tools.",
    icon: <Target className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Virtual Group Classes",
    description:
      "Lead interactive sessions to enhance technique, strategy, and mental approach.",
    icon: <Video className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Daily Journal Insights",
    description:
      "Gain valuable insights from athletes' daily journals to tailor your coaching approach.",
    icon: <BookOpen className="w-10 h-10 text-green-600" />,
  },
];

const cards2 = [
  {
    title: "Enhanced Athlete Development",
    description:
      "Leverage our comprehensive evaluation tools and goal-setting features to accelerate your athletes' growth and performance.",
    icon: <Users className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Data-Driven Coaching",
    description:
      "Make informed decisions based on real-time analytics, performance trends, and athlete feedback through daily journals.",
    icon: <TrendingUp className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Efficient Time Management",
    description:
      "Streamline your coaching workflow with our integrated platform, allowing you to focus more on what matters most - developing your athletes.",
    icon: <Calendar className="w-10 h-10 text-green-600" />,
  },
];

export default function ForCoachesPage() {
  return (
    <main className="flex-1">
      <section className="bg-green-50 py-10 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-bold text-3xl text-green-800 sm:text-4xl md:text-5xl">
              Elevate Your Coaching with ScoutSesh
            </h1>
            <p className="mb-8 text-gray-700 text-lg sm:text-xl">
              Empower your athletes, streamline your workflow, and achieve
              unprecedented success with our comprehensive coaching platform.
            </p>
            <LinkButton href="/signup" size="lg">
              Join ScoutSesh Today
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="mx-auto px-4 w-[90%] max-w-6xl">
          <h2 className="mb-8 font-bold text-[1.75rem] text-center sm:text-3xl">
            Key Features for Coaches
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
                <CardContent className="p-0">
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
              Comprehensive Coaching Tools
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              ScoutSesh provides you with a suite of powerful tools to enhance
              every aspect of your coaching.
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
                title="Holistic Player Profiles"
                description="Access comprehensive player data, including performance metrics, goal progress, and journal entries."
              />
              <FeatureItem
                title="Interactive Group Sessions"
                description="Host engaging virtual classes to work on specific skills or strategies with your team or individual athletes."
              />
              <FeatureItem
                title="Progress Tracking Dashboard"
                description="Monitor your athletes' development with easy-to-understand visualizations and reports."
              />
              <FeatureItem
                title="Customized Training Plans"
                description="Create personalized training regimens based on individual goals and performance data."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl">
          <h2 className="mb-8 font-bold text-[1.75rem] text-center sm:text-3xl">
            How ScoutSesh Empowers Coaches
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
                <CardContent className="p-0">
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
              Join the ScoutSesh Coaching Community
            </h2>
            <p className="mb-8 text-gray-600 text-lg sm:text-xl">
              Experience the future of coaching with ScoutSesh. Our platform is
              designed to help you unlock your athletes&apos; full potential and
              take your coaching to the next level.
            </p>
            <LinkButton size="lg" href="/signup" className="px-8 py-3 text-lg">
              Join ScoutSesh Now
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
