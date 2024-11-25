import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import LoadingIndicator from "../LoadingIndicator";

export default function WeeklyReflectionCommentDialog({
  isOpen,
  onClose,
  onSubmit,
  loading,
  initialText = "",
}: {
  isOpen: boolean;
  onClose(): void;
  onSubmit(text: string): Promise<void>;
  loading: boolean;
  initialText: string;
}) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  function handleSubmit() {
    onSubmit(text);
    setText("");
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialText ? "Edit Comment" : "Add Comment"}
          </DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Enter your comment here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSubmit}>
          {initialText ? (
            loading ? (
              <>
                <LoadingIndicator />
                Updating...
              </>
            ) : (
              "Update"
            )
          ) : loading ? (
            <>
              <LoadingIndicator />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
