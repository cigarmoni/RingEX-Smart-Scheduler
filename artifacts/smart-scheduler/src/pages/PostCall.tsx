import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { BookingFeatureDialog } from "../components/BookingFeatureDialog";
import { FeatureIntroBanner } from "../components/FeatureIntroBanner";
import { useSnackbar } from "../components/SuiSnackbar";

import {
  SettingsMd,
  SearchMd,
  ArrowDownMd,
  PhoneSettingsMd,
  PhoneWarningMd,
  MessageMd,
  OverflowMd,
  CopyMd,
  TrashMd,
  Xmd,
  AiStarsMd,
  AlertMd,
  EditMd,
  ShareMd,
  VoicemailMd,
  VideoMd,
  NotesMd,
  HelpMd
} from "@ringcentral/spring-icon";
import { TextField, IconButton, Button, Avatar as SuiAvatar } from "@ringcentral/spring-ui";

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
  { label: "NOTES", icon: NotesMd },
  { label: "RECORDINGS" },
];

const directionIcon = (d: CallDirection) => {
  switch (d) {
    case "incoming":
      return <PhoneSettingsMd className="h-3.5 w-3.5 text-sui-success-b04" />;
    case "outgoing":
      return <PhoneSettingsMd className="h-3.5 w-3.5 text-sui-success-b04" />;
    case "missed":
      return <PhoneWarningMd className="h-3.5 w-3.5 text-sui-danger-b04" />;
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
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-sui-success-b04" />
    </div>
  );
};

