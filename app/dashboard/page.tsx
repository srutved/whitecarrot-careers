"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"
import type { Company, Job, PageSection } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, LoaderPinwheel, Share } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateJobDialog } from "@/components/careers/create-job-dialog"

export default function EditorPage() {
  const router = useRouter()
  const params = useParams()

  const [isCreateJobOpen, setCreateJobOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null)
  const [companyDraft, setCompanyDraft] = useState<Company>({} as Company)
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (data?.user) {
          setUser(data.user);

          if (data.company) {
            setCompany(data.company);
            setCompanyDraft(data.company);
            setJobs(data.company.jobs || []);
          } else {
            setCompanyDraft({
              id: "",
              banner_url: "",
              sections: [],
              culture_video_url: "",
              created_at: "",
              updated_at: "",
              is_published: false,
              jobs: [],
              name: "",
              slug: "",
              website: "",
              logo_url: "",
              primary_color: "#000000",
              secondary_color: "#ADD8E6",
              text_color: "#000000",
            });
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const publicUrl = `${window.location.origin}/${company?.slug}/careers`;

  const handleCopy = async (e: any) => {
    e.preventDefault()
    await navigator.clipboard.writeText(publicUrl);
  };

  const refetchJobs = async () => {
    fetch(`/api/jobs?companyId=${companyDraft?.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
      })
      .catch((error) => {
        console.error("Error fetching jobs data:", error)
      })
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderPinwheel className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <EditorSidebar
        company={company}
        setCompany={setCompany}
        companyDraft={companyDraft}
        setCompanyDraft={setCompanyDraft}
      />

      <main id="main-content" className="flex-1 h-screen bg-muted/30 overflow-y-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg text-foreground">Live Preview</h2>
            <div className="space-x-2 flex items-center">
              <Button onClick={() => setCreateJobOpen(true)}>
                + Create Job
              </Button>

              {company?.is_published && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    <Share />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Share public link
                  </div>

                  <DropdownMenuItem
                    className="flex items-center justify-between gap-2 cursor-pointer"
                    onClick={handleCopy}
                  >
                    <span className="truncate">{publicUrl}</span>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => window.open(publicUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in new tab
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>}

              <Button variant="outline" className="bg-transparent" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-16">
          <CareersHeader company={companyDraft} />
          {/* <SectionRenderer /> */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobList jobs={jobs} primaryColor={companyDraft?.primary_color || "#000000"} secondaryColor={companyDraft?.secondary_color || "#ADD8E6"} textColor={companyDraft?.text_color || "#000000"} />
          </div>
        </div>

      </main >
      <CreateJobDialog
        open={isCreateJobOpen}
        onOpenChange={setCreateJobOpen}
        companyId={companyDraft?.id || ""}
        onSuccess={refetchJobs}
      />
    </div >
  )
}
