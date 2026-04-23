interface EmptyCardProps {
  illustrationSrc: string;
  variantLabel?: string;
}

export function EmptyStateCard({ illustrationSrc, variantLabel }: EmptyCardProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6f9] p-6" style={{ fontFamily: 'Inter, Helvetica, Arial, sans-serif' }}>
      <div className="relative flex w-full max-w-[640px] flex-1 flex-col items-center justify-center gap-6 rounded-xl border border-solid border-[#dddfe5] bg-white p-8 shadow-none">
        {variantLabel && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {variantLabel}
          </div>
        )}
        <img className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]" alt="Booking illustration" src={illustrationSrc} />
        <div className="flex w-full max-w-[600px] flex-col items-center gap-3 sm:gap-4">
          <h3 className="w-full text-center text-[28px] font-bold leading-9 text-black">
            Add online booking to your business
          </h3>
          <p className="w-full text-center text-[14px] font-medium leading-5 text-[#323439]">
            Let customers book time with you based on your availability. Create
            booking types, share your link, and manage appointments in one place.
          </p>
        </div>
        <div className="flex w-full justify-center">
          <button className="h-9 rounded-[10px] bg-[#0040dd] px-4 py-0 text-[14px] font-medium leading-5 text-white hover:bg-[#0037be]">
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
}
