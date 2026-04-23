import { useEffect, useState } from "react";
import { useFlowParam } from "../lib/flows";
import {
  CalendarMd,
  ArrowDownMd,
  EditMd,
  BookmarkMd,
  ProfileMd,
  MapPinMd,
  SearchMd,
  SettingsMd,
  AiStarsMd,
  UploadMd,
  StartVideoMd,
  Xmd
} from "@ringcentral/spring-icon";
import { AvaUpsellDialog } from "../components/AvaUpsellDialog";
import { Button, Popover } from "@ringcentral/spring-ui";
import { FeatureIntroBanner } from "../components/FeatureIntroBanner";
import { MeetingWindow } from "./MeetingWindow";
import { useSnackbar } from "../components/SuiSnackbar";
import { SuiSnackbar } from "../components/SuiSnackbar";

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
          className={`${dim} flex items-center justify-center rounded-full border-2 border-white bg-[#dddfe5] font-semibold text-neutral-b1`}
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
  const [featureIntroOpen, setFeatureIntroOpen] = useState(false);
  const [meetingWindowOpen, setMeetingWindowOpen] = useState(false);
  const [introPopoverAnchor, setIntroPopoverAnchor] = useState<HTMLElement | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const flow = useFlowParam();

  useEffect(() => {
    if (flow === "post-meeting" || flow === "after-meeting-share-link") {
      setActiveTab("PAST");
      setSelectedPastId("tv-time-capsule");
    } else if (flow === "in-meeting") {
      setActiveTab("UPCOMING");
    }
  }, [flow]);

  const bookingLinkPurchased = flow === "after-meeting-share-link";

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
          isSelected ? "bg-cobranding-b/8" : "hover:bg-neutral-b2"
        }`}
        data-testid={`row-past-meeting-${m.id}`}
      >
        <ParticipantAvatar participant={m.participants[0]} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="truncate typography-subtitle text-neutral-b0"
              data-testid={`text-past-meeting-title-${m.id}`}
            >
              {m.title}
            </span>
            {m.hasNotes && (
              <span
                className="rounded-full bg-neutral-b2 px-2 py-0.5 typography-subtitleBold text-[10px] font-bold uppercase tracking-wide text-neutral-b1"
                data-testid={`chip-notes-${m.id}`}
              >
                Notes
              </span>
            )}
          </div>
          <span className="truncate typography-descriptor text-neutral-b1">
            {m.preview}
          </span>
        </div>
        <span
          className="shrink-0 typography-descriptor text-neutral-b1"
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
        ? "bg-success"
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
          isSelected ? "bg-cobranding-b/8" : "hover:bg-neutral-b2"
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
          <span className="typography-subtitleBold text-[11px] font-semibold leading-tight text-neutral-b1">
            {m.timeLabel}
          </span>
          {m.timeSubLabel && (
            <span className="typography-subtitleBold text-[11px] font-semibold leading-tight text-neutral-b1">
              {m.timeSubLabel}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className="truncate typography-subtitle text-neutral-b0"
            data-testid={`text-meeting-title-${m.id}`}
          >
            {m.title}
          </span>
          <span className="truncate typography-descriptor text-cobranding-f">
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
        <div className="flex w-full shrink-0 flex-col border-b border-neutral-b0-t20 bg-white md:w-[400px] md:border-b-0 md:border-r">
          <header className="flex items-center justify-between px-4 pt-4 pb-3">
            <h2
              className="typography-title text-neutral-b0"
              data-testid="text-meetings-title"
            >
              Meetings
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="text"
                onClick={() => setMeetingWindowOpen(true)}
                className="h-8 gap-1 rounded-md px-2 typography-subtitleMini text-neutral-b1 hover:bg-neutral-b2"
                data-testid="button-join"
              >
                <ProfileMd className="h-4 w-4" />
                Join
              </Button>
              <Button
                variant="text"
                className="h-8 w-8 rounded-md p-0 hover:bg-neutral-b2 min-w-0"
                aria-label="Edit"
                data-testid="button-edit-meetings"
              >
                <EditMd className="h-4 w-4 text-neutral-b1" />
              </Button>
              <Button
                variant="text"
                className="h-8 w-8 rounded-md p-0 hover:bg-neutral-b2 min-w-0"
                aria-label="Settings"
                data-testid="button-meeting-settings"
              >
                <SettingsMd className="h-4 w-4 text-neutral-b1" />
              </Button>
            </div>
          </header>

          {/* Tabs */}
          <nav
            className="flex items-center gap-1 border-b border-neutral-b0-t20 px-2"
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
                  className={`relative flex items-center gap-1 px-3 py-3 typography-subtitleBold text-[11px] font-bold tracking-wider ${
                    isActive ? "text-cobranding-f" : "text-neutral-b1"
                  }`}
                  data-testid={`tab-${tab.toLowerCase()}`}
                >
                  {tab === "NOTES" && <AiStarsMd className="h-3 w-3" />}
                  {tab}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-px h-[2px] bg-cobranding-b" />
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
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-cobranding-b text-white shadow-sm hover:bg-[#0037be]"
                      data-testid="button-start-meeting"
                    >
                      <StartVideoMd className="h-6 w-6" />
                    </button>
                    <span className="flex items-center gap-0.5 typography-subtitleMini text-neutral-b0">
                      Start
                      <ArrowDownMd className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-neutral-b0-t20 bg-white text-neutral-b1 hover:bg-neutral-b2"
                      data-testid="button-schedule-meeting"
                    >
                      <CalendarMd className="h-6 w-6" />
                    </button>
                    <span className="typography-subtitleMini text-neutral-b0">
                      Schedule
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-solid border-neutral-b0-t20 bg-white text-neutral-b1 hover:bg-neutral-b2"
                      data-testid="button-share-in-room"
                    >
                      <UploadMd className="h-6 w-6" />
                    </button>
                    <span className="typography-subtitleMini text-neutral-b0">
                      Share in room
                    </span>
                  </div>
                </div>

                {/* Today section */}
                <div className="px-4 pt-4 pb-2">
                  <h3
                    className="typography-subtitle text-neutral-b0"
                    data-testid="text-today-header"
                  >
                    Today
                  </h3>
                </div>
                <div className="flex flex-col">
                  {meetings.map((m, idx) => (
                    <div key={m.id}>
                      {idx > 0 && <div className="h-px w-full bg-neutral-b0-t10" />}
                      {renderMeetingRow(m)}
                    </div>
                  ))}
                </div>
              </>
            ) : activeTab === "PAST" ? (
              <>
                <div className="px-4 pt-3 pb-2">
                  <div className="flex h-9 items-center gap-2 rounded-md bg-neutral-b2 px-3">
                    <SearchMd className="h-4 w-4 text-neutral-b1" />
                    <input
                      value={pastSearch}
                      onChange={(e) => setPastSearch(e.target.value)}
                      placeholder="Search past meetings"
                      className="flex-1 bg-transparent typography-mainText text-neutral-b0 placeholder:text-neutral-b3 outline-none"
                      data-testid="input-search-past"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  {filteredPastMeetings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                      <CalendarMd className="h-10 w-10 text-neutral-b0-t20" />
                      <p className="typography-subtitle text-neutral-b1">
                        No past meetings match
                      </p>
                    </div>
                  ) : (
                    filteredPastMeetings.map((m, idx) => (
                      <div key={m.id}>
                        {idx > 0 && <div className="h-px w-full bg-neutral-b0-t10" />}
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
                <CalendarMd className="h-10 w-10 text-neutral-b0-t20" />
                <p className="typography-subtitle text-neutral-b1">
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
                  variant="text"
                  className="h-8 w-8 rounded-md p-0 hover:bg-neutral-b2 min-w-0"
                  aria-label="Report"
                  data-testid="button-report"
                >
                  <BookmarkMd className="h-4 w-4 text-neutral-b1" />
                </Button>
                <Button
                  variant="text"
                  className="h-8 w-8 rounded-md p-0 hover:bg-neutral-b2 min-w-0"
                  aria-label="Edit"
                  data-testid="button-edit-details"
                >
                  <EditMd className="h-4 w-4 text-neutral-b1" />
                </Button>
              </>
            )}
            <Button
              variant="text"
              className="h-8 w-8 rounded-md p-0 hover:bg-neutral-b2 min-w-0"
              aria-label="Close"
              data-testid="button-close-details"
              onClick={() => {
                if (activeTab === "PAST") setSelectedPastId(null);
              }}
            >
              <Xmd className="h-4 w-4 text-neutral-b1" />
            </Button>
          </header>

          {selectedPast ? (
            <div
              className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pt-2 pb-6"
              data-testid="pane-post-meeting-detail"
            >
              <h2
                className="typography-headline text-[24px] leading-[32px] text-neutral-b0"
                data-testid="text-past-detail-title"
              >
                {selectedPast.title}
              </h2>

              <div
                className="flex flex-wrap items-center gap-x-2 gap-y-1 typography-subtitleMini text-neutral-b1"
                data-testid="text-past-detail-meta"
              >
                <span>{selectedPast.date}</span>
                <span className="text-neutral-b0-t20">·</span>
                <span>ID {selectedPast.meetingId}</span>
                <span className="text-neutral-b0-t20">·</span>
                <span>{selectedPast.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <AvatarStack
                  participants={selectedPast.participants}
                  total={selectedPast.participantCount}
                  size="md"
                />
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-neutral-b2"
                  aria-label="Show participants"
                  data-testid="button-past-participants-caret"
                >
                  <ArrowDownMd className="h-4 w-4 text-neutral-b1" />
                </button>
              </div>

              <nav
                className="flex items-center gap-1 border-b border-neutral-b0-t20"
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
                      className={`relative px-3 py-2 typography-subtitleMini ${
                        isActive
                          ? "font-semibold text-cobranding-f"
                          : "text-neutral-b1"
                      }`}
                      data-testid={`tab-post-meeting-${t.toLowerCase()}`}
                    >
                      {t}
                      {isActive && (
                        <span className="absolute inset-x-2 -bottom-px h-[2px] bg-cobranding-b" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {postMeetingTab === "Notes" ? (
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-neutral-b2 px-2 py-0.5 typography-subtitleBold text-[10px] font-bold uppercase tracking-wide text-neutral-b1"
                      data-testid="pill-generated-by-ai"
                    >
                      <AiStarsMd className="h-3 w-3" />
                      Generated by AI
                    </span>
                  </div>

                  <section className="flex flex-col gap-2">
                    <h3 className="typography-subtitle text-neutral-b0">
                      Summary
                    </h3>
                    <p
                      className="typography-mainText text-neutral-b1"
                      data-testid="text-summary-paragraph"
                    >
                      {selectedPast.summary.paragraph}
                    </p>
                    <ul className="ml-5 flex list-disc flex-col gap-1 typography-mainText text-neutral-b1">
                      {selectedPast.summary.bullets.map((b, i) => (
                        <li key={i} data-testid={`text-summary-bullet-${i}`}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="flex flex-col gap-2">
                    <h3 className="typography-subtitle text-neutral-b0">
                      Action items
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {selectedPast.actionItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 typography-mainText text-neutral-b1"
                          data-testid={`item-action-${i}`}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-b5"
                          />
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <span>
                              <span className="font-semibold text-cobranding-f">
                                {item.assignee}
                              </span>{" "}
                              {item.text}
                            </span>
                            {item.assignee === "Dana" &&
                              (bookingLinkPurchased ? (
                                <button
                                  type="button"
                                  onClick={(e) => console.log('share link')}
                                  className="inline-flex items-center gap-1 self-start typography-subtitleMini text-cobranding-f hover:underline"
                                  data-testid={`button-share-booking-link-${i}`}
                                >
                                  <AiStarsMd className="h-3.5 w-3.5" />
                                  Share booking link
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => setIntroPopoverAnchor(e.currentTarget)}
                                  className="inline-flex items-center gap-1 self-start typography-subtitleMini text-cobranding-f hover:underline"
                                  data-testid={`button-share-booking-link-${i}`}
                                >
                                  <AiStarsMd className="h-3.5 w-3.5" />
                                  Share booking link
                                </button>
                              ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <Popover
                      open={Boolean(introPopoverAnchor)}
                      anchorEl={introPopoverAnchor}
                      onClose={() => setIntroPopoverAnchor(null)}
                      anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                      transformOrigin={{vertical: "top", horizontal: "left"}}
                    >
                      <div className="w-[280px] p-0" data-testid="popover-booking-intro">
                        <FeatureIntroBanner
                          title="Send a booking link"
                          description="Share your availability with attendees so they can book a follow-up time that works."
                          action={{
                            label: "Find out more",
                            onClick: () => {
                              setIntroPopoverAnchor(null);
                              setFeatureIntroOpen(true);
                            },
                            testId: "button-intro-find-out-more",
                          }}
                          onDismiss={() => setIntroPopoverAnchor(null)}
                          dismissTestId="button-intro-dismiss"
                        />
                      </div>
                    </Popover>

                  </section>
                </div>
              ) : (
                <div
                  className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-neutral-b0-t20 p-8 text-center typography-mainText text-neutral-b1"
                  data-testid={`placeholder-post-meeting-${postMeetingTab.toLowerCase()}`}
                >
                  {postMeetingTab} coming soon.
                </div>
              )}
            </div>
          ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pt-2 pb-6">
            <h2
              className="typography-headline text-[24px] leading-[32px] text-neutral-b0"
              data-testid="text-detail-title"
            >
              {selected.title}
            </h2>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 typography-subtitleMini text-neutral-b1">
                <CalendarMd className="h-4 w-4 text-neutral-b1" />
                <span data-testid="text-detail-date">{selected.date}</span>
              </div>
              <div className="flex items-center gap-2 typography-subtitleMini text-neutral-b1">
                <MapPinMd className="h-4 w-4 text-neutral-b1" />
                <span data-testid="text-detail-location">
                  {selected.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setMeetingWindowOpen(true)}
                className="h-9 gap-2 rounded-[10px] bg-cobranding-b px-4 typography-subtitle text-white hover:bg-[#0037be]"
                data-testid="button-detail-join"
              >
                <ProfileMd className="h-4 w-4" />
                Join
              </Button>
              <Button
                variant="outlined"
                className="h-9 gap-2 rounded-[10px] bg-white px-4 typography-subtitle"
                data-testid="button-detail-join-from-room"
              >
                <StartVideoMd className="h-4 w-4" />
                Join from room
              </Button>
            </div>

            <div className="rounded-xl border border-solid border-neutral-b0-t20 bg-white shadow-none p-4 flex flex-col gap-2">
                <div className="flex items-center gap-1 typography-subtitle text-neutral-b0">
                  <ArrowDownMd className="h-4 w-4 -rotate-90" />
                  <span data-testid="text-participant-count">
                    Participants ({selected.participantCount})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 typography-descriptor text-neutral-b1">
                  <span data-testid="text-accepted">
                    Accepted ({selected.accepted})
                  </span>
                  <span className="text-neutral-b0-t20">|</span>
                  <span data-testid="text-declined">
                    Declined ({selected.declined})
                  </span>
                  <span className="text-neutral-b0-t20">|</span>
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
            </div>

            <div
              className="whitespace-pre-wrap typography-mainText text-neutral-b1"
              data-testid="text-detail-description"
            >
              {selected.description}
            </div>
          </div>
          )}
        </div>
        )}
    </section>

    <AvaUpsellDialog
      open={featureIntroOpen}
      onOpenChange={setFeatureIntroOpen}
    />
    <SuiSnackbar
      open={Boolean(snackbarMessage)}
      message={snackbarMessage || ""}
      onClose={() => setSnackbarMessage(null)}
    />
    </>
  );
};
