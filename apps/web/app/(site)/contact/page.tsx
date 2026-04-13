import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Contact Us | ParentHub",
};

export default function ContactPage() {
  return (
    <PageLayout 
      title="Contact Us" 
      intro="Whether you have a question, a press inquiry, or a story to pitch, we want to hear from you."
    >
      <p>
        The ParentHub team operates entirely remotely, with editors, writers, and medical experts stationed across the globe. This allows us to gather diverse perspectives on modern parenting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 mb-24">
        <div className="bg-white p-8 rounded-2xl border border-brand-navy/10 shadow-sm">
          <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">General Support</h3>
          <p className="text-brand-navy/70 mb-6">
            Having trouble with our website or newsletter? Drop our support team a line.
          </p>
          <a href="mailto:support@parenthub.example.com" className="text-brand-teal font-bold hover:underline">
            support@parenthub.example.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-brand-navy/10 shadow-sm">
          <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">Editorial Pitches</h3>
          <p className="text-brand-navy/70 mb-6">
            Are you a writer with a compelling personal essay or reported feature on parenting?
          </p>
          <a href="mailto:pitches@parenthub.example.com" className="text-brand-teal font-bold hover:underline">
            pitches@parenthub.example.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-brand-navy/10 shadow-sm">
          <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">Press & Media</h3>
          <p className="text-brand-navy/70 mb-6">
            For press inquiries or to request an interview with one of our medical experts.
          </p>
          <a href="mailto:press@parenthub.example.com" className="text-brand-teal font-bold hover:underline">
            press@parenthub.example.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-brand-navy/10 shadow-sm">
          <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">Partnerships</h3>
          <p className="text-brand-navy/70 mb-6">
            Interested in advertising, sponsored content, or affiliate partnerships?
          </p>
          <a href="mailto:partners@parenthub.example.com" className="text-brand-teal font-bold hover:underline">
            partners@parenthub.example.com
          </a>
        </div>
      </div>

      <h2>Office Address</h2>
      <p>
        While our team is distributed globally, our corporate headquarters are located at:
      </p>
      <address className="not-italic text-brand-navy/80 p-6 bg-brand-navy/5 rounded-lg border border-brand-navy/10 w-fit">
        <strong>ParentHub Media Group</strong><br />
        123 Editorial Avenue, Suite 400<br />
        New York, NY 10001<br />
        United States
      </address>
    </PageLayout>
  );
}
