"use client"

import { MapPin, Building, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Job, CompanyTheme } from "@/lib/types"

interface JobCardProps {
  job: Job
  theme: CompanyTheme
  onClick: () => void
  disabled?: boolean
}

export function JobCard({ job, theme, onClick, disabled }: JobCardProps) {
  const typeStyles: Record<Job["type"], string> = {
    "full-time": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "part-time": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    remote: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    contract: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  }

  const typeLabels: Record<Job["type"], string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    remote: "Remote",
    contract: "Contract",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left p-4 sm:p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all group disabled:pointer-events-none disabled:opacity-70"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3
            className="text-lg font-semibold group-hover:text-primary transition-colors"
            style={{ color: disabled ? undefined : theme.textColor }}
          >
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {job.department}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={typeStyles[job.type]} variant="secondary">
            {typeLabels[job.type]}
          </Badge>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  )
}
