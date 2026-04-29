import { useEffect, useState } from "react";
import { useFlowParam } from "@/lib/flows";
import {
  Settings as SettingsIcon,
  MessageSquare,
  Video,
  Phone,
  Voicemail,
  MessageCircle,
  Printer,
  Bell,
  Volume2,
  Calendar,
  Palette,
  Sparkles,
  Lock,
  Keyboard,
  X,
} from "lucide-react";
import {
  ExchangeIcon,
  GoogleIcon,
  AppleCalendarIcon,
  RingCentralIcon,
} from "@/components/BrandIcons";
import { AppShell } from "@/components/AppShell";
import { FeatureIntroBanner } from "@/components/FeatureIntroBanner";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryKey =
  | "general"
  | "chat"
  | "meetings"
  | "phone"
  | "voicemail"
  | "text"
  | "fax"
  | "notifications"
  | "audio"
  | "calendars"
  | "theme"
  | "ai"
  | "privacy"
  | "shortcuts";

const categories: { key: CategoryKey; label: string; Icon: typeof SettingsIcon }[] = [
  { key: "general", label: "General", Icon: SettingsIcon },
  { key: "chat", label: "Chat", Icon: MessageSquare },
  { key: "meetings", label: "Meetings", Icon: Video },
  { key: "phone", label: "Phone", Icon: Phone },
  { key: "voicemail", label: "Voicemail", Icon: Voicemail },
  { key: "text", label: "Text", Icon: MessageCircle },
  { key: "fax", label: "Fax", Icon: Printer },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "audio", label: "Audio", Icon: Volume2 },
  { key: "calendars", label: "Calendars and contacts", Icon: Calendar },
  { key: "theme", label: "Theme", Icon: Palette },
  { key: "ai", label: "AI", Icon: Sparkles },
  { key: "privacy", label: "Privacy", Icon: Lock },
  { key: "shortcuts", label: "Keyboard shortcuts", Icon: Keyboard },
];

