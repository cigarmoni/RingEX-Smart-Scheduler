import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { AppShell, type NavLabel } from "../components/AppShell";
import { AvaUpsellDialog } from "../components/AvaUpsellDialog";
import { Button } from "@ringcentral/spring-ui";
import { MeetingContent } from "./Meeting";
import { useFlowParam, useIsBookingPurchased } from "../lib/flows";
import { useSmartSchedulerPurchased } from "../lib/smartScheduler";
import {
  CalendarMd,
  ClockMd,
  AddCommentMd
} from "@ringcentral/spring-icon";

type Section = "Bookings" | "Meeting";

const tabs = ["Home", "Booking types", "Bookings", "Analytics"];

interface SmartSchedulerContentProps {
  showOnboarding: boolean;
  onStartSetup: () => void;
  onSkipSetup: () => void;
  isPostPurchase: boolean;
  onFindOutMore: () => void;
}

const SmartSchedulerContent = ({
  showOnboarding,
  onStartSetup,
  onSkipSetup,
  isPostPurchase,
  onFindOutMore,
}: SmartSchedulerContentProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-sui-4 p-sui-3 sm:p-sui-4">
      <header className="flex items-center justify-between">
        <h2 className="text-title text-sui-neutral-f03">
          Bookings
        </h2>
        <Button variant="text" color="neutral" className="h-auto w-6 p-0 min-w-0" aria-label="Settings" data-testid="button-settings">
          <img className="h-4 w-4" alt="Settings MD" src="/figmaAssets/settingsmd.svg" />
        </Button>
      </header>
      {showOnboarding ? (
        <div
          className="flex flex-1 rounded-xl border border-solid border-sui-neutral-line bg-white shadow-none"
          data-testid="card-onboarding"
        >
          <div className="flex flex-1 flex-col items-center justify-center gap-sui-8 p-sui-6 sm:gap-sui-10 sm:p-sui-8">
            <img
              className="h-24 w-24 sm:h-[120px] sm:w-[120px]"
              alt="Calendar MD"
              src="/figmaAssets/calendar-mark-orange.svg"
            />
            <h3
              className="w-full max-w-[600px] text-center text-headline text-sui-neutral-f03"
              data-testid="text-onboarding-headline"
            >
              Set up your bookings in 3 steps
            </h3>
            <ol className="flex w-full max-w-[520px] items-start justify-between gap-sui-3 sm:gap-sui-6">
              {[
                { Icon: CalendarMd, label: "Connect calendar", testId: "step-connect-calendar" },
                { Icon: ClockMd, label: "Set availability", testId: "step-set-availability" },
                { Icon: AddCommentMd, label: "Create new appointment type", testId: "step-create-appointment-type" },
              ].map(({ Icon, label, testId }) => (
                <li
                  key={label}
                  className="flex flex-1 flex-col items-center gap-sui-2 text-center"
                  data-testid={testId}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sui-cobranding-b01-t08 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-sui-cobranding-b01 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-subtitle-mini text-sui-neutral-f03">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex w-full flex-col items-center gap-sui-3">
              <Button
                color="primary"
                onClick={onStartSetup}
                className="h-9 px-sui-4 py-0 text-subtitle"
                data-testid="button-lets-get-started"
              >
                Let's get started
              </Button>
              <button
                type="button"
                onClick={onSkipSetup}
                className="text-subtitle text-sui-cobranding-b01 hover:underline"
                data-testid="link-explore-without-setup"
              >
                Explore without setup
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <nav className="flex flex-wrap items-center gap-sui-2 px-1 pt-0.5">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="outlined"
                color="neutral"
                onClick={() => setActiveTab(tab)}
                data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                className={`h-9 rounded-full px-sui-4 py-sui-2 text-subtitle-mini ${
                  activeTab === tab
                    ? "bg-sui-neutral-b02 border-sui-neutral-line"
                    : "bg-white hover:bg-sui-neutral-b02 border-sui-neutral-line"
                }`}
              >
                {tab}
              </Button>
            ))}
          </nav>
          {isPostPurchase ? (
            <div className="flex flex-1 rounded-xl border border-solid border-sui-neutral-line bg-white shadow-none">
              <div
                className="flex flex-1 flex-col items-center justify-center gap-sui-3 p-sui-6 text-center sm:p-sui-8"
                data-testid={`empty-${activeTab.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CalendarMd className="h-10 w-10 text-sui-neutral-f02" />
                <h3 className="text-headline text-sui-neutral-f03">
                  Nothing here yet
                </h3>
                <p className="max-w-[420px] text-main-text text-sui-neutral-f02">
                  Your {activeTab.toLowerCase()} will show up here once you finish setting up Bookings.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 rounded-xl border border-solid border-sui-neutral-line bg-white shadow-none">
              <div className="flex flex-1 flex-col items-center justify-center gap-sui-6 p-sui-6 sm:gap-sui-8 sm:p-sui-8">
                <img
                  className="h-24 w-24 sm:h-[120px] sm:w-[120px]"
                  alt="Calendar MD"
                  src="/figmaAssets/calendar-mark-orange.svg"
                />
                <div className="flex w-full max-w-[600px] flex-col items-center gap-sui-3 sm:gap-sui-4">
                  <h3 className="w-full text-center text-headline text-sui-neutral-f03">
                    Add online booking to your business
                  </h3>
                  <p className="w-full text-center text-title text-sui-neutral-f02">
                    Let customers book time with you based on your availability. Create
                    booking types, share your link, and manage appointments in one place.
                  </p>
                </div>
                <div className="flex w-full justify-center">
                  <Button
                    color="primary"
                    onClick={onFindOutMore}
                    className="h-9 px-sui-4 py-0 text-subtitle"
                    data-testid="button-find-out-more"
                  >
                    Find out more
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export const Bookings = (): JSX.Element => {
  const [section, setSection] = useState<Section>("Bookings");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("smartSchedulerOnboardingDismissed") === "1";
  });
  const flow = useFlowParam();
  const [, navigate] = useLocation();
  const isPurchased = useIsBookingPurchased();
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [, setSmartSchedulerPurchased] = useSmartSchedulerPurchased();

  const isPostPurchaseSetup = flow === "after-booking-initial-setup";

  useEffect(() => {
    if (flow === "after-meeting-share-link" || flow === "in-meeting" || flow === "post-meeting") {
      setSection("Meeting");
      setBannerDismissed(false);
    } else {
      setSection("Bookings");
    }
  }, [flow]);

  const dismissOnboarding = () => {
    setOnboardingDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("smartSchedulerOnboardingDismissed", "1");
    }
  };

  const handleNavigate = (href: string): boolean => {
    if (href === "/meeting") {
      setSection("Meeting");
      return true;
    }
    if (href === "/") {
      setSection("Bookings");
      return true;
    }
    return false;
  };

  const activeNav: NavLabel = section === "Meeting" ? "Meeting" : "More";

  let content: ReactNode;
  if (section === "Meeting") {
    content = (
      <MeetingContent
        bannerDismissed={bannerDismissed}
        onDismissBanner={() => setBannerDismissed(true)}
      />
    );
  } else {
    content = (
      <SmartSchedulerContent
        showOnboarding={isPostPurchaseSetup && !onboardingDismissed}
        isPostPurchase={isPurchased}
        onStartSetup={() => navigate("/settings?flow=settings-calendars")}
        onSkipSetup={dismissOnboarding}
        onFindOutMore={() => setUpsellOpen(true)}
      />
    );
  }

  return (
    <AppShell activeNav={activeNav as any} onNavigate={handleNavigate}>
      {content}
      <AvaUpsellDialog
        open={upsellOpen}
        onOpenChange={setUpsellOpen}
        onFreeTrial={() => {
          setSmartSchedulerPurchased(true);
          setUpsellOpen(false);
        }}
      />
    </AppShell>
  );
};
