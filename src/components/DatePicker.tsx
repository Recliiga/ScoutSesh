import React from "react";
import { Calendar, CalendarProps } from "./ui/calendar";
import useClickOutside from "@/hooks/useClickOutside";

type DatePickerProps = CalendarProps & {
  toggleCalendar: () => void;
  closeCalendar: () => void;
  calendarOpen: boolean;
  pickerDisabled: boolean;
  pickerClassName?: string;
  children?: React.ReactNode;
};

export default function DatePicker({
  toggleCalendar,
  calendarOpen,
  closeCalendar,
  pickerDisabled,
  pickerClassName,
  children,
  ...calendarProps
}: DatePickerProps) {
  const [selectRef] = useClickOutside(closeCalendar);

  return (
    <div className={`relative w-fit ${pickerClassName}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => {
          if (pickerDisabled) {
            closeCalendar();
            return;
          }
          toggleCalendar();
        }}
        className={`rounded-md border px-4 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100 ${pickerDisabled ? "cursor-[default] bg-accent-gray-100" : ""}`}
      >
        {children || "Select Date"}
      </button>
      <div
        className={`absolute bottom-[calc(100%_+_4px)] left-0 z-10 overflow-hidden rounded-md border bg-white shadow ${calendarOpen ? "visible" : "invisible"}`}
      >
        <Calendar {...calendarProps} />
      </div>
    </div>
  );
}