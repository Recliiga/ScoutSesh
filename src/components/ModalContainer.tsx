import { useEffect } from "react";

export default function ModalContainer({
  children,
  open,
  closeModal,
  className,
}: {
  children: React.ReactNode;
  open: boolean;
  closeModal: () => void;
  className?: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyPress(ev: KeyboardEvent) {
      if (ev.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [closeModal]);

  return (
    <div
      onClick={closeModal}
      className={`fixed top-0 right-0 z-30 w-full h-full flex duration-300 ${className} ${
        open
          ? "visible bg-black/60 backdrop-blur-sm"
          : "invisible bg-transparent backdrop-blur-none"
      }`}
    >
      {children}
    </div>
  );
}
