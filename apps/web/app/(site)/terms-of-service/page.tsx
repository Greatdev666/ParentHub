import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Terms of Service | ParentHub",
};

export default function TermsOfServicePage() {
  return (
    <PageLayout 
      title="Terms of Service" 
      intro="Please read these terms carefully before using the ParentHub platform."
    >
      <p><em>Last Updated: October 15, 2024</em></p>

      <div className="bg-amber-50 p-6 border border-amber-200 rounded-lg mb-10">
        <h3 className="text-amber-900 font-bold mb-2">Medical Disclaimer</h3>
        <p className="text-amber-800 text-sm m-0">
          The content on ParentHub (including text, graphics, images, and other materials) is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read on this site.
        </p>
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using ParentHub (the "Site"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you should not access or use the Site.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content published on the Site, including articles, photographs, illustrations, graphics, and video clips, is protected by copyright and owned or controlled by ParentHub or the party credited as the provider of the content. You may not modify, publish, transmit, participate in the transfer or sale of, reproduce, create new works from, distribute, or in any way exploit any of the content in whole or in part without express written permission.
      </p>

      <h2>3. User Conduct</h2>
      <p>
        If you participate in any community features, comment sections, or social media platforms managed by ParentHub, you agree to:
      </p>
      <ul>
        <li>Treat other users with respect and refrain from abusive, harassing, or threatening language.</li>
        <li>Not post any material that is obscene, defamatory, or constitutes hate speech.</li>
        <li>Not distribute spam, malicious code, or unauthorized advertisements.</li>
      </ul>
      <p>
        ParentHub reserves the right to remove any content or ban any user who violates these guidelines at our sole discretion.
      </p>

      <h2>4. Links to Third-Party Sites</h2>
      <p>
        Our Site may contain links to third-party web sites or services that are not owned or controlled by ParentHub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites you visit.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall ParentHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>
    </PageLayout>
  );
}
