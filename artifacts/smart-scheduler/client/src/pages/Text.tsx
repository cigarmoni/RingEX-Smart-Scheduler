import React, { useEffect, useRef, useState } from "react";
import { useFlowParam, useIsBookingPurchased } from "@/lib/flows";
import {
  Search,
  ChevronDown,
  Star,
  MoreVertical,
  PanelRightClose,
  RefreshCw,
  PenSquare,
  Download,
  FileText,
  Sparkles,
  Calendar,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BookingFeatureDialog } from "@/components/BookingFeatureDialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { bookingTypes, type BookingType } from "@/lib/bookingTypes";
import { IconButton } from "@ringcentral/spring-ui";
import {
  CalendarMd,
  AiStarsMd,
  AttachMd,
  EmojiMd,
  ImageMd,
  MentionMd,
  SendMd,
} from "@ringcentral/spring-icon";

type Conversation = {
  id: string;
  name: string;
  snippet: string;
  date: string;
  initials: string;
  color: string;
  online?: boolean | "do-not-disturb";
  unread?: number;
  hasIndicator?: boolean;
};

const conversations: Conversation[] = [
  {
    id: "uylp",
    name: "Anna, Ben",
    snippet: "Nice",
    date: "4/14",
    initials: "A",
    color: "bg-[#a5a5a5]",
  },
  {
    id: "amanda-b",
    name: "Amanda Brown",
    snippet: "See you in the office",
    date: "4/13",
    initials: "A",
    color: "bg-[#5b9bd5]",
    online: true,
    unread: 1,
    hasIndicator: true,
  },
  {
    id: "colin",
    name: "Colin Bain",
    snippet: "Great job on the presentation, your hard wor…",
    date: "4/9",
    initials: "C",
    color: "bg-[#ed7d31]",
    online: "do-not-disturb",
  },
  {
    id: "roger",
    name: "Roger Smith",
    snippet: "Great job on the presentation, it was very i…",
    date: "3/25",
    initials: "R",
    color: "bg-[#70ad47]",
    online: true,
  },
  {
    id: "brandon",
    name: "Brandon Roberts",
    snippet: "Hey, just a reminder to submit your reports…",
    date: "3/25",
    initials: "B",
    color: "bg-[#c97a8e]",
  },
  {
    id: "amanda-t",
    name: "Amanda Turner",
    snippet: "Let's meet in the conference room at 2pm t…",
    date: "3/15",
    initials: "A",
    color: "bg-[#ffc000]",
    online: true,
  },
  {
    id: "samuel",
    name: "Samuel Aguilar",
    snippet: "Great job on the project, let's continue to w…",
    date: "3/15",
    initials: "S",
    color: "bg-[#7030a0]",
    online: true,
  },
];

const Avatar = ({
  initials,
  color,
  online,
  size = "md",
}: {
  initials: string;
  color: string;
  online?: boolean | "do-not-disturb";
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "h-6 w-6" : "h-9 w-9";
  const text = size === "sm" ? "text-[10px]" : "text-sm";
  return (
    <div className={`relative ${dim} shrink-0`}>
      <div
        className={`flex h-full w-full items-center justify-center rounded-full font-semibold text-white ${color} ${text}`}
      >
        {initials}
      </div>
      {online === true && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#16a937]" />
      )}
      {online === "do-not-disturb" && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#e22216]" />
      )}
    </div>
  );
};

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=60";

