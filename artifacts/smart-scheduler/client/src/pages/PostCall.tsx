import { useState } from "react";
import {
  Settings,
  Search,
  ChevronDown,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  MessageSquare,
  MoreHorizontal,
  Copy,
  Trash2,
  X,
  Sparkles,
  AlertCircle,
  Edit3,
  ClipboardCopy,
  Share2,
  ListPlus,
  Voicemail,
  PhoneCall,
  Video,
  StickyNote,
  Lightbulb,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BookingFeatureDialog } from "@/components/BookingFeatureDialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFlowParam } from "@/lib/flows";

type CallDirection = "incoming" | "outgoing" | "missed";

type PastCall = {
  id: string;
  name: string;
  initials: string;
  color: string;
  phone: string;
  date: string;
  shortDate: string;
  time: string;
  duration: string;
  durationLabel: string;
  direction: CallDirection;
  voicemail?: boolean;
};

const pastCalls: PastCall[] = [
  {
    id: "christina",
    name: "Christina Ball",
    initials: "C",
    color: "bg-[#f4b942]",
    phone: "(650) 123-4567",
    date: "April 18, 2026",
    shortDate: "4/18",
    time: "02:00 PM",
    duration: "15 sec",
    durationLabel: "15 sec",
    direction: "outgoing",
  },
  {
    id: "lisanne",
    name: "Lisanne Viscaal",
    initials: "L",
    color: "bg-[#7b8794]",
    phone: "(415) 555-0118",
    date: "April 15, 2026",
    shortDate: "4/15",
    time: "10:42 AM",
    duration: "—",
    durationLabel: "Missed call",
    direction: "missed",
    voicemail: true,
  },
  {
    id: "jason",
    name: "Jason Caldwell",
    initials: "J",
    color: "bg-[#5b9bd5]",
    phone: "(212) 555-0103",
    date: "April 13, 2026",
    shortDate: "4/13",
    time: "09:15 AM",
    duration: "1 min 59 sec",
    durationLabel: "1 min 59 sec",
    direction: "outgoing",
  },
  {
    id: "unknown",
    name: "Unknown",
    initials: "?",
    color: "bg-[#a5a5a5]",
    phone: "(347) 555-0149",
    date: "April 12, 2026",
    shortDate: "4/12",
    time: "04:21 PM",
    duration: "28 sec",
    durationLabel: "28 sec",
    direction: "incoming",
  },
  {
    id: "roger",
    name: "Roger Smith",
    initials: "R",
    color: "bg-[#70ad47]",
    phone: "(310) 555-0184",
    date: "March 2, 2026",
    shortDate: "3/02",
    time: "11:08 AM",
    duration: "1 min 59 sec",
    durationLabel: "1 min 59 sec",
    direction: "incoming",
  },
  {
    id: "brandon",
    name: "Brandon Roberts",
    initials: "B",
    color: "bg-[#7030a0]",
    phone: "(646) 555-0177",
    date: "March 1, 2026",
    shortDate: "3/01",
    time: "03:47 PM",
    duration: "45 sec",
    durationLabel: "45 sec",
    direction: "outgoing",
  },
];

const phoneTabs = [
  { label: "KEYPAD" },
  { label: "CALLS" },
  { label: "VOICEMAIL" },
  { label: "NOTES", icon: StickyNote },
  { label: "RECORDINGS" },
];

const directionIcon = (d: CallDirection) => {
  switch (d) {
    case "incoming":
      return <PhoneIncoming className="h-3.5 w-3.5 text-sui-success" />;
    case "outgoing":
      return <PhoneOutgoing className="h-3.5 w-3.5 text-sui-success" />;
    case "missed":
      return <PhoneMissed className="h-3.5 w-3.5 text-sui-danger" />;
  }
};

