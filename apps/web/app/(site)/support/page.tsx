import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Support | ParentHub",
};

export default function SupportPage() {
  return (
    <PageLayout 
      title="Help & Support" 
      intro="Find answers to common questions about your account, newsletters, and community interactions."
      showContactCTA={true}
    >
      <h2>Managing Your Newsletter Subscriptions</h2>
      <p>
        <strong>How do I unsubscribe?</strong><br />
        Every email from ParentHub contains an "Unsubscribe" link at the very bottom. Clicking this link will immediately remove your email address from that specific mailing list. If you are subscribed to multiple lists (e.g., the Pregnancy Tracker and the Weekly Toddler Tips), you may need to manage your preferences manually.
      </p>
      <p>
        <strong>Can I change my email address?</strong><br />
        Currently, the easiest way to update your email address is to unsubscribe your old address and sign up again using your new address on our <a href="/newsletter">Newsletter page</a>.
      </p>

      <h2>Content & Technical Issues</h2>
      <p>
        <strong>I found a typo or a broken link. How do I report it?</strong><br />
        Thank you for helping us maintain the site! Please email <a href="mailto:support@parenthub.example.com">support@parenthub.example.com</a> with the URL of the page and a brief description of the issue. Our tech team will address it promptly.
      </p>
      <p>
        <strong>Why isn't a video or interactive tool loading for me?</strong><br />
        This is typically caused by an outdated browser or an aggressive ad-blocker. Try pausing your ad-blocker for ParentHub or opening the site in an Incognito/Private window. If the issue persists, contact our support team with details about your device and browser.
      </p>

      <h2>Community Guidelines</h2>
      <p>
        If you interact with ParentHub on our social media channels or any future community forums, we strictly enforce a zero-tolerance policy against hate speech, mom-shaming, bullying, or medical misinformation. 
      </p>
      <p>
        We believe that parenting is hard enough without judgment. If you witness abusive behavior in our community spaces, please report the comment on the respective platform or contact our moderation team directly. Users found violating these guidelines will be permanently banned from our communities.
      </p>
    </PageLayout>
  );
}
