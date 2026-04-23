type Props = { className?: string };

export const ExchangeIcon = ({ className }: Props): JSX.Element => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="exch-g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#28a8ea" />
        <stop offset="100%" stopColor="#0078d4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="url(#exch-g)" />
    <path
      d="M9 9h14v14H9z m1.6 1.6v10.8h10.8V10.6H10.6z"
      fill="#fff"
    />
    <path
      d="M11.5 12 L20.5 12 L16 16.5 Z M11.5 20 L16 15.5 L20.5 20 Z"
      fill="#fff"
    />
    <text
      x="16"
      y="22"
      textAnchor="middle"
      fontSize="11"
      fontWeight="700"
      fill="#fff"
      fontFamily="Arial, sans-serif"
    >
      X
    </text>
  </svg>
);

export const GoogleIcon = ({ className }: Props): JSX.Element => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

export const AppleCalendarIcon = ({ className }: Props): JSX.Element => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="5" fill="#fff" stroke="#dddfe5" />
    <rect x="2" y="2" width="28" height="8" rx="5" fill="#fa3d3d" />
    <rect x="2" y="6" width="28" height="4" fill="#fa3d3d" />
    <text
      x="16"
      y="9"
      textAnchor="middle"
      fontSize="5.5"
      fontWeight="700"
      fill="#fff"
      fontFamily="-apple-system, Helvetica, Arial, sans-serif"
    >
      WED
    </text>
    <text
      x="16"
      y="25"
      textAnchor="middle"
      fontSize="14"
      fontWeight="300"
      fill="#1d1d1f"
      fontFamily="-apple-system, Helvetica, Arial, sans-serif"
    >
      17
    </text>
  </svg>
);

export const RingCentralIcon = ({ className }: Props): JSX.Element => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="14" fill="#ff7a00" />
    <path
      d="M11 9h7c2.8 0 5 2.2 5 5 0 2-1.2 3.7-2.9 4.5l3.2 4.5h-3.6l-2.9-4.1H14V23h-3V9zm3 2.7v4.5h4c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2h-4z"
      fill="#fff"
    />
  </svg>
);
