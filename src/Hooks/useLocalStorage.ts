import { parseISO } from "date-fns";
import { useEffect, useState } from "react";

function dateReviver (_keyL : string, value : unknown) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T}/.test(value)) return parseISO(value);
  return value;
}

export function useLocalStorage<T>(key: String, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const items = localStorage.getItem(key);
      if (items === null) return initialValue;

      return JSON.parse(items, dateReviver);
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch(error) {
      console.log(error);
    }
  }, [storedValue, key]); 

  return [storedValue, setStoredValue] as const;
}