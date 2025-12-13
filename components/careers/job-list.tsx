"use client"

import { useState, useMemo } from "react"
import { Briefcase } from "lucide-react"
import { JobCard } from "./job-card"
import { JobFilters } from "./job-filters"
import { JobDetailDialog } from "./job-detail-dialog"
import type { Job, CompanyTheme } from "@/lib/types"

interface JobListProps {
  jobs: Job[]
  theme: CompanyTheme
  disabled?: boolean
}

export function JobList({ jobs, theme, disabled }: JobListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLocation = locationFilter === "all" || job.location === locationFilter
      const matchesType = typeFilter === "all" || job.type === typeFilter
      return matchesSearch && matchesLocation && matchesType
    })
  }, [jobs, searchQuery, locationFilter, typeFilter])

  return (
    <div className="py-12 md:py-16">
      <div className="mb-8">
        <div className="flex justify-center items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textColor }}>
              Open Positions
            </h2>
          </div>
        </div>
        <p className="text-center text-muted-foreground pt-2 text-lg">Find your next big move and help us shape technology that makes everyday life safer and smarter.</p>
      </div>

      <JobFilters
        jobs={jobs}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      <div className="mt-6">
        {filteredJobs.length > 0 ?
          <div className="space-y-3">
            {
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} theme={theme} onClick={() => setSelectedJob(job)} disabled={disabled} />))
            }
            <p className="text-muted-foreground text-md text-center">
              {jobs.length} {jobs.length === 1 ? "role" : "roles"} available
            </p>
          </div>

          : (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
      </div>

      <JobDetailDialog
        job={selectedJob}
        theme={theme}
        isOpen={!!selectedJob && !disabled}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  )
}
