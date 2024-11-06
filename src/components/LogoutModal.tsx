import { logout } from "@/actions/authActions";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

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
    closeModal();
    setLoading(false);
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white rounded-md font-semibold duration-300 max-w-[19rem] sm:max-w-80 w-[90%] absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%] ${
        open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-col items-center gap-2 sm:px-8 p-4 text-center">
        <div className="bg-red-100 p-2 rounded-full">
          <svg
            height={20}
            width={20}
            version="1.1"
            id="svg2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            enableBackground="new 0 0 1200 1200"
            fill="#000000"
            className="fill-red-500"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="path14971"
                d="M513.94,0v693.97H686.06V0H513.94z M175.708,175.708 C67.129,284.287,0,434.314,0,600c0,331.371,268.629,600,600,600s600-268.629,600-600c0-165.686-67.13-315.713-175.708-424.292 l-120.85,120.85C981.102,374.216,1029.126,481.51,1029.126,600c0,236.981-192.146,429.126-429.126,429.126 c-236.981,0-429.126-192.145-429.126-429.126c0-118.49,48.025-225.784,125.684-303.442L175.708,175.708z"
              ></path>
            </g>
          </svg>
        </div>
        <h4 className="sm:text-lg">Logout?</h4>
        <p className="font-normal text-sm sm:text-base">
          Are you sure you want to logout?
        </p>
      </div>
      <div className="flex justify-end gap-2 p-2 border-t">
        <button
          onClick={closeModal}
          className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-md w-20 duration-300 active:scale-90"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleLogout}
          className="flex-center bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 p-2 rounded-md w-20 text-white duration-300 active:scale-90"
        >
          {loading ? <LoadingIndicator /> : "Logout"}
        </button>
      </div>
    </div>
  );
}
