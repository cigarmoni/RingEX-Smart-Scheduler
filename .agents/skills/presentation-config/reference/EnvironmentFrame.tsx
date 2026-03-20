import { type ReactNode, useState, useRef, useCallback, useEffect } from "react";
import { usePresentationConfig } from "./PresentationConfigContext"
import imgMacClose from "../assets/macos/close.svg";
import imgMacMinimize from "../assets/macos/minimize.svg";
import imgMacFullScreen from "../assets/macos/fullscreen.svg";
import imgMacWallpaper from "../assets/macos/wallpaper-light.jpg";
import imgMacFinder from "../assets/macos/finder.png";
import imgMacSafari from "../assets/macos/safari.png";
import imgMacTrash from "../assets/macos/trash.png";
import imgWinWallpaper from "../assets/windows/wallpaper.jpg";
import imgRcIcon from "../assets/windows/rc-icon.svg";

const INITIAL_WIDTH = 1440;
const INITIAL_HEIGHT = 960;
const MIN_WIDTH = 480;
const MIN_HEIGHT = 320;

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

function useWindowInteraction(containerRef: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: INITIAL_WIDTH, h: INITIAL_HEIGHT });
  const [centered, setCentered] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 48;
    const w = Math.min(INITIAL_WIDTH, rect.width - padding);
    const h = Math.min(INITIAL_HEIGHT, rect.height - padding);
    if (w !== INITIAL_WIDTH || h !== INITIAL_HEIGHT) {
      setSize({ w, h });
    }
  }, [containerRef]);

  const dragging = useRef(false);
  const resizing = useRef<ResizeDirection | null>(null);
  const dragStart = useRef({ mx: 0, my: 0, x: 0, y: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, x: 0, y: 0, w: 0, h: 0 });

  const onTitleBarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, img[alt='Close'], img[alt='Minimize'], img[alt='Full Screen']")) return;
      e.preventDefault();
      dragging.current = true;

      if (centered && containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const cx = (container.width - size.w) / 2;
        const cy = (container.height - size.h) / 2;
        setPos({ x: cx, y: cy });
        setCentered(false);
        dragStart.current = { mx: e.clientX, my: e.clientY, x: cx, y: cy };
      } else {
        dragStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y };
      }
    },
    [centered, pos, size, containerRef]
  );

  const onResizeMouseDown = useCallback(
    (dir: ResizeDirection, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizing.current = dir;

      if (centered && containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const cx = (container.width - size.w) / 2;
        const cy = (container.height - size.h) / 2;
        setPos({ x: cx, y: cy });
        setCentered(false);
        resizeStart.current = { mx: e.clientX, my: e.clientY, x: cx, y: cy, w: size.w, h: size.h };
      } else {
        resizeStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
      }
    },
    [centered, pos, size, containerRef]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mx;
        const dy = e.clientY - dragStart.current.my;
        setPos({ x: dragStart.current.x + dx, y: dragStart.current.y + dy });
      }
      if (resizing.current) {
        const dir = resizing.current;
        const dx = e.clientX - resizeStart.current.mx;
        const dy = e.clientY - resizeStart.current.my;
        const s = resizeStart.current;

        let newX = s.x;
        let newY = s.y;
        let newW = s.w;
        let newH = s.h;

        if (dir.includes("e")) newW = Math.max(MIN_WIDTH, s.w + dx);
        if (dir.includes("w")) {
          newW = Math.max(MIN_WIDTH, s.w - dx);
          newX = s.x + (s.w - newW);
        }
        if (dir.includes("s")) newH = Math.max(MIN_HEIGHT, s.h + dy);
        if (dir.includes("n")) {
          newH = Math.max(MIN_HEIGHT, s.h - dy);
          newY = s.y + (s.h - newH);
        }

        setSize({ w: newW, h: newH });
        setPos({ x: newX, y: newY });
      }
    };

    const onMouseUp = () => {
      dragging.current = false;
      resizing.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return { pos, size, centered, onTitleBarMouseDown, onResizeMouseDown };
}

const RESIZE_HANDLE_SIZE = 6;

const resizeHandleStyles: Record<ResizeDirection, React.CSSProperties> = {
  n: { top: -RESIZE_HANDLE_SIZE / 2, left: RESIZE_HANDLE_SIZE, right: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "n-resize" },
  s: { bottom: -RESIZE_HANDLE_SIZE / 2, left: RESIZE_HANDLE_SIZE, right: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "s-resize" },
  e: { right: -RESIZE_HANDLE_SIZE / 2, top: RESIZE_HANDLE_SIZE, bottom: RESIZE_HANDLE_SIZE, width: RESIZE_HANDLE_SIZE, cursor: "e-resize" },
  w: { left: -RESIZE_HANDLE_SIZE / 2, top: RESIZE_HANDLE_SIZE, bottom: RESIZE_HANDLE_SIZE, width: RESIZE_HANDLE_SIZE, cursor: "w-resize" },
  ne: { top: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE * 2, height: RESIZE_HANDLE_SIZE * 2, cursor: "ne-resize" },
  nw: { top: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE * 2, height: RESIZE_HANDLE_SIZE * 2, cursor: "nw-resize" },
  se: { bottom: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE * 2, height: RESIZE_HANDLE_SIZE * 2, cursor: "se-resize" },
  sw: { bottom: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE * 2, height: RESIZE_HANDLE_SIZE * 2, cursor: "sw-resize" },
};

