import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";

interface SuiSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export const SuiSnackbar = ({
  open,
  message,
  onClose,
  durationMs = 4000,
  actionLabel,
  onAction,
}: SuiSnackbarProps): JSX.Element | null => {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(id);
  }, [open, durationMs, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center"
      data-testid="snackbar-root"
    >
      <div
        role="status"
        className="pointer-events-auto flex min-w-[280px] max-w-[560px] items-center gap-3 rounded-[10px] bg-sui-neutral-b1 px-4 py-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)]"
        data-testid="snackbar-content"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-sui-success" />
        <span className="flex-1 font-main-text text-[length:var(--main-text-font-size)]">
          {message}
        </span>
        {actionLabel && (
          <button
            type="button"
            onClick={() => {
              onAction?.();
              onClose();
            }}
            className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] text-sui-cobranding hover:opacity-90"
            data-testid="snackbar-action"
          >
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="flex h-6 w-6 items-center justify-center rounded text-white/70 hover:bg-white/10 hover:text-white"
          data-testid="snackbar-dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>,
    document.body,
  );
};
