import { useEffect, useRef, useState } from "react";
import { useFlowParam, useIsBookingPurchased } from "../lib/flows";
import { BookingFeatureDialog } from "../components/BookingFeatureDialog";
import {
  FolderMd,
  EditMd,
  NotificationsMd,
  OverflowMd,
  SearchMd,
  ArrowDownMd,
  StarMd,
  AiStarsMd,
  StartVideoMd,
  HelpMd,
  OverflowVerticalMd,
  EmojiMd,
  AttachMd,
  MicrophoneMd,
  MentionMd,
  ImageMd,
  SendMd,
  CheckMd,
  CalendarMd,
  NotesMd,
  ProfileMd,
  ClockMd,
  MapPinMd,
  ArrowLeftMd,
  ArrowRightMd,
  EarthFilledMd
} from "@ringcentral/spring-icon";
import { AppShell } from "../components/AppShell";
import { FeatureIntroBanner } from "../components/FeatureIntroBanner";
import { TextField, Popover, Dialog, DialogTitle, DialogContent, MenuItem, Button } from "@ringcentral/spring-ui";
import { useSnackbar } from "../components/SuiSnackbar";

import { bookingTypes, type BookingType } from "../lib/bookingTypes";
import { SuiSnackbar } from "../components/SuiSnackbar";

type EventCardMessage = {
  id: string;
  booking: BookingType;
  time: string;
};

const chatTabs: { label: string; count?: number }[] = [
  { label: "ALL", count: 1 },
  { label: "DIRECT" },
  { label: "TEAMS" },
  { label: "FAVORITES" },
];

type Conversation = {
  id: string;
  name: string;
  snippet: string;
  time: string;
  initials: string;
  color: string;
  unread?: number;
  isGroup?: boolean;
  online?: boolean | "do-not-disturb";
  hasIndicator?: boolean;
};

const conversations: Conversation[] = [
  {
    id: "michael",
    name: "Michael, Scott",
    snippet: "Sounds good 😊",
    time: "Today, 12:30",
    initials: "S",
    color: "bg-[#7b8794]",
    online: true,
  },
  {
    id: "uylp",
    name: "UYLP Participants",
    snippet: "Tony: Let's meet jess this afternoon",
    time: "02/28/23",
    initials: "",
    color: "bg-[#0040dd]",
    isGroup: true,
  },
  {
    id: "amanda-b",
    name: "Amanda Brown",
    snippet: "(00:15)Hi, my name is Amanda ...",
    time: "02/28/23",
    initials: "A",
    color: "bg-[#5b9bd5]",
    online: true,
    unread: 1,
    hasIndicator: true,
  },
  {
    id: "colin",
    name: "Colin Bain",
    snippet: "There was an email sent out.",
    time: "02/28/23",
    initials: "C",
    color: "bg-[#ed7d31]",
    online: "do-not-disturb",
    unread: 1,
    hasIndicator: true,
  },
  {
    id: "roger",
    name: "Roger Smith",
    snippet: "2 pages",
    time: "02/28/23",
    initials: "R",
    color: "bg-[#70ad47]",
    online: true,
  },
  {
    id: "brandon",
    name: "Brandon Roberts",
    snippet: "2 pages",
    time: "02/28/23",
    initials: "B",
    color: "bg-[#a5a5a5]",
  },
  {
    id: "amanda-t",
    name: "Amanda Turner",
    snippet: "(00:43) Perfect. Let's do it",
    time: "02/16/23",
    initials: "A",
    color: "bg-[#ffc000]",
  },
  {
    id: "samuel",
    name: "Samuel Aguilar",
    snippet: "(01:03) Let meet Jess this..",
    time: "02/16/23",
    initials: "S",
    color: "bg-[#7030a0]",
    online: true,
  },
];

