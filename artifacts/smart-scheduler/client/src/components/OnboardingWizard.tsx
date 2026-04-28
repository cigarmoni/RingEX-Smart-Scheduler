import { useMemo, useState } from "react";
import { Check, ChevronDown, Clock, Copy as CopyIcon, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleIcon } from "@/components/BrandIcons";
import { addBookingType, markFavourite, type BookingType } from "@/lib/bookingTypes";
import { useToast } from "@/hooks/use-toast";

type Provider = "google" | "outlook";

interface OnboardingWizardProps {
  onClose: () => void;
  onFinish: () => void;
}

const TIME_OPTIONS = (() => {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const ampm = h < 12 ? "AM" : "PM";
    out.push(`${String(hour12).padStart(2, "0")}:00 ${ampm}`);
    out.push(`${String(hour12).padStart(2, "0")}:30 ${ampm}`);
  }
  return out;
})();

const DAYS: { key: string; label: string; defaultOn: boolean }[] = [
  { key: "sun", label: "Sun", defaultOn: false },
  { key: "mon", label: "Mon", defaultOn: true },
  { key: "tue", label: "Tue", defaultOn: true },
  { key: "wed", label: "Wed", defaultOn: true },
  { key: "thu", label: "Thu", defaultOn: true },
  { key: "fri", label: "Fri", defaultOn: true },
  { key: "sat", label: "Sat", defaultOn: false },
];

const OutlookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect width="32" height="32" rx="3" fill="#0072c6" />
    <path
      d="M14.5 9 L25 11.5 L25 22 L14.5 24.5 Z"
      fill="#fff"
    />
    <rect x="16.5" y="13" width="6.5" height="2" fill="#0072c6" />
    <rect x="16.5" y="16" width="6.5" height="2" fill="#0072c6" />
    <rect x="16.5" y="19" width="6.5" height="2" fill="#0072c6" />
    <circle cx="9.5" cy="16.75" r="4.5" fill="#fff" />
    <text
      x="9.5"
      y="19.3"
      textAnchor="middle"
      fontSize="6.5"
      fontWeight="700"
      fill="#0072c6"
      fontFamily="Arial, sans-serif"
    >
      O
    </text>
  </svg>
);

interface StepperProps {
  current: 1 | 2 | 3 | 4;
}

