import { AppShell, type NavLabel } from "@/components/AppShell";

interface PlaceholderProps {
  title: string;
  activeNav?: NavLabel;
}

export const Placeholder = ({ title, activeNav }: PlaceholderProps): JSX.Element => {
  return (
    <AppShell activeNav={activeNav}>
      <section
        className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2 p-6 text-center"
        data-testid={`page-placeholder-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <h2 className="font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] text-black">
          {title}
        </h2>
        <p className="max-w-[420px] font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]">
          This screen isn't part of the prototype yet.
        </p>
      </section>
    </AppShell>
  );
};
