import CompleteAthleteProfileForm from "@/components/CompleteAthleteProfileForm";
import { getSessionFromHeaders } from "@/services/authServices";

export default async function CompleteYourProfilePage() {
  const user = await getSessionFromHeaders();

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6 border-accent-gray-200 bg-white shadow-sm p-6 border rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl text-center tracking-tight">
            Complete Your Profile
          </h3>
          <p className="text-accent-gray-300 text-center text-sm">
            Add more details to your ScoutSesh profile
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full text-sm">
          <CompleteAthleteProfileForm
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            userId={user._id}
            role={user.role}
          />
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
