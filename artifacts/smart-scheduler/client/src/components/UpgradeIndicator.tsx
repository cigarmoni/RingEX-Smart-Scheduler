import { UpgradeMd } from "@ringcentral/spring-icon";
import { cn } from "@/lib/utils";

const UPGRADE_GRADIENT =
  "linear-gradient(111.65deg, #FF670A 1.69%, #FF892C 31.18%, #FF9750 45.93%, #FF9876 50.85%, #FFA1B7 80.34%, #FFD1E3 100%)";

const PILL_SIZE = 16;
const ICON_SIZE_XS = 12;

export interface UpgradeIndicatorProps {
  className?: string;
  ariaLabel?: string;
  testId?: string;
}

export const UpgradeIndicator = ({
  className,
  ariaLabel = "Upgrade required",
  testId = "upgrade-indicator",
}: UpgradeIndicatorProps) => {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-white",
        className,
      )}
      style={{
        width: PILL_SIZE,
        height: PILL_SIZE,
        backgroundImage: UPGRADE_GRADIENT,
      }}
    >
      <UpgradeMd
        width={ICON_SIZE_XS}
        height={ICON_SIZE_XS}
        style={{ width: ICON_SIZE_XS, height: ICON_SIZE_XS }}
        fill="currentColor"
        aria-hidden="true"
      />
    </span>
  );
};

export default UpgradeIndicator;
