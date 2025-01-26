import { useState } from "react";
import { Trash2Icon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { GroupClassType } from "@/db/models/GroupClass";
import { deleteClass } from "@/actions/groupClassActions";
import toast from "react-hot-toast";

export default function DeleteGroupClassModal({
  open,
  closeModal,
  course,
}: {
  open: boolean;
  closeModal: () => void;
  course: GroupClassType;
}) {
  const [loading, setLoading] = useState(false);
  async function handleDeleteCourse() {
    setLoading(true);
    const { error } = await deleteClass(course);
    if (error) {
      toast.error(error);
      setLoading(false);
    } else {
      toast.success("Group class deleted successfully");
      closeModal();
    }
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute left-[50%] top-[50%] flex w-[90%] max-w-[19rem] -translate-x-[50%] -translate-y-[50%] flex-col gap-8 rounded-md bg-white p-8 font-semibold duration-300 sm:max-w-[425px] ${
        open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <Trash2Icon className="h-6 w-6 text-green-600" />
        </div>
        <h4 className="text-xl">
          Delete {course.courseType === "video" ? "Course" : "Live Class"}
        </h4>
        <p className="text-gray-600">
          Are you sure you want to delete the{" "}
          {course.courseType === "video" ? "course" : "live class"} &ldquo;
          {course.title}
          &rdquo;?
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          disabled={loading}
          onClick={handleDeleteCourse}
          variant="default"
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {loading ? "Deleting..." : "Confirm"}
        </Button>
        <Button onClick={closeModal} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 p-2 text-accent-gray-300 duration-300 hover:text-accent-black"
      >
        <XIcon width={16} height={16} />
      </button>
    </div>
  );
}
