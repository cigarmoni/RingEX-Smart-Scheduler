import { useSyncExternalStore } from "react";

export type BookingType = {
  id: string;
  title: string;
  duration: string;
  description: string;
  dateTime: string;
};

const SEED: BookingType[] = [
  {
    id: "ux-30",
    title: "UX Design — 30 min",
    duration: "30 min",
    description: "Walk through the latest UX explorations and gather feedback.",
    dateTime: "Thu, Mar 9, 09:00 – 09:30",
  },
  {
    id: "intro-15",
    title: "Intro call — 15 min",
    duration: "15 min",
    description: "A quick intro to align on goals and next steps.",
    dateTime: "Fri, Mar 10, 11:00 – 11:15",
  },
  {
    id: "office-45",
    title: "Office hours — 45 min",
    duration: "45 min",
    description: "Open office hours — bring any topic you'd like to discuss.",
    dateTime: "Mon, Mar 13, 14:00 – 14:45",
  },
];

let _list: BookingType[] = [...SEED];
let _favs = new Set<string>();
const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((l) => l());
};

export function getBookingTypes(): BookingType[] {
  return _list;
}

export function getFavouriteIds(): Set<string> {
  return _favs;
}

export function addBookingType(bt: BookingType): void {
  _list = [..._list, bt];
  emit();
}

export function markFavourite(id: string): void {
  if (!_favs.has(id)) {
    _favs = new Set(_favs);
    _favs.add(id);
    emit();
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const subscribeBookingTypes = subscribe;

export function useBookingTypes(): BookingType[] {
  return useSyncExternalStore(subscribe, getBookingTypes, getBookingTypes);
}

export function useFavouriteBookingTypes(): BookingType[] {
  const list = useBookingTypes();
  const favs = useSyncExternalStore(subscribe, getFavouriteIds, getFavouriteIds);
  return list.filter((bt) => favs.has(bt.id));
}

export const bookingTypes: BookingType[] = new Proxy([] as BookingType[], {
  get(_target, prop, receiver) {
    return Reflect.get(_list, prop, receiver);
  },
  has(_target, prop) {
    return Reflect.has(_list, prop);
  },
  ownKeys() {
    return Reflect.ownKeys(_list);
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(_list, prop);
  },
}) as BookingType[];
