export const serviceDetails = {
  branding: {
    id: "01",
    title: "Brand Consulting",
    eyebrow: "Strategic Foundation",
    description:
      "Build the strategic clarity behind your brand before design, content, and campaigns move forward.",
    items: [
      "Market Research",
      "Brand Audit",
      "Customer Experience Research",
      "Brand Strategy & Architecture",
      "Brand Positioning Strategy",
      "Content Strategy",
      "Marketing Strategy",
      "Digital Brand Strategy",
    ],
    recentWorks: ["crevo", "azbery", "neveu", "thavala"],
  },
  advertising: {
    id: "02",
    title: "Branding & Campaigns",
    eyebrow: "Identity & Launch Systems",
    description:
      "Shape how your brand looks, speaks, launches, and stays consistent across every market touchpoint.",
    items: [
      "Brand Identity Design",
      "Rebranding",
      "Digital Branding",
      "Print and Collateral Design",
      "Product Launch Campaigns",
      "Brand Awareness Campaigns",
      "Social Media Engagement Campaigns",
      "Influencer Collaboration Campaigns",
      "Content Marketing Campaigns",
      "Competitive Positioning Campaigns",
    ],
    recentWorks: ["spices", "belanto", "sora", "prime-edge"],
  },
  social: {
    id: "03",
    title: "Social Media Management",
    eyebrow: "Content, Growth & Reporting",
    description:
      "Run a clear, consistent, and performance-aware social presence built around content, community, and growth.",
    items: [
      "Content Creation",
      "Creative Production",
      "Brand Storytelling",
      "Community Management",
      "Audience Growth",
      "Paid Media Campaigns",
      "Performance Analytics",
      "Monthly Reporting",
    ],
    recentWorks: ["fins", "charutha", "spices", "sora"],
  },
  video: {
    id: "04",
    title: "Media Production",
    eyebrow: "Films, Ads & Motion",
    description:
      "Produce the visual assets your brand needs for campaigns, launches, digital channels, and sales communication.",
    items: [
      "TV Commercials",
      "Corporate and Brand Films",
      "Corporate Pitch Videos",
      "Digital Ad Films",
      "Commercial Photography",
      "Animation / 3D Ad Films",
      "Series Ad Films",
      "Reels & Shorts",
      "Explainer Videos",
      "Lead Generation Ads",
      "Short Format Ads",
    ],
    recentWorks: ["govoyajo", "soma-beach", "underdwag", "mistwish"],
  },
} as const;

export type ServiceSlug = keyof typeof serviceDetails;
