import { UserType } from "@/db/models/User";
import Link from "next/link";
import Button from "../LinkButton";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

const navLinks = [
  { title: "Athlete Evaluation", href: "/app/athlete-evaluation" },
  { title: "Goal Setting", href: "/app/goal-setting" },
  { title: "Daily Journal", href: "/app/daily-journal" },
  { title: "Group Classes", href: "/app/group-classes" },
  { title: "Messages", href: "/app/messages" },
  { title: "My Team Members", href: "/app/team-members" },
];

export default function AppMobileNav({
  open,
  closeModal,
  user,
}: {
  open: boolean;
  closeModal: () => void;
  user: UserType | null;
}) {
  const pathname = usePathname();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white w-[50%] min-w-[16rem] relative max-w-[24rem] h-full flex flex-col gap-8 p-4 duration-300 text-sm ${
        open ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <Link
        href="/app"
        onClick={closeModal}
        className="w-fit font-bold text-green-600 text-xl sm:text-2xl"
      >
        ScoutSesh.
      </Link>
      <ul className="flex flex-col gap-4">
        {navLinks.map((navLink) => (
          <li key={navLink.title} onClick={closeModal}>
            <Link
              href={navLink.href}
              className={`block p-2 w-fit hover:text-green-600 font-medium duration-300 ${
                pathname === navLink.href ? "text-green-600" : ""
              }`}
            >
              {navLink.title}
            </Link>
          </li>
        ))}
        {!Boolean(user) && (
          <li onClick={closeModal}>
            <Button href={"/signup"} margin="none">
              Sign Up
            </Button>
          </li>
        )}
      </ul>
      <button
        className="top-4 right-4 absolute text-accent-gray-300 hover:text-accent-black duration-200"
        onClick={closeModal}
      >
        <XIcon />
      </button>
    </div>
  );
}
