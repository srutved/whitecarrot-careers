"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import type { Job } from "@/lib/types"

interface JobFiltersProps {
  jobs: Job[]
  searchQuery: string
  onSearchChange: (query: string) => void
  locationFilter: string
  onLocationChange: (location: string) => void
  typeFilter: string
  onTypeChange: (type: string) => void
}

export function JobFilters({
  jobs,
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  typeFilter,
  onTypeChange,
}: JobFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const locations = Array.from(new Set(jobs.map((j) => j.location)))
  const hasActiveFilters = locationFilter !== "all" || typeFilter !== "all"

  const clearFilters = () => {
    onLocationChange("all")
    onTypeChange("all")
    onSearchChange("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search jobs"
          />
        </div>

        {/* Desktop filters */}
        <div className="hidden sm:flex gap-3">
          <Select value={locationFilter} onValueChange={onLocationChange}>
            <SelectTrigger className="w-44" aria-label="Filter by location">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={onTypeChange}>
            <SelectTrigger className="w-40" aria-label="Filter by job type">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="icon" onClick={clearFilters} aria-label="Clear filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <Button variant="outline" className="sm:hidden bg-transparent" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              2
            </span>
          )}
        </Button>
      </div>

      {/* Mobile filters accordion */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="sm:hidden">
        <CollapsibleContent className="space-y-3 pt-2">
          <Select value={locationFilter} onValueChange={onLocationChange}>
            <SelectTrigger aria-label="Filter by location">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={onTypeChange}>
            <SelectTrigger aria-label="Filter by job type">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