export const PostCall = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState("CALLS");
  const [filter, setFilter] = useState<"ALL" | "MISSED">("ALL");
  const [activeId, setActiveId] = useState<string>("christina");
  const [detailTab, setDetailTab] = useState<"NOTES" | "TRANSCRIPT">("NOTES");

  const visibleCalls = filter === "MISSED" ? pastCalls.filter((c) => c.direction === "missed") : pastCalls;
  const active = pastCalls.find((c) => c.id === activeId) ?? pastCalls[0];

  const notify = (msg: string) =>
    enqueueSnackbar({ message: msg });

  return (
    <AppShell activeNav="Phone">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left rail */}
        <div className="flex w-full shrink-0 flex-col border-b border-sui-neutral-line md:w-[400px] md:border-b-0 md:border-r">
          {/* Header */}
          <div className="flex h-[60px] items-center justify-between px-sui-4">
            <h2 className="text-title text-sui-neutral-f03">
              Phone
            </h2>
            <IconButton
              symbol={SettingsMd as any}
              color="neutral"
              variant="icon"
              size="medium"
              aria-label="Phone settings"
              data-testid="button-phone-settings"
            />
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-sui-4 border-b border-sui-neutral-line px-sui-4">
            {phoneTabs.map((tab) => {
              const isActive = activeTab === tab.label;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`relative flex items-center gap-sui-1 px-1 pb-2.5 pt-2 text-caption2-UPPER ${
                    isActive ? "text-sui-cobranding-b01" : "text-sui-neutral-f02"
                  }`}
                  data-testid={`tab-phone-${tab.label.toLowerCase()}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sui-cobranding-b01" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search + filter */}
          <div className="flex h-[52px] items-center gap-sui-2 px-sui-3">
            <TextField
              placeholder="Search all"
              className="flex-1"
              data-testid="input-search-calls"
            />
            <div className="flex items-center gap-sui-2 px-1 text-caption2-UPPER">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={filter === "ALL" ? "text-sui-cobranding-b01" : "text-sui-neutral-f02 hover:text-sui-neutral-f03"}
                data-testid="filter-all"
              >
                ALL
              </button>
              <button
                type="button"
                onClick={() => setFilter("MISSED")}
                className={filter === "MISSED" ? "text-sui-cobranding-b01" : "text-sui-neutral-f02 hover:text-sui-neutral-f03"}
                data-testid="filter-missed"
              >
                MISSED
              </button>
              <ArrowDownMd className="h-3 w-3 text-sui-neutral-f02" />
            </div>
            <button
              type="button"
              className="px-1 text-subtitle-mini text-sui-cobranding-b01 hover:underline"
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
                  className={`group relative flex h-[54px] items-center gap-sui-3 px-sui-4 ${
                    isActive ? "bg-sui-cobranding-b01-t08" : "hover:bg-sui-neutral-b02"
                  }`}
                  data-testid={`row-call-${call.id}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(call.id)}
                    className="flex min-w-0 flex-1 items-center gap-sui-3 text-left"
                    data-testid={`button-select-call-${call.id}`}
                  >
                    <Avatar initials={call.initials} color={call.color} size="sm" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={`truncate text-subtitle ${
                          call.direction === "missed" ? "text-sui-danger-b04" : isActive ? "text-sui-cobranding-b01" : "text-sui-neutral-f03"
                        }`}
                        data-testid={`text-call-name-${call.id}`}
                      >
                        {call.name}
                      </span>
                      <span className="flex items-center gap-sui-1 truncate text-descriptor text-sui-neutral-f02">
                        {directionIcon(call.direction)}
                        {call.durationLabel}
                      </span>
                    </div>
                  </button>
                  {/* End slot meta (date) */}
                  <div className="flex shrink-0 items-center gap-sui-1 text-descriptor text-sui-neutral-f02 group-hover:hidden">
                    {call.voicemail && <VoicemailMd className="h-3.5 w-3.5" />}
                    <span data-testid={`text-call-date-${call.id}`}>{call.shortDate}</span>
                  </div>
                  {/* Hover quick actions */}
                  <div className="hidden shrink-0 items-center gap-sui-1 group-hover:flex">
                    <button
                      type="button"
                      onClick={() => notify(`Calling ${call.name}`)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-line bg-white text-sui-cobranding-b01 hover:bg-sui-neutral-b02"
                      aria-label={`Call back ${call.name}`}
                      data-testid={`button-callback-${call.id}`}
                    >
                      <PhoneSettingsMd className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => notify(`Messaging ${call.name}`)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-line bg-white text-sui-cobranding-b01 hover:bg-sui-neutral-b02"
                      aria-label={`Message ${call.name}`}
                      data-testid={`button-message-${call.id}`}
                    >
                      <MessageMd className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => notify("More actions")}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-line bg-white text-sui-neutral-f02 hover:bg-sui-neutral-b02"
                      aria-label="More actions"
                      data-testid={`button-more-${call.id}`}
                    >
                      <OverflowMd className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {visibleCalls.length === 0 && (
              <div className="flex h-32 items-center justify-center text-main-text text-sui-neutral-f02">
                No calls to show
              </div>
            )}
          </div>
        </div>

        {/* Center detail pane */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header (just close/delete in top right) */}
          <div className="flex h-[60px] items-center justify-end gap-sui-1 px-sui-4 text-sui-neutral-f02">
            <IconButton
              symbol={TrashMd as any}
              variant="icon"
              color="neutral"
              size="medium"
              onClick={() => notify("Call deleted")}
              aria-label="Delete call"
              data-testid="button-delete-call"
            />
            <IconButton
              symbol={Xmd as any}
              variant="icon"
              color="neutral"
              size="medium"
              onClick={() => notify("Closed")}
              aria-label="Close detail"
              data-testid="button-close-detail"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-sui-6 pb-sui-6">
            {/* Avatar + name + number */}
            <div className="flex flex-col items-center gap-sui-2">
              <Avatar initials={active.initials} color={active.color} size="lg" />
              <h3
                className="mt-2 text-display-2 text-sui-neutral-f03"
                data-testid="text-detail-name"
              >
                {active.name}
              </h3>
              <div className="flex items-center gap-sui-1 text-main-text text-sui-neutral-f02">
                <span data-testid="text-detail-phone">{active.phone}</span>
                <IconButton
                  symbol={CopyMd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  onClick={() => {
                    navigator.clipboard?.writeText(active.phone).catch(() => {});
                    notify("Phone number copied");
                  }}
                  aria-label="Copy phone number"
                  data-testid="button-copy-phone"
                />
              </div>
            </div>

            {/* Action row: call, split-button, message, more */}
            <div className="mt-4 flex items-center justify-center gap-sui-3">
              <ActionButton
                icon={<PhoneSettingsMd className="h-4 w-4" />}
                label="Call"
                onClick={() => notify(`Calling ${active.name}`)}
                testid="button-action-call"
              />
              <SplitButton
                onCall={() => notify(`Video calling ${active.name}`)}
                onMore={() => notify("Choose call type")}
              />
              <ActionButton
                icon={<MessageMd className="h-4 w-4" />}
                label="Message"
                onClick={() => notify(`Messaging ${active.name}`)}
                testid="button-action-message"
              />
              <ActionButton
                icon={<OverflowMd className="h-4 w-4" />}
                label="More actions"
                onClick={() => notify("More actions")}
                testid="button-action-more"
              />
            </div>

            {/* Detail list */}
            <div className="mx-auto mt-6 flex max-w-[400px] flex-col gap-sui-2">
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
                      active.direction === "missed" ? "text-sui-danger-b04" : "text-sui-success-b04"
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
                    <PhoneWarningMd className="h-4 w-4 text-sui-danger-b04" />
                  ) : (
                    <PhoneCall className="h-4 w-4 text-sui-success-b04" />
                  )
                }
                data-testid="card-direction"
              />

              {/* Notes / Transcript */}
              <div className="mt-2 rounded-lg border border-sui-neutral-line bg-white">
                <div className="flex items-center justify-between gap-sui-2 border-b border-sui-neutral-line px-sui-3 py-sui-2">
                  <div className="flex items-center gap-sui-1 rounded-full bg-sui-neutral-b02 p-0.5">
                    {(["NOTES", "TRANSCRIPT"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setDetailTab(t)}
                        className={`rounded-full px-3 py-1 text-subtitle-mini ${
                          detailTab === t ? "bg-white text-sui-neutral-f03 shadow-sui-sm" : "text-sui-neutral-f02"
                        }`}
                        data-testid={`tab-detail-${t.toLowerCase()}`}
                      >
                        {t === "NOTES" ? "Notes" : "Transcript"}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5 text-sui-neutral-f02">
                    <IconBtn label="Report" onClick={() => notify("Report")} testid="button-detail-report">
                      <AlertMd className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Edit" onClick={() => notify("Edit notes")} testid="button-detail-edit">
                      <EditMd className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Copy" onClick={() => notify("Copied to clipboard")} testid="button-detail-copy">
                      <ClipboardCopy className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Share" onClick={() => notify("Shared")} testid="button-detail-share">
                      <ShareMd className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </div>

                <div className="p-sui-3">
                  {detailTab === "NOTES" ? (
                    <div className="text-main-text text-sui-neutral-f03">
                      <p>{active.name} asks for a dental treatment on Friday.</p>
                      <h5 className="mt-3 text-descriptor-mini font-semibold text-sui-neutral-f03">
                        Recap
                      </h5>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        <li>{active.name} is only available on Friday.</li>
                      </ul>
                      <h5 className="mt-3 text-descriptor-mini font-semibold text-sui-neutral-f03">
                        Tasks
                      </h5>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        <li>
                          Sarah tried to find out the common time slot.
                          <div className="mt-1 pl-1">
                            <BookingLinkAction contactName={active.name} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-3 text-main-text text-sui-neutral-f03">
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
    className="flex h-9 w-9 items-center justify-center rounded-full border border-sui-neutral-line bg-white text-sui-neutral-f02 hover:bg-sui-neutral-b02"
    aria-label={label}
    data-testid={testid}
  >
    {icon}
  </button>
);

const SplitButton = ({ onCall, onMore }: { onCall: () => void; onMore: () => void }) => (
  <div className="flex h-9 items-stretch overflow-hidden rounded-full border border-sui-neutral-line bg-white text-sui-neutral-f02">
    <button
      type="button"
      onClick={onCall}
      className="flex items-center justify-center px-sui-3 hover:bg-sui-neutral-b02"
      aria-label="Video call"
      data-testid="button-action-video"
    >
      <VideoMd className="h-4 w-4" />
    </button>
    <div className="my-1.5 w-[1px] bg-sui-neutral-line" />
    <button
      type="button"
      onClick={onMore}
      className="flex items-center justify-center px-sui-2 hover:bg-sui-neutral-b02"
      aria-label="More call options"
      data-testid="button-action-video-more"
    >
      <ArrowDownMd className="h-3.5 w-3.5" />
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
    className="flex items-center justify-between gap-sui-4 rounded-lg border border-sui-neutral-line bg-white p-sui-3"
    {...rest}
  >
    <div className="flex min-w-0 flex-1 items-center gap-sui-3">
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-descriptor text-sui-neutral-f02">{label}</span>
        <span className="text-subtitle text-sui-neutral-f03 truncate">{primary}</span>
      </div>
    </div>
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
    className="rounded p-1 hover:bg-sui-neutral-b02"
    aria-label={label}
    data-testid={testid}
  >
    {children}
  </button>
);

const BookingLinkAction = ({ contactName }: { contactName: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mt-1 flex items-center gap-sui-2 rounded border border-sui-neutral-line bg-sui-neutral-b02 p-sui-2">
        <HelpMd className="h-4 w-4 text-sui-warning-b04 shrink-0" />
        <span className="text-main-text text-sui-neutral-f03 flex-1">
          Share your booking link to help {contactName} find a time.
        </span>
        <Button
          color="primary"
          onClick={() => setOpen(true)}
          className="shrink-0"
        >
          Share link
        </Button>
      </div>
      <BookingFeatureDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
