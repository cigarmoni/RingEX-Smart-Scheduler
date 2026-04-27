import { useEffect, useState } from "react";
import { useFlowParam } from "@/lib/flows";
import {
  Calendar,
  CalendarDays,
  ChevronDown,
  Edit3,
  LogIn,
  MapPin,
  Search,
  Settings,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import { EditPenMd, GlobeMd, OverflowMd, ReportIssueMd, ShareMd, Xmd } from "@ringcentral/spring-icon";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { Button } from "@/components/ui/button";
import { FeatureIntroBanner } from "@/components/FeatureIntroBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { MeetingWindow } from "@/pages/MeetingWindow";

type Participant = {
  id: string;
  name: string;
  initials: string;
  bg: string;
};

type Meeting = {
  id: string;
  title: string;
  url: string;
  timeLabel: string;
  timeSubLabel?: string;
  status?: "now" | "soon";
  date: string;
  location: string;
  participants: Participant[];
  participantCount: number;
  accepted: number;
  declined: number;
  noResponse: number;
  description: string;
};

const allParticipants: Participant[] = [
  { id: "p1", name: "Avery", initials: "AV", bg: "bg-[#9b6bff]" },
  { id: "p2", name: "Bella", initials: "BE", bg: "bg-[#f47171]" },
  { id: "p3", name: "Carlos", initials: "CA", bg: "bg-[#3b3b3b]" },
  { id: "p4", name: "Dana", initials: "DA", bg: "bg-[#a8825c]" },
  { id: "p5", name: "Erin", initials: "ER", bg: "bg-[#e0a574]" },
  { id: "p6", name: "Felix", initials: "FE", bg: "bg-[#5b5b5b]" },
  { id: "p7", name: "Gina", initials: "GI", bg: "bg-[#7d7d7d]" },
  { id: "p8", name: "Hugo", initials: "HU", bg: "bg-[#f5b25b]" },
];

const meetings: Meeting[] = [
  {
    id: "q2-roadmap",
    title: "Q2 Design Roadmap",
    url: "https://v.ringcentral.com/join/3849279209",
    timeLabel: "10:00 AM",
    timeSubLabel: "11:00 AM",
    date: "Wed, Jul 26, 10:30 - 11:00",
    location: "Conf Rm - HGH 3A - Baidi (8)",
    participants: allParticipants.slice(0, 3),
    participantCount: 27,
    accepted: 1,
    declined: 3,
    noResponse: 23,
    description: `Hello Design Managers & UX Producers!

Please update all of your active epics for your respective teams (ie. what you are currently working on now and in the upcoming sprint or 1-2 week period). Also be sure to update the Monthly Design Deliverables Figma deck.

Monthly Design Deliverables Figma Deck
https://www.figma.com/files/878754564504102813/drafts?fuid=1225836221698491725

RC Global UX Active Epics: Product Track
https://jira.ringcentral.com/secure/PortfolioPlanView.jspa?id=424&sid=426#plan/backlog

RC Global UX Active Epics: Content Track
https://jira.ringcentral.com/secure/PortfolioPlanView.jspa?id=538&sid=541&vid=2674#plan/backlog
NOTE: The Epics above are showing up in their respective reports because they are tagged appropriately. Please ensure your team's epics are tagged so they appear in the correct view.`,
  },
  {
    id: "bobcat-eddie",
    title: "1:1 Bobcat <> Eddie",
    url: "https://v.ringcentral.com/join/3849279209",
    timeLabel: "Now until",
    timeSubLabel: "11:00 AM",
    status: "now",
    date: "Today, 10:00 - 11:00 AM",
    location: "Zoom",
    participants: allParticipants.slice(0, 2),
    participantCount: 2,
    accepted: 2,
    declined: 0,
    noResponse: 0,
    description: "Weekly 1:1 sync between Bobcat and Eddie.",
  },
  {
    id: "comedy-tour",
    title: "2023 Comedy Tour",
    url: "https://v.ringcentral.com/join/3849279209",
    timeLabel: "Starts in",
    timeSubLabel: "2 mins",
    status: "soon",
    date: "Today, 11:00 AM - 12:00 PM",
    location: "Conf Rm - HGH 2B",
    participants: allParticipants.slice(2, 6),
    participantCount: 12,
    accepted: 8,
    declined: 1,
    noResponse: 3,
    description: "Planning meeting for the 2023 Comedy Tour lineup and venues.",
  },
];

const tabs = ["UPCOMING", "PAST", "NOTES", "RECORDINGS"] as const;
type TabId = typeof tabs[number];

type ActionItem = { assignee: string; text: string };

type PastMeeting = {
  id: string;
  title: string;
  date: string;
  shortDate: string;
  meetingId: string;
  duration: string;
  participants: Participant[];
  participantCount: number;
  preview: string;
  hasNotes: boolean;
  summary: { paragraph: string; bullets: string[] };
  actionItems: ActionItem[];
};

const pastMeetings: PastMeeting[] = [
  {
    id: "iconic-series",
    title: "Iconic Series Watch Fest",
    date: "Mon, Apr 21, 9:00 - 10:00 AM",
    shortDate: "Apr 21",
    meetingId: "384 927 9209",
    duration: "60 min",
    participants: allParticipants.slice(0, 4),
    participantCount: 6,
    preview: "Reviewed program lineup and venue logistics.",
    hasNotes: true,
    summary: {
      paragraph:
        "The team gathered to plan the upcoming Iconic Series Watch Fest, covering the program lineup, marketing channels and on-site logistics.",
      bullets: [
        "Confirmed five featured screenings across two days.",
        "Aligned on a social-first marketing campaign starting next Monday.",
        "Locked in venue, AV partner and hospitality plan.",
      ],
    },
    actionItems: [
      { assignee: "Avery", text: "to finalize the screening schedule by Friday." },
      { assignee: "Bella", text: "to share the social campaign brief next Monday." },
    ],
  },
  {
    id: "tv-time-capsule",
    title: "Television Time Capsule",
    date: "Mon, Apr 21, 11:00 - 11:45 AM",
    shortDate: "Apr 21",
    meetingId: "927 384 1192",
    duration: "45 min",
    participants: allParticipants.slice(2, 7),
    participantCount: 8,
    preview: "Recapped curation themes and submission deadlines.",
    hasNotes: true,
    summary: {
      paragraph:
        "We walked through the curation themes for the Television Time Capsule and aligned on the submission and review deadlines for each contributing producer.",
      bullets: [
        "Three core themes selected: Saturday Mornings, Late Night, and Live Events.",
        "Submissions due end of next week with light edits during review.",
        "Final cut to be approved by stakeholders before publish.",
      ],
    },
    actionItems: [
      { assignee: "Carlos", text: "to circulate the submission template tomorrow." },
      { assignee: "Dana", text: "to coordinate stakeholder review next Thursday." },
      { assignee: "Erin", text: "to prepare the final publish checklist." },
    ],
  },
  {
    id: "amanda-turner",
    title: "Amanda Turner",
    date: "Sun, Apr 20, 3:00 - 3:30 PM",
    shortDate: "Apr 20",
    meetingId: "552 118 4421",
    duration: "30 min",
    participants: allParticipants.slice(0, 2),
    participantCount: 2,
    preview: "Quick sync on partnership next steps.",
    hasNotes: true,
    summary: {
      paragraph:
        "Amanda and the team aligned on the next steps for the partnership rollout, including timelines and primary points of contact.",
      bullets: [
        "Pilot scope confirmed for the first three accounts.",
        "Weekly check-ins added to the calendar starting next week.",
      ],
    },
    actionItems: [
      { assignee: "Amanda", text: "to send over the signed pilot agreement." },
    ],
  },
  {
    id: "samuel-aguilar",
    title: "Samuel Aguilar",
    date: "Sat, Apr 19, 1:00 - 1:30 PM",
    shortDate: "Apr 19",
    meetingId: "118 552 7732",
    duration: "30 min",
    participants: allParticipants.slice(3, 5),
    participantCount: 2,
    preview: "Discussed onboarding and access provisioning.",
    hasNotes: true,
    summary: {
      paragraph:
        "Samuel walked through the onboarding plan and what access he needs to start contributing in the first week.",
      bullets: [
        "Access requested for design and analytics tools.",
        "First week paired with Felix for ramp-up.",
      ],
    },
    actionItems: [
      { assignee: "Felix", text: "to schedule pairing sessions for next week." },
    ],
  },
];

const postMeetingSubTabs = ["Notes", "Transcript", "Whiteboard"] as const;
type PostMeetingSubTab = typeof postMeetingSubTabs[number];

const ParticipantAvatar = ({
  participant,
  size = "sm",
}: {
  participant: Participant;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  return (
    <div
      className={`${dim} ${participant.bg} flex items-center justify-center rounded-full border-2 border-white font-semibold text-white`}
      title={participant.name}
      data-testid={`avatar-${participant.id}`}
    >
      {participant.initials}
    </div>
  );
};

const AvatarStack = ({
  participants,
  total,
  size = "sm",
}: {
  participants: Participant[];
  total: number;
  size?: "sm" | "md";
}) => {
  const overflow = total - participants.length;
  const dim = size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  return (
    <div className="flex items-center -space-x-2">
      {participants.map((p) => (
        <ParticipantAvatar key={p.id} participant={p} size={size} />
      ))}
      {overflow > 0 && (
        <div
          className={`${dim} flex items-center justify-center rounded-full border-2 border-white bg-[#dddfe5] font-semibold text-[#323439]`}
          data-testid="avatar-overflow"
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

interface MeetingContentProps {
  bannerDismissed: boolean;
  onDismissBanner: () => void;
}

export const MeetingContent = ({
  bannerDismissed,
  onDismissBanner,
}: MeetingContentProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabId>("UPCOMING");
  const [selectedId, setSelectedId] = useState<string>(meetings[0].id);
  const [selectedPastId, setSelectedPastId] = useState<string | null>(null);
  const [pastSearch, setPastSearch] = useState("");
  const [postMeetingTab, setPostMeetingTab] = useState<PostMeetingSubTab>("Notes");
  const [introOpen, setIntroOpen] = useState(false);
  const [featureIntroOpen, setFeatureIntroOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareBookingType, setShareBookingType] = useState("therapy-session-natalie");
  const [shareMessage, setShareMessage] = useState("");
  const [shareSendVia, setShareSendVia] = useState("email");
  const [shareRecipient, setShareRecipient] = useState("");
  const [shareFrom, setShareFrom] = useState("");
  const [meetingWindowOpen, setMeetingWindowOpen] = useState(false);
  const { toast } = useToast();
  const flow = useFlowParam();

  const openShareDialog = () => {
    setShareMessage("");
    setShareRecipient("");
    setShareBookingType("therapy-session-natalie");
    setShareSendVia("email");
    setShareOpen(true);
  };
  const handleSendShare = () => {
    setShareOpen(false);
    toast({ description: "Booking link sent" });
  };

  useEffect(() => {
    if (
      flow === "post-meeting" ||
      flow === "after-meeting-share-link" ||
      flow === "after-post-meeting-share-link"
    ) {
      setActiveTab("PAST");
      setSelectedPastId("tv-time-capsule");
    } else if (flow === "in-meeting") {
      setActiveTab("UPCOMING");
    }
  }, [flow]);

  const bookingLinkPurchased =
    flow === "after-meeting-share-link" || flow === "after-post-meeting-share-link";
  const sharePopoverVariant = flow === "after-post-meeting-share-link";
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const openSharePopover = () => {
    setShareMessage("");
    setShareRecipient("");
    setShareBookingType("therapy-session-natalie");
    setShareSendVia("email");
    setSharePopoverOpen(true);
  };
  const handleSendSharePopover = () => {
    setSharePopoverOpen(false);
    toast({ description: "Booking link sent" });
  };

  useEffect(() => {
    if (activeTab === "PAST") {
      setSelectedPastId((cur) => cur ?? "tv-time-capsule");
    }
  }, [activeTab]);

  const selected = meetings.find((m) => m.id === selectedId) ?? meetings[0];
  const selectedPast =
    activeTab === "PAST" && selectedPastId
      ? pastMeetings.find((m) => m.id === selectedPastId) ?? null
      : null;
  const filteredPastMeetings = pastMeetings.filter((m) =>
    m.title.toLowerCase().includes(pastSearch.toLowerCase()),
  );

  const renderPastRow = (m: PastMeeting) => {
    const isSelected = m.id === selectedPastId;
    return (
      <button
        key={m.id}
        type="button"
        onClick={() => setSelectedPastId(m.id)}
        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
          isSelected ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"
        }`}
        data-testid={`row-past-meeting-${m.id}`}
      >
        <ParticipantAvatar participant={m.participants[0]} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="truncate font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] text-black"
              data-testid={`text-past-meeting-title-${m.id}`}
            >
              {m.title}
            </span>
            {m.hasNotes && (
              <span
                className="rounded-full bg-[#f5f6f9] px-2 py-0.5 font-detail-bold text-[10px] font-bold uppercase tracking-wide text-[#323439]"
                data-testid={`chip-notes-${m.id}`}
              >
                Notes
              </span>
            )}
          </div>
          <span className="truncate font-descriptor text-[length:var(--descriptor-font-size)] font-[number:var(--descriptor-font-weight)] leading-[var(--descriptor-line-height)] text-[#323439]">
            {m.preview}
          </span>
        </div>
        <span
          className="shrink-0 font-descriptor text-[length:var(--descriptor-font-size)] text-[#323439]"
          data-testid={`text-past-date-${m.id}`}
        >
          {m.shortDate}
        </span>
      </button>
    );
  };

  const renderMeetingRow = (m: Meeting) => {
    const isSelected = m.id === selectedId;
    const accent =
      m.status === "now"
        ? "bg-[#16a937]"
        : m.status === "soon"
          ? "bg-[#fe8624]"
          : "";
    const accentBg =
      m.status === "now"
        ? "bg-[#e6f7ec]"
        : m.status === "soon"
          ? "bg-[#fff1e1]"
          : "";
    return (
      <button
        key={m.id}
        type="button"
        onClick={() => setSelectedId(m.id)}
        className={`relative flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
          isSelected ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"
        }`}
        data-testid={`row-meeting-${m.id}`}
      >
        {m.status && (
          <span
            className={`absolute left-0 top-0 h-full w-1 ${accent}`}
            aria-hidden="true"
          />
        )}
        <div
          className={`flex w-[72px] shrink-0 flex-col items-start rounded-md px-2 py-1 ${accentBg}`}
        >
          <span className="font-detail-bold text-[11px] font-semibold leading-tight text-[#323439]">
            {m.timeLabel}
          </span>
          {m.timeSubLabel && (
            <span className="font-detail-bold text-[11px] font-semibold leading-tight text-[#323439]">
              {m.timeSubLabel}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className="truncate font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] text-black"
            data-testid={`text-meeting-title-${m.id}`}
          >
            {m.title}
          </span>
          <span className="truncate font-descriptor text-[length:var(--descriptor-font-size)] font-[number:var(--descriptor-font-weight)] leading-[var(--descriptor-line-height)] text-[#0040dd]">
            {m.url}
          </span>
          <div className="pt-1">
            <AvatarStack
              participants={m.participants}
              total={m.participantCount}
            />
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
    {meetingWindowOpen && (
      <div
        className="fixed inset-0 z-[60] bg-black/40"
        data-testid="overlay-meeting-window"
      >
        <MeetingWindow onClose={() => setMeetingWindowOpen(false)} />
      </div>
    )}
    <section className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* LEFT PANE */}
        <div className="flex w-full shrink-0 flex-col border-b border-[#dddfe5] bg-white md:w-[400px] md:border-b-0 md:border-r">
          <header className="flex items-center justify-between px-4 pt-4 pb-3">
            <h2
              className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]"
              data-testid="text-meetings-title"
            >
              Meetings
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                onClick={() => setMeetingWindowOpen(true)}
                className="h-8 gap-1 rounded-md px-2 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-[#323439] hover:bg-[#f5f6f9]"
                data-testid="button-join"
              >
                <LogIn className="h-4 w-4" />
                Join
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9]"
                aria-label="Edit"
                data-testid="button-edit-meetings"
              >
                <Edit3 className="h-4 w-4 text-[#323439]" />
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9]"
                aria-label="Settings"
                data-testid="button-meeting-settings"
              >
                <Settings className="h-4 w-4 text-[#323439]" />
              </Button>
            </div>
          </header>

          {/* Tabs */}
          <nav
            className="flex items-center gap-1 border-b border-[#dddfe5] px-2"
            role="tablist"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center gap-1 px-3 py-3 font-detail-bold text-[11px] font-bold tracking-wider ${
                    isActive ? "text-[#0040dd]" : "text-[#323439]"
                  }`}
                  data-testid={`tab-${tab.toLowerCase()}`}
                >
                  {tab === "NOTES" && <Sparkles className="h-3 w-3" />}
                  {tab}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-px h-[2px] bg-[#0040dd]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {activeTab === "UPCOMING" ? (
              <>
                {/* Promo banner */}
                {!bannerDismissed && (
                  <div className="px-4 pt-4">
                    <FeatureIntroBanner
                      data-testid="banner-promo"
                      title="Add online booking to your business"
                      description="Let customers book time with you based on your availability. Create booking types, share your link, and manage appointments in one place."
                      action={{
                        label: "Find out more",
                        onClick: () => setFeatureIntroOpen(true),
                        testId: "button-find-out-more",
                      }}
                      onDismiss={onDismissBanner}
                      dismissAriaLabel="Dismiss banner"
                      dismissTestId="button-dismiss-banner"
                    />
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-start justify-around gap-3 px-4 pt-4 pb-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0040dd] text-white shadow-sm hover:bg-[#0037be]"
                      data-testid="button-start-meeting"
                    >
                      <Video className="h-6 w-6" />
                    </button>
                    <span className="flex items-center gap-0.5 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black">
                      Start
                      <ChevronDown className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-[#dddfe5] bg-white text-[#323439] hover:bg-[#f5f6f9]"
                      data-testid="button-schedule-meeting"
                    >
                      <Calendar className="h-6 w-6" />
                    </button>
                    <span className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black">
                      Schedule
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-[#dddfe5] bg-white text-[#323439] hover:bg-[#f5f6f9]"
                      data-testid="button-share-in-room"
                    >
                      <Upload className="h-6 w-6" />
                    </button>
                    <span className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black">
                      Share in room
                    </span>
                  </div>
                </div>

                {/* Today section */}
                <div className="px-4 pt-4 pb-2">
                  <h3
                    className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] text-black"
                    data-testid="text-today-header"
                  >
                    Today
                  </h3>
                </div>
                <div className="flex flex-col">
                  {meetings.map((m, idx) => (
                    <div key={m.id}>
                      {idx > 0 && <Separator className="bg-[#dddfe5]" />}
                      {renderMeetingRow(m)}
                    </div>
                  ))}
                </div>
              </>
            ) : activeTab === "PAST" ? (
              <>
                <div className="px-4 pt-3 pb-2">
                  <div className="flex h-9 items-center gap-2 rounded-md bg-[#f5f6f9] px-3">
                    <Search className="h-4 w-4 text-[#323439]" />
                    <input
                      value={pastSearch}
                      onChange={(e) => setPastSearch(e.target.value)}
                      placeholder="Search past meetings"
                      className="flex-1 bg-transparent font-main-text text-[length:var(--main-text-font-size)] text-black placeholder:text-[#7d7d7d] outline-none"
                      data-testid="input-search-past"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  {filteredPastMeetings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                      <CalendarDays className="h-10 w-10 text-[#dddfe5]" />
                      <p className="font-subtitle text-[length:var(--subtitle-font-size)] text-[#323439]">
                        No past meetings match
                      </p>
                    </div>
                  ) : (
                    filteredPastMeetings.map((m, idx) => (
                      <div key={m.id}>
                        {idx > 0 && <Separator className="bg-[#dddfe5]" />}
                        {renderPastRow(m)}
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div
                className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center"
                data-testid={`empty-state-${activeTab.toLowerCase()}`}
              >
                <CalendarDays className="h-10 w-10 text-[#dddfe5]" />
                <p className="font-subtitle text-[length:var(--subtitle-font-size)] text-[#323439]">
                  Nothing in {activeTab.toLowerCase()} yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE */}
        {activeTab === "PAST" && !selectedPast ? null : (
        <div className="flex min-w-0 flex-1 flex-col bg-white" data-testid="pane-detail-right">
          <header className="flex items-center justify-end gap-1 px-4 pt-4">
            {activeTab !== "PAST" && (
              <>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
                  aria-label="Report"
                  data-testid="button-report"
                >
                  <ReportIssueMd />
                </Button>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
                  aria-label="Edit"
                  data-testid="button-edit-details"
                >
                  <EditPenMd />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
              aria-label="Close"
              data-testid="button-close-details"
              onClick={() => {
                if (activeTab === "PAST") setSelectedPastId(null);
              }}
            >
              <Xmd />
            </Button>
          </header>

          {selectedPast ? (
            <div
              className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pt-2 pb-6"
              data-testid="pane-post-meeting-detail"
            >
              <div className="flex flex-col items-center gap-1 py-4 text-center">
                <h2
                  className="font-headline text-[24px] font-[number:var(--headline-font-weight)] leading-[32px] tracking-[-0.2px] text-black"
                  data-testid="text-past-detail-title"
                >
                  {selectedPast.title}
                </h2>

                <div
                  className="flex flex-col items-center gap-1 font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)]"
                  data-testid="text-past-detail-meta"
                >
                  <p className="text-[#72757a]">
                    <span>{selectedPast.date}</span>
                    <span className="mx-1">·</span>
                    <span>ID {selectedPast.meetingId}</span>
                  </p>
                  <p className="text-[#323439]">{selectedPast.duration}</p>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1">
                  <AvatarStack
                    participants={selectedPast.participants}
                    total={selectedPast.participantCount}
                    size="md"
                  />
                  <button
                    type="button"
                    className="flex h-5 w-5 items-center justify-center rounded-md hover:bg-[#f5f6f9]"
                    aria-label="Show participants"
                    data-testid="button-past-participants-caret"
                  >
                    <ChevronDown className="h-4 w-4 text-[#323439]" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <nav
                  className="flex items-center gap-1"
                  role="tablist"
                >
                  {postMeetingSubTabs.map((t) => {
                    const isActive = postMeetingTab === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setPostMeetingTab(t)}
                        className={`rounded-full px-3 py-1 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] text-[#323439] transition-colors ${
                          isActive
                            ? "border border-[#dddfe5] bg-[#dddfe580]"
                            : "border border-transparent hover:bg-[#f5f6f9]"
                        }`}
                        data-testid={`tab-post-meeting-${t.toLowerCase()}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
                    aria-label="Translate"
                    data-testid="button-translate-notes"
                  >
                    <GlobeMd />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
                    aria-label="Share"
                    data-testid="button-share-notes"
                  >
                    <ShareMd />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md p-0 hover:bg-[#f5f6f9] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#323439]"
                    aria-label="More"
                    data-testid="button-more-notes"
                  >
                    <OverflowMd />
                  </Button>
                </div>
              </div>

              {postMeetingTab === "Notes" ? (
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full border border-[#fe8624] bg-white px-2 py-0.5 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-[#323439]"
                      data-testid="pill-generated-by-ai"
                    >
                      <Sparkles className="h-3 w-3 text-[#fe8624]" />
                      Generated by <span className="font-semibold text-[#fe8624]">AI</span>
                    </span>
                  </div>

                  <section className="flex flex-col gap-2">
                    <h3 className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] text-black">
                      Summary
                    </h3>
                    <p
                      className="font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-[#323439]"
                      data-testid="text-summary-paragraph"
                    >
                      {selectedPast.summary.paragraph}
                    </p>
                    <ul className="ml-5 flex list-disc flex-col gap-1 font-main-text text-[length:var(--main-text-font-size)] text-[#323439]">
                      {selectedPast.summary.bullets.map((b, i) => (
                        <li key={i} data-testid={`text-summary-bullet-${i}`}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="flex flex-col gap-2">
                    <h3 className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] text-black">
                      Action items
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {selectedPast.actionItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-main-text text-[length:var(--main-text-font-size)] text-[#323439]"
                          data-testid={`item-action-${i}`}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#323439]"
                          />
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <span>
                              <span className="font-semibold text-[#0040dd]">
                                {item.assignee}
                              </span>{" "}
                              {item.text}
                            </span>
                            {item.assignee === "Dana" &&
                              (bookingLinkPurchased ? (
                                sharePopoverVariant ? (
                                  <Popover
                                    open={sharePopoverOpen}
                                    onOpenChange={(o) => (o ? openSharePopover() : setSharePopoverOpen(false))}
                                  >
                                    <PopoverTrigger asChild>
                                      <button
                                        type="button"
                                        className="inline-flex items-center gap-1 self-start font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-[#0040dd] hover:underline"
                                        data-testid={`button-share-booking-link-${i}`}
                                      >
                                        <Lightbulb className="h-3.5 w-3.5" />
                                        Share booking link
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      side="bottom"
                                      align="start"
                                      className="w-[360px] rounded-xl border border-[#dddfe5] bg-white p-4 shadow-lg"
                                      data-testid="popover-share-booking-link"
                                    >
                                      <div className="flex flex-col gap-3">
                                        <div className="font-headline text-[16px] font-semibold text-black" data-testid="text-share-popover-title">
                                          Share booking link
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                          <Label htmlFor="share-popover-type" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                            Booking type
                                          </Label>
                                          <Select value={shareBookingType} onValueChange={setShareBookingType}>
                                            <SelectTrigger id="share-popover-type" className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black" data-testid="select-share-popover-type">
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
                                          <Label htmlFor="share-popover-via" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                            Send via
                                          </Label>
                                          <Select value={shareSendVia} onValueChange={setShareSendVia}>
                                            <SelectTrigger id="share-popover-via" className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black" data-testid="select-share-popover-via">
                                              <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="email">Email</SelectItem>
                                              <SelectItem value="text">Text</SelectItem>
                                              <SelectItem value="chat">Chat</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        {shareSendVia === "text" && (
                                          <>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                Text message
                                              </Label>
                                              <Textarea
                                                id="share-popover-message"
                                                value={shareMessage}
                                                onChange={(e) => setShareMessage(e.target.value)}
                                                placeholder="Enter text message"
                                                className="min-h-[64px] rounded-md border border-[#dddfe5] bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="textarea-share-popover-message"
                                              />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-to" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                To
                                              </Label>
                                              <Input
                                                id="share-popover-to"
                                                value={shareRecipient}
                                                onChange={(e) => setShareRecipient(e.target.value)}
                                                placeholder="(555) 555-5555"
                                                className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="input-share-popover-to"
                                              />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-from" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                From
                                              </Label>
                                              <Input
                                                id="share-popover-from"
                                                value={shareFrom}
                                                onChange={(e) => setShareFrom(e.target.value)}
                                                placeholder="(555) 555-5555"
                                                className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="input-share-popover-from"
                                              />
                                            </div>
                                          </>
                                        )}
                                        {shareSendVia === "chat" && (
                                          <>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-conversation" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                Conversation
                                              </Label>
                                              <Input
                                                id="share-popover-conversation"
                                                value={shareRecipient}
                                                onChange={(e) => setShareRecipient(e.target.value)}
                                                placeholder="Select conversation"
                                                className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="input-share-popover-conversation"
                                              />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                Message
                                              </Label>
                                              <Textarea
                                                id="share-popover-message"
                                                value={shareMessage}
                                                onChange={(e) => setShareMessage(e.target.value)}
                                                placeholder="Enter message"
                                                className="min-h-[64px] rounded-md border border-[#dddfe5] bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="textarea-share-popover-message"
                                              />
                                            </div>
                                          </>
                                        )}
                                        {shareSendVia === "email" && (
                                          <>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-email" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                Email
                                              </Label>
                                              <Input
                                                id="share-popover-email"
                                                value={shareRecipient}
                                                onChange={(e) => setShareRecipient(e.target.value)}
                                                placeholder="name@example.com"
                                                className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="input-share-popover-email"
                                              />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                              <Label htmlFor="share-popover-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                                                Message
                                              </Label>
                                              <Textarea
                                                id="share-popover-message"
                                                value={shareMessage}
                                                onChange={(e) => setShareMessage(e.target.value)}
                                                placeholder="Enter message"
                                                className="min-h-[64px] rounded-md border border-[#dddfe5] bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black"
                                                data-testid="textarea-share-popover-message"
                                              />
                                            </div>
                                          </>
                                        )}
                                        <div className="flex justify-end gap-2 pt-1">
                                          <Button
                                            variant="outline"
                                            onClick={() => setSharePopoverOpen(false)}
                                            className="h-8 rounded-[10px] border border-[#dddfe5] bg-white px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black hover:bg-[#f5f6f9]"
                                            data-testid="button-share-popover-cancel"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={handleSendSharePopover}
                                            disabled={shareRecipient.trim().length === 0}
                                            className="h-8 rounded-[10px] bg-[#0040dd] px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-white hover:bg-[#0037be] disabled:bg-[#dddfe5] disabled:text-white"
                                            data-testid="button-share-popover-send"
                                          >
                                            Send
                                          </Button>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={openShareDialog}
                                    className="inline-flex items-center gap-1 self-start font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-[#0040dd] hover:underline"
                                    data-testid={`button-share-booking-link-${i}`}
                                  >
                                    <Lightbulb className="h-3.5 w-3.5" />
                                    Share booking link
                                  </button>
                                )
                              ) : (
                                <Popover
                                  open={introOpen}
                                  onOpenChange={setIntroOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-1 self-start font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-[#0040dd] hover:underline"
                                      data-testid={`button-share-booking-link-${i}`}
                                    >
                                      <Lightbulb className="h-3.5 w-3.5" />
                                      Share booking link
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    side="bottom"
                                    align="start"
                                    className="w-[280px] border-0 bg-transparent p-0 shadow-none"
                                    data-testid="popover-booking-intro"
                                  >
                                    <FeatureIntroBanner
                                      title="Send a booking link"
                                      description="Share your availability with attendees so they can book a follow-up time that works."
                                      action={{
                                        label: "Find out more",
                                        onClick: () => {
                                          setIntroOpen(false);
                                          setFeatureIntroOpen(true);
                                        },
                                        testId: "button-intro-find-out-more",
                                      }}
                                      onDismiss={() => setIntroOpen(false)}
                                      dismissTestId="button-intro-dismiss"
                                    />
                                  </PopoverContent>
                                </Popover>
                              ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : (
                <div
                  className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#dddfe5] p-8 text-center font-main-text text-[length:var(--main-text-font-size)] text-[#323439]"
                  data-testid={`placeholder-post-meeting-${postMeetingTab.toLowerCase()}`}
                >
                  {postMeetingTab} coming soon.
                </div>
              )}
            </div>
          ) : (
          <div className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-y-auto px-6 pt-2 pb-6">
            <h2
              className="text-center font-headline text-[24px] font-[number:var(--headline-font-weight)] leading-[32px] text-black"
              data-testid="text-detail-title"
            >
              {selected.title}
            </h2>

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-[#323439]">
                <Calendar className="h-4 w-4 text-[#323439]" />
                <span data-testid="text-detail-date">{selected.date}</span>
              </div>
              <div className="flex items-center gap-2 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-[#323439]">
                <MapPin className="h-4 w-4 text-[#323439]" />
                <span data-testid="text-detail-location">
                  {selected.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setMeetingWindowOpen(true)}
                className="h-9 gap-2 rounded-[10px] bg-[#0040dd] px-4 font-subtitle text-[length:var(--subtitle-font-size)] text-white hover:bg-[#0037be]"
                data-testid="button-detail-join"
              >
                <LogIn className="h-4 w-4" />
                Join
              </Button>
              <Button
                variant="outline"
                className="h-9 gap-2 rounded-[10px] border border-solid border-[#dddfe5] bg-white px-4 font-subtitle text-[length:var(--subtitle-font-size)] text-black hover:bg-[#f5f6f9]"
                data-testid="button-detail-join-from-room"
              >
                <Video className="h-4 w-4" />
                Join from room
              </Button>
            </div>

            <Card
              className="w-full rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none"
              data-testid="card-participants"
            >
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-1 font-subtitle text-[length:var(--subtitle-font-size)] text-black">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                  <span data-testid="text-participant-count">
                    Participants ({selected.participantCount})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-descriptor text-[length:var(--descriptor-font-size)] text-[#323439]">
                  <span data-testid="text-accepted">
                    Accepted ({selected.accepted})
                  </span>
                  <span className="text-[#dddfe5]">|</span>
                  <span data-testid="text-declined">
                    Declined ({selected.declined})
                  </span>
                  <span className="text-[#dddfe5]">|</span>
                  <span data-testid="text-no-response">
                    Didn't respond ({selected.noResponse})
                  </span>
                </div>
                <div className="pt-1">
                  <AvatarStack
                    participants={allParticipants.slice(
                      0,
                      Math.min(8, selected.participantCount),
                    )}
                    total={selected.participantCount}
                    size="md"
                  />
                </div>
              </CardContent>
            </Card>

            <Card
              className="w-full rounded-xl border border-solid border-[#dddfe5] bg-white shadow-none"
              data-testid="card-description"
            >
              <CardContent className="p-4">
                <div
                  className="whitespace-pre-wrap font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-[#323439]"
                  data-testid="text-detail-description"
                >
                  {selected.description}
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
        )}

      <AvaUpsellDialog
        open={featureIntroOpen}
        onOpenChange={setFeatureIntroOpen}
      />

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent
          className="max-w-[440px] gap-4 rounded-xl bg-white p-6"
          data-testid="dialog-share-booking-link"
        >
          <DialogHeader>
            <DialogTitle
              className="font-headline text-[20px] font-semibold text-black"
              data-testid="text-share-booking-title"
            >
              Share booking link
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="share-booking-type"
                className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black"
              >
                Select booking type
              </Label>
              <Select
                value={shareBookingType}
                onValueChange={setShareBookingType}
              >
                <SelectTrigger
                  id="share-booking-type"
                  className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                  data-testid="select-share-booking-type"
                >
                  <SelectValue placeholder="Select a booking type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="therapy-session-natalie">
                    Therapy session with Natalie
                  </SelectItem>
                  <SelectItem value="initial-consultation">
                    Initial consultation
                  </SelectItem>
                  <SelectItem value="follow-up-15">
                    15 min follow-up
                  </SelectItem>
                  <SelectItem value="discovery-call-30">
                    30 min discovery call
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="share-send-via"
                className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black"
              >
                Send via
              </Label>
              <Select value={shareSendVia} onValueChange={setShareSendVia}>
                <SelectTrigger
                  id="share-send-via"
                  className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                  data-testid="select-share-send-via"
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

            {shareSendVia === "text" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-message" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    Text message
                  </Label>
                  <Textarea
                    id="share-message"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    placeholder="Enter text message"
                    className="min-h-[88px] rounded-md border border-[#dddfe5] bg-white p-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="textarea-share-message"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-to" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    To
                  </Label>
                  <Input
                    id="share-to"
                    value={shareRecipient}
                    onChange={(e) => setShareRecipient(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="input-share-to"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-from" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    From
                  </Label>
                  <Input
                    id="share-from"
                    value={shareFrom}
                    onChange={(e) => setShareFrom(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="input-share-from"
                  />
                </div>
              </>
            )}
            {shareSendVia === "chat" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-conversation" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    Conversation
                  </Label>
                  <Input
                    id="share-conversation"
                    value={shareRecipient}
                    onChange={(e) => setShareRecipient(e.target.value)}
                    placeholder="Select conversation"
                    className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="input-share-conversation"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-message" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    Message
                  </Label>
                  <Textarea
                    id="share-message"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    placeholder="Enter message"
                    className="min-h-[88px] rounded-md border border-[#dddfe5] bg-white p-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="textarea-share-message"
                  />
                </div>
              </>
            )}
            {shareSendVia === "email" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-email" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    Email
                  </Label>
                  <Input
                    id="share-email"
                    value={shareRecipient}
                    onChange={(e) => setShareRecipient(e.target.value)}
                    placeholder="name@example.com"
                    className="h-10 rounded-md border border-[#dddfe5] bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="input-share-email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="share-message" className="font-subtitle text-[length:var(--subtitle-font-size)] font-semibold text-black">
                    Message
                  </Label>
                  <Textarea
                    id="share-message"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    placeholder="Enter message"
                    className="min-h-[88px] rounded-md border border-[#dddfe5] bg-white p-3 font-main-text text-[length:var(--main-text-font-size)] text-black"
                    data-testid="textarea-share-message"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShareOpen(false)}
              className="h-9 rounded-[10px] border border-[#dddfe5] bg-white px-4 font-subtitle text-[length:var(--subtitle-font-size)] text-black hover:bg-[#f5f6f9]"
              data-testid="button-share-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendShare}
              disabled={shareRecipient.trim().length === 0}
              className="h-9 rounded-[10px] bg-[#0040dd] px-4 font-subtitle text-[length:var(--subtitle-font-size)] text-white hover:bg-[#0037be] disabled:bg-[#dddfe5] disabled:text-white"
              data-testid="button-share-send"
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
    </>
  );
};
