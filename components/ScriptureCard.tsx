type Props = {
  reference: string;
  text: string;
  translation?: string;
};

/** The signature element: the daily verse as an "illuminated" framed card. */
export default function ScriptureCard({ reference, text, translation = "ESV" }: Props) {
  return (
    <figure className="gold-frame mx-auto max-w-2xl rounded-sm bg-paper px-8 py-12 text-center sm:px-14">
      <figcaption className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
        Verse of the Day
      </figcaption>
      <blockquote className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        “{text}”
      </blockquote>
      <p className="mt-6 text-sm font-semibold tracking-wide text-stone">
        {reference} · {translation}
      </p>
    </figure>
  );
}
