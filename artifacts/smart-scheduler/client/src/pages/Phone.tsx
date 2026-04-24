import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import {
  MicrophoneMd as Mic,
  MicrophoneOffMd as MicOff,
  DialpadMd as Keypad,
  VolumeMd as Audio,
  PlusMd as Add,
  HoldMd as Hold,
  TransferCallMd as TransferCall,
  RecordMd as Record,
  SmartNotesMd as SmartNotes,
  VideoMd as Videocam,
  VerticalBars3Md as Signal3Sui,
  Hdmd as HdSui,
  ShareInRoomMd as ScreenshareSui,
  OverflowMd as OverflowSui,
} from "@ringcentral/spring-icon";
import { Dialer, DialPad, DialTextField, DialDelete, IconButton } from "@ringcentral/spring-ui";
import {
  CcSp,
  HangUpSp,
  MoreHoriz,
  AiSparkle,
  Search,
  Filter,
  Phone as PhoneIcon,
  Missedcall,
  Sms,
  Copy,
  Pause,
  Globe,
  Screenshare,
  Hd,
  Signal3,
  Delete,
  Close,
  ArrowDown2,
} from "@ringcentral/juno-icon";
import { useLocation } from "wouter";
import { AppShell } from "@/components/AppShell";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { FeatureIntroBanner } from "@/components/FeatureIntroBanner";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFlowParam } from "@/lib/flows";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

const Icon = ({
  as: Cmp,
  size = 20,
  className = "",
}: {
  as: IconCmp;
  size?: number;
  className?: string;
}) => (
  <Cmp width={size} height={size} fill="currentColor" className={className} aria-hidden />
);

