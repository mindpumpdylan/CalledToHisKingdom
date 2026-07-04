type Props = {
  videoId: string;
  title: string;
};

export default function LatestVideo({ videoId, title }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
        Latest Video
      </p>
      <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
