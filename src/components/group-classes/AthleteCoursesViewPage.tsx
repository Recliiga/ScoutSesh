import LiveClassCard from "@/components/group-classes/LiveClassCard";
import CourseCard from "@/components/group-classes/CourseCard";
import BackButton from "@/components/dashboard/BackButton";
import { GroupClassType } from "@/db/models/GroupClass";

export default function AthleteCoursesView({
  liveClasses,
  courses,
}: {
  liveClasses: GroupClassType[];
  courses: GroupClassType[];
}) {
  return (
    <div className="max-w-4xl mx-auto py-4 flex-1 w-[90%]">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Classes</h2>
        <div className="grid gap-4">
          {liveClasses.length > 0 ? (
            liveClasses.map((liveClass) => (
              <LiveClassCard
                key={liveClass._id}
                liveClass={liveClass}
                forAthlete
              />
            ))
          ) : (
            <p className="text-accent-gray-300">
              It looks like there are no live classes available at the moment.
              Please check back later for new live sessions and updates.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Course Library</h2>
        <div className="grid gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} forAthlete />
            ))
          ) : (
            <p className="text-accent-gray-300">
              It looks like there are no available courses at the moment. Please
              check back later for new courses and updates.
            </p>
          )}
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <BackButton />
      </div>
    </div>
  );
}