// Spring UI "Share booking link" icon — exact SVG from the Figma node 49:145099
const ShareBookingLinkIcon = ({ size = 12, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={(size * 11.4) / 8.4}
    viewBox="0 0 8.4 11.4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path d="M0.863635 6.76739C0.890483 6.80645 0.918261 6.84667 0.946687 6.88783C1.23951 7.31178 1.60239 7.83717 1.74 8.25C1.85332 8.58996 1.89815 8.91279 1.92624 9.11503C2.09609 10.3381 2.84225 11.4 4.2 11.4C5.55775 11.4 6.30391 10.3381 6.47376 9.11503C6.50185 8.91279 6.54668 8.58996 6.66 8.25C6.79761 7.83717 7.16049 7.31178 7.45331 6.88783C7.48166 6.84679 7.50958 6.80636 7.53636 6.76739C7.57535 6.71066 7.61238 6.65635 7.64658 6.60512L7.65 6.6L7.64523 6.60281L7.64871 6.59781C7.68795 6.54148 7.72584 6.48415 7.76235 6.42585C8.16642 5.78052 8.4 5.01754 8.4 4.2C8.4 1.8804 6.5196 0 4.2 0C1.8804 0 0 1.8804 0 4.2C0 5.01754 0.233585 5.78052 0.637657 6.42585C0.674158 6.48415 0.712051 6.54148 0.751288 6.59781L0.754775 6.60281L0.75 6.6L0.753415 6.60512C0.787629 6.65636 0.824653 6.71066 0.863635 6.76739ZM1.49252 6.08732C1.11899 5.55273 0.9 4.90329 0.9 4.2C0.9 2.37746 2.37746 0.9 4.2 0.9C6.02254 0.9 7.5 2.37746 7.5 4.2C7.5 4.90329 7.28101 5.55273 6.90748 6.08732L6.90116 6.10077C6.84776 6.18086 6.78559 6.27093 6.71388 6.37475L6.67666 6.42859C6.40942 6.81486 5.98539 7.42778 5.80619 7.96539C5.79109 8.01067 5.777 8.0556 5.76383 8.1H4.65V6.31378L5.82738 5.1364L5.19098 4.5L4.20368 5.4873L3.21639 4.5L2.57999 5.1364L3.75 6.3064V8.1H2.63617C2.623 8.0556 2.60891 8.01067 2.59382 7.9654C2.41461 7.42778 1.99058 6.81487 1.72335 6.42859L1.68722 6.37635C1.61504 6.27185 1.55253 6.18129 1.49885 6.10077L1.49252 6.08732ZM3.28585 10.1133C3.05841 9.86119 2.88638 9.47544 2.81891 9H5.58109C5.51362 9.47544 5.34159 9.86119 5.11415 10.1132C4.90313 10.3471 4.61797 10.5 4.2 10.5C3.78203 10.5 3.49686 10.3471 3.28585 10.1133Z" />
  </svg>
);

type CallEntry = {
  id: string;
  name: string;
  duration: string;
  initials: string;
  color: string;
  missed?: boolean;
};

const calls: CallEntry[] = [
  { id: "christina", name: "Christina Ball", duration: "15 sec", initials: "CB", color: "bg-[#ed7d31]" },
  { id: "lisanne", name: "Lisanne Viscaal", duration: "Missed call", initials: "LV", color: "bg-[#7b8794]", missed: true },
  { id: "jason", name: "Jason Caldwell", duration: "1 min 59 sec", initials: "JC", color: "bg-[#5b9bd5]" },
  { id: "unknown", name: "Unknown", duration: "28 sec", initials: "?", color: "bg-[#a5a5a5]" },
  { id: "roger", name: "Roger Smith", duration: "1 min 59 sec", initials: "RS", color: "bg-[#70ad47]" },
  { id: "brandon", name: "Brandon Roberts", duration: "45 sec", initials: "BR", color: "bg-[#a5a5a5]" },
];

const phoneTabs = ["KEYPAD", "CALLS", "VOICEMAIL", "RECORDINGS"];

type CallTab = "CONTACT" | "NOTES" | "TEXT" | "BOOKINGS";

type ControlButton = {
  label: string;
  icon: IconCmp;
  active?: boolean;
  tone?: "danger";
};

type PhoneView = "dialer" | "in-call" | "history";

type BookingField = {
  label: string;
  value: string;
  testId: string;
};

const bookingFields: BookingField[] = [
  { label: "Select booking type", value: "Therapy session with Natalie", testId: "select-booking-type" },
  { label: "Send via", value: "Text", testId: "select-send-via" },
  { label: "To", value: "(650) 257-9326", testId: "select-booking-to" },
  { label: "From", value: "(650) 257-9954", testId: "select-booking-from" },
];

const BookingsPanel = ({ onCancel }: { onCancel: () => void }): JSX.Element => {
  return (
    <div className="flex min-h-0 flex-1 flex-col" data-testid="panel-bookings">
      <div className="flex items-center px-4 py-3">
        <p className="text-sm font-semibold text-[var(--sui-colors-neutral-b0)]">
          Share a booking link with Tim
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
        <BookingSelect
          label={bookingFields[0].label}
          value={bookingFields[0].value}
          testId={bookingFields[0].testId}
        />
        <div className="flex flex-col gap-1">
          <label
            className="text-[12px] font-medium leading-[17px] text-[var(--sui-colors-neutral-b0)]"
            htmlFor="booking-additional-message"
          >
            Additional message
          </label>
          <textarea
            id="booking-additional-message"
            placeholder="Enter additional message"
            className="min-h-[88px] w-full resize-none rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-[var(--sui-colors-neutral-base)] px-4 pb-[15px] pt-4 text-sm text-[var(--sui-colors-neutral-b0)] placeholder:text-[var(--sui-colors-neutral-b2)] focus:border-[var(--sui-colors-primary-b)] focus:outline-none"
            data-testid="textarea-booking-message"
          />
        </div>
        {bookingFields.slice(1).map((f) => (
          <BookingSelect key={f.label} label={f.label} value={f.value} testId={f.testId} />
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-[rgba(0,0,0,0.1)] bg-white p-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 min-w-[56px] items-center justify-center rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-[var(--sui-colors-neutral-base)] px-3 text-sm font-medium text-[var(--sui-colors-neutral-b0)] hover:bg-[var(--sui-colors-neutral-b5)]"
          data-testid="button-booking-cancel"
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex h-8 min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-sm font-medium text-white hover:opacity-90"
          data-testid="button-booking-send"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const BookingSelect = ({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId: string;
}): JSX.Element => (
  <div className="flex flex-col gap-1">
    <span className="text-[12px] font-medium leading-[17px] text-[var(--sui-colors-neutral-b0)]">
      {label}
    </span>
    <button
      type="button"
      className="flex h-9 w-full items-center justify-between rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-[var(--sui-colors-neutral-base)] pl-3 pr-2 text-left text-sm text-[var(--sui-colors-neutral-b0)] hover:border-[rgba(0,0,0,0.35)]"
      data-testid={testId}
    >
      <span className="truncate">{value}</span>
      <Icon as={ArrowDown2} size={16} className="text-[var(--sui-colors-neutral-b2)]" />
    </button>
  </div>
);

export const PhonePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const flow = useFlowParam();
  const afterPurchase = flow === "after-call-share-link";
  const [view, setView] = useState<PhoneView>("in-call");
  const [activeTab, setActiveTab] = useState("CALLS");
  const [activeCallId, setActiveCallId] = useState("christina");
  const [activeWidgetTab, setActiveWidgetTab] = useState<CallTab>(
    afterPurchase ? "BOOKINGS" : "NOTES",
  );
  useEffect(() => {
    setActiveWidgetTab((current) => {
      if (afterPurchase) return "BOOKINGS";
      if (current === "BOOKINGS") return "NOTES";
      return current;
    });
  }, [afterPurchase]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dialedNumber, setDialedNumber] = useState("");

  const startCall = () => {
    setView("in-call");
    setActiveTab("CALLS");
  };
  const endCall = () => {
    setLocation("/phone/post-call");
  };

  if (view === "dialer") {
    return (
      <AppShell activeNav="Phone">
        <div
          className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto bg-[var(--sui-colors-neutral-b5)] px-4 py-8"
          data-testid="view-dialer"
        >
          <div className="flex w-full max-w-[360px] flex-col items-center gap-5 rounded-xl bg-[var(--sui-colors-neutral-base)] p-6 shadow-sm">
            <Dialer>
              <div className="w-full" data-testid="text-dialed-number">
                <DialTextField
                  value={dialedNumber}
                  onChange={(v: string) => setDialedNumber(v)}
                  placeholder="Enter a phone number"
                  keypadMode
                />
              </div>
              <DialPad />
              <div className="mt-1 flex w-full items-center justify-center gap-6">
                <span className="h-14 w-14" />
                <button
                  type="button"
                  onClick={startCall}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sui-colors-success)] text-white shadow-md hover:opacity-90"
                  aria-label="Call"
                  data-testid="button-dialer-call"
                >
                  <Icon as={PhoneIcon} size={22} />
                </button>
                <DialDelete
                  onDelete={() => setDialedNumber((n) => n.slice(0, -1))}
                  onClear={() => setDialedNumber("")}
                >
                  <button
                    type="button"
                    className="flex h-14 w-14 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b2)] hover:bg-[var(--sui-colors-neutral-b5)] disabled:opacity-40"
                    aria-label="Backspace"
                    data-testid="button-dialer-backspace"
                    disabled={!dialedNumber}
                  >
                    <Icon as={ArrowDown2} size={20} />
                  </button>
                </DialDelete>
              </div>
            </Dialer>
          </div>
        </div>
      </AppShell>
    );
  }

  const controls: ControlButton[] = [
    { label: muted ? "Unmute" : "Mute", icon: muted ? MicOff : Mic },
    { label: "Dialpad", icon: Keypad },
    { label: "Audio", icon: Audio },
    { label: "Add", icon: Add },
    { label: "Hold", icon: Hold },
    { label: "Transfer", icon: TransferCall },
    { label: "Record", icon: Record },
    { label: "Stop notes", icon: SmartNotes, active: true, tone: "danger" as const },
    { label: "Video", icon: Videocam },
  ];

  const SUI_TEXT = "text-[var(--sui-colors-neutral-b1)]";
  const SUI_MUTED = "text-[var(--sui-colors-neutral-b2)]";
  const SUI_PRIMARY = "text-[var(--sui-colors-primary-b)]";

  return (
    <AppShell activeNav="Phone">
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* Left rail */}
        <aside className="flex w-full shrink-0 flex-col border-r border-[var(--sui-colors-neutral-b4)] md:w-[400px]">
          <header className="flex items-center justify-between px-4 pt-4">
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
              Phone
            </h2>
            <button
              type="button"
              className={`rounded-full p-2 hover:bg-[var(--sui-colors-neutral-b5)] ${SUI_MUTED}`}
              aria-label="More"
              data-testid="button-phone-more"
            >
              <Icon as={MoreHoriz} size={16} />
            </button>
          </header>

          <nav className="mt-3 flex items-center gap-5 overflow-x-auto border-b border-[var(--sui-colors-neutral-b4)] px-4">
            {phoneTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative shrink-0 px-1 pb-2.5 pt-2 text-xs font-bold tracking-wider ${
                    isActive ? SUI_PRIMARY : SUI_MUTED
                  }`}
                  data-testid={`tab-phone-${tab.toLowerCase()}`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--sui-colors-primary-b)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex h-9 flex-1 items-center gap-2 rounded-md bg-[var(--sui-colors-neutral-b5)] px-3">
              <span className={SUI_MUTED}>
                <Icon as={Search} size={16} />
              </span>
              <Input
                placeholder="Search all"
                className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                data-testid="input-search-calls"
              />
            </div>
            <button
              type="button"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${SUI_MUTED} hover:bg-[var(--sui-colors-neutral-b5)]`}
              data-testid="button-filter-calls"
            >
              <Icon as={Filter} size={14} />
              <span>ALL</span>
              <Icon as={ArrowDown2} size={12} />
            </button>
            <button
              type="button"
              className={`rounded-full p-1.5 hover:bg-[var(--sui-colors-neutral-b5)] ${SUI_MUTED}`}
              aria-label="Add call"
              data-testid="button-add-call"
            >
              <Icon as={Add} size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {calls.map((call) => {
              const isActive = call.id === activeCallId;
              return (
                <button
                  key={call.id}
                  type="button"
                  onClick={() => setActiveCallId(call.id)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left ${
                    isActive ? "bg-[var(--sui-colors-cobranding-t20)]" : "hover:bg-[var(--sui-colors-neutral-b5)]"
                  }`}
                  data-testid={`row-call-${call.id}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${call.color}`}
                  >
                    {call.initials}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span
                      className={`truncate text-sm font-semibold ${
                        isActive ? SUI_PRIMARY : SUI_TEXT
                      }`}
                      data-testid={`text-call-name-${call.id}`}
                    >
                      {call.name}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${SUI_MUTED}`}>
                      {call.missed ? (
                        <span className="text-[var(--sui-colors-danger-b)]">
                          <Icon as={Missedcall} size={12} />
                        </span>
                      ) : (
                        <span className="text-[var(--sui-colors-success)]">
                          <Icon as={PhoneIcon} size={12} />
                        </span>
                      )}
                      <span data-testid={`text-call-duration-${call.id}`}>{call.duration}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center pane */}
        <section className="relative hidden min-w-0 flex-1 flex-col md:flex">
          <header className="flex h-[60px] items-center justify-between border-b border-[var(--sui-colors-neutral-b4)] px-4">
            <h3 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
              Christina Ball
            </h3>
            <div className={`flex items-center gap-1 ${SUI_MUTED}`}>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-[var(--sui-colors-neutral-b5)]"
                aria-label="Delete"
                data-testid="button-delete-call"
              >
                <Icon as={Delete} size={16} />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-[var(--sui-colors-neutral-b5)]"
                aria-label="Close"
                data-testid="button-close-detail"
              >
                <Icon as={Close} size={16} />
              </button>
            </div>
          </header>
          <div className="flex flex-1 flex-col items-center px-6 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5b9bd5] text-xl font-semibold text-white">
              TS
            </div>
            <h4
              className="mt-3 font-display-2 text-[length:var(--display-2-font-size)] font-[number:var(--display-2-font-weight)] leading-[var(--display-2-line-height)] tracking-[var(--display-2-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--display-2-font-style)]"
              data-testid="text-contact-name"
            >
              Tim Smith
            </h4>
            <div className={`mt-1 flex items-center gap-1 text-sm ${SUI_TEXT}`}>
              <span data-testid="text-contact-phone">(470) 335-1472</span>
              <button
                type="button"
                className={`rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)] ${SUI_MUTED}`}
                aria-label="Copy number"
                data-testid="button-copy-number"
              >
                <Icon as={Copy} size={14} />
              </button>
            </div>
            <p className={`mt-1 text-sm ${SUI_MUTED}`}>To: (123) 456-7890</p>

            <div className="mt-4 flex items-center gap-3">
              {[
                { icon: PhoneIcon, label: "call" },
                { icon: Sms, label: "message" },
                { icon: Videocam, label: "video" },
                { icon: MoreHoriz, label: "more" },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sui-colors-neutral-b4)] hover:bg-[var(--sui-colors-neutral-b5)] ${SUI_PRIMARY}`}
                  aria-label={b.label}
                  data-testid={`button-contact-${b.label}`}
                >
                  <Icon as={b.icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Floating in-call widget — sized per Figma (680x518) and pinned above the app */}
        {view === "in-call" && (
        <div className="pointer-events-none fixed inset-0 z-[100] flex items-start justify-center overflow-auto px-3 py-4 sm:items-center sm:p-6">
          <div
            className="pointer-events-auto w-full max-w-[680px] shrink-0 overflow-hidden rounded-xl border border-[var(--sui-colors-neutral-b4)] bg-[var(--sui-colors-neutral-base)] shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:h-[518px] sm:w-[680px]"
            data-testid="widget-in-call"
          >
            {/* Window chrome */}
            <div className="relative flex h-7 items-center border-b border-[var(--sui-colors-neutral-b4)] bg-[var(--sui-colors-neutral-b5)] px-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff514e]" />
                <span className="h-3 w-3 rounded-full bg-[#ffcc2d]" />
                <span className="h-3 w-3 rounded-full bg-[#05d355]" />
              </div>
              <span className={`absolute left-1/2 -translate-x-1/2 text-xs font-medium ${SUI_TEXT}`}>
                RingCentral phone call
              </span>
            </div>

            <div className="flex h-[calc(100%-28px)] flex-col sm:flex-row">
              {/* Left column: contact + controls — 280px per Figma */}
              <div className="flex w-full shrink-0 flex-col border-b border-[var(--sui-colors-neutral-b4)] sm:h-full sm:w-[280px] sm:border-b-0 sm:border-r">
                {/* Top status row */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <div className={`flex items-center gap-2 ${SUI_TEXT}`}>
                    <span
                      className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tabular-nums"
                      data-testid="text-call-timer"
                    >
                      00:11
                    </span>
                    <span className="text-[var(--sui-colors-success)]">
                      <Icon as={Signal3Sui} size={14} />
                    </span>
                    <span className={SUI_MUTED}>
                      <Icon as={HdSui} size={14} />
                    </span>
                    <span className={SUI_MUTED}>
                      <Icon as={MicOff} size={14} />
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 ${SUI_MUTED}`}>
                    <button
                      type="button"
                      className="rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)]"
                      aria-label="Share screen"
                      data-testid="button-screen-share"
                    >
                      <Icon as={ScreenshareSui} size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)]"
                      aria-label="Toggle panel"
                      data-testid="button-toggle-call-panel"
                    >
                      <Icon as={OverflowSui} size={16} />
                    </button>
                  </div>
                </div>

                {/* Contact summary */}
                <div className="flex items-center gap-3 px-4 pt-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5b9bd5] text-sm font-semibold text-white">
                    TS
                  </div>
                  <div className="min-w-0">
                    <p className={`truncate text-base font-semibold ${SUI_TEXT}`}>Tim Smith</p>
                    <p className={`text-xs ${SUI_MUTED}`}>(470) 335-1472</p>
                    <p className={`text-xs ${SUI_MUTED}`}>To: (123) 456-7890</p>
                  </div>
                </div>

                {/* 3x3 control grid — Spring UI IconButton (spec 28117:15648) */}
                <div className="relative grid grid-cols-3 gap-4 px-6 py-5 place-items-center">
                  {controls.map((c) => {
                    const isDangerActive = c.active && c.tone === "danger";
                    return (
                      <div key={c.label} className="flex flex-col items-center gap-1.5">
                        <IconButton
                          size="xxlarge"
                          shape="circular"
                          variant="outlined"
                          color={isDangerActive ? "danger" : "secondary"}
                          symbol={c.icon}
                          aria-label={c.label}
                          onClick={() => {
                            if (c.label === "Mute" || c.label === "Unmute") setMuted((m) => !m);
                          }}
                          style={
                            isDangerActive
                              ? {
                                  backgroundColor:
                                    "color-mix(in srgb, var(--sui-colors-danger-b) 10%, transparent)",
                                  borderColor: "transparent",
                                }
                              : undefined
                          }
                          data-testid={`button-call-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                        <span
                          className={`text-[12px] font-medium leading-4 whitespace-nowrap ${
                            isDangerActive
                              ? "text-[var(--sui-colors-danger-b)]"
                              : "text-[var(--sui-colors-neutral-b1)]"
                          }`}
                        >
                          {c.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom action bar */}
                <div className="flex items-center justify-between px-6 pb-4">
                  <button
                    type="button"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sui-colors-neutral-b5)] hover:bg-[var(--sui-colors-neutral-b4)] ${SUI_TEXT}`}
                    aria-label="Closed captions"
                    data-testid="button-cc"
                  >
                    <Icon as={CcSp} size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={endCall}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sui-colors-danger-b)] text-white hover:bg-[var(--sui-colors-danger-f)]"
                    aria-label="End call"
                    data-testid="button-end-call"
                  >
                    <Icon as={HangUpSp} size={22} />
                  </button>
                  <button
                    type="button"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sui-colors-neutral-b5)] hover:bg-[var(--sui-colors-neutral-b4)] ${SUI_TEXT}`}
                    aria-label="More"
                    data-testid="button-call-overflow"
                  >
                    <Icon as={MoreHoriz} size={20} />
                  </button>
                </div>
              </div>

              {/* Right column: Notes & transcript — 400px per Figma */}
              <div className="flex w-full min-w-0 flex-1 flex-col sm:h-full sm:w-[400px] sm:flex-none">
                {/* Tabs row */}
                <div className="flex items-center justify-between border-b border-[var(--sui-colors-neutral-b4)] px-4 pt-3">
                  <div className="flex items-center gap-5">
                    {((afterPurchase
                      ? ["CONTACT", "NOTES", "TEXT", "BOOKINGS"]
                      : ["CONTACT", "NOTES", "TEXT"]) as CallTab[]).map((tab) => {
                      const isActive = activeWidgetTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveWidgetTab(tab)}
                          className={`relative pb-2.5 text-xs font-bold tracking-wider ${
                            isActive ? SUI_PRIMARY : SUI_MUTED
                          }`}
                          data-testid={`tab-widget-${tab.toLowerCase()}`}
                        >
                          {tab}
                          {isActive && (
                            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--sui-colors-primary-b)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className={`rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)] ${SUI_MUTED}`}
                    aria-label="More"
                    data-testid="button-widget-more"
                  >
                    <Icon as={MoreHoriz} size={16} />
                  </button>
                </div>

                {activeWidgetTab === "NOTES" ? (
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between px-4 pt-3">
                      <p className={`text-sm font-semibold ${SUI_TEXT}`}>Notes and transcript</p>
                      <div className={`flex items-center gap-1 ${SUI_MUTED}`}>
                        <button
                          type="button"
                          className="rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)]"
                          aria-label="Pause"
                          data-testid="button-pause-transcript"
                        >
                          <Icon as={Pause} size={16} />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1 hover:bg-[var(--sui-colors-neutral-b5)]"
                          aria-label="Language"
                          data-testid="button-transcript-lang"
                        >
                          <Icon as={Globe} size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm">
                      <div className={`text-center text-xs ${SUI_MUTED}`}>
                        Amanda Miller answered the call
                      </div>

                      {/* Transcript message */}
                      <div className="flex gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5b9bd5] text-[10px] font-semibold text-white">
                          SD
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className={`text-sm font-semibold ${SUI_TEXT}`}>Sarah Daniels</span>
                            <span className={`text-[11px] ${SUI_MUTED}`}>12:47 AM</span>
                          </div>
                          <p className={`text-sm ${SUI_TEXT}`}>
                            I need help understanding a charge on my account.
                          </p>
                        </div>
                      </div>

                      {/* Recap from Amanda */}
                      <div className="flex gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ed7d31] text-[10px] font-semibold text-white">
                          AM
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className={`text-sm font-semibold ${SUI_TEXT}`}>Amanda Miller</span>
                            <span className={`text-[11px] ${SUI_MUTED}`}>12:47 AM</span>
                          </div>
                          <p className={`mt-1 text-sm font-semibold ${SUI_TEXT}`}>Recap</p>
                          <ul className={`mt-1 list-disc space-y-1 pl-5 text-sm ${SUI_TEXT}`}>
                            <li>
                              Christina is only available on Friday and want to schedule the
                              appointment early that day.
                            </li>
                          </ul>
                          <p className={`mt-2 text-sm font-semibold ${SUI_TEXT}`}>Tasks</p>
                          <ul className={`mt-1 list-disc space-y-1 pl-5 text-sm ${SUI_TEXT}`}>
                            <li>
                              Jason will send booking link to Christina.
                              <div className="mt-1">
                                <Popover open={showSuggestion} onOpenChange={setShowSuggestion}>
                                  <PopoverTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center gap-[var(--sui-spacing-1)] rounded-[var(--sui-radius-xs)] px-[var(--sui-spacing-1)] py-0.5 font-[family-name:var(--typography-font-family,'Inter',sans-serif)] text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-f)] hover:bg-[var(--sui-colors-cobranding-t20)]"
                                      data-testid="button-share-booking-link"
                                      aria-label="Share booking link"
                                    >
                                      <span className="flex w-[12px] items-center justify-end">
                                        <ShareBookingLinkIcon size={12} />
                                      </span>
                                      Share booking link
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    side="bottom"
                                    align="start"
                                    sideOffset={8}
                                    collisionPadding={8}
                                    className="z-[110] w-[280px] border-0 bg-transparent p-0 shadow-none"
                                    data-testid="popover-suggestion"
                                  >
                                    <FeatureIntroBanner
                                      title="Send a booking link"
                                      description="Let your customers choose a time based on your availability instead of coordinating schedules manually."
                                      action={{
                                        label: "Find out more",
                                        onClick: () => {
                                          setShowSuggestion(false);
                                          setUpsellOpen(true);
                                        },
                                        testId: "button-suggestion-find-out-more",
                                      }}
                                      onDismiss={() => setShowSuggestion(false)}
                                      dismissTestId="button-dismiss-suggestion"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeWidgetTab === "CONTACT" ? (
                  <div className={`flex flex-1 flex-col items-center justify-center gap-2 px-4 py-8 text-center text-sm ${SUI_MUTED}`}>
                    <p className={`font-semibold ${SUI_TEXT}`}>Tim Smith</p>
                    <p>(470) 335-1472</p>
                    <p>Contact details would appear here.</p>
                  </div>
                ) : activeWidgetTab === "BOOKINGS" ? (
                  <BookingsPanel onCancel={() => setActiveWidgetTab("NOTES")} />
                ) : (
                  <div className={`flex flex-1 items-center justify-center px-4 py-8 text-center text-sm ${SUI_MUTED}`}>
                    No messages yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      <AvaUpsellDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
    </AppShell>
  );
};

export { PhonePage as Phone };
