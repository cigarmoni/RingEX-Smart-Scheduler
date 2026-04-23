import { useEffect, useState } from "react";
import { useFlowParam } from "../lib/flows";
import { AppShell } from "../components/AppShell";
import { Button, Select, MenuItem, IconButton } from "@ringcentral/spring-ui";
import {
  SettingsMd,
  MessageMd,
  VideoMd,
  PhoneSettingsMd,
  VoicemailMd,
  AddFaxMd,
  NotificationsMd,
  SpeakerMd,
  CalendarMd,
  EditMd,
  AiStarsMd,
  LockMd,
  KeyboardMd,
  Xmd
} from "@ringcentral/spring-icon";
import {
  ExchangeIcon,
  GoogleIcon,
  AppleCalendarIcon,
  RingCentralIcon,
} from "../components/BrandIcons";

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

const categories: { key: CategoryKey; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "general", label: "General", Icon: SettingsMd as any },
  { key: "chat", label: "Chat", Icon: MessageMd as any },
  { key: "meetings", label: "Meetings", Icon: VideoMd as any },
  { key: "phone", label: "Phone", Icon: PhoneSettingsMd as any },
  { key: "voicemail", label: "Voicemail", Icon: VoicemailMd as any },
  { key: "text", label: "Text", Icon: MessageMd as any },
  { key: "fax", label: "Fax", Icon: AddFaxMd as any },
  { key: "notifications", label: "Notifications", Icon: NotificationsMd as any },
  { key: "audio", label: "Audio", Icon: SpeakerMd as any },
  { key: "calendars", label: "Calendars and contacts", Icon: CalendarMd as any },
  { key: "theme", label: "Theme", Icon: EditMd as any },
  { key: "ai", label: "AI", Icon: AiStarsMd as any },
  { key: "privacy", label: "Privacy", Icon: LockMd as any },
  { key: "shortcuts", label: "Keyboard shortcuts", Icon: KeyboardMd as any },
];

export const Settings = (): JSX.Element => {
  const [active, setActive] = useState<CategoryKey>("calendars");
  const [showPromo, setShowPromo] = useState(true);
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
        <aside className="flex w-full shrink-0 flex-col border-b border-neutral-b0-t20 bg-white md:w-[260px] md:border-b-0 md:border-r">
          <div className="px-4 pb-2 pt-4">
            <h2 className="text-title text-neutral-b2">
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
                      ? "bg-cobranding-b/8 text-cobranding-f"
                      : "text-neutral-b2 hover:bg-neutral-b2"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`settings-nav-${key}`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cobranding-f" : "text-neutral-b1"}`} />
                  <span className="text-subtitle-mini">
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right pane */}
        <section className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="border-b border-neutral-b0-t20 px-6 py-4">
            <h1
              className="text-title text-neutral-b2"
              data-testid="text-settings-title"
            >
              {activeCategory.label}
            </h1>
          </header>

          <div className="flex-1 px-4 py-6 sm:px-6">
            {active === "calendars" ? (
              <div className="mx-auto flex max-w-3xl flex-col gap-6">
                {showPromo && (
                  <div
                    className="relative flex gap-4 rounded-xl border border-neutral-b0-t20 bg-white p-5"
                    data-testid="card-promo"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cobranding-b/8">
                      <CalendarMd className="h-5 w-5 text-cobranding-f" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-subtitle text-neutral-b2">
                        Add online booking to your business
                      </h3>
                      <p className="mt-1 text-main-text text-neutral-b1">
                        Let customers book time with you based on your availability.
                        Create booking types, share your link, and manage appointments
                        in one place.
                      </p>
                      <button
                        type="button"
                        className="mt-2 text-subtitle text-cobranding-f hover:underline"
                        data-testid="link-find-out-more"
                      >
                        Find out more
                      </button>
                    </div>
                    <IconButton
                      symbol={Xmd as any}
                      variant="icon"
                      color="neutral"
                      size="small"
                      onClick={() => setShowPromo(false)}
                      className="absolute right-3 top-3"
                      aria-label="Dismiss"
                      data-testid="button-dismiss-promo"
                    />
                  </div>
                )}

                <Section title="Microsoft">
                  <Row
                    label="Microsoft 365 account connection"
                    description="natalie.brown@ringcentral.com connected"
                    action={
                      <button
                        type="button"
                        className="text-subtitle text-cobranding-f hover:underline"
                        data-testid="link-manage-microsoft365"
                      >
                        Manage
                      </button>
                    }
                  />
                  <div className="h-px bg-neutral-b0-t10" />
                  <Row
                    label="Exchange account connection"
                    description="Connect your Microsoft Exchange account to access your calendars and contacts"
                    action={
                      <Button
                        variant="outlined"
                        color="primary"
                        className="h-9 gap-2"
                        data-testid="button-connect-exchange"
                      >
                        <ExchangeIcon className="h-5 w-5" />
                        Connect Exchange
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
                        variant="outlined"
                        color="primary"
                        className="h-9 gap-2"
                        data-testid="button-connect-google"
                      >
                        <GoogleIcon className="h-5 w-5" />
                        Connect Google
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
                        variant="outlined"
                        color="primary"
                        className="h-9 gap-2"
                        data-testid="button-connect-apple"
                      >
                        <AppleCalendarIcon className="h-5 w-5" />
                        Connect with Calendar
                      </Button>
                    }
                  />
                </Section>

                <Section title="Contacts">
                  <Row
                    label="Default new contact to"
                    description="Set your default contact source for creating a new contact"
                    action={
                      <Select value={defaultContact} onChange={(e) => setDefaultContact(e.target.value as string)} className="w-[200px]">
                        <MenuItem value="ringcentral">
                          <span className="flex items-center gap-2">
                            <RingCentralIcon className="h-4 w-4" />
                            RingCentral
                          </span>
                        </MenuItem>
                        <MenuItem value="google">
                          <span className="flex items-center gap-2">
                            <GoogleIcon className="h-4 w-4" />
                            Google
                          </span>
                        </MenuItem>
                        <MenuItem value="microsoft">
                          <span className="flex items-center gap-2">
                            <ExchangeIcon className="h-4 w-4" />
                            Microsoft
                          </span>
                        </MenuItem>
                        <MenuItem value="apple">
                          <span className="flex items-center gap-2">
                            <AppleCalendarIcon className="h-4 w-4" />
                            Apple
                          </span>
                        </MenuItem>
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
                <activeCategory.Icon className="h-10 w-10 text-neutral-b1" />
                <h2 className="text-headline text-neutral-b2">
                  {activeCategory.label}
                </h2>
                <p className="text-main-text text-neutral-b1">
                  Settings for {activeCategory.label} will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
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
    <h2 className="mb-2 text-subtitle text-neutral-b1">
      {title}
    </h2>
    <div className="flex flex-col rounded-xl border border-neutral-b0-t20 bg-white">
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
        <div className="text-subtitle text-neutral-b2">
          {label}
        </div>
        {description && (
          <div className="mt-0.5 text-main-text text-neutral-b1">
            {description}
          </div>
        )}
      </div>
    </div>
    <div className="shrink-0">{action}</div>
  </div>
);
