"use client"

import { MapPin, Building, Clock, Calendar, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Job, CompanyTheme } from "@/lib/types"

interface JobDetailDialogProps {
  job: Job | null
  theme: CompanyTheme
  isOpen: boolean
  onClose: () => void
}

export function JobDetailDialog({ job, theme, isOpen, onClose }: JobDetailDialogProps) {
  if (!job) return null

  const typeLabels: Record<Job["type"], string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    remote: "Remote",
    contract: "Contract",
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <Button variant="ghost" size="sm" className="w-fit -ml-2 mb-2" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to jobs
          </Button>
          <DialogTitle className="text-2xl font-bold" style={{ color: theme.textColor }}>
            {job.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {job.department}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {typeLabels[job.type]}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Posted {formatDate(job.postedDate)}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3" style={{ color: theme.textColor }}>
              About This Role
            </h3>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3" style={{ color: theme.textColor }}>
              Requirements
            </h3>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full" style={{ backgroundColor: theme.primaryColor }}>
            Apply for this position
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
