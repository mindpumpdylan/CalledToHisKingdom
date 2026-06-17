/** Elegant ornamental rule used to separate homepage sections. */
export default function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto flex max-w-xs items-center gap-4 px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-soft" />
      <span className="h-2 w-2 rotate-45 border border-gold bg-cream" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-soft" />
    </div>
  );
}
