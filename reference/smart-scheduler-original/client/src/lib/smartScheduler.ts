import { useEffect, useState } from "react";

const STORAGE_KEY = "smartScheduler.purchased";
const EVENT_NAME = "smartScheduler:purchased-changed";

const readValue = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const setSmartSchedulerPurchased = (value: boolean): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
  window.dispatchEvent(new Event(EVENT_NAME));
};

export const useSmartSchedulerPurchased = (): [boolean, (value: boolean) => void] => {
  const [purchased, setPurchasedState] = useState<boolean>(readValue);

  useEffect(() => {
    const handler = () => setPurchasedState(readValue());
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setPurchased = (value: boolean) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
    window.dispatchEvent(new Event(EVENT_NAME));
    setPurchasedState(value);
  };

  return [purchased, setPurchased];
};
