import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Privacy Policy | ParentHub",
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout 
      title="Privacy Policy" 
      intro="Your data is yours. We believe in transparent, secure, and respectful data handling."
    >
      <p><em>Last Updated: October 15, 2024</em></p>
      
      <p>
        At ParentHub ("we", "us", "our"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and share information when you use our website, newsletters, and related services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information in several ways when you interact with our platform:</p>
      <ul>
        <li><strong>Information You Provide Directly:</strong> When you subscribe to our newsletter, we collect your email address. If you contact us for support, we collect your name and the contents of your message.</li>
        <li><strong>Information Collected Automatically:</strong> We use cookies and similar tracking technologies to collect standard internet log information and visitor behavior information. This includes your IP address, browser type, operating system, and the pages you visit on our site.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected data to:</p>
      <ul>
        <li>Deliver the newsletters and content you requested.</li>
        <li>Improve and optimize our website (e.g., by analyzing how users navigate our articles).</li>
        <li>Ensure the security of our platform and prevent fraudulent activity.</li>
        <li>Serve relevant advertisements, which helps keep ParentHub free for all users.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We do not sell your personal data to third parties. We may share your information in the following limited circumstances:
      </p>
      <ul>
        <li><strong>Service Providers:</strong> We use third-party vendors to help us operate our business (e.g., email delivery services like Mailchimp or analytics providers like Google Analytics). These providers strictly process data on our behalf.</li>
        <li><strong>Legal Compliance:</strong> We may disclose information if required by law, subpoena, or other legal processes.</li>
      </ul>

      <h2>4. Your Choices & Rights</h2>
      <p>
        Depending on where you live (e.g., under the GDPR in Europe or the CCPA in California), you have significant rights regarding your data:
      </p>
      <ul>
        <li>You can unsubscribe from our emails at any time using the link provided at the bottom of the email.</li>
        <li>You can configure your browser to refuse cookies, though some features of our site may not function properly.</li>
        <li>You may request access to, correction of, or deletion of the personal data we hold about you by contacting privacy@parenthub.example.com.</li>
      </ul>

      <h2>5. Children's Privacy</h2>
      <p>
        ParentHub is designed for parents and adults. We do not knowingly collect personal information from children under the age of 13. If we become aware that we have inadvertently collected such data, we will delete it immediately.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact our Data Protection Officer at:
      </p>
      <p><strong>Email:</strong> privacy@parenthub.example.com</p>
    </PageLayout>
  );
}
