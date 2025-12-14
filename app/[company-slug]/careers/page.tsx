"use client"

import { useParams } from "next/navigation"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"
import { useEffect, useState } from "react"
import { Company } from "@/lib/types"
import { LoaderPinwheel } from "lucide-react"

export default function CareersPage() {
  const params = useParams()
  const companySlug = params["company-slug"] as string
  const [companyData, setCompanyData] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/company/${companySlug}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyData(data?.company || null)
        setJobs(data?.jobs || [])
      })
      .catch((error) => {
        console.error("Error fetching company data:", error)
        setError("Failed to load company data.")
      }).finally(() => {
        setIsLoading(false)
      })
  }, [companySlug])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderPinwheel className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <CareersHeader company={companyData as Company} />
      <SectionRenderer sections={companyData?.sections || []} primary_color={companyData?.primary_color || "#000000"} secondary_color={companyData?.secondary_color || "#ADD8E6"} text_color={companyData?.text_color || "#000000"} culture_video_url={companyData?.culture_video_url || ""} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <JobList jobs={jobs} secondaryColor={companyData?.secondary_color || "#ADD8E6"} primaryColor={companyData?.primary_color || "#000000"} textColor={companyData?.text_color || "#000000"} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {dummyCompanyData.name}. All rights reserved.
          </p>
          <p className="mt-2">
            Powered by <span className="font-medium text-foreground">Whitecarrot Careers</span>
          </p>
        </div>
      </footer>
    </main>
  )
}
