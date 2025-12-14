import { Metadata } from "next"
import CareersPage from "./_components/CareersPage"
import { Company, Job } from "@/lib/types"
import { cache } from "react"

const getCompanyData = cache(async (companySlug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${companySlug}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch company data")
  }

  return res.json()
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const data = await getCompanyData(slug)

  const metadata: Metadata = {
    title: `Careers at ${data.company.name}`,
    icons: {
      icon: data.company.logo_url || "/favicon.ico",
      shortcut: data.company.logo_url || "/favicon.ico",
    }
  }

  return metadata;
}

function buildJobStructuredData(company: Company, jobs: Job[]) {
  return jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.posted_date,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: company.name,
      sameAs: company.website,
      logo: company.logo_url
    },
    jobLocationType:
      job.type === "remote" ? "TELECOMMUTE" : undefined,
    jobLocation:
      job.type !== "remote"
        ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location
          }
        }
        : undefined
  }))
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const data = await getCompanyData(slug)

  const jobStructuredData = buildJobStructuredData(
    data.company,
    data.jobs
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobStructuredData)
        }}
      />

      <CareersPage
        companyData={data.company}
        jobs={data.jobs}
      />
    </>
  )
}
