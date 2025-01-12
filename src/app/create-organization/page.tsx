import OrganizationRegistrationForm from "@/components/OrganizationRegistrationForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchCountries } from "@/services/userServices";

export default async function CreateOrganizationPage() {
  const user = await getSessionFromHeaders();

  const { countries } = await fetchCountries();

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg border border-accent-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-2xl font-bold tracking-tight">
            Complete Your Organization Profile
          </h3>
          <p className="text-center text-sm text-accent-gray-300">
            Create your Organization
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 text-sm">
          <OrganizationRegistrationForm
            userId={user._id}
            countries={countries}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-accent-gray-300">
            Thank you for joining ScoutSesh!
          </p>
        </div>
      </div>
    </div>
  );
}
