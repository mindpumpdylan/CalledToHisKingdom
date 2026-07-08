import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Called To His Kingdom",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
        Legal
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-stone">Effective July 7, 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-stone">
        <p>
          Welcome to Called To His Kingdom. By creating an account or using
          this site, you agree to the terms below. Please read them
          carefully.
        </p>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Eligibility
          </h2>
          <p className="mt-3">
            You must be at least 18 years old to create an account or use
            this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            What We Offer
          </h2>
          <p className="mt-3">
            Called To His Kingdom is a free, volunteer-run community. There
            is no charge to use the prayer wall, train with a volunteer
            trainer, or offer your own time as a trainer &mdash; nothing on
            this site is sold, and we don&rsquo;t process payments of any
            kind.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Volunteer Trainers Are Not Vetted
          </h2>
          <p className="mt-3">
            Trainers on this site are members of the community who volunteer
            their own time and self-report their specialties, certifications,
            and experience. We do not verify credentials, run background
            checks, or supervise sessions. You are responsible for evaluating
            any trainer you choose to work with, and for using your own
            judgment about what&rsquo;s appropriate for your body and
            circumstances.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Not Medical or Professional Advice
          </h2>
          <p className="mt-3">
            Nothing on this site &mdash; including scripture content, prayer
            wall posts, or guidance from a volunteer trainer &mdash; is
            medical, mental health, or professional advice. Talk to a
            qualified physician before beginning any new exercise program,
            especially if you have an existing health condition.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Your Account
          </h2>
          <p className="mt-3">
            You&rsquo;re responsible for keeping your login credentials
            secure and for anything that happens under your account. Let us
            know right away if you believe your account has been
            compromised.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Community Content &amp; Conduct
          </h2>
          <p className="mt-3">
            Prayer requests, comments, and trainer profiles are visible to
            other members and, in most cases, to the public. You&rsquo;re
            responsible for what you post. Don&rsquo;t post anything that is
            abusive, harassing, hateful, illegal, or that violates another
            person&rsquo;s privacy. We may remove content or suspend accounts
            that violate these terms, at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            No Warranty
          </h2>
          <p className="mt-3">
            This site is provided &ldquo;as is,&rdquo; without warranties of
            any kind. We do our best to keep things running smoothly but
            can&rsquo;t guarantee the site will always be available,
            error-free, or uninterrupted.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            To the fullest extent permitted by law, Called To His Kingdom and
            its volunteers are not liable for any injury, loss, or damage
            arising from your use of the site, your interactions with other
            members, or any training session arranged through it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Changes to These Terms
          </h2>
          <p className="mt-3">
            We may update these terms from time to time. If we make material
            changes, we&rsquo;ll update the effective date above.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Contact Us
          </h2>
          <p className="mt-3">
            Questions about these terms? Email{" "}
            <a href="mailto:dylan@mindpumpmedia.com" className="font-semibold text-gold-deep">
              dylan@mindpumpmedia.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
