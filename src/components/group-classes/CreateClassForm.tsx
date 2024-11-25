"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { format } from "date-fns";

export default function CreateClassForm({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const [courseType, setCourseType] = useState<"live" | "video" | undefined>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [lessonDuration, setLessonDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [numberOfLessons, setNumberOfLessons] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skillLevels, setSkillLevels] = useState<string[]>([]);

  //   useEffect(() => {
  //     if (isLiveClass && startDate && endDate && isRecurring) {
  //       const dates: { start: Date; end: Date }[] = [];
  //       let currentDate = new Date(startDate);
  //       const endDateTime = new Date(endDate);

  //       while (isBefore(currentDate, endDateTime)) {
  //         const [hours, minutes] = startTime.split(":").map(Number);
  //         const courseStartDate = setMinutes(
  //           setHours(new Date(currentDate), hours),
  //           minutes
  //         );
  //         const duration =
  //           lessonDuration === "custom"
  //             ? parseInt(customDuration)
  //             : parseInt(lessonDuration);
  //         const courseEndDate = addMinutes(courseStartDate, duration);
  //         dates.push({ start: courseStartDate, end: courseEndDate });

  //         switch (repeatOption) {
  //           case "every-day":
  //             currentDate = addDays(currentDate, 1);
  //             break;
  //           case "every-week":
  //             currentDate = addWeeks(currentDate, 1);
  //             break;
  //           case "every-2-weeks":
  //             currentDate = addWeeks(currentDate, 2);
  //             break;
  //           case "every-month":
  //             currentDate = addMonths(currentDate, 1);
  //             break;
  //           case "every-year":
  //             currentDate = addYears(currentDate, 1);
  //             break;
  //         }
  //       }
  //       setCourseDates(dates);
  //     } else if (isLiveClass && startDate) {
  //       const [hours, minutes] = startTime.split(":").map(Number);
  //       const courseStartDate = setMinutes(
  //         setHours(new Date(startDate), hours),
  //         minutes
  //       );
  //       const duration =
  //         lessonDuration === "custom"
  //           ? parseInt(customDuration)
  //           : parseInt(lessonDuration);
  //       const courseEndDate = addMinutes(courseStartDate, duration);
  //       setCourseDates([{ start: courseStartDate, end: courseEndDate }]);
  //     } else {
  //       setCourseDates([]);
  //     }
  //   }, [
  //     isLiveClass,
  //     startDate,
  //     endDate,
  //     startTime,
  //     isRecurring,
  //     repeatOption,
  //     lessonDuration,
  //     customDuration,
  //   ]);

  function toggleSkillLevel(level: "beginner" | "intermediate" | "advanced") {
    if (skillLevels.includes(level)) {
      setSkillLevels(skillLevels.filter((skillLevel) => skillLevel !== level));
    } else {
      setSkillLevels([...skillLevels, level]);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!startDate || !endDate) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.set("startDate", startDate.toDateString());
    formData.set("endDate", endDate.toDateString());
    formData.set("isRecurring", String(isRecurring));
    formData.set("skillLevels", skillLevels.toString());
    const courseData = Object.fromEntries(formData);
    console.log(courseData);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl w-[90%] mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Course" : "Create Class"}
        </h1>
        {isEditing && (
          <Button variant="outline" className="flex items-center gap-2">
            <PencilIcon className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Course Title</Label>
          <Input
            name="title"
            id="title"
            placeholder="e.g. Mastering Ice Hockey Goaltending"
            required
          />
        </div>

        <div>
          <Label htmlFor="thumbnail">Course Image</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your course..."
            required
          />
        </div>

        <div>
          <Label htmlFor="coaches">Coach(es)</Label>
          <Input
            id="coaches"
            name="coaches"
            placeholder="e.g. Sarah Lee, Mike Johnson"
            required
          />
        </div>

        <div>
          <Label>Skill Level</Label>
          <div className="flex flex-col space-y-2 mt-2">
            <Label
              htmlFor={"beginner"}
              className="capitalize flex items-center gap-2"
            >
              <Checkbox
                id={"beginner"}
                checked={skillLevels.includes("beginner")}
                onCheckedChange={() => toggleSkillLevel("beginner")}
              />
              Beginner
            </Label>
            <Label
              htmlFor={"intermediate"}
              className="flex items-center gap-2 capitalize"
            >
              <Checkbox
                id={"intermediate"}
                checked={skillLevels.includes("intermediate")}
                onCheckedChange={() => toggleSkillLevel("intermediate")}
              />
              Intermediate
            </Label>
            <Label
              htmlFor={"advanced"}
              className="capitalize flex items-center gap-2"
            >
              <Checkbox
                id={"advanced"}
                checked={skillLevels.includes("advanced")}
                onCheckedChange={() => toggleSkillLevel("advanced")}
              />
              Advanced
            </Label>
          </div>
        </div>

        <div>
          <Label>Course Type</Label>
          <RadioGroup
            name="courseType"
            value={courseType}
            onValueChange={(value: "live" | "video") => setCourseType(value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="live-course" />
              <Label htmlFor="live-course">Live Class</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video-course" />
              <Label htmlFor="video-course">Video Course</Label>
            </div>
          </RadioGroup>
        </div>

        {courseType === "live" && (
          <>
            <div className="space-y-2">
              <Label>Course Dates</Label>
              <div className="flex gap-2 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-2 items-center">
                      Start Date:
                      <Button variant="outline" type="button">
                        {startDate ? format(startDate, "PPP") : "Select Date"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-2 items-center">
                      End Date:
                      <Button variant="outline" type="button">
                        {endDate ? format(endDate, "PPP") : "Select Date"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" name="startTime" type="time" required />
            </div>

            <div>
              <Label>Lesson Duration (minutes)</Label>
              <RadioGroup
                name="lessonDuration"
                value={lessonDuration}
                onValueChange={(value) => {
                  setLessonDuration(value);
                  if (value !== "custom") setCustomDuration("");
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  {["15", "30", "45", "60"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={duration}
                        id={`duration-${duration}`}
                      />
                      <Label
                        htmlFor={`duration-${duration}`}
                      >{`${duration} minutes`}</Label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["75", "90", "120", "custom"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={duration}
                        id={`duration-${duration}`}
                      />
                      <Label htmlFor={`duration-${duration}`}>
                        {duration === "custom"
                          ? "Custom"
                          : `${duration} minutes`}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              {lessonDuration === "custom" && (
                <Input
                  type="number"
                  min="1"
                  name="customDuration"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Enter custom duration"
                  className="mt-2 w-full"
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring">Recurring Course</Label>
            </div>

            {isRecurring && (
              <div>
                <Label htmlFor="repeatFrequency">Repeat</Label>
                <Select name="repeatFrequency">
                  <SelectTrigger id="repeatFrequency">
                    <SelectValue placeholder="Select repeat option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="every-day">Every Day</SelectItem>
                    <SelectItem value="every-week">Every Week</SelectItem>
                    <SelectItem value="every-2-weeks">Every 2 Weeks</SelectItem>
                    <SelectItem value="every-month">Every Month</SelectItem>
                    <SelectItem value="every-year">Every Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="totalSpots">Total Spots</Label>
              <Input
                id="totalSpots"
                name="totalSpots"
                type="number"
                min="1"
                required
              />
            </div>
          </>
        )}

        {courseType === "video" && (
          <>
            <div>
              <Label htmlFor="numberOfLessons">Number of Video Lessons</Label>
              <Input
                id="numberOfLessons"
                name="numberOfLessons"
                type="number"
                min="1"
                value={numberOfLessons}
                onChange={(e) => setNumberOfLessons(Number(e.target.value))}
                required
              />
            </div>
            {[...Array(numberOfLessons)].map((_, index) => (
              <div key={index}>
                <Label htmlFor={`video-upload-${index}`}>
                  Video Lesson {index + 1}
                </Label>
                <Input
                  id={`video-upload-${index}`}
                  name={`videoUpload-${index}`}
                  type="file"
                  accept="video/*"
                  required
                />
              </div>
            ))}
          </>
        )}

        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Submit Class
        </Button>
      </form>
    </div>
  );
}
