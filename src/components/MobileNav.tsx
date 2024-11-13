import { UserType } from "@/db/models/User";
import Link from "next/link";
import Button from "./LinkButton";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "For Coaches", href: "/for-coaches" },
  { title: "For Athletes", href: "/for-athletes" },
  { title: "About", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export default function MobileNav({
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
      className={`bg-white w-[50%] relative min-w-[16rem] h-full flex flex-col gap-8 p-4 duration-300 text-sm ${
        open ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <Link
        href="/"
        onClick={closeModal}
        className="font-bold text-green-600 text-xl sm:text-2xl"
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