const Stepper = ({ current }: StepperProps): JSX.Element => {
  const labels = ["Connect calendar", "Set availability", "Create booking type"];
  const stepStatus = (n: 1 | 2 | 3) => {
    if (n === 1) return current >= 2 ? "done" : "active";
    if (n === 2) {
      if (current >= 3) return "done";
      if (current === 2) return "active";
      return "upcoming";
    }
    if (current >= 4) return "done";
    if (current === 3) return "active";
    return "upcoming";
  };
  return (
    <div className="mx-auto flex w-full max-w-[520px] items-start justify-between">
      {[1, 2, 3].map((n) => {
        const status = stepStatus(n as 1 | 2 | 3);
        const isFilled = status !== "upcoming";
        return (
          <div key={n} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={`mr-1 h-px flex-1 ${n > 1 ? "bg-[#0000001a]" : "bg-transparent"}`}
                aria-hidden="true"
              />
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold ${
                  isFilled ? "bg-[#0040dd] text-white" : "bg-[#9e9fa4] text-white"
                }`}
                data-testid={`stepper-step-${n}`}
              >
                {status === "done" ? <Check className="h-4 w-4" /> : n}
              </div>
              <div
                className={`ml-1 h-px flex-1 ${n < 3 ? "bg-[#0000001a]" : "bg-transparent"}`}
                aria-hidden="true"
              />
            </div>
            <div className="mt-2 max-w-[120px] px-1 text-center text-[12px] font-medium leading-4 text-black">
              {labels[n - 1]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface CardChromeProps {
  step: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSkip: () => void;
}

const CardChrome = ({ step, title, subtitle, children, onSkip }: CardChromeProps): JSX.Element => (
  <div className="flex w-full flex-col items-center gap-5">
    <div className="flex w-full flex-col items-center gap-2">
      <h2
        className="text-center text-[24px] font-semibold leading-[32px] text-black"
        data-testid="wizard-title"
      >
        {title}
      </h2>
      <p className="text-center text-[15px] leading-5 text-[#323439]">{subtitle}</p>
    </div>
    <Stepper current={step} />
    <div className="w-full rounded-xl border border-solid border-[#dddfe5] bg-white p-4 sm:p-6">
      {children}
    </div>
    <button
      type="button"
      onClick={onSkip}
      className="text-[14px] text-[#0040dd] hover:underline"
      data-testid="link-skip-for-now"
    >
      Skip for now
    </button>
  </div>
);

const FooterRow = ({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}): JSX.Element => (
  <div className="mt-6 flex justify-end gap-2">
    <Button
      type="button"
      variant="outline"
      onClick={onBack}
      className="h-9 rounded-[10px] border border-solid border-[#0040dd] bg-white px-4 text-[14px] font-semibold text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
      data-testid="button-wizard-back"
    >
      Back
    </Button>
    <Button
      type="button"
      onClick={onNext}
      disabled={nextDisabled}
      className="h-9 rounded-[10px] bg-[#0040dd] px-4 text-[14px] font-semibold text-white hover:bg-[#0037be]"
      data-testid="button-wizard-next"
    >
      {nextLabel}
    </Button>
  </div>
);

const ProviderRow = ({
  icon,
  label,
  onConnect,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  onConnect: () => void;
  testId: string;
}): JSX.Element => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center">{icon}</div>
      <span className="text-[14px] text-black">{label}</span>
    </div>
    <Button
      type="button"
      variant="outline"
      onClick={onConnect}
      className="h-9 rounded-[10px] border border-solid border-[#0040dd] bg-white px-4 text-[14px] font-semibold text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
      data-testid={testId}
    >
      Connect
    </Button>
  </div>
);

const ProviderTriggerLabel = ({ provider }: { provider: Provider }): JSX.Element => (
  <div className="flex items-center gap-2">
    {provider === "google" ? (
      <GoogleIcon className="h-4 w-4" />
    ) : (
      <OutlookIcon className="h-4 w-4" />
    )}
    <span>{provider === "google" ? "Google calendar" : "Microsoft Outlook calendar"}</span>
  </div>
);

interface AvailabilityRow {
  on: boolean;
  from: string;
  to: string;
}

const formatDuration = (hours: number, minutes: number): string => {
  if (hours === 0 && minutes === 0) return "0 min";
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
};

export const OnboardingWizard = ({ onClose, onFinish }: OnboardingWizardProps): JSX.Element => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [provider, setProvider] = useState<Provider>("google");
  const [calendarSwitches, setCalendarSwitches] = useState({
    work: true,
    personal: true,
    cn: true,
    us: true,
  });
  const [availability, setAvailability] = useState<Record<string, AvailabilityRow>>(() => {
    const init: Record<string, AvailabilityRow> = {};
    DAYS.forEach((d) => {
      init[d.key] = { on: d.defaultOn, from: "09:00 AM", to: "06:00 PM" };
    });
    return init;
  });
  const [timezone, setTimezone] = useState("pt");
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("rcv");
  const [createdSlug, setCreatedSlug] = useState("");

  const effectiveTitle = useMemo(() => title.trim() || "Sophia's appointment", [title]);
  const slug = useMemo(
    () =>
      effectiveTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
    [effectiveTitle]
  );

  const handleCreate = () => {
    const id = (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `bt-${Date.now()}`) as string;
    const newType: BookingType = {
      id,
      title: effectiveTitle,
      duration: formatDuration(parseInt(hours, 10), parseInt(minutes, 10)),
      description: description.trim(),
      dateTime: "",
    };
    addBookingType(newType);
    markFavourite(id);
    setCreatedSlug(slug);
    setStep(5);
  };

  const handleFinishToHome = () => {
    onFinish();
  };

  const handleCopyLink = async () => {
    const link = `https://ringcentral.com/book/${createdSlug || slug}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      }
      toast({ title: "Link copied" });
    } catch {
      toast({ title: "Link copied" });
    }
  };

  const stepTitle = step === 3
    ? "Set your availability"
    : step === 4
      ? "Create your first appointment type"
      : "Connect your calendar";
  const stepSubtitle = step === 3
    ? "Define ranges of time when you are available. You can customise all of this later in the availability page."
    : step === 4
      ? "Define your first appointment type detail, set duration."
      : step === 2
        ? "Sync your calendar so we can avoid double bookings."
        : "Connect a calendar so we can keep your availability in sync.";

  const handleClose = () => {
    if (step === 5) {
      onFinish();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col overflow-y-auto rounded-xl p-6 sm:p-8"
      data-testid="onboarding-wizard"
    >
      <div className="mx-auto flex w-full max-w-[760px] flex-col">
        {step === 1 && (
          <CardChrome step={1} title={stepTitle} subtitle={stepSubtitle} onSkip={onClose}>
            <div className="flex flex-col">
              <ProviderRow
                icon={<GoogleIcon className="h-4 w-4" />}
                label="Google calendar"
                onConnect={() => {
                  setProvider("google");
                  setStep(2);
                }}
                testId="button-connect-google"
              />
              <div className="border-b border-solid border-[#dddfe5]" />
              <ProviderRow
                icon={<OutlookIcon className="h-4 w-4" />}
                label="Microsoft Outlook calendar"
                onConnect={() => {
                  setProvider("outlook");
                  setStep(2);
                }}
                testId="button-connect-outlook"
              />
            </div>
          </CardChrome>
        )}

        {step === 2 && (
          <CardChrome step={1} title={stepTitle} subtitle={stepSubtitle} onSkip={onClose}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-[#323439]">Primary calendar</span>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-solid border-[#dddfe5] bg-white px-3 text-[14px] text-black"
                  data-testid="trigger-primary-calendar"
                  disabled
                >
                  <ProviderTriggerLabel provider={provider} />
                  <ChevronDown className="h-4 w-4 text-[#6e7079]" />
                </button>
              </div>
              <div className="border-t border-solid border-[#dddfe5]" />
              <p className="text-[12px] text-[#6e7079]">
                Choose which calendars we should check to help avoid double bookings.
              </p>
              {[
                { key: "work" as const, label: "Work calendar" },
                { key: "personal" as const, label: "Personal calendar" },
                { key: "cn" as const, label: "China national holidays" },
                { key: "us" as const, label: "US national holidays" },
              ].map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between py-2"
                  data-testid={`row-calendar-${row.key}`}
                >
                  <span className="text-[14px] text-black">{row.label}</span>
                  <Switch
                    checked={calendarSwitches[row.key]}
                    onCheckedChange={(v) =>
                      setCalendarSwitches((prev) => ({ ...prev, [row.key]: v }))
                    }
                    className="data-[state=checked]:bg-[#0040dd]"
                    data-testid={`switch-calendar-${row.key}`}
                  />
                </div>
              ))}
            </div>
            <FooterRow onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </CardChrome>
        )}

        {step === 3 && (
          <CardChrome step={3} title={stepTitle} subtitle={stepSubtitle} onSkip={onClose}>
            <div className="flex flex-col gap-1">
              {DAYS.map((d) => {
                const row = availability[d.key];
                return (
                  <div
                    key={d.key}
                    className="flex items-center gap-3 py-2"
                    data-testid={`row-availability-${d.key}`}
                  >
                    <Switch
                      checked={row.on}
                      onCheckedChange={(v) =>
                        setAvailability((prev) => ({ ...prev, [d.key]: { ...prev[d.key], on: v } }))
                      }
                      className="data-[state=checked]:bg-[#0040dd]"
                      data-testid={`switch-day-${d.key}`}
                    />
                    <span
                      className={`w-10 text-[14px] font-medium ${
                        row.on ? "text-black" : "text-[#9e9fa4]"
                      }`}
                    >
                      {d.label}
                    </span>
                    {row.on ? (
                      <div className="flex flex-1 items-center gap-2">
                        <Select
                          value={row.from}
                          onValueChange={(v) =>
                            setAvailability((prev) => ({ ...prev, [d.key]: { ...prev[d.key], from: v } }))
                          }
                        >
                          <SelectTrigger className="h-9 w-[120px] rounded-md border border-solid border-[#dddfe5] bg-white text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[240px]">
                            {TIME_OPTIONS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-[13px] text-[#6e7079]">–</span>
                        <Select
                          value={row.to}
                          onValueChange={(v) =>
                            setAvailability((prev) => ({ ...prev, [d.key]: { ...prev[d.key], to: v } }))
                          }
                        >
                          <SelectTrigger className="h-9 w-[120px] rounded-md border border-solid border-[#dddfe5] bg-white text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[240px]">
                            {TIME_OPTIONS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <button
                          type="button"
                          aria-label={`Add slot for ${d.label}`}
                          className="ml-1 flex h-8 w-8 items-center justify-center rounded-md text-[#56585e] hover:bg-[#f5f6f9]"
                          data-testid={`button-add-slot-${d.key}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Duplicate ${d.label}`}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#56585e] hover:bg-[#f5f6f9]"
                          data-testid={`button-duplicate-${d.key}`}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#9e9fa4]">Unavailable</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-solid border-[#dddfe5] pt-4">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-[#323439]">
                  Timezone <span className="text-[#fa3d3d]">*</span>
                </span>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger
                    className="h-10 w-full rounded-md border border-solid border-[#dddfe5] bg-white text-[14px] text-black"
                    data-testid="select-timezone"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#56585e]" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">(GMT-08:00) Pacific Time (US &amp; Canada)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FooterRow onBack={() => setStep(2)} onNext={() => setStep(4)} />
          </CardChrome>
        )}

        {step === 4 && (
          <CardChrome step={4} title={stepTitle} subtitle={stepSubtitle} onSkip={onClose}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#323439]" htmlFor="apt-title">
                  Title <span className="text-[#fa3d3d]">*</span>
                </label>
                <Input
                  id="apt-title"
                  placeholder="Sophia's appointment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-10 rounded-md border border-solid border-[#dddfe5] bg-white text-[14px]"
                  data-testid="input-appointment-title"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#323439]">
                  Duration <span className="text-[#fa3d3d]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={hours} onValueChange={setHours}>
                    <SelectTrigger
                      className="h-10 rounded-md border border-solid border-[#dddfe5] bg-white text-[14px]"
                      data-testid="select-hours"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#56585e]" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 hr</SelectItem>
                      <SelectItem value="1">1 hr</SelectItem>
                      <SelectItem value="2">2 hr</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={minutes} onValueChange={setMinutes}>
                    <SelectTrigger
                      className="h-10 rounded-md border border-solid border-[#dddfe5] bg-white text-[14px]"
                      data-testid="select-minutes"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#56585e]" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 min</SelectItem>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#323439]" htmlFor="apt-desc">
                  Appointment description
                </label>
                <Textarea
                  id="apt-desc"
                  placeholder="Add a note about this meeting"
                  value={description}
                  maxLength={20}
                  onChange={(e) => setDescription(e.target.value.slice(0, 20))}
                  className="min-h-[88px] resize-none rounded-md border border-solid border-[#dddfe5] bg-white text-[14px]"
                  data-testid="input-appointment-description"
                />
                <div className="self-end text-[11px] text-[#6e7079]">{description.length}/20</div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#323439]">
                  Meeting location <span className="text-[#fa3d3d]">*</span>
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger
                    className="h-10 rounded-md border border-solid border-[#dddfe5] bg-white text-[14px]"
                    data-testid="select-location"
                  >
                    <div className="flex items-center gap-2">
                      <img src="/figmaAssets/icon.svg" alt="" className="h-4 w-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rcv">RingCentral video meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FooterRow
              onBack={() => setStep(3)}
              onNext={handleCreate}
              nextLabel="Create"
            />
          </CardChrome>
        )}

      </div>
      <Dialog open={step === 5} onOpenChange={(o) => { if (!o) handleFinishToHome(); }}>
        <DialogContent
          className="max-w-[480px] rounded-xl bg-white p-8 sm:p-10"
          data-testid="dialog-congrats"
        >
          <div className="flex w-full flex-col items-center gap-6">
            <span className="text-5xl leading-none" role="img" aria-label="party">
              🎉
            </span>
            <DialogTitle
              className="max-w-[400px] text-center text-[24px] font-bold leading-[32px] text-black"
              data-testid="text-congrats-headline"
            >
              Congrats! Your first appointment type has been created.
            </DialogTitle>
            <DialogDescription className="sr-only">
              Your appointment type has been created. Copy the booking link or return to the home page.
            </DialogDescription>
            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyLink}
                className="h-9 rounded-[10px] border border-solid border-[#0040dd] bg-white px-4 text-[14px] font-semibold text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
                data-testid="button-copy-link"
              >
                Copy link
              </Button>
              <Button
                type="button"
                onClick={handleFinishToHome}
                className="h-9 rounded-[10px] bg-[#0040dd] px-4 text-[14px] font-semibold text-white hover:bg-[#0037be]"
                data-testid="button-go-home"
              >
                Go to home page
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

