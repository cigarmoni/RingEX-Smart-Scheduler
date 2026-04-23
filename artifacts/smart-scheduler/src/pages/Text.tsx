import React, { useEffect, useRef, useState } from "react";
import { useFlowParam, useIsBookingPurchased } from "../lib/flows";
import { AppShell } from "../components/AppShell";
import { BookingFeatureDialog } from "../components/BookingFeatureDialog";
import { TextField, IconButton, Popover } from "@ringcentral/spring-ui";
import {
  SearchMd,
  ArrowDownMd,
  StarMd,
  OverflowMd,
  OverflowVerticalMd,
  RefreshMd,
  EditMd,
  DownloadMd,
  NotesMd,
  AiStarsMd,
  CalendarMd,
  AttachMd,
  EmojiMd,
  ImageMd,
  MentionMd,
  SendMd
} from "@ringcentral/spring-icon";
import { bookingTypes, type BookingType } from "../lib/bookingTypes";
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
  const [bookingAnchorEl, setBookingAnchorEl] = useState<HTMLButtonElement | null>(null);
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
    const html = `${prefix}Here's my booking link so you can choose a time that works for you: <a href="#" class="text-cobranding-f underline" contenteditable="false" data-testid="link-text-booking-${booking.id}">${safeTitle}</a>.`;
    if (!existing) {
      el.innerHTML = html;
    } else {
      el.insertAdjacentHTML("beforeend", html);
    }
    setComposer(el.textContent ?? "");
    setBookingAnchorEl(null);
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
        <div className="flex w-full shrink-0 flex-col border-b border-neutral-b0-t20 md:w-[400px] md:border-b-0 md:border-r">
          {/* Page header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h2 className="text-title text-neutral-b2">
              Text
            </h2>
            <IconButton
              symbol={RefreshMd as any}
              variant="icon"
              color="neutral"
              size="medium"
              aria-label="Refresh"
              data-testid="button-text-refresh"
            />
          </div>

          {/* Search row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <TextField
              placeholder="Search texts"
              className="flex-1 h-8 text-sm"
              data-testid="input-search-texts"
            />
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-neutral-b1 hover:text-neutral-b2"
              data-testid="button-text-filter"
            >
              <span className="text-cobranding-f">ALL</span>
              <span>UNREAD</span>
              <ArrowDownMd className="h-3 w-3" />
            </button>
            <IconButton
              symbol={EditMd as any}
              variant="icon"
              color="primary"
              size="small"
              className="text-cobranding-f hover:bg-neutral-b2 rounded-full"
              aria-label="New message"
              data-testid="button-text-new-message"
            />
            <button
              type="button"
              className="text-sm font-semibold text-cobranding-f hover:underline"
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
                  className={`relative flex w-full items-start gap-3 px-3 py-3 text-left ${
                    isActive ? "bg-cobranding-b/8" : "hover:bg-neutral-b2"
                  }`}
                  data-testid={`row-text-conversation-${convo.id}`}
                >
                  {convo.hasIndicator && (
                    <span className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cobranding-b" />
                  )}
                  <Avatar
                    initials={convo.initials}
                    color={convo.color}
                    online={convo.online}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-neutral-b2">
                        {convo.name}
                      </span>
                      <span className="shrink-0 text-xs text-neutral-b1">{convo.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1 truncate text-xs text-neutral-b1">
                        <AiStarsMd className="h-3 w-3 shrink-0 text-neutral-b1" />
                        <span className="truncate">{convo.snippet}</span>
                      </span>
                      {convo.unread && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-b5 px-1 text-[10px] font-bold text-white">
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
          <div className="flex items-center justify-between border-b border-neutral-b0-t20 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-title text-neutral-b2">
                {activeConvo?.name ?? "Conversation"}
              </h3>
              <IconButton
                symbol={StarMd as any}
                variant="icon"
                color="neutral"
                size="small"
                className="text-[#fe8624]"
                aria-label="Favorite"
                data-testid="button-text-favorite"
              />
            </div>
            <div className="flex items-center gap-1 text-neutral-b1">
              <IconButton
                symbol={OverflowMd as any}
                variant="icon"
                color="neutral"
                size="medium"
                aria-label="More"
                data-testid="button-text-more"
              />
              <IconButton
                symbol={OverflowVerticalMd as any}
                variant="icon"
                color="neutral"
                size="medium"
                aria-label="Toggle panel"
                data-testid="button-text-toggle-panel"
              />
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
          <div className="border-t border-neutral-b0-t20 bg-white px-4 py-3 sm:px-6">
            <div className="rounded-lg border border-neutral-b0-t20 p-2">
              <div
                ref={composerRef}
                contentEditable
                role="textbox"
                aria-label="Text from (650) 432-4678"
                onInput={(e) => setComposer((e.currentTarget.textContent ?? ""))}
                data-placeholder="Text from (650) 432-4678"
                className="block w-full whitespace-pre-wrap break-words border-0 bg-transparent p-2 text-sm leading-5 outline-none focus:outline-none empty:before:text-neutral-b1 empty:before:content-[attr(data-placeholder)]"
                data-testid="input-text-composer"
                suppressContentEditableWarning
              />
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  <IconButton
                    symbol={AiStarsMd as any}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="AI writing tools"
                    data-testid="button-text-ai"
                    TooltipProps={{ title: "AI writing tools" }}
                  />
                  <IconButton
                    symbol={AttachMd as any}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Attach"
                    data-testid="button-text-attach"
                    TooltipProps={{ title: "Attach file" }}
                  />
                  <IconButton
                    symbol={EmojiMd as any}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Emoji"
                    data-testid="button-text-emoji"
                    TooltipProps={{ title: "Insert emoji" }}
                  />
                  <IconButton
                    symbol={ImageMd as any}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Image"
                    data-testid="button-text-image"
                    TooltipProps={{ title: "Insert image" }}
                  />
                  <IconButton
                    symbol={MentionMd as any}
                    variant="icon"
                    color="neutral"
                    size="medium"
                    aria-label="Mention"
                    data-testid="button-text-mention"
                    TooltipProps={{ title: "Mention" }}
                  />
                  <span className="inline-flex">
                    <IconButton
                      symbol={CalendarMd as any}
                      variant="icon"
                      color="neutral"
                      size="medium"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        if (!isPurchased) {
                          e.preventDefault();
                          setBookingIntroOpen(true);
                        } else {
                          setBookingAnchorEl(e.currentTarget);
                        }
                      }}
                      aria-label="Insert booking link"
                      data-testid="button-text-schedule"
                      TooltipProps={{ title: "Insert booking link" }}
                    />
                  </span>
                  <Popover
                    open={Boolean(bookingAnchorEl)}
                    anchorEl={bookingAnchorEl}
                    onClose={() => setBookingAnchorEl(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  >
                    <div className="w-72 rounded-lg p-2 shadow-md bg-white">
                      <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-neutral-b1">
                        Share booking link
                      </div>
                      <div className="flex flex-col">
                        {bookingTypes.map((bt) => (
                          <button
                            key={bt.id}
                            type="button"
                            onClick={() => handleInsertBookingLink(bt)}
                            className="flex items-start gap-2 rounded-md px-2 py-2 text-left hover:bg-neutral-b2"
                            data-testid={`text-booking-type-${bt.id}`}
                          >
                            <CalendarMd className="mt-0.5 h-4 w-4 shrink-0 text-cobranding-f" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-neutral-b2">
                                {bt.title}
                              </div>
                              <div className="truncate text-xs text-neutral-b1">
                                {bt.duration}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Popover>
                </div>
                <IconButton
                  symbol={SendMd as any}
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
  <div className="text-center text-xs text-neutral-b1">{label}</div>
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
        ? "bg-cobranding-b text-white"
        : "bg-neutral-b2 text-neutral-b2"
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
  <div className="flex max-w-xs items-center gap-2 rounded-2xl bg-neutral-b2 px-3 py-2">
    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1f6feb] text-white">
      <NotesMd className="h-4 w-4" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-semibold text-neutral-b2">{filename}</div>
      <div className="text-xs text-neutral-b1">{size}</div>
    </div>
    <DownloadMd className="h-4 w-4 text-neutral-b1" />
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
      <div className="text-xs text-neutral-b1">
        <span className="font-semibold text-neutral-b2">{name}</span>
        <span> · {phone}</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        {bubbles.map((b, i) => (
          <div key={i} className="flex items-end gap-2">
            {b}
            {i === 0 && <span className="text-xs text-neutral-b1">{time}</span>}
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
    <div className="text-xs text-neutral-b1">
      <span className="font-semibold text-neutral-b2">{name}</span>
      <span> · {phone}</span>
    </div>
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="text-xs text-neutral-b1">{item.time}</span>
        {item.node}
      </div>
    ))}
  </div>
);