const Avatar = ({
  initials,
  color,
  isGroup,
  online,
  size = "md",
}: {
  initials: string;
  color: string;
  isGroup?: boolean;
  online?: boolean | "do-not-disturb";
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "sm" ? "text-xs" : "text-sm";
  return (
    <div className={`relative ${dim} shrink-0`}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-full font-semibold text-white ${color} ${text}`}
      >
        {isGroup ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-8 8v-1c0-2.66 5.33-4 8-4s8 1.34 8 4v1H4z" />
          </svg>
        ) : (
          initials
        )}
      </div>
      {online === true && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#16a937]" />
      )}
      {online === "do-not-disturb" && (
        <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-white bg-[#e22216]" />
      )}
    </div>
  );
};

export const Chat = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [activeConvoId, setActiveConvoId] = useState<string>("uylp");
  const [showAiCard, setShowAiCard] = useState(false);
  const [composer, setComposer] = useState("");
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);
  const [pickerAnchor, setPickerAnchor] = useState<HTMLElement | null>(null);
  const [eventMessages, setEventMessages] = useState<Record<string, EventCardMessage[]>>({});
  const [bookingDialog, setBookingDialog] = useState<BookingType | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const flow = useFlowParam();
  const isPurchased = useIsBookingPurchased();

  const scheduleKeywords = [
    "meeting",
    "schedule",
    "book",
    "booking",
    "calendar",
    "available",
    "availability",
    "time slot",
    "sync",
    "appointment",
    "call",
  ];
  const composerHasScheduleIntent = scheduleKeywords.some((k) =>
    composer.toLowerCase().includes(k),
  );
  const showSchedulerBanner =
    !isPurchased && composerHasScheduleIntent && !bannerDismissed;

  const comingSoon = (label: string) => {
    setMoreAnchor(null);
    setSnackbarMessage(`${label} — Coming soon`);
  };

  const messagesRef = useRef<HTMLDivElement>(null);

  const handleShareBooking = (booking: BookingType) => {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setEventMessages((prev) => ({
      ...prev,
      [activeConvoId]: [
        ...(prev[activeConvoId] ?? []),
        { id: `${booking.id}-${now.getTime()}`, booking, time },
      ],
    }));
    setPickerAnchor(null);
    requestAnimationFrame(() => {
      const el = messagesRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    if (flow === "after-chat-booking-link") {
      setShowAiCard(false);
      setActiveTab("ALL");
    }
  }, [flow]);

  const activeConvo = conversations.find((c) => c.id === activeConvoId);

  return (
    <AppShell activeNav="Chat">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Conversation list */}
        <div className="flex w-full shrink-0 flex-col border-b border-sui-neutral-line md:w-[320px] md:border-b-0 md:border-r">
          <div className="flex items-center justify-between px-sui-4 pt-sui-4">
            <div className="flex items-center gap-sui-2">
              <h2 className="font-title text-sui-neutral-f01">
                Chat
              </h2>
              <button
                type="button"
                className="rounded p-1 text-sui-neutral-f03 hover:bg-sui-neutral-b02"
                aria-label="Folders"
                data-testid="button-folders"
              >
                <FolderMd className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-sui-1 text-sui-neutral-f03">
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="Compose"
                data-testid="button-compose"
              >
                <EditMd className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="Notifications"
                data-testid="button-notifications"
              >
                <NotificationsMd className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="More"
                data-testid="button-chat-more"
              >
                <OverflowMd className="h-4 w-4" />
              </button>
            </div>
          </div>

          <nav className="mt-3 flex items-center gap-sui-4 border-b border-sui-neutral-line px-sui-4">
            {chatTabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`relative flex items-center gap-1.5 px-1 pb-2.5 pt-2 text-[12px] font-bold tracking-wider ${
                    isActive ? "text-sui-cobranding-b01" : "text-sui-neutral-f03"
                  }`}
                  data-testid={`tab-${tab.label.toLowerCase()}`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                        isActive ? "bg-sui-cobranding-b01 text-white" : "bg-sui-neutral-line text-sui-neutral-f03"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] bg-sui-cobranding-b01" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-sui-2 px-sui-4 py-2.5">
            <div className="flex h-8 flex-1 items-center gap-sui-2 rounded-md bg-sui-neutral-b02 px-3">
              <SearchMd className="h-4 w-4 text-sui-neutral-f03" />
              <input
                placeholder="Search conversations"
                className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus-visible:outline-none"
                data-testid="input-search-conversations"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-[12px] font-bold text-sui-neutral-f03 hover:text-sui-neutral-f01"
              data-testid="button-filter"
            >
              <span>ALL</span>
              <span className="text-sui-neutral-f03">UNREAD (2)</span>
              <ArrowDownMd className="h-3 w-3" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => {
              const isActive = convo.id === activeConvoId;
              return (
                <button
                  key={convo.id}
                  type="button"
                  onClick={() => setActiveConvoId(convo.id)}
                  className={`relative flex w-full items-start gap-sui-3 px-sui-3 py-2.5 text-left ${
                    isActive ? "bg-sui-cobranding-b01-t08" : "hover:bg-sui-neutral-b02"
                  }`}
                  data-testid={`row-conversation-${convo.id}`}
                >
                  {convo.hasIndicator && (
                    <span className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sui-cobranding-b01" />
                  )}
                  <Avatar
                    initials={convo.initials}
                    color={convo.color}
                    isGroup={convo.isGroup}
                    online={convo.online}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-sui-2">
                      <span className="truncate text-sm font-semibold text-sui-neutral-f01">
                        {convo.name}
                      </span>
                      <span className="shrink-0 text-[12px] text-sui-neutral-f03">{convo.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-sui-2">
                      <span className="truncate text-[12px] text-sui-neutral-f03">{convo.snippet}</span>
                      {convo.unread && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-sui-cobranding-b01 px-1 text-[10px] font-bold text-white">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active conversation */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-sui-neutral-line px-sui-4 py-sui-3">
            <div className="flex min-w-0 items-center gap-sui-2">
              <h3 className="truncate font-title text-sui-neutral-f01">
                {activeConvo?.name ?? "Conversation"}
              </h3>
              <button
                type="button"
                className="rounded-full p-1 text-[#fe8624] hover:bg-sui-neutral-b02"
                aria-label="Favorite"
                data-testid="button-favorite"
              >
                <StarMd className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-sui-1 text-sui-neutral-f03">
              <button
                type="button"
                className="flex items-center gap-0.5 rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="AI"
                data-testid="button-ai"
              >
                <AiStarsMd className="h-4 w-4 text-[#fe8624]" />
                <ArrowDownMd className="h-3 w-3" />
              </button>
              <button
                type="button"
                className="flex items-center gap-0.5 rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="Video call"
                data-testid="button-video-call"
              >
                <StartVideoMd className="h-4 w-4" />
                <ArrowDownMd className="h-3 w-3" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="More"
                data-testid="button-thread-more"
              >
                <OverflowMd className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="Help"
                data-testid="button-help"
              >
                <HelpMd className="h-4 w-4" />
              </button>
              <div className="mx-1 h-5 w-px bg-sui-neutral-line" />
              <button
                type="button"
                className="rounded-full p-2 hover:bg-sui-neutral-b02"
                aria-label="Toggle panel"
                data-testid="button-toggle-panel"
              >
                <OverflowVerticalMd className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 space-y-6 overflow-y-auto px-sui-4 py-sui-4 sm:px-6">
            <Message
              avatar={{ initials: "C", color: "bg-[#5b9bd5]" }}
              name="Chester Hodges"
              time="3:15"
              body={
                <>
                  <p className="text-sm text-sui-neutral-f01">
                    You could check the progress here:{" "}
                    <a className="text-sui-cobranding-b01 underline" href="#">
                      https://unsplash.com
                    </a>
                  </p>
                  <div className="mt-sui-3 flex max-w-md gap-sui-3 rounded-lg border border-sui-neutral-line bg-white p-sui-3">
                    <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#3a3a3a] to-[#a8b5b8] text-[12px] font-bold text-white">
                      Unsplash
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-sui-neutral-f01">
                        Best 500+ Urban Pictures | Download Free Images on Unsplash
                      </p>
                      <p className="mt-1 line-clamp-2 text-[12px] text-sui-neutral-f03">
                        Beautiful, free images and photos that you can download and use
                        for any project.
                      </p>
                    </div>
                  </div>
                  <div className="mt-sui-2 flex items-center gap-sui-2">
                    <ReactionPill emoji="👍" count={1} />
                    <ReactionPill emoji="🙂" />
                  </div>
                </>
              }
            />

            <Message
              avatar={{ initials: "C", color: "bg-[#ed7d31]" }}
              name="Colin Bain"
              presence="OOO today"
              time="3:15"
              body={
                <>
                  <p className="text-sm text-sui-neutral-f01">
                    Perfect. Thanks for sharing! Sketch files for iOS onboarding screens
                    for the September brand launch. We received a request from product.
                  </p>
                  <div className="mt-sui-2 flex items-center gap-sui-2">
                    <ReactionPill emoji="👍" count={1} />
                    <ReactionPill emoji="🔥" count={2} />
                    <ReactionPill emoji="🙂" />
                  </div>
                </>
              }
            />

            {showAiCard && (
              <FeatureIntroBanner
                className="ml-12 max-w-md self-start"
                title="Send a booking link in chat"
                description="Let teammates or customers choose a time based on your availability instead of coordinating schedules manually."
                action={{
                  label: "Find out more",
                  onClick: () => setIntroOpen(true),
                  testId: "button-find-out-more-ai",
                }}
                onDismiss={() => setShowAiCard(false)}
                dismissTestId="button-dismiss-ai-card"
              />
            )}

            {(eventMessages[activeConvoId] ?? []).map((msg) => (
              <Message
                key={msg.id}
                avatar={{ initials: "A", color: "bg-[#a05195]" }}
                name="Alice Salmon"
                subtitle="Created an event"
                time={msg.time}
                body={
                  <EventCard
                    booking={msg.booking}
                    onBook={() => setBookingDialog(msg.booking)}
                  />
                }
              />
            ))}
          </div>

          {showSchedulerBanner && (
            <div className="px-sui-4 pb-sui-2 sm:px-6">
              <FeatureIntroBanner
                className="w-[520px] max-w-full"
                data-testid="banner-scheduler-intent"
                title="Schedule a meeting faster with Bookings"
                description="Share a booking link so others can pick a time based on your availability instead of going back and forth."
                action={{
                  label: "Find out more",
                  onClick: () => setIntroOpen(true),
                  testId: "button-scheduler-banner-learn-more",
                }}
                onDismiss={() => setBannerDismissed(true)}
                dismissTestId="button-dismiss-scheduler-banner"
              />
            </div>
          )}

          {/* Composer */}
          <div className="border-t border-sui-neutral-line bg-white px-sui-4 py-sui-3 sm:px-6">
            <div className="rounded-lg border border-sui-neutral-line p-sui-2">
              <input
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                placeholder="Type a message"
                className="w-full border-0 p-sui-2 text-sm focus-visible:outline-none"
                data-testid="input-composer"
              />
              <div className="mt-1 flex items-center justify-between">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md border border-sui-neutral-line px-2 py-1 text-[12px] text-sui-neutral-f03 hover:bg-sui-neutral-b02"
                  data-testid="button-draft-for-me"
                >
                  <AiStarsMd className="h-3 w-3" />
                  Draft for me
                </button>
                <div className="flex items-center gap-0.5 text-sui-neutral-f03">
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Mention" data-testid="button-mention">
                    <MentionMd className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Format" data-testid="button-format">
                    <EditMd className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Attach" data-testid="button-attach">
                    <AttachMd className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Emoji" data-testid="button-emoji">
                    <EmojiMd className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Image" data-testid="button-image">
                    <ImageMd className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 hover:bg-sui-neutral-b02" aria-label="Voice" data-testid="button-voice">
                    <MicrophoneMd className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => setMoreAnchor(e.currentTarget)}
                    className="rounded p-1.5 hover:bg-sui-neutral-b02"
                    aria-label="More"
                    data-testid="button-composer-more"
                  >
                    <OverflowMd className="h-4 w-4" />
                  </button>
                  <Popover open={Boolean(moreAnchor)} anchorEl={moreAnchor} onClose={() => setMoreAnchor(null)} anchorOrigin={{vertical: "top", horizontal: "right"}} transformOrigin={{vertical: "bottom", horizontal: "right"}}>
                    <div className="w-56 bg-white p-1.5 shadow-sui-lg rounded-lg border border-sui-neutral-line">
                      <ComposerMenuItem
                        icon={<CheckMd className="h-4 w-4" />}
                        label="Create a task"
                        testId="menu-create-task"
                        onClick={() => comingSoon("Create a task")}
                      />
                      <ComposerMenuItem
                        icon={<EditMd className="h-4 w-4" />}
                        label="New event"
                        testId="menu-new-event"
                        onClick={() => comingSoon("New event")}
                      />
                      <ComposerMenuItem
                        icon={<CalendarMd className="h-4 w-4" />}
                        label="Share booking link"
                        testId="menu-share-booking-link"
                        onClick={() => {
                          setMoreAnchor(null);
                          if (isPurchased) {
                            setPickerAnchor(document.getElementById("picker-anchor") || document.body);
                          } else {
                            setIntroOpen(true);
                          }
                        }}
                      />
                      <ComposerMenuItem
                        icon={<NotesMd className="h-4 w-4" />}
                        label="New note"
                        testId="menu-new-note"
                        onClick={() => comingSoon("New note")}
                      />
                      <ComposerMenuItem
                        icon={<EditMd className="h-4 w-4" />}
                        label="New code snippet"
                        testId="menu-new-code-snippet"
                        onClick={() => comingSoon("New code snippet")}
                      />
                    </div>
                  </Popover>

                  <span id="picker-anchor" />
                  <Popover open={Boolean(pickerAnchor)} anchorEl={pickerAnchor} onClose={() => setPickerAnchor(null)} anchorOrigin={{vertical: "top", horizontal: "right"}} transformOrigin={{vertical: "bottom", horizontal: "right"}}>
                    <div className="w-72 rounded-lg p-2 shadow-sui-lg border border-sui-neutral-line bg-white">
                      <div className="px-2 pb-2 pt-1 text-[12px] font-semibold uppercase tracking-wider text-sui-neutral-f03">
                        Share booking link
                      </div>
                      <div className="flex flex-col">
                        {bookingTypes.map((bt) => (
                          <button
                            key={bt.id}
                            type="button"
                            onClick={() => handleShareBooking(bt)}
                            className="flex items-start gap-sui-2 rounded-md px-2 py-2 text-left hover:bg-sui-neutral-b02"
                            data-testid={`booking-type-${bt.id}`}
                          >
                            <CalendarMd className="mt-0.5 h-4 w-4 shrink-0 text-sui-cobranding-b01" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-sui-neutral-f01">
                                {bt.title}
                              </div>
                              <div className="truncate text-[12px] text-sui-neutral-f03">
                                {bt.duration}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Popover>

                  <button
                    type="button"
                    className="ml-1 rounded p-1.5 text-sui-cobranding-b01 hover:bg-sui-neutral-b02"
                    aria-label="Send"
                    data-testid="button-send"
                  >
                    <SendMd className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingFeatureDialog open={introOpen} onOpenChange={setIntroOpen} />
      
      <BookingDialog
        booking={bookingDialog}
        onOpenChange={(open) => {
          if (!open) setBookingDialog(null);
        }}
        onSelectSlot={(slot) => {
          const b = bookingDialog;
          setBookingDialog(null);
          if (b) {
            setSnackbarMessage(`${b.title} — Thu, Jun 16 at ${slot} booked`);
          }
        }}
      />
      <SuiSnackbar
        open={Boolean(snackbarMessage)}
        message={snackbarMessage || ""}
        onClose={() => setSnackbarMessage(null)}
      />
    </AppShell>
  );
};

const Message = ({
  avatar,
  name,
  presence,
  subtitle,
  time,
  body,
}: {
  avatar: { initials: string; color: string };
  name: string;
  presence?: string;
  subtitle?: string;
  time: string;
  body: React.ReactNode;
}) => (
  <div className="flex gap-sui-3">
    <Avatar initials={avatar.initials} color={avatar.color} size="sm" />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-sui-2">
        <span className="text-sm font-semibold text-sui-neutral-f01">{name}</span>
        {presence && <span className="text-[12px] text-sui-neutral-f03">{presence}</span>}
        <span className="ml-auto text-[12px] text-sui-neutral-f03">{time}</span>
      </div>
      {subtitle && (
        <div className="text-[12px] text-sui-neutral-f03" data-testid="text-message-subtitle">
          {subtitle}
        </div>
      )}
      <div className="mt-1">{body}</div>
    </div>
  </div>
);

const ComposerMenuItem = ({
  icon,
  label,
  onClick,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  testId: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-sui-3 rounded-md px-sui-3 py-sui-2 text-left text-sm text-sui-neutral-f01 hover:bg-sui-neutral-b02"
    data-testid={testId}
  >
    <span className="text-sui-neutral-f03">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

const EventCard = ({
  booking,
  onBook,
}: {
  booking: BookingType;
  onBook: () => void;
}) => (
  <div
    className="mt-1 max-w-md rounded-2xl border-[1.2px] border-[#dddfe580] bg-white px-sui-4 py-sui-3"
    data-testid={`card-event-${booking.id}`}
  >
    <div className="flex flex-col gap-sui-2">
      <div className="flex items-center gap-1">
        <CalendarMd className="h-4 w-4 shrink-0 text-sui-cobranding-b01" />
        <p
          className="text-sm font-medium leading-5 text-sui-cobranding-b01"
          data-testid="text-event-title"
        >
          {booking.title}
        </p>
      </div>
      <p className="text-sm font-medium leading-5 text-sui-neutral-f01">
        Hi team! Here's a link to book a time — pick whatever slot works best for you.
      </p>
      <div className="flex items-center gap-sui-2">
        <span className="h-2.5 w-2.5 rounded-full bg-sui-success" />
        <p className="text-[12px] font-medium leading-[17px] text-sui-neutral-f03">
          15 time slots available this week
        </p>
      </div>
    </div>
    <div className="mt-sui-4">
      <button
        type="button"
        onClick={onBook}
        className="inline-flex h-8 min-w-14 items-center justify-center gap-1.5 rounded-[10px] border border-sui-cobranding-b01 bg-white px-sui-3 text-sm font-medium leading-5 text-sui-cobranding-b01 hover:bg-sui-cobranding-b01-t08"
        data-testid={`button-book-time-${booking.id}`}
      >
        Book a time
      </button>
    </div>
  </div>
);

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
];

const calendarDays = [
  { day: 15, muted: true },
  { day: 16, selected: true },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21, muted: true },
];

const BookingDialog = ({
  booking,
  onOpenChange,
  onSelectSlot,
}: {
  booking: BookingType | null;
  onOpenChange: (open: boolean) => void;
  onSelectSlot: (slot: string) => void;
}) => (
  <Dialog open={booking !== null} onClose={() => onOpenChange(false)} maxWidth="md" PaperProps={{className: "max-w-[840px] gap-0 overflow-hidden rounded-[10px] border border-sui-neutral-line bg-white p-0 w-[840px] max-w-full"}}>
    {booking && (
      <>
        <div className="space-y-0 border-b border-sui-neutral-line px-6 pb-3 pt-4">
          <DialogTitle
            className="pr-8 text-[17px] font-medium leading-[25px] tracking-[-0.2px] text-sui-neutral-f01"
            data-testid="text-booking-dialog-title"
          >
            Book your time for {booking?.title ?? ""}
          </DialogTitle>
        </div>

        <div className="flex h-[445px] items-stretch">
          {/* Left column */}
          <div className="flex w-[322px] shrink-0 flex-col gap-4 overflow-y-auto px-6 py-5">
            <div className="flex items-center gap-sui-4">
              <ProfileMd className="h-5 w-5 shrink-0 text-sui-neutral-f01" />
              <span className="text-[13px] font-medium leading-[19px] text-sui-neutral-f02">
                Perry He
              </span>
            </div>
            <div className="flex items-center gap-sui-4">
              <ClockMd className="h-5 w-5 shrink-0 text-sui-neutral-f01" />
              <span
                className="text-[13px] font-medium leading-[19px] text-sui-neutral-f02"
                data-testid="text-booking-duration"
              >
                {booking?.duration ?? ""}
              </span>
            </div>
            <div className="flex items-start gap-sui-4">
              <MapPinMd className="mt-0.5 h-5 w-5 shrink-0 text-sui-neutral-f01" />
              <div className="flex flex-col gap-1 text-[13px] font-medium leading-[19px] text-sui-neutral-f02">
                <span>https://v.ringcentral.com/join/perry-he</span>
                <span>+ (415) 939-0468</span>
                <span>Conf Rm - BMT20 2nd - Divisa</span>
              </div>
            </div>
            <div className="flex items-start gap-sui-4">
              <EditMd className="mt-0.5 h-5 w-5 shrink-0 text-sui-neutral-f01" />
              <p
                className="text-[13px] font-medium leading-[19px] text-sui-neutral-f02"
                data-testid="text-booking-description"
              >
                {booking?.description ?? ""}
              </p>
            </div>
          </div>

          <div className="w-px bg-sui-neutral-line" />

          {/* Right column */}
          <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
            {/* Calendar */}
            <div className="flex flex-col items-center">
              <div className="flex h-6 w-full items-center justify-between">
                <span className="text-sm font-bold leading-5 text-sui-neutral-f01">
                  June 2025
                </span>
                <div className="flex items-center gap-sui-2">
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-sui-neutral-b02"
                    aria-label="Previous month"
                    data-testid="button-prev-month"
                  >
                    <ArrowLeftMd className="h-4 w-4 text-sui-neutral-f01" />
                  </button>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-sui-neutral-b02"
                    aria-label="Next month"
                    data-testid="button-next-month"
                  >
                    <ArrowRightMd className="h-4 w-4 text-sui-neutral-f01" />
                  </button>
                </div>
              </div>
              <div className="mt-sui-2 flex w-full gap-sui-2 text-center text-[11px] font-medium leading-[17px] text-sui-neutral-f02">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="flex-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-sui-2 flex h-10 w-full items-center gap-sui-2">
                {calendarDays.map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    className={`flex h-10 flex-1 items-center justify-center rounded-full text-[11px] font-medium leading-[17px] ${
                      d.selected
                        ? "border border-white bg-sui-cobranding-b01 text-white"
                        : d.muted
                          ? "text-sui-neutral-f04"
                          : "text-sui-neutral-f01 hover:bg-sui-neutral-b02"
                    }`}
                    data-testid={`button-day-${d.day}`}
                  >
                    {d.day}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-sui-2 flex h-6 w-6 items-center justify-center rounded-full text-sui-neutral-f01 hover:bg-sui-neutral-b02"
                aria-label="Collapse"
                data-testid="button-collapse-calendar"
              >
                <ArrowDownMd className="h-4 w-4" />
              </button>
            </div>

            {/* Selected day + tz */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold leading-5 text-sui-neutral-f01">Thu 16</span>
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-medium text-sui-neutral-f01 hover:bg-sui-neutral-b02"
                data-testid="button-timezone"
              >
                <EarthFilledMd className="h-4 w-4" />
                <span>(GMT-08:00) Pacific Time…</span>
                <ArrowDownMd className="h-3 w-3" />
              </button>
            </div>

            {/* Time slot grid */}
            <div className="grid grid-cols-3 gap-sui-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className="flex h-10 items-center justify-center rounded-full border border-sui-neutral-line bg-white text-sm font-medium text-sui-neutral-f01 hover:border-sui-cobranding-b01 hover:text-sui-cobranding-b01"
                  data-testid={`button-slot-${slot.replace(/[^0-9A-Za-z]/g, "")}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    )}
  </Dialog>
);

const ReactionPill = ({ emoji, count }: { emoji: string; count?: number }) => (
  <button
    type="button"
    className="flex items-center gap-1 rounded-full border border-sui-neutral-line bg-white px-2 py-0.5 text-xs hover:bg-sui-neutral-b02"
  >
    <span>{emoji}</span>
    {count !== undefined && <span className="text-sui-neutral-f03">{count}</span>}
  </button>
);
