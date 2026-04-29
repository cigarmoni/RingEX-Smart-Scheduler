import type { ReactNode } from "react";
import { UpgradeMd, Xmd } from "@ringcentral/spring-icon";
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
        "relative flex w-full flex-col items-start gap-4 rounded-[20px] border border-solid border-[#ffadad] bg-[var(--sui-colors-neutral-base,white)] p-4 pt-9",
        className,
      )}
      data-testid={rest["data-testid"]}
    >
      {/* Add-on chip — pinned to the banner's top-left corner */}
      <div
        className="absolute left-2 top-2 flex h-7 items-center gap-1 rounded-[32px] border-2 border-solid bg-white pl-[6px] pr-[8px] py-[6px]"
        style={{ borderColor: "rgba(255,122,0,0.2)" }}
        aria-label={tagLabel}
      >
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[8.4px] text-white [&_svg]:h-3 [&_svg]:w-3 [&_svg]:fill-current"
          style={{
            backgroundImage:
              "linear-gradient(111.65deg, #ff670a 1.69%, #ff892c 31.18%, #ff9750 45.93%, #ff9876 50.85%, #ffa1b7 80.34%, #ffd1e3 100%)",
          }}
        >
          <UpgradeMd />
        </span>
        <span className="text-[12px] font-medium leading-[1.2] text-[var(--sui-colors-neutral-static-b0,black)] whitespace-nowrap">
          {tagLabel}
        </span>
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
