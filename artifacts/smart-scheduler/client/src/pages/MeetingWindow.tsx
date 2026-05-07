import { useState } from "react";
import { useLocation } from "wouter";
import {
  ChevronDown,
  Flag,
  Globe,
  Info,
  Mic,
  MicOff,
  MoreHorizontal,
  Pause,
  PhoneOff,
  Share2,
  Smile,
  Sparkles,
  StickyNote,
  UserPlus,
  Users,
  Video,
  VideoOff,
  Wifi,
  X,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { FlowsLauncher } from "@/components/FlowsLauncher";
import { ScheduleLinkMenu } from "@/components/ScheduleLinkMenu";
import { SuiSnackbar } from "@/components/SuiSnackbar";
import { useSmartSchedulerPurchased } from "@/lib/smartScheduler";

type Tile = {
  id: string;
  name: string;
  initials: string;
  bg: string;
};

const tiles: Tile[] = [
  { id: "jenna", name: "Jenna Danny (you)", initials: "JD", bg: "#9b6bff" },
  { id: "mike", name: "Mike Green", initials: "MG", bg: "#3b6f4a" },
  { id: "athena", name: "Athena Dabel", initials: "AD", bg: "#a8825c" },
  { id: "ayo", name: "Ayo Dam", initials: "AD", bg: "#5b5b5b" },
];

const SignalBars = ({ className = "" }: { className?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <rect x="1" y="8" width="2" height="3" rx="0.5" fill="currentColor" />
    <rect x="4" y="6" width="2" height="5" rx="0.5" fill="currentColor" />
    <rect x="7" y="3" width="2" height="8" rx="0.5" fill="currentColor" />
    <rect
      x="10"
      y="1"
      width="2"
      height="10"
      rx="0.5"
      fill="currentColor"
      opacity="0.4"
    />
  </svg>
);

const ParticipantTile = ({ tile }: { tile: Tile }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-[#1a1a1a]"
      data-testid={`tile-participant-${tile.id}`}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#1c1c1c]">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full font-semibold text-white text-2xl"
          style={{ background: tile.bg }}
        >
          {tile.initials}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-white backdrop-blur-sm">
        <SignalBars className="text-white" />
        <span className="text-[12px] font-medium">{tile.name}</span>
        <Mic className="h-3 w-3" />
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string;
  hasChevron?: boolean;
  variant?: "default" | "danger" | "selected" | "icon";
  testid?: string;
}

const ToolbarButton = ({
  icon,
  label,
  onClick,
  badge,
  hasChevron,
  variant = "default",
  testid,
}: ToolbarButtonProps) => {
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid={testid}
        className="flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
      >
        {icon}
      </button>
    );
  }
  if (variant === "danger") {
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid={testid}
        className="flex h-10 items-center gap-2 rounded-md bg-[#e22216] px-4 font-medium text-white hover:bg-[#bb1515]"
      >
        {icon}
        {label && <span className="text-[13px]">{label}</span>}
      </button>
    );
  }
  const isSelected = variant === "selected";
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testid}
      className="flex flex-col items-center gap-0.5 px-2 py-1 text-white hover:opacity-80"
    >
      <div className="relative flex items-center gap-0.5">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-md ${
            isSelected ? "bg-[#0040dd] text-white" : "text-white"
          }`}
        >
          {icon}
        </div>
        {hasChevron && (
          <ChevronDown className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white" />
        )}
        {badge && (
          <span className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e22216] px-1 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      {label && <span className="text-[11px] text-white">{label}</span>}
    </button>
  );
};

interface MeetingWindowProps {
  onClose?: () => void;
}

export const MeetingWindow = (props: MeetingWindowProps = {}): JSX.Element => {
  const [, navigate] = useLocation();
  const onClose = props.onClose ?? (() => navigate("/?flow=in-meeting"));
  const [activeTab, setActiveTab] = useState<"notes" | "transcript">("notes");
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const { toast } = useToast();
  const [purchased, setPurchased] = useSmartSchedulerPurchased();
  const [shareOpen, setShareOpen] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShareBookingLink = () => {
    if (purchased) {
      setTimeout(() => setShareOpen(true), 50);
    } else {
      setTimeout(() => setUpsellOpen(true), 50);
    }
  };

  return (
    <div
      className="flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white"
      data-testid="screen-meeting-window"
    >
      {/* Window chrome */}
      <header className="relative flex h-11 shrink-0 items-center justify-between bg-[#1c1c1c] px-3 border-b border-black/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close window"
              className="h-3 w-3 rounded-full bg-[#ff5f57] hover:opacity-80"
              data-testid="button-window-close"
            />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <button
            type="button"
            className="ml-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-white/90 hover:bg-white/10"
            data-testid="button-report-issue"
          >
            <Flag className="h-3.5 w-3.5" />
            Report issue
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="AI"
            data-testid="button-ai-chrome"
          >
            <Sparkles className="h-4 w-4 text-[#ff7a00]" />
          </button>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/90"
          data-testid="text-window-title"
        >
          RingCentral Video: Weekly Meeting
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-white/80 hover:bg-white/10"
          data-testid="button-layout-switcher"
        >
          <LayoutGrid className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </button>
      </header>

      {/* Body: stage + notes panel */}
      <div className="flex min-h-0 flex-1">
        {/* Video stage */}
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#0a0a0a] p-3">
          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">
            {tiles.map((t) => (
              <ParticipantTile key={t.id} tile={t} />
            ))}
          </div>
        </div>

        {/* Notes panel */}
        <aside
          className="flex w-[360px] shrink-0 flex-col bg-white text-[#323439]"
          data-testid="panel-notes"
        >
          <div className="flex items-center justify-between border-b border-[#dddfe5] px-3">
            <div className="flex items-center gap-1" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "notes"}
                onClick={() => setActiveTab("notes")}
                data-testid="tab-notes"
                className={`relative px-3 py-3 text-[13px] font-semibold ${
                  activeTab === "notes" ? "text-[#0040dd]" : "text-[#323439]"
                }`}
              >
                Notes
                {activeTab === "notes" && (
                  <span className="absolute inset-x-2 -bottom-px h-[2px] bg-[#0040dd]" />
                )}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "transcript"}
                onClick={() => setActiveTab("transcript")}
                data-testid="tab-transcript"
                className={`relative px-3 py-3 text-[13px] font-semibold ${
                  activeTab === "transcript"
                    ? "text-[#0040dd]"
                    : "text-[#323439]"
                }`}
              >
                Transcript
                {activeTab === "transcript" && (
                  <span className="absolute inset-x-2 -bottom-px h-[2px] bg-[#0040dd]" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Language"
                data-testid="button-notes-language"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#323439] hover:bg-[#f5f6f9]"
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Pause"
                data-testid="button-notes-pause"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#323439] hover:bg-[#f5f6f9]"
              >
                <Pause className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Close"
                data-testid="button-notes-close"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#323439] hover:bg-[#f5f6f9]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            <div
              className="flex items-start gap-2 rounded-[8px] border border-solid border-[#FFD9A8] px-3 py-2.5"
              style={{
                background:
                  "linear-gradient(90deg, #FFF8EE 0%, #FFEAD0 100%)",
              }}
              data-testid="banner-ai-notes"
            >
              <span
                aria-hidden="true"
                className="mt-[1px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[8.4px]"
                style={{
                  background:
                    "linear-gradient(111.65deg, #FF670A 1.69%, #FF892C 31.18%, #FF9750 45.93%, #FF9876 50.85%, #FFA1B7 80.34%, #FFD1E3 100%)",
                }}
              >
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-[13px] font-semibold leading-[18px] text-[#323439]">
                  AI is taking notes…
                </p>
                <p className="text-[12px] leading-[16px] text-[#72757a]">
                  The detail notes will be sent after the meeting.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-1.5">
              <h3 className="text-[14px] font-semibold text-black">
                Summary so far
              </h3>
              <p className="text-[11px] text-[#72757a]">
                Next updated in 2 minutes
              </p>
              <p className="text-[13px] leading-[19px] text-[#323439]">
                The team reviewed Q2 marketing performance, noting strong
                website traffic gains while social engagement dipped. Discussion
                shifted to reallocating budget toward paid search and
                influencer collaborations to recover momentum before the next
                campaign.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-[14px] font-semibold text-black">
                Key points
              </h3>
              <ul className="flex flex-col gap-2 pl-4 text-[13px] leading-[19px] text-[#323439]">
                <li className="list-disc">
                  <span className="font-semibold">Website traffic</span> is up
                  18% quarter-over-quarter, driven mostly by organic search.
                  (10:04)
                </li>
                <li className="list-disc">
                  <span className="font-semibold">Social media</span>{" "}
                  engagement dropped 9% on Instagram; the team will test new
                  creative formats. (10:12)
                </li>
                <li className="list-disc">
                  <span className="font-semibold">Budget reallocation</span>{" "}
                  toward paid search and influencer partnerships was approved
                  for Q3. (10:21)
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-[14px] font-semibold text-black">
                Action items
              </h3>
              <ul className="flex flex-col gap-2 pl-4 text-[13px] leading-[19px] text-[#323439]">
                <li className="list-disc">
                  <a className="font-medium text-[#0040dd] hover:underline" href="#">
                    Mike Green
                  </a>{" "}
                  to draft the updated paid search plan by Friday.
                </li>
                <li className="list-disc">
                  <a className="font-medium text-[#0040dd] hover:underline" href="#">
                    Andy Lau
                  </a>{" "}
                  to share three new Instagram creative concepts next week.
                </li>
                <li className="list-disc">
                  <a className="font-medium text-[#0040dd] hover:underline" href="#">
                    Ayo Dam
                  </a>{" "}
                  to reach out to two influencer agencies for proposals.
                </li>
                <li className="list-disc">
                  <div className="flex flex-col gap-1">
                    <span>
                      <a className="font-medium text-[#0040dd] hover:underline" href="#">
                        Andy Lau
                      </a>{" "}
                      to find a time slot for{" "}
                      <ScheduleLinkMenu
                        testIdPrefix="schedule-link-andy"
                        showShareUpgradeIndicator={!purchased}
                        onShareBookingLink={handleShareBookingLink}
                      >
                        a follow-up meeting next week
                      </ScheduleLinkMenu>
                      .
                    </span>
                    {purchased && (
                    <Popover open={shareOpen} onOpenChange={setShareOpen}>
                      <PopoverTrigger asChild>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none block h-px w-px opacity-0"
                          data-testid="anchor-share-booking-link-andy"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="start"
                        className="z-[70] w-[400px] rounded-[10px] p-0"
                        data-testid="popover-booking-link-compose"
                      >
                      <div className="flex items-center justify-between px-4 pt-4">
                        <h4 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] text-black">
                          Share booking link
                        </h4>
                        <button
                          type="button"
                          onClick={() => setShareOpen(false)}
                          aria-label="Close"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-sui-neutral-b2 hover:bg-sui-neutral-b5"
                          data-testid="button-booking-compose-close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-4 px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <label className="font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-[number:var(--descriptor-mini-font-weight)] text-black">
                            Select booking type
                          </label>
                          <div className="flex h-8 items-center justify-between rounded-[10px] border border-solid border-sui-neutral-b0-t20 bg-sui-neutral-base pl-2.5 pr-1.5">
                            <span className="font-main-text text-[length:var(--main-text-font-size)] text-black">
                              15-min follow-up with Andy Lau
                            </span>
                            <ChevronDown className="h-4 w-4 text-sui-neutral-b2" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-descriptor-mini text-[length:var(--descriptor-mini-font-size)] font-[number:var(--descriptor-mini-font-weight)] text-black">
                            Message
                          </label>
                          <div className="min-h-[48px] rounded-[10px] border border-solid border-sui-neutral-b0-t20 bg-sui-neutral-base px-4 pb-[15px] pt-4">
                            <p className="font-main-text text-[length:var(--main-text-font-size)] text-black">
                              Here's my booking link so you can choose a time
                              that works for you:{" "}
                              <span className="text-sui-cobranding">
                                15-min follow-up with Andy Lau
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 rounded-b-[10px] border-t border-solid border-sui-neutral-b0-t10 bg-white px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setShareOpen(false)}
                          className="flex h-8 min-w-[56px] items-center justify-center rounded-[10px] border border-solid border-sui-neutral-b0-t20 bg-sui-neutral-base px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-black hover:bg-sui-neutral-b5"
                          data-testid="button-booking-compose-cancel"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShareOpen(false);
                            setSnackbarOpen(true);
                          }}
                          className="flex h-8 items-center justify-center rounded-[10px] bg-sui-cobranding px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-white hover:opacity-90"
                          data-testid="button-booking-compose-send"
                        >
                          Post in chat
                        </button>
                      </div>
                      </PopoverContent>
                    </Popover>
                    )}
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </div>

      {/* Bottom toolbar */}
      <footer className="relative flex h-16 shrink-0 items-center justify-between bg-[#1c1c1c] px-3">
        <div className="flex items-center gap-1">
          <ToolbarButton
            variant="icon"
            icon={<Info className="h-4 w-4" />}
            testid="button-meeting-info"
          />
          <ToolbarButton
            variant="icon"
            icon={<Wifi className="h-4 w-4" />}
            testid="button-meeting-signal"
          />
        </div>

        <div className="flex items-center gap-3">
          <ToolbarButton
            icon={muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            label={muted ? "Unmute" : "Mute"}
            hasChevron
            onClick={() => setMuted((m) => !m)}
            testid="button-mute"
          />
          <ToolbarButton
            icon={
              videoOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )
            }
            label={videoOn ? "Stop video" : "Start video"}
            hasChevron
            onClick={() => setVideoOn((v) => !v)}
            testid="button-video"
          />
          <ToolbarButton
            icon={<Share2 className="h-5 w-5" />}
            label="Share"
            testid="button-share"
          />
          <ToolbarButton
            icon={<UserPlus className="h-5 w-5" />}
            label="Invite"
            testid="button-invite"
          />
          <ToolbarButton
            icon={<Users className="h-5 w-5" />}
            label="Participants"
            badge="2"
            testid="button-participants"
          />
          <ToolbarButton
            icon={<MessageSquare className="h-5 w-5" />}
            label="Chat"
            badge="2"
            testid="button-chat"
          />
          <ToolbarButton
            icon={<Smile className="h-5 w-5" />}
            label="Reactions"
            testid="button-reactions"
          />
          <ToolbarButton
            icon={<StickyNote className="h-5 w-5" />}
            label="Notes"
            variant="selected"
            testid="button-notes"
          />
          <ToolbarButton
            icon={<MoreHorizontal className="h-5 w-5" />}
            label="More"
            testid="button-more"
          />
        </div>

        <div className="flex items-center">
          <ToolbarButton
            icon={<PhoneOff className="h-4 w-4" />}
            label="Leave"
            variant="danger"
            onClick={onClose}
            testid="button-leave"
          />
        </div>
      </footer>

      <AvaUpsellDialog
        open={upsellOpen}
        onOpenChange={setUpsellOpen}
        onFreeTrial={() => {
          setPurchased(true);
          toast({ description: "Bookings free trial started." });
        }}
      />
      <SuiSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Booking link sent to Meeting chat."
      />
      <FlowsLauncher />
    </div>
  );
};

export default MeetingWindow;
