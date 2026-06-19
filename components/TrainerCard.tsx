import Link from "next/link";
import { Laptop, MapPin } from "lucide-react";

type Trainer = {
  id: string;
  name: string;
  location: string;
  modes: string[];      // e.g. ["Online", "In person"]
  specialties: string[];
  blurb: string;
};

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="card flex flex-col hover:-translate-y-1 hover:border-gold-soft">
      <div className="flex items-center gap-4">
        <div
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cream font-display text-2xl font-semibold text-gold-deep"
        >
          {trainer.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
            {trainer.name}
          </h3>
          <p className="text-sm text-stone">{trainer.location}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 leading-relaxed text-stone">{trainer.blurb}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {trainer.modes.map((m) => (
          <span key={m} className="badge-gold inline-flex items-center gap-1">
            {m === "Online" ? <Laptop size={12} /> : <MapPin size={12} />}
            {m}
          </span>
        ))}
        {trainer.specialties.map((s) => (
          <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-stone">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-stone">Accepting clients</span>
        <Link href={`/trainers/${trainer.id}`} className="btn-gold-sm">
          View availability
        </Link>
      </div>
    </article>
  );
}
