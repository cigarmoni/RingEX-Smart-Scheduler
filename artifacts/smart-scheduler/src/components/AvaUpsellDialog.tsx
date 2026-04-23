import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@ringcentral/spring-ui";

interface AvaUpsellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFreeTrial?: () => void;
}

export const AvaUpsellDialog = ({ open, onOpenChange, onFreeTrial }: AvaUpsellDialogProps): JSX.Element => {
  return (
    <Dialog 
      open={open} 
      onClose={() => onOpenChange(false)}
      maxWidth="md"
      PaperProps={{
        className: "w-[800px] max-w-[95vw] gap-0 overflow-hidden rounded-[20px] p-0 sm:max-w-[800px]",
        "data-testid": "dialog-ava-upsell"
      }}
    >
      <div className="sr-only">
        <DialogTitle>Unlock online booking for your business</DialogTitle>
      </div>
      <DialogContent className="p-0">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex w-full flex-col gap-5 bg-white p-6 sm:p-8 md:w-[480px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex h-[15px] items-center justify-start gap-1">
                  <img
                    className="h-3 w-3"
                    alt="Bookings"
                    src="/figmaAssets/bookings-icon.svg"
                  />
                  <p className="text-[12px] font-semibold uppercase leading-[15px] tracking-[0.2px] text-neutral-b2">
                    Bookings
                  </p>
                </div>
                <h2
                  data-testid="text-upsell-title"
                  className="text-[20px] font-semibold leading-7 tracking-[-0.2px] text-neutral-b0"
                >
                  Unlock online booking for your business
                </h2>
              </div>

              <div
                className="relative inline-flex items-center gap-1 self-start overflow-hidden rounded-full border-2 border-solid border-[rgba(255,122,0,0.2)] px-3 py-2.5"
                data-testid="chip-upsell-price"
              >
                <img
                  src="/figmaAssets/upsell-chip-bg.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <img
                  className="relative h-4 w-4"
                  alt=""
                  src="/figmaAssets/upsell-chip-icon.svg"
                />
                <p className="relative whitespace-nowrap text-[12px] font-medium leading-[1.2] text-neutral-b0">
                  $25/month/user*
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-[14px] font-semibold leading-5 tracking-[-0.1856px] text-neutral-b0">
                  Let customers book time with you based on your availability 📅
                </p>
                <p className="text-[14px] leading-5 tracking-[-0.1856px] text-neutral-b1">
                  Create booking pages and share links across RingCentral to
                  reduce scheduling back-and-forth:
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="font-bold text-neutral-b0">🗓️</span>{" "}
                    <span className="font-semibold text-neutral-b0">Booking page:</span>{" "}
                    <span className="text-neutral-b1">Customize your booking pages</span>
                  </li>
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="text-neutral-b0">🔗</span>{" "}
                    <span className="font-semibold text-neutral-b0">Easy sharing:</span>{" "}
                    <span className="text-neutral-b1">Share via SMS, calls, meetings, and messages.</span>
                  </li>
                  <li className="text-[14px] leading-5 tracking-[-0.1856px]">
                    <span className="text-neutral-b0">🔔</span>{" "}
                    <span className="font-semibold text-neutral-b0">Reminders:</span>{" "}
                    <span className="text-neutral-b1">Send confirmations and follow-ups to help reduce no-shows.</span>
                  </li>
                </ul>
                <button
                  type="button"
                  data-testid="button-upsell-learn-more"
                  className="self-start text-[14px] font-medium leading-5 text-cobranding-f hover:underline"
                >
                  Learn more
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                data-testid="button-upsell-contact-sales"
                className="h-8 min-w-[56px] rounded-[10px] px-3 py-0 text-[14px] font-medium leading-5"
              >
                Contact Sales
              </Button>
              <Button
                variant="outlined"
                data-testid="button-upsell-free-trial"
                onClick={() => {
                  onFreeTrial?.();
                  onOpenChange(false);
                }}
                className="h-8 min-w-[56px] rounded-[10px] !border-[#f60] !text-[#f60] bg-white px-3 py-0 text-[14px] font-medium leading-5 hover:bg-[#fff5ec]"
              >
                Free trial
              </Button>
            </div>
          </div>

          <div className="relative h-48 flex-1 md:h-auto">
            <img
              src="/figmaAssets/booking-hero-calendar.png"
              alt="Small business owner reviewing a fully booked weekly calendar on a tablet"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
