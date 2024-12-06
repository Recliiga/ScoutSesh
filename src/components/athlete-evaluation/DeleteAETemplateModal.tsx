import { useState } from "react";
import { LogOutIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import { deleteTemplate } from "@/actions/AETemplateActions";
import LoadingIndicator from "../LoadingIndicator";

export default function DeleteAETemplateModal({
  open,
  closeModal,
  template,
  removeTemplateFromList,
}: {
  open: boolean;
  closeModal: () => void;
  template: AthleteEvaluationTemplateType | null;
  removeTemplateFromList(templateId: string): void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteCourse() {
    if (!template) return;
    setLoading(true);
    const { error } = await deleteTemplate(template._id);
    if (!error) {
      removeTemplateFromList(template._id);
      closeModal();
    }
    setLoading(false);
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
          <LogOutIcon className="h-6 w-6 text-green-600" />
        </div>
        <h4 className="text-xl">Delete Template</h4>
        <p className="text-gray-600">
          Are you sure you want to delete the Template &ldquo;
          {template?.name}
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
          {loading ? (
            <>
              <LoadingIndicator /> Deleting...
            </>
          ) : (
            "Confirm"
          )}
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
