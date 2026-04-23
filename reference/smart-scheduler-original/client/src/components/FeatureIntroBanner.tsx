import { Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
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
  onDismiss,
  dismissTestId,
  dismissAriaLabel = "Dismiss",
  className,
  ...rest
}: FeatureIntroBannerProps) => {
  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-lg border-l-4 border-[#fe8624] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        onDismiss && "pr-10",
        className,
      )}
      data-testid={rest["data-testid"]}
    >
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#fe8624]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-black">{title}</p>
        <div className="mt-1 text-xs text-[#323439]">{description}</div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 text-xs font-semibold text-[#0040dd] hover:underline"
            data-testid={action.testId}
          >
            {action.label}
          </button>
        )}
        {actions && <div className="mt-3">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-[#56585e] hover:bg-[#f5f6f9]"
          data-testid={dismissTestId}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default FeatureIntroBanner;
