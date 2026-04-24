import type { ReactNode } from "react";
import { UpgradeMd, Xmd } from "@ringcentral/spring-icon";
import { Icon } from "@ringcentral/spring-ui";
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
        "relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-[20px] border border-solid border-[#ffadad] bg-[var(--sui-colors-neutral-base,white)] p-4",
        className,
      )}
      data-testid={rest["data-testid"]}
    >
      <div className="flex w-full flex-col items-start gap-2">
        {/* Header row: Add-on tag + close */}
        <div className="flex w-full items-center justify-between">
          <div className="relative flex h-5 min-w-[24px] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[4px] pl-1 pr-1.5">
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(254, 134, 36, 0.1)" }}
            />
            <div className="relative flex shrink-0 items-center gap-1 pb-px">
              <Icon as={UpgradeMd} size={12} color="#cc5200" />
              <span className="text-[12px] font-semibold leading-[17px] text-[#cc5200] whitespace-nowrap">
                {tagLabel}
              </span>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label={dismissAriaLabel}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b5)]"
              data-testid={dismissTestId}
            >
              <Icon as={Xmd} size={16} />
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
                className="text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] underline decoration-solid hover:opacity-80"
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
