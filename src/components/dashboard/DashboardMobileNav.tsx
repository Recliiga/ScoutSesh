import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

export default function DashboardMobileNav({
  open,
  closeModal,
  navLinks,
}: {
  open: boolean;
  closeModal: () => void;
  navLinks: { title: string; href: string }[];
}) {
  const pathname = usePathname();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative flex h-full w-[50%] min-w-[16rem] max-w-[24rem] flex-col gap-8 overflow-y-scroll bg-white p-4 text-sm duration-300 ${
        open ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <Link
        href="/dashboard"
        onClick={closeModal}
        className="w-fit text-xl font-bold text-green-600 sm:text-2xl"
      >
        ScoutSesh.
      </Link>
      <ul className="flex flex-col gap-4">
        {navLinks.map((navLink) => (
          <li key={navLink.title} onClick={closeModal}>
            <Link
              href={navLink.href}
              className={`block w-fit p-2 font-medium duration-300 hover:text-green-600 ${
                pathname.startsWith(navLink.href) ? "text-green-600" : ""
              }`}
            >
              {navLink.title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="absolute right-4 top-4 text-accent-gray-300 duration-200 hover:text-accent-black"
        onClick={closeModal}
      >
        <XIcon />
      </button>
    </div>
  );
}