export const Settings = (): JSX.Element => {
  const [active, setActive] = useState<CategoryKey>("calendars");
  const [showPromo, setShowPromo] = useState(true);
  const [featureIntroOpen, setFeatureIntroOpen] = useState(false);
  const [defaultContact, setDefaultContact] = useState("ringcentral");
  const flow = useFlowParam();

  useEffect(() => {
    if (flow === "settings-calendars") {
      setActive("calendars");
      setShowPromo(true);
    }
  }, [flow]);

  const activeCategory = categories.find((c) => c.key === active)!;

  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left rail */}
        <aside className="flex w-full shrink-0 flex-col border-b border-[#dddfe5] bg-white md:w-[260px] md:border-b-0 md:border-r">
          <div className="px-4 pb-2 pt-4">
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
              Settings
            </h2>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 pb-4">
            {categories.map(({ key, label, Icon }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left ${
                    isActive
                      ? "bg-[#0040dd1a] text-[#0040dd]"
                      : "text-black hover:bg-[#f5f6f9]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`settings-nav-${key}`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#0040dd]" : "text-[#56585e]"}`} />
                  <span className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)]">
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right pane */}
        <section className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="border-b border-[#dddfe5] px-6 py-4">
            <h1
              className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]"
              data-testid="text-settings-title"
            >
              {activeCategory.label}
            </h1>
          </header>

          <div className="flex-1 px-4 py-6 sm:px-6">
            {active === "calendars" ? (
              <div className="mx-auto flex max-w-3xl flex-col gap-6">
                {showPromo && (
                  <FeatureIntroBanner
                    data-testid="card-promo"
                    title="Add online booking to your business"
                    description={
                      <>
                        Let customers book time with you based on your availability. Turn on{" "}
                        <strong className="font-bold">Bookings</strong> today.
                      </>
                    }
                    action={{
                      label: "Find out more",
                      onClick: () => setFeatureIntroOpen(true),
                      testId: "link-find-out-more",
                    }}
                    onDismiss={() => setShowPromo(false)}
                    dismissTestId="button-dismiss-promo"
                  />
                )}

                <Section title="Microsoft">
                  <Row
                    label="Microsoft 365 account connection"
                    description="natalie.brown@ringcentral.com connected"
                    action={
                      <button
                        type="button"
                        className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] text-[#0040dd] hover:underline"
                        data-testid="link-manage-microsoft365"
                      >
                        Manage
                      </button>
                    }
                  />
                  <Separator className="bg-[#dddfe5]" />
                  <Row
                    label="Exchange account connection"
                    description="Connect your Microsoft Exchange account to access your calendars and contacts"
                    action={
                      <Button
                        variant="outline"
                        className="h-9 gap-2 rounded-[10px] border-[#dddfe5] bg-white px-4 text-black hover:bg-[#f5f6f9]"
                        data-testid="button-connect-exchange"
                      >
                        <ExchangeIcon className="h-5 w-5" />
                        <span className="text-[#0040dd]">Connect Exchange</span>
                      </Button>
                    }
                  />
                </Section>

                <Section title="Google">
                  <Row
                    label="Account connection"
                    description="Connect your Google account to access your Drive, calendars, and contacts."
                    action={
                      <Button
                        variant="outline"
                        className="h-9 gap-2 rounded-[10px] border-[#dddfe5] bg-white px-4 text-black hover:bg-[#f5f6f9]"
                        data-testid="button-connect-google"
                      >
                        <GoogleIcon className="h-5 w-5" />
                        <span className="text-[#0040dd]">Connect Google</span>
                      </Button>
                    }
                  />
                </Section>

                <Section title="Apple">
                  <Row
                    label="Calendar"
                    description="Connect your Calendar account to access your calendars"
                    action={
                      <Button
                        variant="outline"
                        className="h-9 gap-2 rounded-[10px] border-[#dddfe5] bg-white px-4 text-black hover:bg-[#f5f6f9]"
                        data-testid="button-connect-apple"
                      >
                        <AppleCalendarIcon className="h-5 w-5" />
                        <span className="text-[#0040dd]">Connect with Calendar</span>
                      </Button>
                    }
                  />
                </Section>

                <Section title="Contacts">
                  <Row
                    label="Default  new contact to"
                    description="Set your default contact source for creating a new contact"
                    action={
                      <Select value={defaultContact} onValueChange={setDefaultContact}>
                        <SelectTrigger
                          className="h-9 w-[200px] rounded-[10px] border-[#dddfe5]"
                          data-testid="select-default-contact"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ringcentral">
                            <span className="flex items-center gap-2">
                              <RingCentralIcon className="h-4 w-4" />
                              RingCentral
                            </span>
                          </SelectItem>
                          <SelectItem value="google">
                            <span className="flex items-center gap-2">
                              <GoogleIcon className="h-4 w-4" />
                              Google
                            </span>
                          </SelectItem>
                          <SelectItem value="microsoft">
                            <span className="flex items-center gap-2">
                              <ExchangeIcon className="h-4 w-4" />
                              Microsoft
                            </span>
                          </SelectItem>
                          <SelectItem value="apple">
                            <span className="flex items-center gap-2">
                              <AppleCalendarIcon className="h-4 w-4" />
                              Apple
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    }
                  />
                </Section>
              </div>
            ) : (
              <div
                className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-2 py-16 text-center"
                data-testid={`placeholder-${active}`}
              >
                <activeCategory.Icon className="h-10 w-10 text-[#56585e]" />
                <h2 className="font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] text-black">
                  {activeCategory.label}
                </h2>
                <p className="font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]">
                  Settings for {activeCategory.label} will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      <AvaUpsellDialog
        open={featureIntroOpen}
        onOpenChange={setFeatureIntroOpen}
      />
    </AppShell>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <div className="flex flex-col gap-0">
    <h2 className="mb-2 font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-[#56585e] [font-style:var(--subtitle-font-style)]">
      {title}
    </h2>
    <div className="flex flex-col rounded-xl border border-[#dddfe5] bg-white">
      {children}
    </div>
  </div>
);

const Row = ({
  icon,
  label,
  description,
  action,
}: {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  action: React.ReactNode;
}): JSX.Element => (
  <div className="flex items-center justify-between gap-4 px-4 py-3">
    <div className="flex min-w-0 flex-1 items-center gap-3">
      {icon && <div className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</div>}
      <div className="min-w-0 flex-1">
        <div className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-black [font-style:var(--subtitle-font-style)]">
          {label}
        </div>
        {description && (
          <div className="mt-0.5 font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-[#56585e]">
            {description}
          </div>
        )}
      </div>
    </div>
    <div className="shrink-0">{action}</div>
  </div>
);
