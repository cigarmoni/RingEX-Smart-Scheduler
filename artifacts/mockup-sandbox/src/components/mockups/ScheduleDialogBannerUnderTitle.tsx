import { Calendar, ChevronDown, Link2, Settings, X } from "lucide-react";
import upsellChip from "@/assets/upsell-chip-cropped.png";

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
              Let invitees book themselves
            </p>
          </div>
          <div className="w-full text-[14px] font-normal leading-[18px] text-black">
            Turn on <strong className="font-bold">Bookings</strong> to share one
            link. Invitees see when you're free and grab a slot in seconds.
          </div>
          <div className="flex flex-col items-start pt-4">
            <button
              type="button"
              className="text-[14px] font-bold leading-[18px] text-black hover:underline"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleDialogBannerUnderTitle() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-black/30 p-8 font-sans antialiased">
      <div className="relative flex w-full max-w-[560px] flex-col gap-5 rounded-xl bg-white p-6 shadow-2xl">
        {/* Close button — top right, Spring UI pattern */}
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full text-[#323439] transition-colors hover:bg-[#f5f6f9]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <h2 className="text-[20px] font-semibold text-black">
          Schedule meeting
        </h2>

        {/* Banner — directly under the title */}
        <FeatureIntroBanner />

        {/* Subtitle */}
        <p className="text-[14px] leading-[20px] text-[#323439]">
          Schedule a meeting in your calendar or create a link to share
          instantly.
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-[14px] text-[#0040dd] hover:underline"
          >
            <Settings className="h-4 w-4" />
            Settings
            <ChevronDown className="h-3 w-3" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-[10px] border border-[#dddfe5] bg-white px-3 text-[14px] text-black hover:bg-[#f5f6f9]"
            >
              <Link2 className="h-4 w-4 text-[#323439]" />
              Create link
            </button>

            <div className="flex h-9 items-stretch overflow-hidden rounded-[10px] border border-[#dddfe5] bg-white">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 text-[14px] text-black hover:bg-[#f5f6f9]"
              >
                <Calendar className="h-4 w-4 text-[#0078d4]" />
                Use Outlook Calendar
              </button>
              <span className="w-px bg-[#dddfe5]" aria-hidden="true" />
              <button
                type="button"
                aria-label="Choose calendar provider"
                className="flex items-center justify-center px-2 text-[#323439] hover:bg-[#f5f6f9]"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
