import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Editorial Guidelines | ParentHub",
};

export default function EditorialGuidelinesPage() {
  return (
    <PageLayout 
      title="Editorial Guidelines" 
      intro="Transparency, accuracy, and rigorous fact-checking are the bedrock of our publishing process."
      showContactCTA={true}
    >
      <p>
        At ParentHub, we understand that providing health and developmental advice for your children requires an immense level of trust. We do not take that responsibility lightly. Our editorial guidelines are designed to ensure that every piece of content you interact with is accurate, current, and rooted in science.
      </p>

      <h2>The Sourcing Standard</h2>
      <p>
        We rely exclusively on high-quality, reputable sources. Our writers and editors are required to cite peer-reviewed medical journals, academic research institutions, government health agencies (such as the CDC and WHO), and recognized medical associations (such as the American Academy of Pediatrics).
      </p>
      <p>
        We do not accept anonymous sources, nor do we present isolated studies as undisputed medical fact. When scientific consensus is evolving, we clearly explain the ongoing research and present multiple sides of the medical discussion.
      </p>

      <h2>The Expert Review Process</h2>
      <p>
        Before any health-related article is published, it must pass through our Expert Review Board. This multi-step process includes:
      </p>
      <ol>
        <li><strong>Initial Drafting:</strong> A specialized health writer researches and drafts the piece.</li>
        <li><strong>Editorial Review:</strong> Senior editors check the article for tone, clarity, and adherence to our compassionate, family-friendly style.</li>
        <li><strong>Medical Review:</strong> A board-certified professional in the relevant field (e.g., a pediatrician for childhood illness, an OB/GYN for pregnancy) reviews the copy. They fact-check medical claims, verify dosages or timelines, and explicitly approve the article for publication.</li>
      </ol>

      <h2>Content Updates</h2>
      <p>
        Medical science is not static. Guidelines evolve, new research emerges, and best practices shift. ParentHub employs a dedicated team responsible for auditing our existing content library. High-priority medical pages are reviewed every 6 to 12 months by our Experts to ensure they reflect the most current clinical guidelines. If a significant shift in medical consensus occurs, we immediately update relevant articles.
      </p>

      <h2>Correction Policy</h2>
      <p>
        Despite our rigorous checks, errors sometimes occur. If an error is identified within our content, we are committed to correcting it swiftly and transparently. We will update the article with the accurate information and, when appropriate, append a correction note to the bottom of the page noting what was changed and when.
      </p>
    </PageLayout>
  );
}
