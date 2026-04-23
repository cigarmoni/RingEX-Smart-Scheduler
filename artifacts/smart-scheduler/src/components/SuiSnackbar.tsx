import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  CheckMd,
  Xmd
} from "@ringcentral/spring-icon";

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
        className="pointer-events-auto flex min-w-[280px] max-w-[560px] items-center gap-3 rounded-[10px] bg-neutral-b1 px-4 py-3 text-white shadow-lg"
        data-testid="snackbar-content"
      >
        <CheckMd className="h-4 w-4 shrink-0 text-success-f" />
        <span className="flex-1 typography-mainText text-neutral-b0">
          {message}
        </span>
        {actionLabel && (
          <button
            type="button"
            onClick={() => {
              onAction?.();
              onClose();
            }}
            className="typography-subtitleMini text-cobranding-f hover:opacity-90"
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
          <Xmd className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>,
    document.body,
  );
};

type SnackbarMessage = { id: number; message: string; actionLabel?: string; onAction?: () => void };

type SnackbarContextValue = {
  enqueueSnackbar: (message: string, opts?: { actionLabel?: string; onAction?: () => void }) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<SnackbarMessage | null>(null);
  const enqueueSnackbar = useCallback<SnackbarContextValue["enqueueSnackbar"]>((message, opts) => {
    setCurrent({ id: Date.now(), message, actionLabel: opts?.actionLabel, onAction: opts?.onAction });
  }, []);
  const value = useMemo(() => ({ enqueueSnackbar }), [enqueueSnackbar]);
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SuiSnackbar
        open={!!current}
        message={current?.message ?? ""}
        actionLabel={current?.actionLabel}
        onAction={current?.onAction}
        onClose={() => setCurrent(null)}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    return { enqueueSnackbar: () => {} };
  }
  return ctx;
};
