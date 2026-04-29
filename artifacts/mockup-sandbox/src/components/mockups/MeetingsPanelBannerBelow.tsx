import {
  Calendar,
  ChevronDown,
  Sparkles,
  Upload,
  Video,
  X,
} from "lucide-react";
import upsellChip from "@/assets/upsell-chip-cropped.png";

const TABS = ["UPCOMING", "PAST", "NOTES", "RECORDINGS"] as const;

const MEETINGS = [
  {
    id: "1",
    time: "10:00 AM\n11:00 AM",
    title: "Q2 Design Roadmap",
    link: "https://v.ringcentral.com/join/3849279209",
    avatars: ["#a78bfa", "#fb7185", "#fbbf24", "#34d399"],
    extra: "+24",
    highlight: true,
  },
  {
    id: "2",
    time: "Now until\n11:00 AM",
    title: "1:1 Bobcat <> Eddie",
    link: "https://v.ringcentral.com/join/3849279209",
    avatars: ["#a78bfa", "#fb7185"],
    extra: null,
    highlight: false,
    nowBadge: true,
  },
] as const;

function FeatureIntroBanner() {
  return (
    <div
      className="relative flex w-full flex-col items-start gap-2 rounded-[20px] border border-solid border-transparent px-4 pb-4 pt-14"
      style={{
        background:
          "linear-gradient(#ffffff, #ffffff) padding-box, " +
          "radial-gradient(120% 100% at 0% 110%, " +
          "rgba(255, 122, 0, 0.7) 0%, " +
          "rgba(255, 122, 0, 0) 75%) border-box, " +
          "radial-gradient(170% 140% at 100% 0%, " +
          "rgb(138, 80, 255) 0%, " +
          "rgb(255, 77, 204) 25%, " +
          "rgb(255, 122, 0) 60%, " +
          "rgba(255, 122, 0, 0.55) 100%) border-box",
      }}
    >
      <div
        className="pointer-events-none absolute left-4 top-4 h-7 w-[73px] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={upsellChip}
          alt="Add-on"
          className="block max-w-none select-none"
          style={{ marginLeft: "-16px", marginTop: "-16px" }}
          draggable={false}
        />
      </div>

      <button
        type="button"
        aria-label="Dismiss"
        className="absolute right-4 top-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#323439] hover:bg-[#f5f6f9]"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center pb-2">
            <p className="flex-1 min-w-0 text-[15px] font-bold leading-[18px] text-black">
              Add online booking to your business
            </p>
          </div>
          <div className="w-full text-[14px] font-normal leading-[18px] text-black">
            Let customers book time with you based on your availability. Turn on{" "}
            <strong className="font-bold">Bookings</strong> today.
          </div>
          <div className="flex flex-col items-start pt-4">
            <button
              type="button"
              className="text-[14px] font-bold leading-[18px] text-black hover:underline"
            >
              Find out more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingRow({ meeting }: { meeting: (typeof MEETINGS)[number] }) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 ${
        meeting.highlight ? "bg-[#eef2ff]" : "bg-white"
      }`}
    >
      <div className="flex w-[68px] shrink-0 flex-col">
        {meeting.nowBadge ? (
          <span className="mb-1 inline-flex w-fit items-center rounded bg-[#dcfce7] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
            {meeting.time.split("\n")[0]}
          </span>
        ) : (
          <span className="text-[12px] leading-[16px] text-[#323439]">
            {meeting.time.split("\n")[0]}
          </span>
        )}
        <span className="text-[12px] leading-[16px] text-[#323439]">
          {meeting.time.split("\n")[1]}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-black">
          {meeting.title}
        </div>
        <div className="truncate text-[12px] text-[#0040dd]">
          {meeting.link}
        </div>
        <div className="mt-1.5 flex items-center -space-x-1.5">
          {meeting.avatars.map((bg, i) => (
            <span
              key={i}
              className="inline-block h-5 w-5 rounded-full border border-white"
              style={{ background: bg }}
            />
          ))}
          {meeting.extra && (
            <span className="ml-2 text-[11px] text-[#323439]">
              {meeting.extra}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MeetingsPanelBannerBelow() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#f5f6f9] p-6 font-sans antialiased">
      <div className="flex w-[380px] flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-[20px] font-bold text-black">Meetings</h1>
          <div className="flex items-center gap-3 text-[13px] text-[#323439]">
            <span className="inline-flex items-center gap-1">
              <span className="text-[#0040dd]">↳</span>
              Join
            </span>
            <span className="text-[#323439]">✎</span>
            <span className="text-[#323439]">⚙</span>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex border-b border-[#dddfe5] px-2">
          {TABS.map((tab, i) => {
            const isActive = i === 0;
            return (
              <button
                key={tab}
                type="button"
                className={`relative flex items-center gap-1 px-3 py-3 text-[11px] font-bold tracking-wider ${
                  isActive ? "text-[#0040dd]" : "text-[#323439]"
                }`}
              >
                {tab === "NOTES" && <Sparkles className="h-3 w-3" />}
                {tab}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-px h-[2px] bg-[#0040dd]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action buttons — now FIRST */}
        <div className="flex items-start justify-around gap-3 px-4 pt-4 pb-2">
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0040dd] text-white shadow-sm hover:bg-[#0037be]"
            >
              <Video className="h-6 w-6" />
            </button>
            <span className="flex items-center gap-0.5 text-[12px] text-black">
              Start
              <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-[#dddfe5] bg-white text-[#323439] hover:bg-[#f5f6f9]"
            >
              <Calendar className="h-6 w-6" />
            </button>
            <span className="text-[12px] text-black">Schedule</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-[#dddfe5] bg-white text-[#323439] hover:bg-[#f5f6f9]"
            >
              <Upload className="h-6 w-6" />
            </button>
            <span className="text-[12px] text-black">Share in room</span>
          </div>
        </div>

        {/* Promo banner — now BELOW the buttons */}
        <div className="px-4 pt-4">
          <FeatureIntroBanner />
        </div>

        {/* Today header */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-[14px] font-bold text-black">Today</h3>
        </div>

        {/* Meeting list */}
        <div className="flex flex-col">
          {MEETINGS.map((m, i) => (
            <div key={m.id}>
              {i > 0 && <div className="h-px bg-[#dddfe5]" />}
              <MeetingRow meeting={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
