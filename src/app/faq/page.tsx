import React from "react";
import FAQItem from "@/components/FAQItem";

const questions = [
  {
    question: "What is ScoutSesh?",
    answer:
      "ScoutSesh is a comprehensive athlete development platform designed to help athletes of all levels elevate their performance in their sport. We offer powerful tools and resources including athlete evaluation, goal setting, group classes, and daily journaling to support your athletic journey.",
  },
  {
    question: "Who can use ScoutSesh?",
    answer:
      "ScoutSesh is for athletes of all ages and skill levels, from beginners to professionals. Whether you're looking to improve your performance in team sports, individual sports, or general fitness, ScoutSesh has tools and resources to help you reach your goals and become an elite player in your sport.",
  },
  {
    question: "What features does ScoutSesh offer?",
    answer:
      "ScoutSesh offers a range of features including: 1) Athlete Evaluation: Receive comprehensive evaluations from experienced coaches, combining quantitative metrics with thorough feedback. 2) Goal Setting: Set ambitious yet achievable goals and complete weekly reflections. 3) Group Classes: Join virtual classes led by professional coaches to enhance your technique, strategy, and mental approach. 4) Daily Journal: Maintain an intentional focus on your athletic journey with our daily journaling feature.",
  },
  {
    question: "How do the athlete evaluations work?",
    answer:
      "Our athlete evaluations provide a holistic view of your performance. Experienced coaches combine quantitative analytical metrics with thorough feedback to help you identify your strengths and areas for improvement with precision. This comprehensive approach ensures you get a clear picture of your current abilities and a roadmap for development.",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Yes, ScoutSesh provides multiple ways to track your progress. Our goal-setting tools allow you to set targets and complete weekly reflections to ensure you're on track. The daily journaling feature helps you record your thoughts and track your progress consistently. These tools combined with regular evaluations give you a clear view of your development over time.",
  },
  {
    question: "How do the group classes work?",
    answer:
      "Group classes are conducted virtually through our platform. Led by professional coaches across various sports, these interactive sessions help you enhance your technique, strategy, game understanding, and mental approach. You'll have the opportunity to collaborate with peers and learn from experts, elevating every aspect of your performance.",
  },
  {
    question: "How secure is my data on ScoutSesh?",
    answer:
      "We take data security very seriously. All personal information and performance data are encrypted and stored securely. We never share your information with third parties without your explicit consent. Our platform complies with industry-standard security protocols to ensure your data remains private and protected.",
  },
  {
    question: "What if I need help or have more questions?",
    answer:
      "Our support team is always here to help! You can reach out to us through the 'Contact' page on our website. We aim to respond to all inquiries promptly. For immediate assistance, check out our comprehensive help center, which contains detailed guides and answers to common questions about using ScoutSesh features.",
  },
];

export const metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about ScoutSesh. Learn more about our features, security, and how to get the most out of our platform.",
};

export default function FAQPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-[90%] max-w-6xl py-16">
        <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <div className="mx-auto max-w-3xl space-y-6">
          {questions.map((question, index) => (
            <FAQItem
              key={index}
              question={question.question}
              answer={question.answer}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
