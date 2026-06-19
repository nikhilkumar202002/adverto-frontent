export const portfolioProjects = [
  {
    id: 1,
    title: "NOIR Identity System",
    category: "Luxury Fashion",
    year: "2024",
    image: "/images/projects/project-1.jpg",
    featured: true,
  },

  {
    id: 2,
    title: "APEX Product Launch",
    category: "Technology",
    year: "2024",
    image: "/images/projects/project-2.jpg",
    featured: true,
  },

  {
    id: 3,
    title: "VOLT Energy",
    category: "Consumer Goods",
    year: "2023",
    image: "/images/projects/project-3.jpg",
  },

  {
    id: 4,
    title: "Crypto Platform",
    category: "Fintech",
    year: "2023",
    image: "/images/projects/project-4.jpg",
  },
];

export const caseStudyCollageProjects = [
  {
    id: "thavala-nature",
    title: "Thavala Nature",
    subtitle: "Branding · 2023",
    image: "/case-studies/1200-x1200---01.jpg",
    alt: "Thavala Nature outdoor brand campaign",
  },
  {
    id: "under-dawg",
    title: "Under Dawg",
    subtitle: "Apparel · 2023",
    image: "/case-studies/1200-x-900---02.jpg",
    alt: "Under Dawg branded tote bag",
  },
  {
    id: "volt-energy",
    title: "VOLT Energy",
    subtitle: "Consumer Goods · 2023",
    image:
      "https://cdn.dribbble.com/userupload/46944459/file/817e33e8a07211881aef89ada4ebd3c5.webp?resize=1024x683&vertical=center",
    alt: "VOLT Energy project",
  },
  {
    id: "halo-digital",
    title: "Halo Digital",
    subtitle: "Campaign · 2026",
    image: "/case-studies/1200-x-900.jpg",
    alt: "Halo Digital outdoor billboard campaign",
  },
  {
    id: "rich-mount",
    title: "Rich Mount",
    subtitle: "Branding · 2023",
    image: "/case-studies/1200-x1200---02.jpg",
    alt: "Rich Mount contracting brand campaign",
  },
];

const dummyProjectImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='980' viewBox='0 0 1400 980'%3E%3Crect width='1400' height='980' fill='%23080808'/%3E%3Crect x='70' y='70' width='1260' height='840' fill='%23141414' stroke='%23242424' stroke-width='2'/%3E%3Cpath d='M70 760L380 540L650 670L965 390L1330 610V910H70Z' fill='%23202020'/%3E%3Ccircle cx='1075' cy='250' r='88' fill='%232A2A2A'/%3E%3Ctext x='700' y='500' fill='%23777777' font-family='Arial, sans-serif' font-size='52' text-anchor='middle' letter-spacing='8'%3EIMAGE SOON%3C/text%3E%3C/svg%3E";

const spicesGalleryImages = [
  "/case-studies/spices/BRANDING%20SPICES-02.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-03.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-04.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-05.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-06.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-07.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-08.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-09.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-10.jpg.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-10.jpg%20%281%29.jpeg",
  "/case-studies/spices/BRANDING%20SPICES-11.jpg.jpeg",
];

export const portfolioPageProjects = [
  {
    slug: "spices",
    title: "Spices",
    subtitle: "Branding · 2024",
    category: "Branding",
    year: "2024",
    heroImage: "/case-studies/spices/BRANDING%20SPICES-01.jpg.jpeg",
    description:
      "A complete brand presentation for a spice label, built around expressive packaging, sharp product visuals, and a warm retail-ready identity system.",
    services: ["Brand identity", "Packaging", "Campaign design"],
    gallery: spicesGalleryImages,
  },
  {
    slug: "trinity",
    title: "Trinity",
    subtitle: "Apparel · 2023",
    category: "Apparel",
    year: "2023",
    heroImage: dummyProjectImage,
    description:
      "A focused apparel identity page prepared for future brand imagery and campaign assets.",
    services: ["Identity", "Art direction", "Digital design"],
    gallery: [dummyProjectImage, dummyProjectImage, dummyProjectImage],
  },
  {
    slug: "gotour",
    title: "GoTour",
    subtitle: "Architecture · 2022",
    category: "Architecture",
    year: "2022",
    heroImage: dummyProjectImage,
    description:
      "A clean architectural project shell ready for renders, location visuals, and presentation boards.",
    services: ["Brand system", "Presentation", "Campaign design"],
    gallery: [dummyProjectImage, dummyProjectImage, dummyProjectImage],
  },
  {
    slug: "ai-startup",
    title: "AI Startup",
    subtitle: "AI Startup · 2024",
    category: "AI Startup",
    year: "2024",
    heroImage: dummyProjectImage,
    description:
      "A technology project page structured for product visuals, UI states, and launch material.",
    services: ["Product identity", "UI direction", "Launch assets"],
    gallery: [dummyProjectImage, dummyProjectImage, dummyProjectImage],
  },
  {
    slug: "jumpqi",
    title: "JumpQi",
    subtitle: "Automotive · 2023",
    category: "Automotive",
    year: "2023",
    heroImage: dummyProjectImage,
    description:
      "An automotive case-study shell for brand language, motion-led campaign frames, and product storytelling.",
    services: ["Campaign design", "Brand identity", "Motion direction"],
    gallery: [dummyProjectImage, dummyProjectImage, dummyProjectImage],
  },
  {
    slug: "rexora",
    title: "Rexora",
    subtitle: "Real Estate · 2022",
    category: "Real Estate",
    year: "2022",
    heroImage: dummyProjectImage,
    description:
      "A real-estate portfolio page prepared for property visuals, launch communication, and brand collateral.",
    services: ["Identity", "Print design", "Digital campaign"],
    gallery: [dummyProjectImage, dummyProjectImage, dummyProjectImage],
  },
];
