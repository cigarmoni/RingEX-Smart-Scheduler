import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
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
  WeakConnectionMd as WeakConnectionSui,
  Hdmd as HdSui,
  PinMd as PinSui,
  CollapseLeftMd as CollapseLeftSui,
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
import { ScheduleLinkMenu } from "@/components/ScheduleLinkMenu";
import { ShareBookingPopoverContent } from "@/components/ShareBookingPopoverContent";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
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

export const PhonePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const flow = useFlowParam();
  const afterPurchase = flow === "after-call-share-link";
  const { toast } = useToast();
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
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dialedNumber, setDialedNumber] = useState("");

  const justOpenedSharePopoverRef = useRef(false);

  const handleShareBookingLink = () => {
    if (afterPurchase) {
      justOpenedSharePopoverRef.current = true;
      setSharePopoverOpen(true);
    } else {
      setUpsellOpen(true);
    }
  };

  const handleSendSharePopover = () => {
    setSharePopoverOpen(false);
    toast({ description: "Booking link sent" });
  };

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
                {/* Top status row — Figma 28563:478950 */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[12px] font-medium leading-[17px] tabular-nums text-[var(--sui-colors-neutral-b0)]"
                      data-testid="text-call-timer"
                    >
                      00:11
                    </span>
                    <span className={SUI_MUTED}>
                      <Icon as={WeakConnectionSui} size={16} />
                    </span>
                    <span className={SUI_MUTED}>
                      <Icon as={HdSui} size={16} />
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${SUI_MUTED}`}>
                    <button
                      type="button"
                      className="rounded p-0.5 hover:bg-[var(--sui-colors-neutral-b5)]"
                      aria-label="Pin"
                      data-testid="button-pin-call"
                    >
                      <Icon as={PinSui} size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded p-0.5 hover:bg-[var(--sui-colors-neutral-b5)]"
                      aria-label="Collapse"
                      data-testid="button-collapse-call"
                    >
                      <Icon as={CollapseLeftSui} size={16} />
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
                              <a
                                className="font-medium text-[#0040dd] hover:underline"
                                href="#"
                                data-testid="link-task-assignee-jason"
                              >
                                Jason
                              </a>{" "}
                              will send{" "}
                              {afterPurchase ? (
                                <Popover
                                  open={sharePopoverOpen}
                                  onOpenChange={setSharePopoverOpen}
                                >
                                  <PopoverAnchor asChild>
                                    <span data-testid="anchor-share-booking-link">
                                      <ScheduleLinkMenu
                                        testIdPrefix="in-call-schedule-link"
                                        showShareUpgradeIndicator={false}
                                        onShareBookingLink={handleShareBookingLink}
                                        preventCloseAutoFocus
                                      >
                                        booking link
                                      </ScheduleLinkMenu>
                                    </span>
                                  </PopoverAnchor>
                                  <PopoverContent
                                    side="bottom"
                                    align="start"
                                    className="z-[200] w-[360px] rounded-xl border border-[var(--sui-colors-neutral-b4)] bg-white p-4 shadow-lg"
                                    data-testid="popover-share-booking-link"
                                    onPointerDownOutside={(event) => {
                                      if (justOpenedSharePopoverRef.current) {
                                        justOpenedSharePopoverRef.current = false;
                                        event.preventDefault();
                                      }
                                    }}
                                    onFocusOutside={(event) => {
                                      if (justOpenedSharePopoverRef.current) {
                                        event.preventDefault();
                                      }
                                    }}
                                  >
                                    <ShareBookingPopoverContent
                                      idPrefix="in-call-share"
                                      onCancel={() => setSharePopoverOpen(false)}
                                      onSend={handleSendSharePopover}
                                    />
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <ScheduleLinkMenu
                                  testIdPrefix="in-call-schedule-link"
                                  showShareUpgradeIndicator
                                  onShareBookingLink={handleShareBookingLink}
                                >
                                  booking link
                                </ScheduleLinkMenu>
                              )}{" "}
                              to Christina.
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
                  <div
                    className="flex min-h-0 flex-1 flex-col"
                    data-testid="panel-bookings"
                  >
                    <ShareBookingPopoverContent
                      idPrefix="in-call-bookings-panel"
                      stickyFooter
                      onCancel={() => setActiveWidgetTab("NOTES")}
                      onSend={() => {
                        toast({ description: "Booking link sent" });
                        setActiveWidgetTab("NOTES");
                      }}
                    />
                  </div>
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