function ResizeHandles({ onResizeMouseDown }: { onResizeMouseDown: (dir: ResizeDirection, e: React.MouseEvent) => void }) {
  return (
    <>
      {(Object.keys(resizeHandleStyles) as ResizeDirection[]).map((dir) => (
        <div
          key={dir}
          className="absolute z-50"
          style={{ ...resizeHandleStyles[dir] }}
          onMouseDown={(e) => onResizeMouseDown(dir, e)}
        />
      ))}
    </>
  );
}

function MacOSMenuBar() {
  const menuItems = ["File", "Edit", "View", "Go", "Window", "Help"];
  return (
    <div
      className="flex items-center h-6 px-2 shrink-0"
      style={{
        backdropFilter: "blur(25px)",
        background: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <div className="flex items-center gap-0">
        <div className="px-[11px] py-[2px]">
          <span className="text-[16.3px] text-black leading-5">&#xF8FF;</span>
        </div>
        <div className="px-[11px] py-1">
          <span className="text-[13px] font-bold text-black leading-4">
            RingCentral
          </span>
        </div>
        {menuItems.map((item) => (
          <div key={item} className="px-[11px] py-1">
            <span className="text-[13px] font-semibold text-black leading-4">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MacOSWindowChrome({
  children,
  size,
  pos,
  centered,
  onTitleBarMouseDown,
  onResizeMouseDown,
}: {
  children: ReactNode;
  size: { w: number; h: number };
  pos: { x: number; y: number };
  centered: boolean;
  onTitleBarMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (dir: ResizeDirection, e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="absolute flex flex-col overflow-visible rounded-[10px]"
      style={{
        width: size.w,
        height: size.h,
        ...(centered
          ? { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
          : { left: pos.x, top: pos.y }),
      }}
    >
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0px 0px 0px 0.5px rgba(0,0,0,0.2), 0px 12px 22.8px 0px rgba(0,0,0,0.15)",
        }}
      />
      <div className="relative flex flex-col overflow-clip rounded-[10px] size-full">
        <div
          className="relative flex items-center justify-center h-7 px-[84px] shrink-0 bg-neutral-base cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onTitleBarMouseDown}
        >
          <div className="absolute left-3 top-0 bottom-0 flex items-center gap-2">
            <img alt="Close" src={imgMacClose} className="size-3" />
            <img alt="Minimize" src={imgMacMinimize} className="size-3" />
            <img alt="Full Screen" src={imgMacFullScreen} className="size-3" />
          </div>
          <span className="typography-subtitle text-neutral-b0 whitespace-nowrap">
            RingCentral
          </span>
        </div>
        <div className="flex flex-col flex-1 min-h-0 overflow-auto bg-neutral-base rounded-b-[10px]">
          {children}
        </div>
        <div
          className="absolute inset-0 rounded-[10px] pointer-events-none"
          style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
        />
      </div>
      <ResizeHandles onResizeMouseDown={onResizeMouseDown} />
    </div>
  );
}

function MacOSDock() {
  return (
    <div className="flex justify-center pb-[5px] pt-[5px] shrink-0">
      <div
        className="flex items-end gap-[2px] px-2 py-1 rounded-2xl"
        style={{
          backdropFilter: "blur(68px)",
          background: "rgba(246, 246, 246, 0.36)",
          border: "1px solid rgba(26, 26, 26, 0.46)",
          boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.15)",
        }}
      >
        <img alt="Finder" src={imgMacFinder} className="size-[50px]" />
        <img alt="Safari" src={imgMacSafari} className="size-[50px]" />
        <div className="size-[50px] flex justify-center items-center">
          <img alt="RingCentral" src={imgRcIcon} className="size-[44px]" />
        </div>
        <div className="mx-1 w-px h-8 bg-[rgba(0,0,0,0.3)] self-center" />
        <img alt="Trash" src={imgMacTrash} className="size-[50px]" />
      </div>
    </div>
  );
}

function MacOSFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pos, size, centered, onTitleBarMouseDown, onResizeMouseDown } =
    useWindowInteraction(containerRef);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "100vh",
        backgroundImage: `url(${imgMacWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MacOSMenuBar />
      <div ref={containerRef} className="flex-1 relative min-h-0 overflow-hidden">
        <MacOSWindowChrome
          size={size}
          pos={pos}
          centered={centered}
          onTitleBarMouseDown={onTitleBarMouseDown}
          onResizeMouseDown={onResizeMouseDown}
        >
          {children}
        </MacOSWindowChrome>
      </div>
      <MacOSDock />
    </div>
  );
}

function WindowsWindowChrome({
  children,
  size,
  pos,
  centered,
  onTitleBarMouseDown,
  onResizeMouseDown,
}: {
  children: ReactNode;
  size: { w: number; h: number };
  pos: { x: number; y: number };
  centered: boolean;
  onTitleBarMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (dir: ResizeDirection, e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="absolute flex flex-col overflow-visible rounded-[10px]"
      style={{
        width: size.w,
        height: size.h,
        ...(centered
          ? { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
          : { left: pos.x, top: pos.y }),
      }}
    >
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0px 0px 0px 0.5px rgba(0,0,0,0.2), 0px 12px 22.8px 0px rgba(0,0,0,0.15)",
        }}
      />
      <div className="relative flex flex-col overflow-clip rounded-[10px] size-full">
        <div
          className="relative flex items-center h-10 px-[84px] shrink-0 bg-neutral-base cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onTitleBarMouseDown}
        >
          <div className="absolute left-3 top-0 bottom-0 flex items-center gap-2">
            <img
              alt="RingCentral"
              src={imgRcIcon}
              className="size-4 overflow-clip"
            />
            <span className="typography-subtitle text-neutral-b0 whitespace-nowrap">
              RingCentral
            </span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 flex items-center">
            <button
              className="flex items-center justify-center w-[46px] h-10 border-none bg-transparent cursor-default hover:bg-neutral-b5"
              style={{ color: "#72757a" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line
                  x1="0"
                  y1="11"
                  x2="12"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
            <button
              className="flex items-center justify-center w-[46px] h-10 border-none bg-transparent cursor-default hover:bg-neutral-b5"
              style={{ color: "#72757a" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="11"
                  height="11"
                  rx="0.6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </button>
            <button
              className="flex items-center justify-center w-[46px] h-10 border-none bg-transparent cursor-default hover:bg-[#e81123] hover:text-white rounded-tr-[10px]"
              style={{ color: "#72757a" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line
                  x1="1"
                  y1="1"
                  x2="11"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="11"
                  y1="1"
                  x2="1"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 overflow-auto bg-neutral-base rounded-b-[10px]">
          {children}
        </div>
        <div
          className="absolute inset-0 rounded-[10px] pointer-events-none"
          style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
        />
      </div>
      <ResizeHandles onResizeMouseDown={onResizeMouseDown} />
    </div>
  );
}

function WindowsTaskbar() {
  return (
    <div
      className="flex items-center justify-between h-16 px-4 shrink-0"
      style={{
        backdropFilter: "blur(90px)",
        background: "rgba(255, 255, 255, 0.86)",
        borderTop: "0.9px solid rgba(203, 239, 255, 0.16)",
      }}
    >
      <div className="w-20" />
      <div className="flex items-center gap-7">
        <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content]">
          <div className="col-start-1 row-start-1 size-[13px] bg-[#6cd8ff]" />
          <div className="col-start-1 row-start-1 mt-[14px] size-[13px] bg-[#32b2f9]" />
          <div className="col-start-1 row-start-1 ml-[14px] mt-[14px] size-[13px] bg-[#1b9cf7]" />
          <div className="col-start-1 row-start-1 ml-[14px] size-[13px] bg-[#40b2f0]" />
        </div>
        <div
          className="flex items-center justify-center size-12 rounded"
          style={{
            backdropFilter: "blur(0px)",
            background: "rgba(255, 255, 255, 0.84)",
            border: "0.9px solid rgba(110, 116, 255, 0.16)",
            boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.09)",
          }}
        >
          <img alt="RingCentral" src={imgRcIcon} className="size-9" />
        </div>
      </div>
      <div className="flex items-center gap-4 text-[#0c0c0c]">
        <div
          className="flex flex-col items-end gap-[3px] text-[16px] leading-none"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <span>9:41 AM</span>
          <span>6/21</span>
        </div>
        <div className="w-[3px] h-16 bg-[rgba(116,143,167,0.4)]" />
      </div>
    </div>
  );
}

function WindowsFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pos, size, centered, onTitleBarMouseDown, onResizeMouseDown } =
    useWindowInteraction(containerRef);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "100vh",
        backgroundImage: `url(${imgWinWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={containerRef} className="flex-1 relative min-h-0 overflow-hidden">
        <WindowsWindowChrome
          size={size}
          pos={pos}
          centered={centered}
          onTitleBarMouseDown={onTitleBarMouseDown}
          onResizeMouseDown={onResizeMouseDown}
        >
          {children}
        </WindowsWindowChrome>
      </div>
      <WindowsTaskbar />
    </div>
  );
}

export function EnvironmentFrame({ children }: { children: ReactNode }) {
  const { environment } = usePresentationConfig();

  if (environment === "macos") return <MacOSFrame>{children}</MacOSFrame>;
  if (environment === "windows") return <WindowsFrame>{children}</WindowsFrame>;
  return <div className="flex flex-col min-h-screen">{children}</div>;
}
