import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUserLiveClassOrders } from "@/services/orderServices";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoLibraryCourseCard from "@/components/group-classes/VideoLibraryCourseCard";
import BackButton from "@/components/dashboard/BackButton";
import Link from "next/link";

export default async function MyClassesPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  const { liveClassOrders, error: orderError } = await fetchUserLiveClassOrders(
    user._id,
  );
  if (orderError !== null) throw new Error(orderError);

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col justify-between py-4">
      <div className="flex w-full flex-col">
        <h1 className="mb-4 text-3xl font-bold sm:mb-6">My Courses</h1>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          {liveClassOrders.length > 0 ? (
            <>
              <TabsContent value="in-progress" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {liveClassOrders
                    .filter(
                      (order) =>
                        order.completedLessons.length <
                        order.course.videos.length,
                    )
                    .map((order) => (
                      <VideoLibraryCourseCard key={order._id} order={order} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {liveClassOrders
                    .filter(
                      (order) =>
                        order.completedLessons.length >=
                        order.course.videos.length,
                    )
                    .map((order) => (
                      <VideoLibraryCourseCard key={order._id} order={order} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="all" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {liveClassOrders.map((order) => (
                    <VideoLibraryCourseCard key={order._id} order={order} />
                  ))}
                </div>
              </TabsContent>
            </>
          ) : (
            <p className="p-4 text-sm text-accent-gray-300">
              You haven&apos;t enrolled in any courses yet. Explore our{" "}
              <Link
                href={"/dashboard/group-classes/courses"}
                className="text-green-500 hover:underline"
              >
                course catalog
              </Link>{" "}
              and start learning today!
            </p>
          )}
        </Tabs>
      </div>

      <div>
        <BackButton />
      </div>
    </main>
  );
}
