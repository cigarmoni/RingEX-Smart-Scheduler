import { AppShell } from "../components/AppShell";

interface PlaceholderProps {
  title: string;
  activeNav?: string;
}

export const Placeholder = ({ title, activeNav }: PlaceholderProps): JSX.Element => {
  return (
    <AppShell activeNav={activeNav as any}>
      <section
        className="flex min-w-0 flex-1 flex-col items-center justify-center gap-sui-2 p-sui-6 text-center"
        data-testid={`page-placeholder-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <h2 className="text-headline text-sui-neutral-f03">
          {title}
        </h2>
        <p className="max-w-[420px] text-main-text text-sui-neutral-f02">
          This screen isn't part of the prototype yet.
        </p>
      </section>
    </AppShell>
  );
};
