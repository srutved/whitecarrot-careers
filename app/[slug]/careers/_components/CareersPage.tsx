"use client"

import { CareersHeader } from "@/components/careers/careers-header"
import { JobList } from "@/components/careers/job-list"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { dummyCompanyData } from "@/lib/dummy-data"
import { Company, Job } from "@/lib/types"

interface Props {
    companyData: Company
    jobs: Job[]
}

export default function CareersPage({ companyData, jobs }: Props) {
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
