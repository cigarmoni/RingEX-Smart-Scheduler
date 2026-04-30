import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ShareBookingPopoverContentProps {
  onCancel: () => void;
  onSend: () => void;
  idPrefix?: string;
  stickyFooter?: boolean;
}

const labelClass =
  "font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black";
const fieldClass =
  "h-9 rounded-md border border-sui-neutral-b4 bg-white px-3 font-main-text text-[length:var(--main-text-font-size)] text-black";
const textareaClass =
  "min-h-[64px] rounded-md border border-sui-neutral-b4 bg-white p-2 font-main-text text-[length:var(--main-text-font-size)] text-black";

export const ShareBookingPopoverContent = ({
  onCancel,
  onSend,
  idPrefix = "share-booking",
  stickyFooter = false,
}: ShareBookingPopoverContentProps): JSX.Element => {
  const [bookingType, setBookingType] = useState("therapy-session-natalie");
  const [sendVia, setSendVia] = useState("email");
  const [recipient, setRecipient] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const id = (key: string) => `${idPrefix}-${key}`;

  const footer = (
    <div
      className={
        stickyFooter
          ? "flex justify-end gap-2 border-t border-sui-neutral-b4 bg-white px-4 py-3"
          : "flex justify-end gap-2 pt-1"
      }
    >
      <Button
        variant="outline"
        onClick={onCancel}
        className="h-8 rounded-[10px] border border-sui-neutral-b4 bg-white px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-black hover:bg-sui-neutral-b5"
        data-testid="button-share-popover-cancel"
      >
        Cancel
      </Button>
      <Button
        onClick={onSend}
        disabled={recipient.trim().length === 0}
        className="h-8 rounded-[10px] bg-sui-cobranding px-3 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] text-white hover:bg-sui-cobranding disabled:bg-sui-neutral-b4 disabled:text-white"
        data-testid="button-share-popover-send"
      >
        Send
      </Button>
    </div>
  );

  const body = (
    <div
      className={
        stickyFooter
          ? "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
          : "flex flex-col gap-3"
      }
    >
      <div
        className="font-headline text-[16px] font-semibold text-black"
        data-testid="text-share-popover-title"
      >
        Share booking link
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={id("type")} className={labelClass}>
          Booking type
        </Label>
        <Select value={bookingType} onValueChange={setBookingType}>
          <SelectTrigger
            id={id("type")}
            className={fieldClass}
            data-testid="select-share-popover-type"
          >
            <SelectValue placeholder="Select a booking type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="therapy-session-natalie">
              Therapy session with Natalie
            </SelectItem>
            <SelectItem value="initial-consultation">Initial consultation</SelectItem>
            <SelectItem value="follow-up-15">15 min follow-up</SelectItem>
            <SelectItem value="discovery-call-30">30 min discovery call</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={id("via")} className={labelClass}>
          Send via
        </Label>
        <Select value={sendVia} onValueChange={setSendVia}>
          <SelectTrigger
            id={id("via")}
            className={fieldClass}
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
            <Label htmlFor={id("message")} className={labelClass}>
              Text message
            </Label>
            <Textarea
              id={id("message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter text message"
              className={textareaClass}
              data-testid="textarea-share-popover-message"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("to")} className={labelClass}>
              To
            </Label>
            <Input
              id={id("to")}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="(555) 555-5555"
              className={fieldClass}
              data-testid="input-share-popover-to"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("from")} className={labelClass}>
              From
            </Label>
            <Input
              id={id("from")}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="(555) 555-5555"
              className={fieldClass}
              data-testid="input-share-popover-from"
            />
          </div>
        </>
      )}

      {sendVia === "chat" && (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("conversation")} className={labelClass}>
              Conversation
            </Label>
            <Input
              id={id("conversation")}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Select conversation"
              className={fieldClass}
              data-testid="input-share-popover-conversation"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("message")} className={labelClass}>
              Message
            </Label>
            <Textarea
              id={id("message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className={textareaClass}
              data-testid="textarea-share-popover-message"
            />
          </div>
        </>
      )}

      {sendVia === "email" && (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("email")} className={labelClass}>
              Email
            </Label>
            <Input
              id={id("email")}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="name@example.com"
              className={fieldClass}
              data-testid="input-share-popover-email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id("message")} className={labelClass}>
              Message
            </Label>
            <Textarea
              id={id("message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className={textareaClass}
              data-testid="textarea-share-popover-message"
            />
          </div>
        </>
      )}

    </div>
  );

  if (stickyFooter) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {body}
        {footer}
      </div>
    );
  }

  return (
    <>
      {body}
      {footer}
    </>
  );
};

export default ShareBookingPopoverContent;