const Avatar = ({
  initials,
  color,
  size = "md",
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) => {
  const dim = size === "lg" ? "h-16 w-16 text-xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-10 w-10 text-sm";
  return (
    <div className={`relative shrink-0 ${dim.split(" ").slice(0, 2).join(" ")}`}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-full font-semibold text-white ${color} ${dim
          .split(" ")
          .slice(2)
          .join(" ")}`}
      >
        {initials}
      </div>
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-sui-success" />
    </div>
  );
};

export const PostCall = (): JSX.Element => {
  const { toast } = useToast();
  const flow = useFlowParam();
  const sharePopoverVariant = flow === "after-post-call-share-link";
  const [activeTab, setActiveTab] = useState("CALLS");
  const [filter, setFilter] = useState<"ALL" | "MISSED">("ALL");
  const [activeId, setActiveId] = useState<string>("christina");
  const [detailTab, setDetailTab] = useState<"NOTES" | "TRANSCRIPT">("NOTES");

  const visibleCalls = filter === "MISSED" ? pastCalls.filter((c) => c.direction === "missed") : pastCalls;
  const active = pastCalls.find((c) => c.id === activeId) ?? pastCalls[0];

  const notify = (msg: string) =>
    toast({ description: msg });

  return (
    <AppShell activeNav="Phone">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left rail */}
        <div className="flex w-full shrink-0 flex-col border-b border-sui-neutral-b4 md:w-[400px] md:border-b-0 md:border-r">
          {/* Header */}
          <div className="flex h-[60px] items-center justify-between px-4">
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
              Phone
            </h2>
            <button
              type="button"
              className="rounded-full p-2 text-sui-neutral-b3 hover:bg-sui-neutral-b5"
              aria-label="Phone settings"
              data-testid="button-phone-settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-4 border-b border-sui-neutral-b4 px-4">
            {phoneTabs.map((tab) => {
              const isActive = activeTab === tab.label;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`relative flex items-center gap-1 px-1 pb-2.5 pt-2 font-caption2-UPPER text-[length:var(--caption2-UPPER-font-size)] font-[number:var(--caption2-UPPER-font-weight)] leading-[var(--caption2-UPPER-line-height)] tracking-[var(--caption2-UPPER-letter-spacing)] [font-style:var(--caption2-UPPER-font-style)] ${
                    isActive ? "text-sui-cobranding" : "text-sui-neutral-b3"
                  }`}
                  data-testid={`tab-phone-${tab.label.toLowerCase()}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sui-cobranding" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search + filter */}
          <div className="flex h-[52px] items-center gap-2 px-3">
            <div className="flex h-9 flex-1 items-center gap-2 rounded-md bg-sui-neutral-b5 px-3">
              <Search className="h-4 w-4 text-sui-neutral-b3" />
              <Input
                placeholder="Search all"
                className="h-auto flex-1 border-0 bg-transparent p-0 font-main-text text-[length:var(--main-text-font-size)] focus-visible:ring-0 focus-visible:ring-offset-0"
                data-testid="input-search-calls"
              />
            </div>
            <div className="flex items-center gap-2 px-1 font-caption2-UPPER text-[length:var(--caption2-UPPER-font-size)] font-[number:var(--caption2-UPPER-font-weight)]">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={filter === "ALL" ? "text-sui-cobranding" : "text-sui-neutral-b3 hover:text-black"}
                data-testid="filter-all"
              >
                ALL
              </button>
              <button
                type="button"
                onClick={() => setFilter("MISSED")}
                className={filter === "MISSED" ? "text-sui-cobranding" : "text-sui-neutral-b3 hover:text-black"}
                data-testid="filter-missed"
              >
                MISSED
              </button>
              <ChevronDown className="h-3 w-3 text-sui-neutral-b3" />
            </div>
            <button
              type="button"
              className="px-1 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-sui-cobranding hover:underline"
              data-testid="button-edit-calls"
            >
              Edit
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {visibleCalls.map((call) => {
              const isActive = call.id === activeId;
              return (
                <div
                  key={call.id}
                  className={`group relative flex h-[54px] items-center gap-3 px-4 ${
                    isActive ? "bg-sui-cobranding-t10" : "hover:bg-sui-neutral-b5"
                  }`}
                  data-testid={`row-call-${call.id}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(call.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    data-testid={`button-select-call-${call.id}`}
                  >
                    <Avatar initials={call.initials} color={call.color} size="sm" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={`truncate font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] ${
                          call.direction === "missed" ? "text-sui-danger" : isActive ? "text-sui-cobranding" : "text-black"
                        }`}
                        data-testid={`text-call-name-${call.id}`}
                      >
                        {call.name}
                      </span>
                      <span className="flex items-center gap-1 truncate font-descriptor text-[length:var(--descriptor-font-size)] text-sui-neutral-b3">
                        {directionIcon(call.direction)}
                        {call.durationLabel}
                      </span>
                    </div>
                  </button>
                  {/* End slot meta (date) */}
                  <div className="flex shrink-0 items-center gap-1 font-descriptor text-[length:var(--descriptor-font-size)] text-sui-neutral-b3 group-hover:hidden">
                    {call.voicemail && <Voicemail className="h-3.5 w-3.5" />}
                    <span data-testid={`text-call-date-${call.id}`}>{call.shortDate}</span>
                  </div>
                  {/* Hover quick actions */}
                  <div className="hidden shrink-0 items-center gap-1 group-hover:flex">
                    <button
                      type="button"
                      onClick={() => notify(`Calling ${call.name}`)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-b4 bg-white text-sui-cobranding hover:bg-sui-neutral-b5"
                      aria-label={`Call back ${call.name}`}
                      data-testid={`button-callback-${call.id}`}
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => notify(`Messaging ${call.name}`)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-b4 bg-white text-sui-cobranding hover:bg-sui-neutral-b5"
                      aria-label={`Message ${call.name}`}
                      data-testid={`button-message-${call.id}`}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => notify("More actions")}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-b4 bg-white text-sui-neutral-b3 hover:bg-sui-neutral-b5"
                      aria-label="More actions"
                      data-testid={`button-more-${call.id}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {visibleCalls.length === 0 && (
              <div className="flex h-32 items-center justify-center font-main-text text-[length:var(--main-text-font-size)] text-sui-neutral-b3">
                No calls to show
              </div>
            )}
          </div>
        </div>

        {/* Center detail pane */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header (just close/delete in top right) */}
          <div className="flex h-[60px] items-center justify-end gap-1 px-4 text-sui-neutral-b3">
            <button
              type="button"
              onClick={() => notify("Call deleted")}
              className="rounded-full p-2 hover:bg-sui-neutral-b5"
              aria-label="Delete call"
              data-testid="button-delete-call"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => notify("Closed")}
              className="rounded-full p-2 hover:bg-sui-neutral-b5"
              aria-label="Close detail"
              data-testid="button-close-detail"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Avatar + name + number */}
            <div className="flex flex-col items-center gap-2">
              <Avatar initials={active.initials} color={active.color} size="lg" />
              <h3
                className="mt-2 font-display-2 text-[length:var(--display-2-font-size)] font-[number:var(--display-2-font-weight)] leading-[var(--display-2-line-height)] tracking-[var(--display-2-letter-spacing)] text-black [font-style:var(--display-2-font-style)]"
                data-testid="text-detail-name"
              >
                {active.name}
              </h3>
              <div className="flex items-center gap-1 font-main-text text-[length:var(--main-text-font-size)] text-sui-neutral-b3">
                <span data-testid="text-detail-phone">{active.phone}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(active.phone).catch(() => {});
                    notify("Phone number copied");
                  }}
                  className="rounded-full p-1 hover:bg-sui-neutral-b5"
                  aria-label="Copy phone number"
                  data-testid="button-copy-phone"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Action row: call, split-button, message, more */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <ActionButton
                icon={<Phone className="h-4 w-4" />}
                label="Call"
                onClick={() => notify(`Calling ${active.name}`)}
                testid="button-action-call"
              />
              <SplitButton
                onCall={() => notify(`Video calling ${active.name}`)}
                onMore={() => notify("Choose call type")}
              />
              <ActionButton
                icon={<MessageSquare className="h-4 w-4" />}
                label="Message"
                onClick={() => notify(`Messaging ${active.name}`)}
                testid="button-action-message"
              />
              <ActionButton
                icon={<MoreHorizontal className="h-4 w-4" />}
                label="More actions"
                onClick={() => notify("More actions")}
                testid="button-action-more"
              />
            </div>

            {/* Detail list */}
            <div className="mx-auto mt-6 flex max-w-[400px] flex-col gap-2">
              <DetailCard
                label="From"
                primary={`${active.phone} (me)`}
                data-testid="card-from"
              />
              <DetailCard
                label={active.time}
                primary={
                  <span
                    className={
                      active.direction === "missed" ? "text-sui-danger" : "text-sui-success"
                    }
                  >
                    {active.direction === "missed"
                      ? "Missed call"
                      : active.direction === "outgoing"
                      ? `Outgoing call (${active.duration})`
                      : `Incoming call (${active.duration})`}
                  </span>
                }
                icon={
                  active.direction === "missed" ? (
                    <PhoneMissed className="h-4 w-4 text-sui-danger" />
                  ) : (
                    <PhoneCall className="h-4 w-4 text-sui-success" />
                  )
                }
                data-testid="card-direction"
              />

              {/* Notes / Transcript */}
              <div className="mt-2 rounded-lg border border-sui-neutral-b4 bg-white">
                <div className="flex items-center justify-between gap-2 border-b border-sui-neutral-b4 px-3 py-2">
                  <div className="flex items-center gap-1 rounded-full bg-sui-neutral-b5 p-0.5">
                    {(["NOTES", "TRANSCRIPT"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setDetailTab(t)}
                        className={`rounded-full px-3 py-1 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] ${
                          detailTab === t ? "bg-white text-black shadow-sm" : "text-sui-neutral-b3"
                        }`}
                        data-testid={`tab-detail-${t.toLowerCase()}`}
                      >
                        {t === "NOTES" ? "Notes" : "Transcript"}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5 text-sui-neutral-b3">
                    <IconBtn label="Report" onClick={() => notify("Report")} testid="button-detail-report">
                      <AlertCircle className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Edit" onClick={() => notify("Edit notes")} testid="button-detail-edit">
                      <Edit3 className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Copy" onClick={() => notify("Copied to clipboard")} testid="button-detail-copy">
                      <ClipboardCopy className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Share" onClick={() => notify("Shared")} testid="button-detail-share">
                      <Share2 className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </div>

                <div className="p-3">
                  {detailTab === "NOTES" ? (
                    <div className="font-main-text text-[length:var(--main-text-font-size)] text-black">
                      <p>{active.name} asks for a dental treatment on Friday.</p>
                      <h5 className="mt-3 font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-semibold text-black">
                        Recap
                      </h5>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        <li>{active.name} is only available on Friday.</li>
                      </ul>
                      <h5 className="mt-3 font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-semibold text-black">
                        Tasks
                      </h5>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        <li>
                          Sarah tried to find out the common time slot.
                          <div className="mt-1 pl-1">
                            <BookingLinkAction contactName={active.name} variant={sharePopoverVariant ? "share" : "intro"} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-3 font-main-text text-[length:var(--main-text-font-size)] text-black">
                      <p>
                        <span className="font-semibold">{active.name}:</span> Hi! Thanks for getting back to me about
                        the demo.
                      </p>
                      <p>
                        <span className="font-semibold">You:</span> Of course — happy to walk you through it. I'll send
                        a booking link right after this call.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

const ActionButton = ({
  icon,
  label,
  onClick,
  testid,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  testid: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-b4 bg-white text-sui-neutral-b3 hover:bg-sui-neutral-b5"
    aria-label={label}
    data-testid={testid}
  >
    {icon}
  </button>
);

const SplitButton = ({ onCall, onMore }: { onCall: () => void; onMore: () => void }) => (
  <div className="flex h-9 items-stretch overflow-hidden rounded-full border border-sui-neutral-b4 bg-white text-sui-neutral-b3">
    <button
      type="button"
      onClick={onCall}
      className="flex items-center justify-center px-3 hover:bg-sui-neutral-b5"
      aria-label="Video call"
      data-testid="button-action-video"
    >
      <Video className="h-4 w-4" />
    </button>
    <Separator orientation="vertical" className="my-1.5 bg-sui-neutral-b4" />
    <button
      type="button"
      onClick={onMore}
      className="flex items-center justify-center px-2 hover:bg-sui-neutral-b5"
      aria-label="More call options"
      data-testid="button-action-video-more"
    >
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  </div>
);

const DetailCard = ({
  label,
  primary,
  icon,
  ...rest
}: {
  label: string;
  primary: React.ReactNode;
  icon?: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div
    className="flex items-start gap-3 rounded-lg border border-sui-neutral-b4 bg-white px-3 py-2"
    {...rest}
  >
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="font-descriptor text-[length:var(--descriptor-font-size)] text-sui-neutral-b3">{label}</span>
      <span className="font-main-text text-[length:var(--main-text-font-size)] text-black">{primary}</span>
    </div>
    {icon && <div className="pt-1">{icon}</div>}
  </div>
);

const IconBtn = ({
  children,
  label,
  onClick,
  testid,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  testid: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full p-1.5 hover:bg-sui-neutral-b5"
    aria-label={label}
    data-testid={testid}
  >
    {children}
  </button>
);

const BookingLinkAction = ({
  contactName,
  variant = "intro",
}: {
  contactName: string;
  variant?: "intro" | "share";
}) => {
  const [open, setOpen] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState("therapy-session-natalie");
  const [sendVia, setSendVia] = useState("email");
  const [recipient, setRecipient] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const resetShareForm = () => {
    setBookingType("therapy-session-natalie");
    setSendVia("email");
    setRecipient("");
    setFrom("");
    setMessage("");
  };

  const handleOpenChange = (next: boolean) => {
    if (next && variant === "share") resetShareForm();
    setOpen(next);
  };

  const handleSend = () => {
    setOpen(false);
    toast({ description: "Booking link sent" });
  };

  if (variant === "intro") {
    return (
      <>
        <button
          type="button"
          onClick={() => setUpsellOpen(true)}
          className="inline-flex h-5 items-center gap-1 rounded-[4px] px-1 font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-medium text-sui-cobranding hover:bg-sui-cobranding-t10"
          data-testid="button-share-booking-link"
        >
          <Lightbulb className="h-3 w-3" />
          Share booking link
        </button>
        <BookingFeatureDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
      </>
    );
  }

  return (
    <>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex h-5 items-center gap-1 rounded-[4px] px-1 font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-medium text-sui-cobranding hover:bg-sui-cobranding-t10"
            data-testid="button-share-booking-link"
          >
            <Lightbulb className="h-3 w-3" />
            Share booking link
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          className="w-[360px] rounded-xl border border-sui-neutral-b4 bg-white p-4 shadow-lg"
          data-testid="popover-share-booking-link"
        >
            <div className="flex flex-col gap-3">
              <div
                className="font-headline text-[16px] font-semibold text-black"
                data-testid="text-share-popover-title"
              >
                Share booking link
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="post-call-share-type"
                  className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                >
                  Booking type
                </Label>
                <Select value={bookingType} onValueChange={setBookingType}>
                  <SelectTrigger
                    id="post-call-share-type"
                    className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="select-share-popover-type"
                  >
                    <SelectValue placeholder="Select a booking type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="therapy-session-natalie">Therapy session with Natalie</SelectItem>
                    <SelectItem value="initial-consultation">Initial consultation</SelectItem>
                    <SelectItem value="follow-up-15">15 min follow-up</SelectItem>
                    <SelectItem value="discovery-call-30">30 min discovery call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="post-call-share-via"
                  className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                >
                  Send via
                </Label>
                <Select value={sendVia} onValueChange={setSendVia}>
                  <SelectTrigger
                    id="post-call-share-via"
                    className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="select-share-popover-via"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {sendVia === "text" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-message"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      Text message
                    </Label>
                    <Textarea
                      id="post-call-share-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter text message"
                      className="min-h-[64px] rounded-md border border-sui-neutral-b4 bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="textarea-share-popover-message"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-to"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      To
                    </Label>
                    <Input
                      id="post-call-share-to"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder={`Send to ${contactName}`}
                      className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="input-share-popover-to"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-from"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      From
                    </Label>
                    <Input
                      id="post-call-share-from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="(555) 555-5555"
                      className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="input-share-popover-from"
                    />
                  </div>
                </>
              )}
              {sendVia === "chat" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-conversation"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      Conversation
                    </Label>
                    <Input
                      id="post-call-share-conversation"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Select conversation"
                      className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="input-share-popover-conversation"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-message"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="post-call-share-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter message"
                      className="min-h-[64px] rounded-md border border-sui-neutral-b4 bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="textarea-share-popover-message"
                    />
                  </div>
                </>
              )}
              {sendVia === "email" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-email"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      Email
                    </Label>
                    <Input
                      id="post-call-share-email"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder={`Send to ${contactName}`}
                      className="h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="input-share-popover-email"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="post-call-share-message"
                      className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="post-call-share-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter message"
                      className="min-h-[64px] rounded-md border border-sui-neutral-b4 bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                      data-testid="textarea-share-popover-message"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-8 rounded-[10px] border border-sui-neutral-b4 bg-white px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black hover:bg-sui-neutral-b5"
                  data-testid="button-share-popover-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={recipient.trim().length === 0}
                  className="h-8 rounded-[10px] bg-sui-cobranding px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-white hover:bg-sui-cobranding disabled:bg-sui-neutral-b4 disabled:text-white"
                  data-testid="button-share-popover-send"
                >
                  Send
                </Button>
              </div>
            </div>
          </PopoverContent>
      </Popover>
      <BookingFeatureDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
    </>
  );
};
