export type BookingType = {
  id: string;
  title: string;
  duration: string;
  description: string;
  dateTime: string;
};

export const bookingTypes: BookingType[] = [
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
