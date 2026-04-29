import type { ReactNode } from "react";
import { Xmd } from "@ringcentral/spring-icon";
import { cn } from "@/lib/utils";
import bookingAddonChip from "@assets/booking-addon-chip.png";

export interface FeatureIntroBannerAction {
  label: string;
  onClick?: () => void;
  testId?: string;
}

export interface FeatureIntroBannerProps {
  title: ReactNode;
  description: ReactNode;
  action?: FeatureIntroBannerAction;
  actions?: ReactNode;
  tagLabel?: string;
  onDismiss?: () => void;
  dismissTestId?: string;
  dismissAriaLabel?: string;
  className?: string;
  "data-testid"?: string;
}

export const FeatureIntroBanner = ({
  title,
  description,
  action,
  actions,
  tagLabel = "Add-on",
  onDismiss,
  dismissTestId,
  dismissAriaLabel = "Dismiss",
  className,
  ...rest
}: FeatureIntroBannerProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-[20px] border border-solid border-[#ffadad] bg-[var(--sui-colors-neutral-base,white)] p-4",
        className,
      )}
      data-testid={rest["data-testid"]}
    >
      <div className="flex w-full flex-col items-start gap-2">
        {/* Header row: Add-on tag + close */}
        <div className="flex w-full items-center justify-between">
          <div className="relative h-10 w-[95px] shrink-0 overflow-hidden">
            <img
              src={bookingAddonChip}
              alt={tagLabel}
              className="block max-w-none object-none object-left-top"
              style={{ width: "189px", height: "171px" }}
              draggable={false}
            />
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label={dismissAriaLabel}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b5)] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-current"
              data-testid={dismissTestId}
            >
              <Xmd />
            </button>
          )}
        </div>

        {/* Body block */}
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center pb-2">
            <p className="flex-1 min-w-0 text-[15px] font-bold leading-[18px] text-[var(--sui-colors-neutral-b0)]">
              {title}
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full text-[14px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b0)]">
              {description}
            </div>
          </div>
          {action && (
            <div className="flex flex-col items-start pt-4">
              <button
                type="button"
                onClick={action.onClick}
                className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] [font-style:var(--subtitle-font-style)] text-[var(--sui-colors-neutral-b0)] underline decoration-solid hover:opacity-80"
                data-testid={action.testId}
              >
                {action.label}
              </button>
            </div>
          )}
          {actions && <div className="pt-4">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default FeatureIntroBanner;
