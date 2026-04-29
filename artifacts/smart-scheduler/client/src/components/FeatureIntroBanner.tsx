import type { ReactNode } from "react";
import { Xmd } from "@ringcentral/spring-icon";
import { cn } from "@/lib/utils";

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
        "relative flex w-full flex-col items-start gap-2 rounded-[20px] border border-solid border-transparent px-4 pb-4 pt-14",
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
      {/* Add-on chip — Figma "Upsell Chip". Pill background and label are
          plain HTML/CSS so the text renders with native font hinting in
          Inter; only the icon glyph is an inline SVG. */}
      <div
        className="pointer-events-none absolute left-4 top-4 inline-flex h-7 w-auto items-center gap-1 whitespace-nowrap rounded-[14px] border-2 border-solid border-[#FF7A00]/20 pl-1.5 pr-2"
        style={{
          background:
            "linear-gradient(90deg, #FFF8EE 0%, #FFEAD0 55%, #FFC791 100%)",
        }}
        role="img"
        aria-label={tagLabel}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[8.4px]"
          style={{
            background:
              "linear-gradient(111.65deg, #FF670A 1.69%, #FF892C 31.18%, #FF9750 45.93%, #FF9876 50.85%, #FFA1B7 80.34%, #FFD1E3 100%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="#FFFFFF"
            aria-hidden="true"
          >
            <path d="M8.84961 11.7002H3.14941V10.9502H8.84961V11.7002Z" />
            <path d="M8 10.3496H4V9.59961H8V10.3496Z" />
            <path d="M11.0996 5.7002H8V7.34961C8 8.178 7.57838 8.84956 6.75 8.84961H5.25C4.47318 8.8496 4.0541 8.25954 4.00488 7.50293L4 7.5V5.7002H0.899414L6 0.299805L11.0996 5.7002Z" />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="text-[12px] font-semibold leading-none text-black"
        >
          Add-on
        </span>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          className="absolute right-4 top-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b5)] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-current"
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
