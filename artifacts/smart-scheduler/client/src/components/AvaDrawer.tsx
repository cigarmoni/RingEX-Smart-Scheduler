import { useState, type FormEvent } from "react";
import { SquarePen, MoreVertical, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { useIsBookingPurchased } from "@/lib/flows";
import { bookingTypes } from "@/lib/bookingTypes";

interface AvaDrawerProps {
  open: boolean;
  onClose: () => void;
}

const suggestedPrompts = [
  "Help me create a booking page",
  "How to share my booking link to a customer",
];

const AVA_REPLY =
  "Bookings can help with that.\nYou can create booking pages and share links via SMS, email or message, so customers can choose a time based on your availability.";

type ShareEntry =
  | { kind: "user"; id: string; text: string }
  | { kind: "ava-prompt"; id: string; recipient: string | null; time: string }
  | { kind: "form"; id: string; recipient: string | null }
  | {
      kind: "ava-confirm";
      id: string;
      time: string;
      recipient: string | null;
      bookingTitle: string;
      message: string;
    }
  | { kind: "ava-cancel"; id: string; time: string };

type DrawerView =
  | { kind: "empty" }
  | { kind: "promoted"; prompt: string; replyTime: string }
  | { kind: "share"; recipient: string | null; entries: ShareEntry[]; active: boolean };

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${ampm}`;
};

const SHARE_INTENT_REGEX =
  /\bbooking\s*link\b|\b(?:share|send|forward|give|email|text)\b[^.?!]*\bbook(?:ing)?\b|\bbook(?:ing)?\b[^.?!]*\b(?:link|share|send)\b/i;

const extractRecipient = (text: string): string | null => {
  const toMatch = text.match(/\b(?:to|with|for)\s+([a-zA-Z][\w'’-]*(?:\s+[a-zA-Z][\w'’-]*)?)/i);
  if (!toMatch) return null;
  return toMatch[1]
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

export const AvaDrawer = ({ open, onClose }: AvaDrawerProps): JSX.Element | null => {
  const [message, setMessage] = useState("");
  const [view, setView] = useState<DrawerView>({ kind: "empty" });
  const [upsellOpen, setUpsellOpen] = useState(false);
  const isPurchased = useIsBookingPurchased();

  if (!open) return null;

  const resetToEmpty = () => {
    setView({ kind: "empty" });
    setMessage("");
  };

  const startShareFlow = (text: string) => {
    const recipient = extractRecipient(text);
    const now = formatTime(new Date());
    const id = `${Date.now()}`;
    setView({
      kind: "share",
      recipient,
      active: true,
      entries: [
        { kind: "user", id: `u-${id}`, text },
        { kind: "ava-prompt", id: `p-${id}`, recipient, time: now },
        { kind: "form", id: `f-${id}`, recipient },
      ],
    });
  };

  const appendShareUserMessage = (text: string) => {
    if (view.kind !== "share") return;
    setView({
      ...view,
      entries: [...view.entries, { kind: "user", id: `u-${Date.now()}`, text }],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
    if (isPurchased && SHARE_INTENT_REGEX.test(trimmed)) {
      startShareFlow(trimmed);
      return;
    }
    if (view.kind === "share" && view.active) {
      appendShareUserMessage(trimmed);
      return;
    }
    setView({ kind: "promoted", prompt: trimmed, replyTime: formatTime(new Date()) });
  };

  const handlePromptClick = (prompt: string) => {
    if (isPurchased && SHARE_INTENT_REGEX.test(prompt)) {
      startShareFlow(prompt);
      return;
    }
    setView({ kind: "promoted", prompt, replyTime: formatTime(new Date()) });
  };

  const handleFormCancel = (formId: string) => {
    if (view.kind !== "share") return;
    const next = view.entries
      .filter((e) => e.id !== formId)
      .concat({
        kind: "ava-cancel",
        id: `c-${Date.now()}`,
        time: formatTime(new Date()),
      });
    setView({ ...view, entries: next, active: false });
  };

  const handleFormContinue = (
    formId: string,
    bookingTitle: string,
    extraMessage: string,
  ) => {
    if (view.kind !== "share") return;
    const next = view.entries
      .filter((e) => e.id !== formId)
      .concat({
        kind: "ava-confirm",
        id: `done-${Date.now()}`,
        time: formatTime(new Date()),
        recipient: view.recipient,
        bookingTitle,
        message: extraMessage.trim(),
      });
    setView({ ...view, entries: next, active: false });
  };

  const subtitle =
    view.kind === "share" && view.active
      ? `Booking link sharing for ${view.recipient ?? "customers"}`
      : null;

  return (
    <>
      <aside
        data-testid="drawer-ava"
        className="relative z-30 flex w-[400px] shrink-0 flex-col border-l border-[#dddfe5] bg-white"
      >
        <header className="flex items-start gap-2 px-4 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full [background:radial-gradient(50%_50%_at_60%_62%,rgba(255,92,0,1)_13%,rgba(255,92,0,0.1)_80%,rgba(255,92,0,0)_100%),linear-gradient(0deg,rgba(255,122,0,1)_0%,rgba(255,122,0,1)_100%)]">
              <img className="h-3.5 w-3.5" alt="Ava" src="/figmaAssets/aisparklefilled.svg" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="truncate font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-black [font-style:var(--subtitle-font-style)]">
                Ask AVA
              </h3>
              {subtitle && (
                <p
                  data-testid="text-ava-subtitle"
                  className="truncate text-[12px] leading-4 text-[#6e7079]"
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="New chat"
              onClick={resetToEmpty}
              data-testid="button-ava-new-chat"
            >
              <SquarePen className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="History"
              data-testid="button-ava-history"
            >
              <MoreVertical className="h-4 w-4 text-black" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5 bg-[#0000001a]" />
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="Close Ava"
              onClick={onClose}
              data-testid="button-ava-close"
            >
              <X className="h-4 w-4 text-black" />
            </Button>
          </div>
        </header>
        <Separator className="bg-[#0000001a]" />

        {view.kind === "empty" ? (
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-16">
            <div className="relative h-24 w-24">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-[#dddfe580]">
                <img className="h-full w-full object-cover" alt="Ava avatar" src="/figmaAssets/ava-avatar.png" />
              </div>
              <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white [background:radial-gradient(50%_50%_at_60%_62%,rgba(255,92,0,1)_13%,rgba(255,92,0,0.1)_80%,rgba(255,92,0,0)_100%),linear-gradient(0deg,rgba(255,122,0,1)_0%,rgba(255,122,0,1)_100%)]">
                <img className="h-5 w-5" alt="" src="/figmaAssets/aisparklefilled.svg" />
              </div>
            </div>
            <h4 className="mt-4 text-center font-headline text-[20px] font-semibold leading-7 tracking-[-0.2px] text-black">
              What can I help with?
            </h4>

            <div className="mt-4 flex w-full flex-col gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={prompt}
                  type="button"
                  data-testid={`chip-prompt-${i}`}
                  onClick={() => handlePromptClick(prompt)}
                  className="flex min-h-[44px] w-full items-center gap-1.5 rounded-2xl border-[1.2px] border-solid border-[#00000033] px-3.5 py-2.5 text-left hover:bg-[#f5f6f9]"
                >
                  <span className="pr-1 text-base font-semibold leading-5 tracking-[-0.2px] text-[#323439]">👉</span>
                  <span className="flex-1 font-descriptor-mini text-[12px] font-medium leading-[17px] text-black">
                    {prompt}
                  </span>
                </button>
              ))}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  data-testid="button-ava-view-more-prompts"
                  className="flex items-center gap-1 rounded px-1 text-[12px] font-medium leading-[17px] text-[#0040dd] hover:underline"
                >
                  View more prompts
                  <span aria-hidden className="inline-block">↗</span>
                </button>
              </div>
            </div>
          </div>
        ) : view.kind === "promoted" ? (
          <div
            data-testid="ava-conversation"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            <div className="flex justify-end">
              <div
                data-testid="bubble-user-prompt"
                className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0040dd] px-3 py-2 text-[14px] leading-5 text-white"
              >
                {view.prompt}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
              </div>
              <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
              <span className="text-[#dddfe5]">|</span>
              <span data-testid="text-ava-time" className="text-[12px] leading-4 text-[#6e7079]">
                {view.replyTime}
              </span>
            </div>
            <p
              data-testid="text-ava-reply"
              className="whitespace-pre-line text-[14px] leading-5 text-black"
            >
              {AVA_REPLY}
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                onClick={resetToEmpty}
                data-testid="button-ava-not-now"
                className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
              >
                Not now
              </Button>
              <Button
                variant="outline"
                onClick={() => setUpsellOpen(true)}
                data-testid="button-ava-find-out-more"
                className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
              >
                Find out more
              </Button>
            </div>
          </div>
        ) : (
          <div
            data-testid="ava-conversation-share"
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
          >
            {view.entries.map((entry) => {
              if (entry.kind === "user") {
                return (
                  <div key={entry.id} className="flex justify-end">
                    <div
                      data-testid={`bubble-user-${entry.id}`}
                      className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0040dd] px-3 py-2 text-[14px] leading-5 text-white"
                    >
                      {entry.text}
                    </div>
                  </div>
                );
              }
              if (entry.kind === "ava-prompt") {
                const name = entry.recipient ?? "this contact";
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                        <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                      </div>
                      <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                      <span className="text-[#dddfe5]">|</span>
                      <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                    </div>
                    <p
                      data-testid="text-ava-share-prompt"
                      className="text-[14px] leading-5 text-black"
                    >
                      Please select the booking type and enter additional message you want to share with {name}.
                    </p>
                  </div>
                );
              }
              if (entry.kind === "form") {
                return (
                  <ShareBookingForm
                    key={entry.id}
                    onCancel={() => handleFormCancel(entry.id)}
                    onContinue={(title, msg) => handleFormContinue(entry.id, title, msg)}
                  />
                );
              }
              if (entry.kind === "ava-cancel") {
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                        <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                      </div>
                      <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                      <span className="text-[#dddfe5]">|</span>
                      <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                    </div>
                    <p
                      data-testid="text-ava-share-cancel"
                      className="text-[14px] leading-5 text-black"
                    >
                      No problem — let me know if you'd like to share a booking link later.
                    </p>
                  </div>
                );
              }
              // ava-confirm
              const name = entry.recipient ?? "your contact";
              return (
                <div key={entry.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                      <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                    </div>
                    <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                    <span className="text-[#dddfe5]">|</span>
                    <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                  </div>
                  <p
                    data-testid="text-ava-share-confirm"
                    className="text-[14px] leading-5 text-black"
                  >
                    Done — I shared your <span className="font-semibold">{entry.bookingTitle}</span> booking link with {name}.
                    {entry.message
                      ? ` I included your note: “${entry.message}”.`
                      : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="px-3 pb-2 pt-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border border-solid border-[#00000033] bg-white px-3 py-2 focus-within:border-[#0040dd]"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask AVA anything or type / for more"
              data-testid="input-ava-message"
              className="flex-1 bg-transparent font-main-text text-[length:var(--main-text-font-size)] leading-[var(--main-text-line-height)] text-black placeholder:text-[#9498a4] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              data-testid="button-ava-send"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-transparent text-[#9498a4] disabled:cursor-not-allowed enabled:bg-[#0040dd] enabled:text-white enabled:hover:bg-[#0037be]"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] leading-4 text-[#6e7079]">
            Content generated by AI. Was it accurate?
          </p>
        </div>
      </aside>

      <AvaUpsellDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
    </>
  );
};

interface ShareBookingFormProps {
  onCancel: () => void;
  onContinue: (bookingTitle: string, message: string) => void;
}

const ShareBookingForm = ({ onCancel, onContinue }: ShareBookingFormProps): JSX.Element => {
  const [bookingId, setBookingId] = useState<string>(bookingTypes[0]?.id ?? "");
  const [extra, setExtra] = useState("");

  const handleContinue = () => {
    const selected = bookingTypes.find((b) => b.id === bookingId) ?? bookingTypes[0];
    onContinue(selected.title, extra);
  };

  return (
    <div
      data-testid="form-ava-share-booking"
      className="flex flex-col gap-3 rounded-xl border border-solid border-[#dddfe5] bg-white p-3"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold leading-4 text-[#323439]">
          Select booking type
        </label>
        <Select value={bookingId} onValueChange={setBookingId}>
          <SelectTrigger
            data-testid="select-ava-booking-type"
            className="h-9 rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
          >
            <SelectValue placeholder="Select booking type" />
          </SelectTrigger>
          <SelectContent>
            {bookingTypes.map((bt) => (
              <SelectItem
                key={bt.id}
                value={bt.id}
                data-testid={`option-ava-booking-${bt.id}`}
              >
                {bt.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold leading-4 text-[#323439]">
          Additional message
        </label>
        <Textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Enter additional message"
          data-testid="textarea-ava-additional-message"
          className="min-h-[72px] rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          data-testid="button-ava-share-cancel"
          className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleContinue}
          data-testid="button-ava-share-continue"
          className="h-8 rounded-full bg-[#0040dd] px-4 py-0 text-[14px] font-medium leading-5 text-white hover:bg-[#0037be]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
