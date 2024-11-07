import { UserType } from "@/db/models/User";
import Link from "next/link";

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
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white w-[50%] min-w-[16rem] h-full flex flex-col gap-8 p-4 duration-300 text-sm ${
        open ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <Link href="/" className="font-bold text-green-600 text-xl sm:text-2xl">
        ScoutSesh.
      </Link>
      <ul className="flex flex-col gap-4">
        {navLinks.map((navLink) => (
          <li key={navLink.title} onClick={closeModal}>
            <Link
              href={navLink.href}
              className="block p-2 w-fit hover:text-green-600 duration-300"
            >
              {navLink.title}
            </Link>
          </li>
        ))}
        {!Boolean(user) && (
          <li onClick={closeModal}>
            <Link
              href={"/signup"}
              className="block min-[400px]:hidden bg-accent-black hover:bg-accent-black/90 px-4 p-2 border rounded-md w-fit font-medium text-sm text-white whitespace-nowrap transition-colors duration-200 cursor-pointer"
            >
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
