import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Advertise With Us | ParentHub",
};

export default function AdvertisePage() {
  return (
    <PageLayout 
      title="Advertise With ParentHub" 
      intro="Connect with millions of engaged, high-intent parents navigating the most important purchases of their lives."
      showContactCTA={true}
    >
      <p>
        ParentHub reaches a massive, highly engaged audience of expecting parents, new parents, and seasoned caregivers. Our readers come to us when they are actively seeking solutions: researching the safest car seats, figuring out what to pack in their hospital bag, or looking for the best organic infant formula.
      </p>
      
      <h2>Why Partner With Us?</h2>
      <p>
        Parents are incredibly brand-loyal once they find a product that solves a real problem. But winning their trust requires nuance, authenticity, and alignment with their values. ParentHub offers a premium environment that transfers our hard-earned editorial authority to our trusted advertising partners.
      </p>
      <ul>
        <li><strong>High Intent:</strong> Our audience relies on us during major life transitions, driving high conversion rates for relevant products.</li>
        <li><strong>Brand Safety:</strong> Our rigorous editorial guidelines and medical review process ensure your ads are served alongside safe, science-backed content, completely free from the toxicity of social media feeds.</li>
        <li><strong>Creative Agility:</strong> From standard display to custom-produced branded content, our in-house creative studio can build campaigns that resonate deeply with modern parents.</li>
      </ul>

      <h2>Advertising Solutions</h2>
      
      <h3>1. High-Impact Display & Programmatic</h3>
      <p>
        Secure premium ad placements across our highest-traffic articles. We offer cross-platform programmatic solutions that ensure your brand is highly visible on desktop and mobile.
      </p>

      <h3>2. Custom Content & Sponsorships</h3>
      <p>
        Let our award-winning editorial and video teams craft bespoke articles, videos, or interactive tools sponsored by your brand. Past campaigns have included sponsored pregnancy week-by-week guides and interactive naming tools.
      </p>

      <h3>3. Targeted Newsletters</h3>
      <p>
        Place your message directly into the inboxes of hundreds of thousands of subscribers. Our newsletters boast open rates nearly double the industry average, offering unprecedented direct access to parents.
      </p>

      <h2>Let's Talk</h2>
      <p>
        If you represent a brand that genuinely improves the lives of families, we'd love to partner with you. Please reach out to our sales team to request our media kit, audience demographics, and current rate card.
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:partners@parenthub.example.com">partners@parenthub.example.com</a>
      </p>
    </PageLayout>
  );
}
