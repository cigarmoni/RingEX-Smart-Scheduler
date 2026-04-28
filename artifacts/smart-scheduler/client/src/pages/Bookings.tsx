import { useEffect, useState, type ReactNode } from "react";
import { Calendar, Clock, ClipboardList, MapPin, MoreHorizontal, Star, Users } from "lucide-react";
import { AppShell, type NavLabel } from "@/components/AppShell";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MeetingContent } from "@/pages/Meeting";
import { useFlowParam, useIsBookingPurchased } from "@/lib/flows";
import { useSmartSchedulerPurchased } from "@/lib/smartScheduler";
import { useFavouriteBookingTypes } from "@/lib/bookingTypes";

type Section = "Bookings" | "Meeting";

const tabs = ["Home", "Booking types", "Bookings", "Analytics"];

interface SmartSchedulerContentProps {
  showOnboarding: boolean;
  showWizard: boolean;
  onStartSetup: () => void;
  onSkipSetup: () => void;
  onWizardClose: () => void;
  onWizardFinish: () => void;
  isPostPurchase: boolean;
  onFindOutMore: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HomeTabContent = (): JSX.Element => {
  const favourites = useFavouriteBookingTypes();
  return (
    <div className="flex flex-1 flex-col gap-5">
      <section className="flex flex-col gap-3">
        <h3 className="text-[14px] font-semibold text-black" data-testid="heading-upcoming-bookings">
          Upcoming bookings
        </h3>
        <Card className="rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-8">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 text-[#9e9fa4]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 9h18" />
                <path d="M8 3v4" />
                <path d="M16 3v4" />
              </svg>
            </div>
            <p className="text-[14px] text-[#56585e]" data-testid="text-no-upcoming-bookings">
              Your upcoming bookings will appear here
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-black" data-testid="heading-favorite-booking-types">
            Your favorite booking types
          </h3>
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-[10px] border border-solid border-[#0040dd] bg-white px-4 text-[14px] font-semibold text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
            data-testid="button-create-booking-type"
          >
            + Create booking type
          </Button>
        </div>
        {favourites.length === 0 ? (
          <Card className="rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="text-[14px] text-[#56585e]">
                Booking types you favourite will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
            {favourites.map((bt) => (
              <Card
                key={bt.id}
                className="rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none"
                data-testid={`card-favourite-${bt.id}`}
              >
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#cdebd6]">
                        <Users className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-semibold text-black">{bt.title}</span>
                        <span className="text-[12px] text-[#56585e]">
                          {bt.duration}, One-on-One
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-[#fe8624] text-[#fe8624]" />
                      <button
                        type="button"
                        aria-label="More options"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#56585e] hover:bg-[#f5f6f9]"
                        data-testid={`button-more-${bt.id}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-solid border-[#dddfe5] pt-3 text-[12px] text-[#56585e]">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="font-medium text-black">Location</span>
                    <span>·</span>
                    <span>Video meeting</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const SmartSchedulerContent = ({
  showOnboarding,
  showWizard,
  onStartSetup,
  onSkipSetup,
  onWizardClose,
  onWizardFinish,
  isPostPurchase,
  onFindOutMore,
  activeTab,
  setActiveTab,
}: SmartSchedulerContentProps): JSX.Element => {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 p-3 sm:p-4">
        <header className="flex items-center justify-between">
          <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
            Bookings
          </h2>
          <Button variant="ghost" className="h-auto w-6 p-0" aria-label="Settings" data-testid="button-settings">
            <img className="h-4 w-4" alt="Settings MD" src="/figmaAssets/settingsmd.svg" />
          </Button>
        </header>
        {showWizard ? (
          <OnboardingWizard onClose={onWizardClose} onFinish={onWizardFinish} />
        ) : showOnboarding ? (
          <Card
            className="flex flex-1 rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none"
            data-testid="card-onboarding"
          >
            <CardContent className="flex flex-1 flex-col items-center justify-center gap-8 p-6 sm:gap-10 sm:p-8">
              <img
                className="h-24 w-24 sm:h-[120px] sm:w-[120px]"
                alt="Calendar MD"
                src="/figmaAssets/calendar-mark-orange.svg"
              />
              <h3
                className="w-full max-w-[600px] text-center font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] tracking-[var(--headline-letter-spacing)] text-black [font-style:var(--headline-font-style)]"
                data-testid="text-onboarding-headline"
              >
                Set up your bookings in 3 steps
              </h3>
              <ol className="flex w-full max-w-[520px] items-start justify-between gap-3 sm:gap-6">
                {[
                  { Icon: Calendar, label: "Connect calendar", testId: "step-connect-calendar" },
                  { Icon: Clock, label: "Set availability", testId: "step-set-availability" },
                  { Icon: ClipboardList, label: "Create new appointment type", testId: "step-create-appointment-type" },
                ].map(({ Icon, label, testId }) => (
                  <li
                    key={label}
                    className="flex flex-1 flex-col items-center gap-2 text-center"
                    data-testid={testId}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0040dd1a] sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 text-[#0040dd] sm:h-6 sm:w-6" />
                    </div>
                    <span className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] text-black [font-style:var(--subtitle-mini-font-style)]">
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex w-full flex-col items-center gap-3">
                <Button
                  onClick={onStartSetup}
                  className="h-9 rounded-[10px] bg-[#0040dd] px-4 py-0 font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-white hover:bg-[#0037be] [font-style:var(--subtitle-font-style)]"
                  data-testid="button-lets-get-started"
                >
                  Let's get started
                </Button>
                <button
                  type="button"
                  onClick={onSkipSetup}
                  className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-[#0040dd] hover:underline [font-style:var(--subtitle-font-style)]"
                  data-testid="link-explore-without-setup"
                >
                  Explore without setup
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <nav className="flex flex-wrap items-center gap-2 px-1 pt-0.5">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant="outline"
                  onClick={() => setActiveTab(tab)}
                  data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`h-9 rounded-full border border-solid border-[#00000033] px-4 py-2 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] text-black [font-style:var(--subtitle-mini-font-style)] ${
                    activeTab === tab
                      ? "bg-[linear-gradient(0deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_100%),linear-gradient(0deg,rgba(221,223,229,1)_0%,rgba(221,223,229,1)_100%)]"
                      : "bg-white hover:bg-[#f5f6f9]"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </nav>
            {isPostPurchase ? (
              activeTab === "Home" ? (
                <HomeTabContent />
              ) : (
                <Card className="flex flex-1 rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none">
                  <CardContent
                    className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center sm:p-8"
                    data-testid={`empty-${activeTab.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Calendar className="h-10 w-10 text-[#56585e]" />
                    <h3 className="font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] text-black">
                      Nothing here yet
                    </h3>
                    <p className="max-w-[420px] font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]">
                      Your {activeTab.toLowerCase()} will show up here once you finish setting up Bookings.
                    </p>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card className="flex flex-1 rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none">
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-6 p-6 sm:gap-8 sm:p-8">
                  <img
                    className="h-24 w-24 sm:h-[120px] sm:w-[120px]"
                    alt="Calendar MD"
                    src="/figmaAssets/calendar-mark-orange.svg"
                  />
                  <div className="flex w-full max-w-[600px] flex-col items-center gap-3 sm:gap-4">
                    <h3 className="w-full text-center font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] tracking-[var(--headline-letter-spacing)] text-black [font-style:var(--headline-font-style)]">
                      Add online booking to your business
                    </h3>
                    <p className="w-full text-center font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[#323439] [font-style:var(--title-font-style)]">
                      Let customers book time with you based on your availability. Create
                      booking types, share your link, and manage appointments in one place.
                    </p>
                  </div>
                  <div className="flex w-full justify-center">
                    <Button
                      onClick={onFindOutMore}
                      className="h-9 rounded-[10px] bg-[#0040dd] px-4 py-0 font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-white hover:bg-[#0037be] [font-style:var(--subtitle-font-style)]"
                      data-testid="button-find-out-more"
                    >
                      Find out more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
    </section>
  );
};

export const Bookings = (): JSX.Element => {
  const [section, setSection] = useState<Section>("Bookings");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState<boolean>(false);
  const flow = useFlowParam();
  const isPurchased = useIsBookingPurchased();
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [, setSmartSchedulerPurchased] = useSmartSchedulerPurchased();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const isPostPurchaseSetup = flow === "after-booking-initial-setup";

  useEffect(() => {
    if (flow === "after-meeting-share-link" || flow === "in-meeting" || flow === "post-meeting") {
      setSection("Meeting");
      setBannerDismissed(false);
    } else {
      setSection("Bookings");
    }
    setOnboardingDismissed(false);
    setWizardOpen(false);
    setActiveTab("Home");
  }, [flow]);

  const dismissOnboarding = () => {
    setOnboardingDismissed(true);
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

  const handleWizardFinish = () => {
    dismissOnboarding();
    setActiveTab("Home");
    setWizardOpen(false);
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
        showOnboarding={isPurchased && !onboardingDismissed}
        showWizard={wizardOpen}
        isPostPurchase={isPurchased}
        onStartSetup={() => setWizardOpen(true)}
        onSkipSetup={dismissOnboarding}
        onWizardClose={() => setWizardOpen(false)}
        onWizardFinish={handleWizardFinish}
        onFindOutMore={() => setUpsellOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <AppShell activeNav={activeNav} onNavigate={handleNavigate}>
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
