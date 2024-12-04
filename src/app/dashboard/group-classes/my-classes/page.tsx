import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUserOrders } from "@/services/orderServices";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoLibraryCourseCard from "@/components/group-classes/VideoLibraryCourseCard";
import BackButton from "@/components/dashboard/BackButton";
import Link from "next/link";

export default async function MyClassesPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  const { userOrders, error: orderError } = await fetchUserOrders(user._id);
  if (orderError !== null) throw new Error(orderError);

  return (
    <main className="flex-1 w-[90%] max-w-7xl mx-auto flex flex-col justify-between py-4">
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-4 sm:mb-6">My Courses</h1>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          {userOrders.length > 0 ? (
            <>
              <TabsContent value="in-progress" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {userOrders
                    .filter(
                      (order) =>
                        order.completedLessons.length <
                        order.course.videos.length
                    )
                    .map((order) => (
                      <VideoLibraryCourseCard key={order._id} order={order} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {userOrders
                    .filter(
                      (order) =>
                        order.completedLessons.length >=
                        order.course.videos.length
                    )
                    .map((order) => (
                      <VideoLibraryCourseCard key={order._id} order={order} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="all" tabIndex={undefined}>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                  {userOrders.map((order) => (
                    <VideoLibraryCourseCard key={order._id} order={order} />
                  ))}
                </div>
              </TabsContent>
            </>
          ) : (
            <p className="text-sm p-4 text-accent-gray-300">
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
