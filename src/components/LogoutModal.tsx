import { logout } from "@/actions/authActions";
import { useState } from "react";
import { LogOutIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function LogoutModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const [loading, setLoading] = useState(false);
  async function handleLogout() {
    setLoading(true);
    await logout();
    setLoading(false);
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white rounded-md font-semibold duration-300 max-w-[19rem] flex flex-col gap-8 sm:max-w-[425px] w-[90%] p-8 absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%] ${
        open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-green-100 p-3 rounded-full">
          <LogOutIcon className="w-6 h-6 text-green-600" />
        </div>
        <h4 className="text-xl">Log out</h4>
        <p className="text-gray-600">Are you sure you want to Log out?</p>
      </div>
      <div className="flex gap-4">
        <Button
          disabled={loading}
          onClick={handleLogout}
          variant="default"
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Confirm
        </Button>
        <Button onClick={closeModal} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
      <button
        onClick={closeModal}
        className="top-2 right-2 absolute p-2 text-accent-gray-300 hover:text-accent-black duration-300"
      >
        <XIcon width={16} height={16} />
      </button>
    </div>
  );
}