export const Text = (): JSX.Element => {
  const [activeConvoId, setActiveConvoId] = useState<string>("uylp");
  const [composer, setComposer] = useState("");
  const [bookingIntroOpen, setBookingIntroOpen] = useState(false);
  const [bookingPickerOpen, setBookingPickerOpen] = useState(false);
  const flow = useFlowParam();
  const isPurchased = useIsBookingPurchased();
  const composerRef = useRef<HTMLDivElement>(null);

  const handleInsertBookingLink = (booking: BookingType) => {
    const el = composerRef.current;
    if (!el) return;
    const existing = (el.textContent ?? "").length > 0;
    const prefix = existing ? " " : "";
    const safeTitle = booking.title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const html = `${prefix}Here's my booking link so you can choose a time that works for you: <a href="#" class="text-[#0040dd] underline" contenteditable="false" data-testid="link-text-booking-${booking.id}">${safeTitle}</a>.`;
    if (!existing) {
      el.innerHTML = html;
    } else {
      el.insertAdjacentHTML("beforeend", html);
    }
    setComposer(el.textContent ?? "");
    setBookingPickerOpen(false);
    el.focus();
  };

  useEffect(() => {
    setComposer("");
    if (composerRef.current) composerRef.current.innerHTML = "";
  }, [flow]);

  const activeConvo = conversations.find((c) => c.id === activeConvoId);

  return (
    <>
    <AppShell activeNav="Text">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left rail */}
        <div className="flex w-full shrink-0 flex-col border-b border-[#dddfe5] md:w-[400px] md:border-b-0 md:border-r">
          {/* Page header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
              Text
            </h2>
            <button
              type="button"
              className="rounded-full p-1.5 text-[#56585e] hover:bg-[#f5f6f9]"
              aria-label="Refresh"
              data-testid="button-text-refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Search row */}
          <div className="flex items-center gap-2 px-4 py-2.5">
            <div className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[#f5f6f9] px-3">
              <Search className="h-4 w-4 text-[#56585e]" />
              <Input
                placeholder="Search texts"
                className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                data-testid="input-search-texts"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-[#56585e] hover:text-black"
              data-testid="button-text-filter"
            >
              <span className="text-[#0040dd]">ALL</span>
              <span>UNREAD</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="rounded-full p-1.5 text-[#0040dd] hover:bg-[#f5f6f9]"
              aria-label="New message"
              data-testid="button-text-new-message"
            >
              <PenSquare className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="text-sm font-semibold text-[#0040dd] hover:underline"
              data-testid="button-text-edit"
            >
              Edit
            </button>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => {
              const isActive = convo.id === activeConvoId;
              return (
                <button
                  key={convo.id}
                  type="button"
                  onClick={() => setActiveConvoId(convo.id)}
                  className={`relative flex w-full items-start gap-3 px-3 py-2.5 text-left ${
                    isActive ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"
                  }`}
                  data-testid={`row-text-conversation-${convo.id}`}
                >
                  {convo.hasIndicator && (
                    <span className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#0040dd]" />
                  )}
                  <Avatar
                    initials={convo.initials}
                    color={convo.color}
                    online={convo.online}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-black">
                        {convo.name}
                      </span>
                      <span className="shrink-0 text-xs text-[#56585e]">{convo.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1 truncate text-xs text-[#56585e]">
                        <Sparkles className="h-3 w-3 shrink-0 text-[#56585e]" />
                        <span className="truncate">{convo.snippet}</span>
                      </span>
                      {convo.unread && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#56585e] px-1 text-[10px] font-bold text-white">
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

        {/* Center pane */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* App bar */}
          <div className="flex items-center justify-between border-b border-[#dddfe5] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
                {activeConvo?.name ?? "Conversation"}
              </h3>
              <button
                type="button"
                className="rounded-full p-1 text-[#fe8624] hover:bg-[#f5f6f9]"
                aria-label="Favorite"
                data-testid="button-text-favorite"
              >
                <Star className="h-4 w-4 fill-current" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-[#56585e]">
              <button
                type="button"
                className="rounded-full p-2 hover:bg-[#f5f6f9]"
                aria-label="More"
                data-testid="button-text-more"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-[#f5f6f9]"
                aria-label="Toggle panel"
                data-testid="button-text-toggle-panel"
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* SMS feed */}
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-6">
            {/* Day 1 — earlier image from recipient */}
            <div className="flex justify-end">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={SAMPLE_IMAGE}
                  alt="Landscape"
                  className="h-24 w-56 object-cover"
                />
              </div>
            </div>

            <DaySeparator label="Tue, Aug 26, 2025" />

            <RecipientGroup
              name="Anna"
              phone="(650) 667-4253"
              time="4/1/2022 10:29"
              bubbles={[
                <TextBubble key="t1" variant="recipient">
                  What about this?
                </TextBubble>,
                <ImageBubble key="i1" src={SAMPLE_IMAGE} alt="Mountains" />,
              ]}
            />

            <DaySeparator label="Today" />

            <SenderGroup
              name="Julia"
              phone="(650) 667-4333"
              items={[
                { time: "14:41", node: <TextBubble variant="sender">Nice</TextBubble> },
                {
                  time: "14:42",
                  node: (
                    <FileBubble
                      filename="Artist..."
                      size="0.24 KB"
                    />
                  ),
                },
              ]}
            />
          </div>

          {/* Composer */}
          <div className="border-t border-[#dddfe5] bg-white px-4 py-3 sm:px-6">
            <div className="rounded-lg border border-[#dddfe5] p-2">
              <div
                ref={composerRef}
                contentEditable
                role="textbox"
                aria-label="Text from (650) 432-4678"
                onInput={(e) => setComposer((e.currentTarget.textContent ?? ""))}
                data-placeholder="Text from (650) 432-4678"
                className="block w-full whitespace-pre-wrap break-words border-0 bg-transparent p-2 text-sm leading-5 outline-none focus:outline-none empty:before:text-[#8b8d92] empty:before:content-[attr(data-placeholder)]"
                data-testid="input-text-composer"
                suppressContentEditableWarning
              />
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  <IconButton
                    symbol={AiStarsMd as unknown as React.ComponentType}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="AI writing tools"
                    data-testid="button-text-ai"
                    TooltipProps={{ title: "AI writing tools" }}
                  />
                  <IconButton
                    symbol={AttachMd as unknown as React.ComponentType}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Attach"
                    data-testid="button-text-attach"
                    TooltipProps={{ title: "Attach file" }}
                  />
                  <IconButton
                    symbol={EmojiMd as unknown as React.ComponentType}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Emoji"
                    data-testid="button-text-emoji"
                    TooltipProps={{ title: "Insert emoji" }}
                  />
                  <IconButton
                    symbol={ImageMd as unknown as React.ComponentType}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Image"
                    data-testid="button-text-image"
                    TooltipProps={{ title: "Insert image" }}
                  />
                  <IconButton
                    symbol={MentionMd as unknown as React.ComponentType}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Mention"
                    data-testid="button-text-mention"
                    TooltipProps={{ title: "Mention" }}
                  />
                  <Popover open={bookingPickerOpen} onOpenChange={setBookingPickerOpen}>
                    <PopoverTrigger asChild>
                      <span className="inline-flex">
                        <IconButton
                          symbol={CalendarMd as unknown as React.ComponentType}
                          variant="icon"
                          color="neutral"
                          size="medium"
                          onClick={(e: React.MouseEvent) => {
                            if (!isPurchased) {
                              e.preventDefault();
                              setBookingIntroOpen(true);
                            }
                          }}
                          aria-label="Insert booking link"
                          data-testid="button-text-schedule"
                          TooltipProps={{ title: "Insert booking link" }}
                        />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      className="w-72 rounded-lg p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    >
                      <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-[#56585e]">
                        Share booking link
                      </div>
                      <div className="flex flex-col">
                        {bookingTypes.map((bt) => (
                          <button
                            key={bt.id}
                            type="button"
                            onClick={() => handleInsertBookingLink(bt)}
                            className="flex items-start gap-2 rounded-md px-2 py-2 text-left hover:bg-[#f5f6f9]"
                            data-testid={`text-booking-type-${bt.id}`}
                          >
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#0040dd]" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-black">
                                {bt.title}
                              </div>
                              <div className="truncate text-xs text-[#56585e]">
                                {bt.duration}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <IconButton
                  symbol={SendMd as unknown as React.ComponentType}
                  variant="icon"
                  color="neutral"
                  size="medium"
                  disabled={composer.trim().length === 0}
                  aria-label="Send"
                  data-testid="button-text-send"
                  TooltipProps={{ title: "Send" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
    <BookingFeatureDialog open={bookingIntroOpen} onOpenChange={setBookingIntroOpen} />
    </>
  );
};

const DaySeparator = ({ label }: { label: string }) => (
  <div className="text-center text-xs text-[#56585e]">{label}</div>
);

const TextBubble = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "sender" | "recipient";
}) => (
  <div
    className={`max-w-xs rounded-2xl px-3 py-2 text-sm ${
      variant === "sender"
        ? "bg-[#0040dd] text-white"
        : "bg-[#f5f6f9] text-black"
    }`}
  >
    {children}
  </div>
);

const ImageBubble = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden rounded-2xl">
    <img src={src} alt={alt} className="h-44 w-44 object-cover" />
  </div>
);

const FileBubble = ({ filename, size }: { filename: string; size: string }) => (
  <div className="flex max-w-xs items-center gap-2 rounded-2xl bg-[#f5f6f9] px-3 py-2">
    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1f6feb] text-white">
      <FileText className="h-4 w-4" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-semibold text-black">{filename}</div>
      <div className="text-xs text-[#56585e]">{size}</div>
    </div>
    <Download className="h-4 w-4 text-[#56585e]" />
  </div>
);

const RecipientGroup = ({
  name,
  phone,
  time,
  bubbles,
}: {
  name: string;
  phone: string;
  time: string;
  bubbles: React.ReactNode[];
}) => (
  <div className="flex items-end gap-2">
    <Avatar initials={name.charAt(0)} color="bg-[#ffc000]" size="sm" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="text-xs text-[#56585e]">
        <span className="font-semibold text-black">{name}</span>
        <span> · {phone}</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        {bubbles.map((b, i) => (
          <div key={i} className="flex items-end gap-2">
            {b}
            {i === 0 && <span className="text-xs text-[#56585e]">{time}</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SenderGroup = ({
  name,
  phone,
  items,
}: {
  name: string;
  phone: string;
  items: { time: string; node: React.ReactNode }[];
}) => (
  <div className="flex flex-col items-end gap-2">
    <div className="text-xs text-[#56585e]">
      <span className="font-semibold text-black">{name}</span>
      <span> · {phone}</span>
    </div>
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="text-xs text-[#56585e]">{item.time}</span>
        {item.node}
      </div>
    ))}
  </div>
);
