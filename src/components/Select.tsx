"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";

type SelectContextType = {
  showOptions: boolean;
  value?: string;
  handleChange(value: string, child: React.ReactNode): void;
  closeDropdown(): void;
};
const SelectContext = createContext<SelectContextType | null>(null);

export default function Select({
  placeholder,
  value,
  onChange,
  className,
  children,
}: {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange(value: string): void;
  children?: React.ReactNode;
}) {
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(ev.target as Node)) {
        console.log("Clicked");
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [showOptions, setShowOptions] = useState(false);
  const [childComponent, setChildComponent] = useState<React.ReactNode | null>(
    null,
  );

  function closeDropdown() {
    setShowOptions(false);
  }

  function handleChange(value: string, child: React.ReactNode) {
    onChange(value);
    setChildComponent(child);
    closeDropdown();
  }

  return (
    <SelectContext.Provider
      value={{ value, handleChange, showOptions: showOptions, closeDropdown }}
    >
      <div className="relative text-sm" ref={selectRef}>
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className={`line-clamp-1 w-full cursor-pointer rounded-md border px-3 py-2 pr-8 duration-200 hover:bg-accent-gray-100 ${className}`}
        >
          {childComponent || placeholder || "Select"}
        </div>
        {children}
        {showOptions ? (
          <ChevronUp className="absolute right-2 top-[50%] h-4 w-4 -translate-y-[50%]" />
        ) : (
          <ChevronDown className="absolute right-2 top-[50%] h-4 w-4 -translate-y-[50%]" />
        )}
      </div>
    </SelectContext.Provider>
  );
}

function Content({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { showOptions } = useSelectContext();

  return (
    <div
      className={`absolute left-0 top-[calc(100%_+_4px)] z-10 w-full rounded-md border bg-white p-1 shadow ${showOptions ? "visible" : "invisible"} ${className}`}
    >
      {children}
    </div>
  );
}

function Option({
  children,
  value,
  className,
}: {
  children?: React.ReactNode;
  value: string;
  className?: string;
}) {
  const { value: selectValue, handleChange } = useSelectContext();
  return (
    <div
      onClick={() => handleChange(value, children)}
      className={`cursor-pointer rounded-sm p-1.5 transition-colors duration-200 hover:bg-accent-gray-100 ${selectValue === value ? "bg-accent-gray-100" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function useSelectContext() {
  const selectContext = useContext(SelectContext);
  if (!selectContext)
    throw new Error("Context must be used within the context provider");

  return selectContext;
}

Select.Option = Option;
Select.Content = Content;
