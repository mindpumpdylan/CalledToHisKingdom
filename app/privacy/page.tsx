import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Called To His Kingdom",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
        Legal
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-stone">Effective July 7, 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-stone">
        <p>
          Called To His Kingdom (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) operates a free Christian workout community
          offering a prayer wall and volunteer personal training. This policy
          explains what information we collect, how we use it, and the
          choices you have.
        </p>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Information We Collect
          </h2>
          <p className="mt-3">
            <strong className="text-ink">Account information.</strong> When
            you create an account, we collect your display name, email
            address, and password. Passwords are handled by our
            authentication provider and are never stored in plain text.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Profile information.</strong> You
            may optionally add a full name, avatar, bio, location (city,
            state, country), and training preferences to your profile.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Volunteer trainer information.</strong>{" "}
            If you enable trainer mode, we collect the specialties,
            certifications, years of experience, training modes, and
            availability you choose to list, along with any booking notes
            exchanged with clients.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Prayer wall content.</strong> We
            store the title, body, and category of prayer requests you post,
            whether you choose to post anonymously, and any &ldquo;praying,&rdquo;
            &ldquo;amen,&rdquo; or comment interactions you make on requests.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Anonymous Prayer Requests
          </h2>
          <p className="mt-3">
            If you post a prayer request anonymously, your name is hidden
            from other members and from the public prayer wall. We still
            retain a record of which account authored the request internally,
            so we can let you manage or remove your own posts and enforce
            these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            What Is Public
          </h2>
          <p className="mt-3">
            The prayer wall (aside from the author&rsquo;s identity on
            anonymous posts) and trainer profiles are visible to anyone who
            visits the site, including people who have not created an
            account. Please don&rsquo;t include information in a prayer
            request or trainer profile that you aren&rsquo;t comfortable
            being publicly visible.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            How We Use Information
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>To operate your account and authenticate you when you sign in.</li>
            <li>To display the prayer wall, trainer directory, and booking features.</li>
            <li>To match you with volunteer trainers or clients you choose to connect with.</li>
            <li>To maintain the safety and integrity of the community, including removing content that violates our Terms of Service.</li>
          </ul>
          <p className="mt-3">
            We do not sell your information, and we do not use advertising
            or analytics trackers on this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            How We Store Information
          </h2>
          <p className="mt-3">
            Data is stored with Supabase, our database and authentication
            provider, using access controls that restrict each member to
            viewing or editing only what they&rsquo;re permitted to. No
            payment or financial information is collected anywhere on this
            site &mdash; every trainer offers their time for free.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Cookies
          </h2>
          <p className="mt-3">
            We use a session cookie solely to keep you signed in. We don&rsquo;t
            use cookies for advertising or cross-site tracking.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Children&rsquo;s Privacy
          </h2>
          <p className="mt-3">
            Called To His Kingdom is intended for users who are 18 years of
            age or older. We do not knowingly collect information from
            anyone under 18.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Your Choices
          </h2>
          <p className="mt-3">
            You can update or remove your own prayer requests and comments at
            any time. To request a copy of your data, a correction, or full
            account deletion, email us at the address below and we&rsquo;ll
            take care of it directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Changes to This Policy
          </h2>
          <p className="mt-3">
            If we make material changes to this policy, we&rsquo;ll update
            the effective date above and, where appropriate, let members know
            directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Contact Us
          </h2>
          <p className="mt-3">
            Questions about this policy or your data? Email{" "}
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
