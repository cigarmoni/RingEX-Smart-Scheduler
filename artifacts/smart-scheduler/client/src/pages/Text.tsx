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
import { UpgradeIndicator } from "@/components/UpgradeIndicator";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingTypes, type BookingType } from "@/lib/bookingTypes";
import { IconButton } from "@ringcentral/spring-ui";
import {
  AttachMd,
  EmojiMd,
  ImageMd,
  SendMd,
  PlusMd,
  SearchMd,
  ReplyMd,
  AiWriterAltMd,
  OverflowMd,
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

type TextTemplate = {
  id: string;
  title: string;
  preview: string;
  body: string;
};

const personalTemplates: TextTemplate[] = [
  {
    id: "personal-initial-contact",
    title: "Initial contact",
    preview:
      "Hi, I'm Jason from ABC clinic. Thanks for reaching out to us. I've sent an email to you to fill out the details.",
    body:
      "Hi, I'm Jason from ABC clinic. Thanks for reaching out to us. I've sent an email to you to fill out the details.",
  },
  {
    id: "personal-follow-up",
    title: "Follow up",
    preview:
      "Just checking in to see if you had a chance to review the appointment details I sent over.",
    body:
      "Hi, just checking in to see if you had a chance to review the appointment details I sent over. Let me know if you'd like to pick a different time.",
  },
  {
    id: "personal-thanks",
    title: "Thanks for visiting",
    preview:
      "Thanks for stopping by today — really appreciated the chance to meet. Reach out anytime.",
    body:
      "Thanks for stopping by today — really appreciated the chance to meet. Reach out anytime if you have questions.",
  },
];

const companyTemplates: TextTemplate[] = [
  {
    id: "company-appointment-confirmation",
    title: "Appointment confirmation",
    preview:
      "Your appointment with ABC clinic is confirmed. We look forward to seeing you.",
    body:
      "Your appointment with ABC clinic is confirmed. We look forward to seeing you. Reply STOP to opt out.",
  },
  {
    id: "company-appointment-reminder",
    title: "Appointment reminder",
    preview:
      "Friendly reminder of your upcoming appointment with ABC clinic. Reply C to confirm.",
    body:
      "Friendly reminder of your upcoming appointment with ABC clinic. Reply C to confirm or R to reschedule.",
  },
];

export const Text = (): JSX.Element => {
  const [activeConvoId, setActiveConvoId] = useState<string>("uylp");
  const [composer, setComposer] = useState("");
  const [bookingIntroOpen, setBookingIntroOpen] = useState(false);
  const [composerMoreOpen, setComposerMoreOpen] = useState(false);
  const [bookingPickerOpen, setBookingPickerOpen] = useState(false);
  const [templatePopoverOpen, setTemplatePopoverOpen] = useState(false);
  const [templateTab, setTemplateTab] = useState<"personal" | "company">("personal");
  const [templateSearch, setTemplateSearch] = useState("");
  const flow = useFlowParam();
  const isPurchased = useIsBookingPurchased();
  const bookingTypes = useBookingTypes();
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

  const insertTemplate = (t: TextTemplate) => {
    const el = composerRef.current;
    if (!el) return;
    const existing = (el.textContent ?? "").length > 0;
    const safeBody = t.body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (!existing) {
      el.innerHTML = safeBody;
    } else {
      el.insertAdjacentHTML("beforeend", ` ${safeBody}`);
    }
    setComposer(el.textContent ?? "");
    setTemplatePopoverOpen(false);
    el.focus();
  };

  const allTemplates = templateTab === "personal" ? personalTemplates : companyTemplates;
  const filteredTemplates = templateSearch.trim().length === 0
    ? allTemplates
    : allTemplates.filter((t) => {
        const q = templateSearch.trim().toLowerCase();
        return t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q);
      });

  useEffect(() => {
    setComposer("");
    if (composerRef.current) composerRef.current.innerHTML = "";
    setTemplateSearch("");
    setTemplatePopoverOpen(false);
    setComposerMoreOpen(false);
    setBookingPickerOpen(false);
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
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
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
              <h3 className="truncate font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-[var(--sui-colors-neutral-b0)] [font-style:var(--title-font-style)]">
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
          <div className="bg-white px-4 py-3 sm:px-6">
            <div className="rounded-[10px] border border-[#dddfe5] bg-white p-2">
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
                {/* Composer action toolbar */}
                <div className="flex items-center gap-0.5" data-testid="toolbar-text-composer-actions">
                  <Popover open={templatePopoverOpen} onOpenChange={setTemplatePopoverOpen}>
                    <PopoverTrigger asChild>
                      <span className="inline-flex">
                        <IconButton
                          symbol={AiWriterAltMd as unknown as React.ComponentType}
                          variant="icon"
                          color="neutral"
                          size="medium"
                          aria-label="Text message templates"
                          data-testid="button-text-template"
                          TooltipProps={{ title: "Text message templates" }}
                        />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="start"
                      sideOffset={8}
                      className="w-[360px] rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-white p-0 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                      data-testid="popover-text-templates"
                    >
                      <div className="flex flex-col py-4">
                        <div className="flex items-center justify-between px-4">
                          <p
                            className="text-[17px] font-medium leading-[25px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b0)]"
                            data-testid="text-template-popover-title"
                          >
                            Text message templates
                          </p>
                          <IconButton
                            symbol={PlusMd as unknown as React.ComponentType}
                            variant="icon"
                            color="neutral"
                            size="medium"
                            aria-label="Add template"
                            data-testid="button-text-template-add"
                            TooltipProps={{ title: "Add template" }}
                          />
                        </div>
                        <div className="relative mt-2 flex w-full items-center border-b border-[rgba(0,0,0,0.1)]">
                          {(["personal", "company"] as const).map((tab) => {
                            const isActive = templateTab === tab;
                            return (
                              <button
                                key={tab}
                                type="button"
                                onClick={() => setTemplateTab(tab)}
                                className={`relative flex h-12 min-w-[100px] flex-1 items-center justify-center px-2 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2px] ${
                                  isActive
                                    ? "text-[var(--sui-colors-cobranding-f)]"
                                    : "text-[var(--sui-colors-neutral-b2)]"
                                }`}
                                data-testid={`tab-text-template-${tab}`}
                              >
                                {tab === "personal" ? "Personal" : "Company"}
                                {isActive && (
                                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--sui-colors-cobranding-f)]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="px-4 pt-3">
                          <div className="flex h-9 items-center gap-1 border-b border-[rgba(0,0,0,0.2)]">
                            <SearchMd
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="text-[var(--sui-colors-neutral-b2)]"
                              aria-hidden
                            />
                            <input
                              type="text"
                              value={templateSearch}
                              onChange={(e) => setTemplateSearch(e.target.value)}
                              placeholder={`Search ${templateTab} templates`}
                              className="h-9 flex-1 bg-transparent pl-1 text-[14px] leading-5 text-[var(--sui-colors-neutral-b0)] placeholder:text-[var(--sui-colors-neutral-b2)] focus:outline-none"
                              data-testid="input-text-template-search"
                              aria-label={`Search ${templateTab} templates`}
                            />
                          </div>
                        </div>
                        <div className="mt-1 max-h-[260px] overflow-y-auto" data-testid="list-text-templates">
                          {filteredTemplates.length === 0 ? (
                            <div
                              className="px-4 py-6 text-center text-[13px] text-[var(--sui-colors-neutral-b2)]"
                              data-testid="text-template-empty"
                            >
                              No templates match "{templateSearch}".
                            </div>
                          ) : (
                            filteredTemplates.map((t, i) => (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => insertTemplate(t)}
                                className="group relative flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[rgba(0,0,0,0.04)]"
                                data-testid={`template-${t.id}`}
                              >
                                <div className="flex min-w-0 flex-1 flex-col items-start">
                                  <p className="w-full truncate text-[15px] font-medium leading-5 text-[var(--sui-colors-neutral-b0)]">
                                    {t.title}
                                  </p>
                                  <p className="w-full truncate text-[12px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                                    {t.preview}
                                  </p>
                                </div>
                                <span
                                  className="flex h-9 w-9 items-center justify-center text-[var(--sui-colors-neutral-b2)] opacity-0 group-hover:opacity-100"
                                  aria-hidden
                                >
                                  <ReplyMd width={20} height={20} fill="currentColor" />
                                </span>
                                {i < filteredTemplates.length - 1 && (
                                  <span className="pointer-events-none absolute bottom-0 left-3 right-3 h-px bg-[rgba(0,0,0,0.1)]" />
                                )}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <span
                    aria-hidden
                    className="mx-1 h-4 w-px bg-[#dddfe5]"
                    data-testid="divider-text-composer"
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
                  <Popover open={composerMoreOpen} onOpenChange={setComposerMoreOpen}>
                    <PopoverTrigger asChild>
                      <span className="inline-flex">
                        <IconButton
                          symbol={OverflowMd as unknown as React.ComponentType}
                          variant="icon"
                          color="neutral"
                          size="medium"
                          aria-label="More"
                          data-testid="button-text-composer-more"
                          TooltipProps={{ title: "More" }}
                        />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      sideOffset={8}
                      className="w-56 rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-white p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                      data-testid="popover-text-composer-more"
                    >
                      <ComposerMenuItem
                        icon={<Calendar className="h-4 w-4" />}
                        label="Share booking link"
                        testId="menu-text-share-booking-link"
                        trailing={!isPurchased ? <UpgradeIndicator /> : undefined}
                        onClick={() => {
                          setComposerMoreOpen(false);
                          if (isPurchased) {
                            setBookingPickerOpen(true);
                          } else {
                            setBookingIntroOpen(true);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover open={bookingPickerOpen} onOpenChange={setBookingPickerOpen}>
                    <PopoverTrigger asChild>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none invisible h-0 w-0"
                        data-testid="anchor-text-booking-picker"
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      sideOffset={8}
                      className="w-72 rounded-[10px] border border-[rgba(0,0,0,0.2)] bg-white p-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                      data-testid="popover-text-booking-link"
                    >
                      <div className="px-2 pb-1 pt-1 text-xs font-semibold uppercase tracking-wider text-[#56585e]">
                        Insert booking link
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

type ComposerMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  testId?: string;
  trailing?: React.ReactNode;
};

const ComposerMenuItem = ({
  icon,
  label,
  onClick,
  testId,
  trailing,
}: ComposerMenuItemProps) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-[#323439] hover:bg-[#f5f6f9]"
  >
    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#323439]">
      {icon}
    </span>
    <span className="flex-1 truncate">{label}</span>
    {trailing ? <span className="ml-auto flex shrink-0 items-center">{trailing}</span> : null}
  </button>
);

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
