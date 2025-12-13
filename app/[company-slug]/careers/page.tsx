"use client"

import { useParams } from "next/navigation"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"

export default function CareersPage() {
  const params = useParams()
  const companySlug = params["company-slug"] as string

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <CareersHeader companyName={dummyCompanyData.name} theme={dummyCompanyData.theme} />
      <SectionRenderer sections={dummyCompanyData.sections} theme={dummyCompanyData.theme} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <JobList jobs={dummyCompanyData.jobs} theme={dummyCompanyData.theme} />
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
