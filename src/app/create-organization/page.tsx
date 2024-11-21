import OrganizationRegistrationForm from "@/components/OrganizationRegistrationForm";
import { getSessionFromHeaders } from "@/services/authServices";

export default async function CreateOrganizationPage() {
  const user = await getSessionFromHeaders();

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6 border-accent-gray-200 bg-white shadow-sm p-6 border rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl text-center tracking-tight">
            Complete Your Organization Profile
          </h3>
          <p className="text-accent-gray-300 text-center text-sm">
            Create your Organization
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full text-sm">
          <OrganizationRegistrationForm userId={user._id as string} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-accent-gray-300 text-sm">
            Thank you for joining ScoutSesh!
          </p>
        </div>
      </div>
    </div>
  );
}
