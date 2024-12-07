import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export default function CompletionScreen({
  isEditing,
}: {
  isEditing: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-green-50 py-4">
      <Card className="w-full max-w-lg p-4 text-center sm:p-6">
        <CardHeader className="m-0">
          <div className="mb-4 text-sm text-muted-foreground">
            7/7 Athlete Evaluation
          </div>
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="mb-2 space-y-0 text-2xl font-bold text-green-700">
            Template {isEditing ? "Updated" : "Created"} Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-gray-700">
            You have successfully {isEditing ? "updated" : "created"} an
            evaluation template.
          </p>
          <p className="text-md mb-6 text-sm text-gray-600">
            You can view your saved templates or return to the Evaluation
            dashboard to manage your evaluations.
          </p>
          <div className="flex-center flex-wrap gap-2 sm:gap-4">
            <Link
              href={"/dashboard/athlete-evaluation/templates"}
              className="rounded-md border px-3 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100 sm:px-4"
            >
              <span className="hidde sm:inline">Manage </span>
              Templates
            </Link>
            <Link
              href={"/dashboard/athlete-evaluation"}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white duration-200 hover:bg-green-700 sm:px-4"
            >
              Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
