import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Accessibility", description: "ALVITEQ's commitment to accessible, inclusive website and product experiences.", path: "/accessibility" });

export default function AccessibilityPage() {
  return <><PageHero eyebrow="Trust · Accessibility" title="Technology should work for more people." intro="ALVITEQ aims to create clear, keyboard-accessible, responsive, and understandable digital experiences." />
    <article className="legal container"><h2>Our approach</h2><p>We use semantic structure, visible focus states, keyboard navigation, readable contrast, responsive layouts, descriptive alternatives for meaningful images, and reduced-motion preferences where practical.</p><h2>Standards</h2><p>We use WCAG 2.2 Level AA as the reference point for the public website while recognising that accessibility is an ongoing practice, not a one-time claim.</p><h2>Feedback</h2><p>If you experience an accessibility barrier, email <a href="mailto:hello@alviteq.com">hello@alviteq.com</a> with the page, the problem encountered, and any assistive technology or browser context you are comfortable sharing.</p><h2>Limitations and improvement</h2><p>Some product previews and third-party destinations may have different accessibility characteristics. We review feedback and prioritise practical improvements as products evolve.</p></article>
  </>;
}
