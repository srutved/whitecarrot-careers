"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PreviewBanner } from "@/components/preview/preview-banner"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"

export default function PreviewPage() {
  const router = useRouter()
  const params = useParams()
  const companySlug = params["company-slug"] as string
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="min-h-screen bg-background">
      <PreviewBanner
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBackToEditor={() => router.push(`/${companySlug}/edit`)}
      />

      <main
        id="main-content"
        className={`mx-auto transition-all duration-300 ${
          viewMode === "mobile" ? "max-w-sm border-x border-border min-h-screen" : ""
        }`}
      >
        <div className="pointer-events-none">
          <CareersHeader companyName={dummyCompanyData.name} theme={dummyCompanyData.theme} />
          <SectionRenderer sections={dummyCompanyData.sections} theme={dummyCompanyData.theme} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobList jobs={dummyCompanyData.jobs} theme={dummyCompanyData.theme} disabled />
          </div>
        </div>
      </main>
    </div>
  )
}
