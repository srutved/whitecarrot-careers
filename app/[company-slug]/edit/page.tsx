"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"
import type { CompanyTheme, PageSection } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function EditorPage() {
  const router = useRouter()
  const params = useParams()
  const companySlug = params["company-slug"] as string

  const [theme, setTheme] = useState<CompanyTheme>(dummyCompanyData.theme)
  const [sections, setSections] = useState<PageSection[]>(dummyCompanyData.sections)
  const [isPublished, setIsPublished] = useState(dummyCompanyData.isPublished)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const handleViewPublic = () => {
    router.push(`/${companySlug}/careers`)
  }

  return (
    <div className="flex min-h-screen">
      <EditorSidebar
        theme={theme}
        sections={sections}
        isPublished={isPublished}
        onThemeChange={setTheme}
        onSectionsChange={setSections}
        onPublishToggle={setIsPublished}
        onViewPublic={handleViewPublic}
        companySlug={companySlug}
      />

      <main id="main-content" className="flex-1 h-screen bg-muted/30 overflow-y-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg text-foreground">Live Preview</h2>
            <div className="space-x-2">
              <Button variant="outline" className="bg-transparent" onClick={handleViewPublic}>
                View Public Page
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-16">
          <CareersHeader companyName={dummyCompanyData.name} theme={theme} />
          <SectionRenderer sections={sections} theme={theme} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobList jobs={dummyCompanyData.jobs} theme={theme} />
          </div>
        </div>
      </main >
    </div >
  )
}
