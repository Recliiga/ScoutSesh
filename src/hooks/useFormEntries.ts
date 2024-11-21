import { useState } from "react";

export default function useFormEntries<T extends Record<string, unknown>>(
  initialFormEntries: T
) {
  const [formEntries, setFormEntries] = useState(initialFormEntries);

  function updateField<K extends keyof T>(fieldName: K, value: T[K]) {
    setFormEntries((prev) => {
      return { ...prev, [fieldName]: value };
    });
  }
  return { formEntries, updateField };
}
