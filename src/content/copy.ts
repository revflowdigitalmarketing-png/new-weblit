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
};

export const work = {
  heading: "Find your industry. See the website we built for it.",
  description:
    "Scroll through the industries we build for. Each one comes with a real website on the right.",
  industries: [
    {
      name: "Real Estate",
      description:
        "Listings that look as good as the properties, with an enquiry button on every screen.",
    },
    {
      name: "Healthcare",
      description:
        "A clinic website that earns a patient's trust in seconds and makes booking an appointment take a few taps.",
    },
    {
      name: "Education",
      description:
        "What you teach, what it costs and how to apply, laid out so a parent finds it in one scroll.",
    },
    {
      name: "B2B Agencies",
      description:
        "Your best work first, your offer in one line, and a clear way for the next client to book a call.",
    },
    {
      name: "Construction Companies",
      description:
        "Finished projects and licences up front, so a client trusts you before the first quote request.",
    },
    {
      name: "Car Retailer",
      description: "Your stock on show and a test drive one tap away.",
    },
  ],
};

export const differentiator = {
  heading: "We build websites that pay you back.",
  description: "Every page we build has one job, turning the visitors you get into real enquiries.",
  owners: {
    heading: "Owners we've built for",
    /** Placeholders until real clients are supplied. Set url to the live site. */
    clients: [
      { name: "[Client name]", industry: "[Industry]", url: "", urlLabel: "[website URL]" },
      { name: "[Client name]", industry: "[Industry]", url: "", urlLabel: "[website URL]" },
      { name: "[Client name]", industry: "[Industry]", url: "", urlLabel: "[website URL]" },
    ],
  },
  /** Block 2: price calculator. Labels written for the calculator (see docs/copy.md). */
  price: {
    heading: "Price your website",
    note: "Our pricing is from INR 22,000 onwards.",
    extrasLabel: "pages and add-ons",
    baseLabel: "from",
    pagesLabel: "Pages",
    pagesUnit: "pages",
    addOnsLabel: "Add-ons",
    addOnsUnit: "add-ons",
    cta: "Get this website",
  },
  offer: {
    heading: "Get your website first. Pay then.",
    steps: [
      "You spend 15 minutes telling us about your business.",
      "We build your website in 72 hours.",
      "You see it finished, and you pay once you've seen it.",
    ],
    closing:
      "Say no and the ledger keeps running. Say yes and you have a finished website to judge.",
    cta: "I want my website",
  },
};

export const leadMagnet = {
  heading: "Free stuff for you",
  subheading: "The blueprint behind converting sites we build",
  description:
    "A page-by-page guide to what a website needs to turn visitors into clients. Read it, then let us build yours.",
  cta: "Get the free blueprint",
  href: "/blueprint",
};

export const faq = {
  heading: "Questions before you say yes",
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
      q: "How can you build it in 72 hours?",
      a: "Our process is fixed. The 15-minute conversation gives us what we need, our time goes into your copy first and design.",
    },
    {
      q: "What if I don't like it?",
      a: "Tell us what to change. If you still decide it isn't right, you owe us nothing.",
    },
    {
      q: "Do I own the website?",
      a: "Yes. Once you've paid, the website, the copy and the design are yours.",
    },
    {
      q: "Will it show up on Google?",
      a: "We build every site with the structure Google reads: clear headings, fast loading, and your business name, address and phone matching your Google listing. Rankings depend on your competition and on time. However, we do the best On-Page SEO than your competitors can have.",
    },
    {
      q: "What do you need from me?",
      a: "15 minutes of your time, plus your business visual assets and any content you already have. We handle the writing, the design and the build.",
    },
  ],
};

export const finalCta = {
  heading: "See your website before you pay for it.",
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
  labels: { contact: "Contact", pages: "Pages", location: "Location" },
};

export const contact = {
  heading: "Tell us about your business and we'll build your website.",
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
