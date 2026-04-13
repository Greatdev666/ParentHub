import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "About Us | ParentHub",
  description: "Learn about the mission, values, and expert team behind ParentHub.",
};

export default function AboutPage() {
  return (
    <PageLayout 
      title="About ParentHub" 
      intro="Your trusted companion in the beautiful, exhaustive, and utterly unpredictable journey of raising a family."
    >
      <p>
        ParentHub was born out of a simple, undeniable truth: parenting is hard, and the internet makes it overwhelming. Between endless forums of conflicting advice, perfectly curated influencer moms, and dense medical journals, finding reliable, empathetic, and actionable guidance is a challenge every modern parent faces.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our goal is to radically simplify your search for trustworthy answers. We believe that when parents are supported with evidence-based information and a judgment-free community, the whole family thrives. Whether you are tracking your first pregnancy, navigating toddler tantrums, or searching for the best organic baby food, we are here to provide clarity.
      </p>

      <h2>The ParentHub Difference</h2>
      <p>
        What sets us apart is our relentless commitment to medical accuracy. Every single article, guide, and product review published on ParentHub is rigorously vetted by our <strong>Expert Review Board</strong>. This board consists of board-certified pediatricians, OB/GYNs, child psychologists, dietary nutritionists, and education specialists. 
      </p>
      <p>
        When you read an article on ParentHub, you aren't just reading the opinion of another parent—you are reading medically accurate guidance that has been fact-checked by professionals who treat children every single day.
      </p>

      <h2>Our Values</h2>
      <ul>
        <li><strong>Empathy First:</strong> We write with compassion, recognizing that there is no "one true way" to parent. We support all family structures and choices.</li>
        <li><strong>Evidence-Based:</strong> Our content is rooted in science, citing peer-reviewed studies and leveraging our expert board to counteract harmful misinformation.</li>
        <li><strong>Accessibility:</strong> Medical jargon is confusing. We break down complex health and developmental topics into easily understandable, actionable language.</li>
      </ul>

      <h2>A Note to You</h2>
      <p>
        You are doing a great job. On the days when the baby won't sleep, the toddler refuses to eat anything but crackers, and you feel entirely depleted—we see you. ParentHub relies on feedback from parents exactly like you to shape our reporting to serve your needs better. 
      </p>
    </PageLayout>
  );
}
