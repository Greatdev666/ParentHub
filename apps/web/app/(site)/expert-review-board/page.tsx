import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Expert Review Board | ParentHub",
};

export default function ExpertReviewBoardPage() {
  return (
    <PageLayout 
      title="Expert Review Board" 
      intro="Meet the medical professionals and specialists ensuring every piece of advice we publish is accurate, safe, and science-backed."
    >
      <p>
        Navigating the internet for parenting advice can be terrifying. For every helpful article, there are dozens pushing unverified, potentially dangerous claims. That is why we established the ParentHub Expert Review Board.
      </p>
      <p>
        Our board comprises board-certified pediatricians, obstetrician-gynecologists, registered dietitians, child psychologists, lactation consultants, and education specialists. 
      </p>

      <h2>How the Process Works</h2>
      <p>
        Whenever an article containing medical, developmental, or safety advice is written, it is flagged for our Expert Review Board.
      </p>
      <ol>
        <li>The assigned expert reads the article to ensure clinical accuracy.</li>
        <li>They verify that dosages, developmental milestones, and age-appropriate guidelines align with current standards set by reputable organizations like the AAP and ACOG.</li>
        <li>If changes are required, the expert issues clinical notes to the editorial team.</li>
        <li>Once the article is medically sound, the expert approves it. You will see their face and a "Medically Reviewed By" badge at the top of the published article.</li>
      </ol>

      <h2>Who Is On the Board?</h2>
      <p>
        Our experts are practicing clinicians who see children and parents every day in hospitals, clinics, and private practices across the country. They aren't just academics; they are on the front lines of pediatric care and maternal health.
      </p>
      
      <div className="bg-brand-navy/5 p-8 rounded-2xl border border-brand-navy/10 my-12 text-center">
        <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">Are you a medical professional?</h3>
        <p className="text-brand-navy/70 mb-6">
          We are actively expanding our board to include diverse specialists. If you are board-certified and passionate about public health education, we would love to hear from you.
        </p>
        <a href="/contact" className="text-brand-teal font-bold uppercase tracking-widest hover:underline text-sm">
          Apply to Join the Board &rarr;
        </a>
      </div>
    </PageLayout>
  );
}
