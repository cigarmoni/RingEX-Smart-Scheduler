import { useState } from "react";
import {
  Select,
  Option,
  TextField,
  Textarea,
} from "@ringcentral/spring-ui";
import { Button } from "@/components/ui/button";

export interface ShareBookingPopoverContentProps {
  onCancel: () => void;
  onSend: () => void;
  idPrefix?: string;
  stickyFooter?: boolean;
}

export const ShareBookingPopoverContent = ({
  onCancel,
  onSend,
  idPrefix = "share-booking",
  stickyFooter = false,
}: ShareBookingPopoverContentProps): JSX.Element => {
  const [bookingType, setBookingType] = useState("therapy-session-natalie");
  const [sendVia, setSendVia] = useState("text");
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

      <Select
        variant="outlined" fullWidth
        size="medium"
        label="Booking type"
        htmlFor={id("type")}
        value={bookingType}
        onChange={(e) => setBookingType(e.target.value)}
        inputProps={{ id: id("type") }}
        data-testid="select-share-popover-type"
      >
        <Option value="therapy-session-natalie">
          Therapy session with Natalie
        </Option>
        <Option value="initial-consultation">Initial consultation</Option>
        <Option value="follow-up-15">15 min follow-up</Option>
        <Option value="discovery-call-30">30 min discovery call</Option>
      </Select>

      <Select
        variant="outlined" fullWidth
        size="medium"
        label="Send via"
        htmlFor={id("via")}
        value={sendVia}
        onChange={(e) => setSendVia(e.target.value)}
        inputProps={{ id: id("via") }}
        data-testid="select-share-popover-via"
      >
        <Option value="text">SMS</Option>
        <Option value="chat">Chat</Option>
        <Option value="email">Email</Option>
      </Select>

      {sendVia === "text" && (
        <>
          <Textarea
            variant="outlined" fullWidth
            size="medium"
            label="Text message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter text message"
            minRows={2}
            inputProps={{ id: id("message") }}
            data-testid="textarea-share-popover-message"
          />
          <TextField
            variant="outlined" fullWidth
            size="medium"
            label="To"
            type="tel"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="(555) 555-5555"
            inputProps={{ id: id("to") }}
            data-testid="input-share-popover-to"
          />
          <TextField
            variant="outlined" fullWidth
            size="medium"
            label="From"
            type="tel"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="(555) 555-5555"
            inputProps={{ id: id("from") }}
            data-testid="input-share-popover-from"
          />
        </>
      )}

      {sendVia === "chat" && (
        <>
          <TextField
            variant="outlined" fullWidth
            size="medium"
            label="Conversation"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Select conversation"
            inputProps={{ id: id("conversation") }}
            data-testid="input-share-popover-conversation"
          />
          <Textarea
            variant="outlined" fullWidth
            size="medium"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            minRows={2}
            inputProps={{ id: id("message") }}
            data-testid="textarea-share-popover-message"
          />
        </>
      )}

      {sendVia === "email" && (
        <>
          <TextField
            variant="outlined" fullWidth
            size="medium"
            label="Email"
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="name@example.com"
            inputProps={{ id: id("email") }}
            data-testid="input-share-popover-email"
          />
          <Textarea
            variant="outlined" fullWidth
            size="medium"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            minRows={2}
            inputProps={{ id: id("message") }}
            data-testid="textarea-share-popover-message"
          />
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
