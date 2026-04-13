import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Careers | ParentHub",
};

export default function CareersPage() {
  return (
    <PageLayout 
      title="Work With Us" 
      intro="Join our mission to empower parents with clarity, empathy, and science."
    >
      <p>
        ParentHub is one of the fastest-growing digital parenting platforms in the world. We are a passionate, fully distributed team of writers, engineers, medical professionals, and designers who all share a singular goal: making the internet a more helpful place for families.
      </p>

      <h2>Our Culture</h2>
      <p>
        We believe that the best way to support families is to support our own team first. We have built a radically flexible, asynchronous work culture designed to accommodate the chaotic realities of life. Whether you are a parent doing school drop-offs or a night owl writing code at 2 AM, we care about your output, not when or where you are sitting at a desk.
      </p>
      <ul>
        <li><strong>Remote-First:</strong> Work from anywhere on Earth (with an internet connection).</li>
        <li><strong>Generous Parental Leave:</strong> 16 weeks of fully paid leave for all new parents (birth, adoption, or foster).</li>
        <li><strong>Flexible PTO:</strong> We encourage our team to take the time they need to recharge.</li>
        <li><strong>Continuing Education:</strong> Annual stipends for courses, conferences, and certifications.</li>
      </ul>

      <h2>Open Roles</h2>
      <div className="bg-brand-navy/5 p-8 rounded-2xl border border-brand-navy/10 my-10">
        <h3 className="text-xl font-bold font-display text-brand-navy mb-2">Senior Health Editor</h3>
        <p className="text-brand-navy/70 mb-4 text-sm tracking-widest uppercase font-bold">Remote (US Timezones)</p>
        <p className="text-brand-navy/80 mb-4">
          Seeking a seasoned editor with a background in maternal health or pediatric journalism to lead our pregnancy content vertical.
        </p>
        <a href="#" className="font-bold text-brand-teal hover:underline decoration-2 underline-offset-4">Read Full Description &rarr;</a>
      </div>

      <div className="bg-brand-navy/5 p-8 rounded-2xl border border-brand-navy/10 my-10">
        <h3 className="text-xl font-bold font-display text-brand-navy mb-2">Commerce Writer (Baby Gear)</h3>
        <p className="text-brand-navy/70 mb-4 text-sm tracking-widest uppercase font-bold">Remote (Global)</p>
        <p className="text-brand-navy/80 mb-4">
          Are you obsessed with stroller suspensions and car seat safety ratings? We need a meticulous tester and writer to join our commerce team.
        </p>
        <a href="#" className="font-bold text-brand-teal hover:underline decoration-2 underline-offset-4">Read Full Description &rarr;</a>
      </div>

      <h2>Don't See a Fit?</h2>
      <p>
        We are always looking for exceptional freelance writers, medical reviewers, and designers. If you don't see an open role that matches your skills, send a speculative email and portfolio to <a href="mailto:jobs@parenthub.example.com">jobs@parenthub.example.com</a>.
      </p>
    </PageLayout>
  );
}
