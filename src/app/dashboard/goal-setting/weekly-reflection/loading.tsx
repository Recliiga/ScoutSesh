import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export default function LoadingPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex gap-8 w-full">
          <div className="flex-1">
            <div className="mb-4 text-muted-foreground text-sm">
              1/5 Weekly Reflection
            </div>
            <h1 className="mb-4 font-bold text-3xl">
              Let&apos;s reflect on your progress
            </h1>
            <p>
              Weekly reflection is crucial for your development as an athlete.
              We&apos;ll guide you through assessing your progress, identifying
              areas for improvement, and planning your next steps.
            </p>
          </div>
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-4">
                  <li className="bg-[#bbb] rounded-md w-full h-12 animate-pulse"></li>
                  <li
                    className="bg-[#bbb] rounded-md w-full h-12 animate-pulse"
                    style={{ animationDelay: "200ms" }}
                  ></li>
                  <li
                    className="bg-[#bbb] rounded-md w-full h-12 animate-pulse"
                    style={{ animationDelay: "400ms" }}
                  ></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end mt-8 w-full">
          <Button disabled className="bg-green-500 text-white">
            Start Reflection
          </Button>
        </div>
      </div>
    </main>
  );
}
