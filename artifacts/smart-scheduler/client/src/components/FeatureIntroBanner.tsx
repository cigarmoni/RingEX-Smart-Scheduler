import type { ReactNode } from "react";
import { Xmd } from "@ringcentral/spring-icon";
import { cn } from "@/lib/utils";
import upsellChip from "@assets/upsell-chip-cropped.png";

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
        "relative flex w-full flex-col items-start gap-2 rounded-[20px] border border-solid border-transparent px-4 pb-4 pt-12",
        className,
      )}
      style={{
        background:
          "linear-gradient(var(--sui-colors-neutral-base,#fff), var(--sui-colors-neutral-base,#fff)) padding-box, " +
          "radial-gradient(120% 100% at 0% 110%, " +
          "rgba(var(--s-ai-accent-2), 0.7) 0%, " +
          "rgba(var(--s-ai-accent-2), 0) 75%) border-box, " +
          "radial-gradient(170% 140% at 100% 0%, " +
          "rgb(var(--s-ai-accent-0)) 0%, " +
          "rgb(var(--s-ai-accent-1)) 25%, " +
          "rgb(var(--s-ai-accent-2)) 60%, " +
          "rgba(var(--s-ai-accent-2), 0.55) 100%) border-box",
      }}
      data-testid={rest["data-testid"]}
    >
      {/* Add-on chip — pinned to the banner's top-left corner. Fixed-size
          window crops the PNG's drop-shadow bleed so the visible pill renders
          at its intended ~95x40 footprint. */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-10 w-[95px] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={upsellChip}
          alt={tagLabel}
          className="block select-none"
          style={{ width: "94.5px", height: "85.5px" }}
          draggable={false}
        />
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          className="absolute right-2 top-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b5)] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-current"
          data-testid={dismissTestId}
        >
          <Xmd />
        </button>
      )}

      <div className="flex w-full flex-col items-start gap-2">
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
