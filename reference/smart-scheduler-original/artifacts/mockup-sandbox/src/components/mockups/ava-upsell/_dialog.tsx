import './_group.css';

interface DialogProps {
  heroSrc: string;
  heroAlt?: string;
  variantLabel?: string;
}

export function AvaUpsellDialogPreview({ heroSrc, heroAlt = "Online booking page preview", variantLabel }: DialogProps) {
  return (
    <div className="ava-upsell-root min-h-screen w-full flex items-center justify-center bg-[#f5f6f9] p-8">
      <div
        className="w-[800px] max-w-[95vw] gap-0 overflow-hidden rounded-[20px] border-none p-0 shadow-2xl bg-white relative"
      >
        {variantLabel && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {variantLabel}
          </div>
        )}
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex w-full flex-col gap-5 bg-white p-6 sm:p-8 md:w-[480px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex h-[15px] items-center justify-start gap-1">
                  <img className="h-3 w-3" alt="Bookings" src="/__mockup/figmaAssets/bookings-icon.svg" />
                  <p className="text-[12px] font-semibold uppercase leading-[15px] tracking-[0.2px] text-[#72757a]">
                    Bookings
                  </p>
                </div>
                <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.2px] text-black">
                  Unlock online booking for your business
                </h2>
              </div>

              <div className="relative inline-flex items-center gap-1 self-start overflow-hidden rounded-full border-2 border-solid border-[rgba(255,122,0,0.2)] px-3 py-2.5">
                <img
                  src="/__mockup/figmaAssets/upsell-chip-bg.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <img className="relative h-4 w-4" alt="" src="/__mockup/figmaAssets/upsell-chip-icon.svg" />
                <p className="relative whitespace-nowrap text-[12px] font-medium leading-[1.2] text-black">
                  $25/month/user*
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-[14px] font-semibold leading-5 tracking-[-0.1856px] text-black">
                  Let customers book time with you based on your availability 📅
                </p>
                <p className="text-[14px] leading-5 tracking-[-0.1856px] text-[#323439]">
                  Create booking pages and share links across RingCentral to reduce scheduling back-and-forth:
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="font-bold text-black">🗓️</span>{" "}
                    <span className="font-semibold text-black">Booking page:</span>{" "}
                    <span className="text-[#323439]">Customize your booking pages</span>
                  </li>
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="text-black">🔗</span>{" "}
                    <span className="font-semibold text-black">Easy sharing:</span>{" "}
                    <span className="text-[#323439]">Share via SMS, calls, meetings, and messages.</span>
                  </li>
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="text-black">🔔</span>{" "}
                    <span className="font-semibold text-black">Reminders:</span>{" "}
                    <span className="text-[#323439]">Send confirmations and follow-ups to help reduce no-shows.</span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="self-start text-[14px] font-medium leading-5 text-[#0040dd] hover:underline"
                >
                  Learn more
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="h-8 min-w-[56px] rounded-[10px] bg-[#0040dd] px-3 py-0 text-[14px] font-medium leading-5 text-white hover:bg-[#0037be]">
                Contact Sales
              </button>
              <button className="h-8 min-w-[56px] rounded-[10px] border border-solid border-[#f60] bg-white px-3 py-0 text-[14px] font-medium leading-5 text-[#f60] hover:bg-[#fff5ec]">
                Free trial
              </button>
            </div>
          </div>

          <div className="relative h-48 flex-1 md:h-auto min-h-[480px]">
            <img src={heroSrc} alt={heroAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
