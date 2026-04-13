import { PageLayout } from "@/components/layout/PageLayout";

export const metadata = {
  title: "Product Review Guidelines | ParentHub",
};

export default function ProductReviewGuidelinesPage() {
  return (
    <PageLayout 
      title="How We Test Products" 
      intro="Our unyielding commitment to unbiased, rigorous testing of the gear you trust your baby with."
    >
      <p>
        From car seats and strollers to breast pumps and baby monitors, parents spend thousands of dollars on gear. The stakes are incredibly high—not just financially, but for the safety and comfort of your child. 
      </p>
      <p>
        At ParentHub, our product reviews are fiercely independent. We do not accept payment from brands in exchange for positive reviews, and our editorial team operates entirely separately from our advertising team.
      </p>

      <h2>Our Testing Methodology</h2>
      <p>
        We believe that lab tests are useful, but real-world testing is essential. Our testing process usually involves the following phases:
      </p>
      
      <h3>1. Market Research & Selection</h3>
      <p>
        Our commerce editors dive deep into the market. We analyze bestsellers, buzzy new releases, and cult-favorite legacy products. We interview pediatricians, physical therapists, and safety experts to determine what features actually matter. We then purchase the products ourselves or request press samples—but any brand sending a sample must agree to our strict no-influence policy.
      </p>

      <h3>2. The Lab Test (When Applicable)</h3>
      <p>
        For items where objective measurement is key (e.g., the decibel level of a sound machine, the battery life of a monitor, or the temperature retention of a bottle warmer), we conduct controlled tests in our office to establish baseline data.
      </p>

      <h3>3. Real-World Testing</h3>
      <p>
        This is where the magic happens. We distribute the products to our network of real parents. They fold the strollers with one hand while holding a squirming toddler. They install the car seats in sedans and SUVs. They wash the bibs 50 times to see if they fray. We gather extensive feedback on ease of use, durability, aesthetics, and value for money over weeks or months of actual use.
      </p>

      <h2>Safety First, Always</h2>
      <p>
        No matter how beautiful or affordable a product is, it immediately fails our testing if it poses a safety risk. We constantly monitor recalls from the CPSC (Consumer Product Safety Commission) and consult with certified Child Passenger Safety Technicians (CPSTs) when evaluating car seats.
      </p>

      <h2>Affiliate Disclosure</h2>
      <p>
        ParentHub relies on affiliate advertising to fund our journalism. This means that if you click a link in a review and make a purchase, we may earn a commission from the retailer (at no extra cost to you). <strong>However, this does not influence our recommendations.</strong> If a product is terrible, we will say so—or simply refuse to feature it. Our loyalty is to parents, not brands.
      </p>
    </PageLayout>
  );
}
