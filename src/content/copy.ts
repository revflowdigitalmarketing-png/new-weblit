/**
 * Site copy, taken word for word from docs/copy.md. Do not rewrite here;
 * change docs/copy.md first, then mirror it.
 *
 * Anything wrapped in [square brackets] is a placeholder and renders as one.
 * Every placeholder is listed in docs/todo.md.
 */

export const nav = {
  links: [
    { label: "Work", href: "/#work" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: "New Website",
};

export const hero = {
  badge: "Built 10+ business websites in 30 days.",
  heading: "Websites built to get you more customers, published in 72 hours.",
  description:
    "Tell us about your business for 15 minutes. We build the website, you finalise it and you pay once you're satisfied.",
  cta: "Get Started",
  /** Hero brief card (added with the hero redesign; see docs/copy.md). */
  brief: {
    label: "Describe your business",
    placeholder: "Describe your business: your name, business name, location and what you do.",
    industryLabel: "Your industry",
    industries: ["Real Estate", "Healthcare", "Education", "B2B Agencies", "Hospitality"],
    cta: "I want my website",
  },
};

export const work = {
  heading: "Find your industry. See the website we built for it",
  description:
    "Scroll through the industries we build for. Each one comes with a real website on the right.",
  industries: [
    {
      name: "Real Estate",
      description:
        "Listings that look as good as the properties, with an enquiry button on every screen. Floor plans, prices and site visits sit one tap away, so serious buyers call you first.",
    },
    {
      name: "Healthcare",
      description:
        "A clinic website that earns a patient's trust in seconds and makes booking an appointment take a few taps. Doctors, timings and directions are clear before anyone calls.",
    },
    {
      name: "Education",
      description:
        "What you teach, what it costs and how to apply, laid out so a parent finds it in one scroll. Results, counsellors and intake dates sit up front, so enquiries turn into admissions.",
    },
    {
      name: "B2B Agencies",
      description:
        "Your best work first, your offer in one line, and a clear way for the next client to book a call. Case studies and pricing do the selling before your first meeting.",
    },
    {
      name: "Construction Companies",
      description:
        "Finished projects and licences up front, so a client trusts you before the first quote request. Every project shows the work and timeline, with a way to book a site visit.",
    },
    {
      name: "Car Retailer",
      description:
        "Your stock on show and a test drive one tap away. Prices, specs and finance options sit beside every car, so buyers walk into the showroom ready to sign.",
    },
  ],
};

export const differentiator = {
  heading: "We build websites that pay you back",
  description: "Every page we build has one job, turning the visitors you get into real enquiries.",
  /** Three-step process (replaces the owners / price / offer cards, on request). */
  steps: [
    {
      label: "Step 1",
      title: "Tell us about your business",
    },
    {
      label: "Step 2",
      title: "We write it and design it",
      body: "Your copy first, then structure and our secret ingredient.",
      big: "72 hours",
      bigNote: "from our call to your finished website",
    },
    {
      label: "Step 3",
      title: "See it first. Pay after",
      body: "Click through every page on your phone, ask for changes, and pay once it feels right. If it still isn't right, you owe us nothing.",
      cta: "I want my website",
    },
  ],
};

export const leadMagnet = {
  heading: "Free stuff for you",
  subheading: "The blueprint behind converting sites we build",
  description:
    "A page-by-page guide to what a website needs to turn visitors into clients. Read it, then let us build yours.",
  cta: "Get the free blueprint",
  /** Home section links to the blueprint page; the page links to the PDF. */
  href: "/blueprint",
  pdf: "/downloads/WEBLIT-Converting-Site-Blueprint.pdf",
  /** Short line from the blueprint PDF itself (its contents page). */
  line: "What a website needs to turn visitors into clients, one section at a time.",
};

export const faq = {
  heading: "Common Questions",
  items: [
    {
      q: "How much does it cost?",
      a: "We offer custom pricing and we charge you only based on the return your website would give you overtime. However, our pricing is from INR 22,000 onwards.",
    },
    {
      q: "What if you won't finish it in 72 hours?",
      a: "That doesn't happen with us. Every build is planned around the 72 hours before we start. If we still don't do it, we give it to you for free once done.",
    },
    {
      q: "How does paying after work?",
      a: "We build the whole website first. You review it, ask for changes and you pay once you've seen the site according to your preferences.",
    },
    {
      q: "What if I don't like it?",
      a: "Tell us what to change. If you still decide it isn't right, you owe us nothing.",
    },
    {
      q: "Will it show up on Google?",
      a: "We build every site with the structure Google reads: clear headings, fast loading, and your business name, address and phone matching your Google listing. Rankings depend on your competition and on time. However, we do the best On-Page SEO than your competitors can have.",
    },
  ],
};

export const finalCta = {
  heading: "See your website before you pay for it",
  description: "Give us 15 minutes. In 72 hours your finished website is ready to review.",
  cta: "I want my website",
};

export const footer = {
  links: [
    { label: "Work", href: "/#work" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyright: "© 2026 WEBLIT,",
  /** Column labels for the footer layout (UI labels, see docs/copy.md). */
  labels: { contact: "Contact", pages: "Pages" },
};

export const contact = {
  heading: "Tell us about your business and we'll build your website",
  description:
    "Answer a few questions and we take it from here. You see your finished website within 72 hours of us confirming your details, and you pay once you've seen it.",
  fields: {
    name: "Your name",
    business: "Business name",
    email: "Email",
    phone: "WhatsApp or phone",
    website: "Your current website (optional)",
    message: "What do we need to know about you?",
    messagePlaceholder: "Your business, who your clients are and what you want the website to do.",
  },
  cta: "I want my website",
  underButton: "We reply within 4 hours",
  nextHeading: "What happens next",
  next: [
    "We read your answers and reply to confirm.",
    "We build your website.",
    "You review the finished website and pay once you've seen it.",
  ],
  success:
    "Got it, thank you. We'll reply within 4 hours to confirm your details and start your 72 hours.",
};

/** Blueprint page (/blueprint), after the lead magnet reference layout. */
export const blueprintPage = {
  titleLead: "Your blueprint:",
  title: "The Converting Site Blueprint",
  description: "Each page covers one section: what goes in it and why it sits there.",
  download: {
    prompt: "Enter your email to download the guide.",
    label: "Your email",
    placeholder: "you@business.com",
    cta: "Download the Guide",
    done: "Your download has started. Check your downloads folder.",
  },
  skip: {
    pill: "Skip the work",
    heading: "Want us to build it for you?",
    points: [
      "Persuasive copy that makes your customers call you",
      "Published in 72 hours",
      "On-Page SEO done, so local customers find you on Google",
    ],
    closing: "Give us 15 minutes. In 72 hours your finished website is ready to review.",
    cta: "I want my website",
  },
};
