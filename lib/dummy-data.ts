import type { Company, Job, PageSection } from "./types"

export const dummySections: PageSection[] = [
  {
    id: "1",
    type: "about",
    title: "About Us",
    content:
      "We're a team of passionate innovators building the future of work. Founded in 2020, we've grown from a small startup to a global team of 200+ people across 15 countries. Our mission is to make work more meaningful and productive for everyone.",
    order: 1,
    visible: true,
  },
  {
    id: "2",
    type: "mission",
    title: "Mission & Vision",
    content:
      "Our mission is to empower every organization to build exceptional teams. We envision a world where finding the right job is effortless and where every company can showcase their unique culture authentically.",
    order: 2,
    visible: true,
  },
  {
    id: "3",
    type: "life",
    title: "Life at TechCorp",
    content:
      "Experience the vibrant culture that makes our company special. From team retreats to hackathons, we believe in working hard and having fun together.",
    images: [
      "/modern-office-space-with-employees-collaborating.jpg",
      "/team-building-event-outdoor-activity.jpg",
      "/company-retreat-tropical-beach.jpg",
      "/hackathon-event-with-developers-coding.jpg",
    ],
    order: 3,
    visible: true,
  },
  {
    id: "4",
    type: "values",
    title: "Our Values",
    content:
      "Innovation First|We constantly push boundaries and embrace new ideas\nCustomer Obsession|Every decision starts with our customers in mind\nIntegrity Always|We do the right thing, even when no one is watching\nTeam Spirit|We succeed together and celebrate each other's wins\nContinuous Learning|We're always growing and improving ourselves",
    order: 4,
    visible: true,
  },
]

export const dummyJobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    type: "full-time",
    department: "Engineering",
    description:
      "Join our frontend team to build beautiful, performant user interfaces. You'll work with React, TypeScript, and modern web technologies to create exceptional user experiences.",
    requirements: [
      "5+ years of frontend development experience",
      "Strong proficiency in React and TypeScript",
      "Experience with modern CSS and design systems",
      "Excellent communication skills",
    ],
    posted_date: "2024-01-15", company_id: "c1",
  },
  {
    id: "j2",
    title: "Product Designer",
    location: "New York, NY",
    type: "full-time",
    department: "Design",
    description:
      "We're looking for a talented Product Designer to shape the future of our platform. You'll collaborate closely with engineers and product managers to create intuitive, delightful experiences.",
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio showcasing UX/UI work",
      "Proficiency in Figma",
      "Experience with user research",
    ],
    posted_date: "2024-01-12",
    company_id: "c1",
  },
  {
    id: "j3",
    title: "DevOps Engineer",
    location: "Remote",
    type: "remote",
    department: "Infrastructure",
    description:
      "Help us scale our infrastructure to millions of users. You'll work on CI/CD pipelines, cloud architecture, and ensuring our systems are reliable and performant.",
    requirements: [
      "3+ years of DevOps experience",
      "Strong AWS or GCP knowledge",
      "Experience with Kubernetes and Docker",
      "Infrastructure as Code expertise",
    ],
    posted_date: "2024-01-10", company_id: "c1",
  },
  {
    id: "j4",
    title: "Marketing Manager",
    location: "Austin, TX",
    type: "full-time",
    department: "Marketing",
    description:
      "Lead our marketing initiatives and help us reach more customers. You'll develop strategies, manage campaigns, and work with cross-functional teams to grow our brand.",
    requirements: [
      "5+ years of B2B marketing experience",
      "Strong analytical skills",
      "Experience with marketing automation tools",
      "Excellent writing and communication",
    ],
    posted_date: "2024-01-08", company_id: "c1",
  },
  {
    id: "j5",
    title: "Customer Success Specialist",
    location: "London, UK",
    type: "part-time",
    department: "Customer Success",
    description:
      "Be the voice of our customers and help them succeed with our platform. You'll onboard new clients, provide support, and gather feedback to improve our product.",
    requirements: [
      "2+ years of customer-facing experience",
      "Strong problem-solving skills",
      "Excellent communication abilities",
      "Experience with CRM tools",
    ],
    posted_date: "2024-01-05", company_id: "c1",
  },
  {
    id: "j6",
    title: "Contract UX Researcher",
    location: "Remote",
    type: "contract",
    department: "Design",
    description:
      "Conduct user research to inform product decisions. You'll plan and execute research studies, synthesize findings, and present insights to stakeholders.",
    requirements: [
      "3+ years of UX research experience",
      "Experience with qualitative and quantitative methods",
      "Strong presentation skills",
      "Portfolio of research work",
    ],
    posted_date: "2024-01-03", company_id: "c1",
  },
]

export const dummyCompanyData: Company = {
  id: "c1",
  website: "https://www.whitecarrot.com",
  is_published: true,
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  slug: "whitecarrot-demo",
  name: "WhiteCarrot Careers",
  logo_url: "/whitecarrot-careers-logo.png",
  banner_url: "/company-retreat-tropical-beach.jpg",
  primary_color: "#0ea5e9",
  secondary_color: "#64748b",
  text_color: "#0f172a",
  culture_video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  sections: dummySections,
  jobs: dummyJobs,
}
