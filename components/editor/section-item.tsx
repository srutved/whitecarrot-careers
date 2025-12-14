"use client"

import { GripVertical, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PageSection } from "@/lib/types"

interface SectionItemProps {
  section: PageSection
  onEdit: () => void
  onDelete: () => void
  onToggleVisibility: () => void
}

export function SectionItem({ section, onEdit, onDelete, onToggleVisibility }: SectionItemProps) {
  const sectionTypeLabels: Record<PageSection["type"], string> = {
    about: "About Us",
    mission: "Mission & Vision",
    life: "Life at Company",
    values: "Our Values",
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-card border border-border rounded-lg group transition-colors ${!section.visible ? "opacity-60" : ""
        }`}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">{section.title}</p>
        <p className="text-xs text-muted-foreground">{sectionTypeLabels[section.type]}</p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleVisibility}
          aria-label={section.visible ? "Hide section" : "Show section"}
        >
          {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit} aria-label="Edit section">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={onDelete}
          aria-label="Delete section"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
