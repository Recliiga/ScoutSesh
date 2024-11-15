import React from "react";
import Link from "next/link";
import BackButton from "@/components/app/BackButton";
import GoalSettingSubmissions from "@/components/goal-setting/GoalSettingSubmissions";

const goalSettingSubmissions = [
  {
    id: 1,
    date: "2024-10-15",
    coachName: "Coach Smith",
    coachAvatar: "/placeholder-profile-picture.png",
    content:
      "Goal setting session focused on improving passing accuracy and team communication.",
    weeklyReflections: [
      {
        id: 1,
        date: "2024-10-22",
        title: "Week 1 Reflection",
        content:
          "This week I focused on improving my passing accuracy. I've seen a 10% increase in successful passes during practice sessions.",
      },
    ],
  },
  {
    id: 2,
    date: "2024-07-01",
    coachName: "Coach Johnson",
    coachAvatar: "/placeholder-profile-picture.png",
    content:
      "Quarterly goal setting session. Focus areas: fitness, sprint times, ball control, and team dynamics.",
    weeklyReflections: [
      {
        id: 1,
        date: "2024-07-08",
        title: "Week 1 Reflection",
        content:
          "Started working on my new fitness routine. Feeling more energized already.",
      },
      {
        id: 2,
        date: "2024-07-15",
        title: "Week 2 Reflection",
        content:
          "Improved my sprint times by 0.5 seconds this week. Continuing to push myself.",
      },
      {
        id: 3,
        date: "2024-07-22",
        title: "Week 3 Reflection",
        content:
          "Focused on ball control drills. Seeing improvements in my dribbling skills.",
      },
      {
        id: 4,
        date: "2024-07-29",
        title: "Week 4 Reflection",
        content:
          "Worked on team communication during practice. Feel more connected with my teammates now.",
      },
    ],
  },
  {
    id: 3,
    date: "2024-03-20",
    coachName: "Coach Williams",
    coachAvatar: "/placeholder-profile-picture.png",
    content:
      "Spring goal setting session. Objectives: nutrition plan, weak foot development, defensive positioning, and set pieces.",
    weeklyReflections: [
      {
        id: 1,
        date: "2024-03-27",
        title: "Week 1 Reflection",
        content:
          "Started a new nutrition plan. Feeling more energetic during practices.",
      },
      {
        id: 2,
        date: "2024-04-03",
        title: "Week 2 Reflection",
        content:
          "Worked on my weak foot. Seeing improvements in my left-footed shots.",
      },
      {
        id: 3,
        date: "2024-04-10",
        title: "Week 3 Reflection",
        content:
          "Focused on defensive positioning. Coach noted improvement in my marking.",
      },
      {
        id: 4,
        date: "2024-04-17",
        title: "Week 4 Reflection",
        content:
          "Practiced set pieces. Scored from a free kick in our last match!",
      },
    ],
  },
  {
    id: 4,
    date: "2023-12-05",
    coachName: "Coach Brown",
    coachAvatar: "/placeholder-profile-picture.png",
    content:
      "End-of-year goal setting. Areas of focus: acceleration, heading technique, tactical awareness, and stamina.",
    weeklyReflections: [
      {
        id: 1,
        date: "2023-12-12",
        title: "Week 1 Reflection",
        content:
          "Began working on my acceleration. Feeling faster off the mark.",
      },
      {
        id: 2,
        date: "2023-12-19",
        title: "Week 2 Reflection",
        content:
          "Improved my heading technique. Won more aerial duels in the last game.",
      },
      {
        id: 3,
        date: "2023-12-26",
        title: "Week 3 Reflection",
        content:
          "Focused on tactical awareness. Better at reading the game now.",
      },
      {
        id: 4,
        date: "2024-01-02",
        title: "Week 4 Reflection",
        content:
          "Worked on my stamina. Able to maintain high intensity throughout the full 90 minutes.",
      },
    ],
  },
  {
    id: 5,
    date: "2023-08-30",
    coachName: "Coach Davis",
    coachAvatar: "/placeholder-profile-picture.png",
    content:
      "Late summer goal setting session. Focus: strength training, first touch, crossing accuracy, and mental preparation.",
    weeklyReflections: [
      {
        id: 1,
        date: "2023-09-06",
        title: "Week 1 Reflection",
        content:
          "Started a new strength training program. Feeling stronger in challenges.",
      },
      {
        id: 2,
        date: "2023-09-13",
        title: "Week 2 Reflection",
        content: "Improved my first touch. Ball control is noticeably better.",
      },
      {
        id: 3,
        date: "2023-09-20",
        title: "Week 3 Reflection",
        content:
          "Worked on my crossing accuracy. Provided two assists in the last match.",
      },
      {
        id: 4,
        date: "2023-09-27",
        title: "Week 4 Reflection",
        content:
          "Focused on my mental game. Feeling more confident on the pitch.",
      },
    ],
  },
];

export default function AthleteGoalSettingSubmissionsPage() {
  return (
    <main className="flex-1 py-10">
      <div className="mx-auto sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="mb-6 font-extrabold text-3xl text-gray-900">
          Goal Setting Submissions
        </h1>
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-5">
            <h2 className="font-medium text-gray-900 text-lg">
              Past Goal Setting and Weekly Reflection Records
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <GoalSettingSubmissions
              goalSettingSubmissions={goalSettingSubmissions}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <BackButton />
          <Link
            href={"/app/goal-setting/new"}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm text-white"
          >
            Create New Goal Setting
          </Link>
        </div>
      </div>
    </main>
  );
}
