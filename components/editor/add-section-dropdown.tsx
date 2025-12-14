"use client"

import type React from "react"
import { Plus, FileText, Target, ImageIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { PageSection } from "@/lib/types"

interface AddSectionDropdownProps {
  onAdd: (type: PageSection["type"]) => void
  sections: PageSection[] | undefined
}

export function AddSectionDropdown({ onAdd, sections }: AddSectionDropdownProps) {
  const sectionTypes: {
    type: PageSection["type"]
    label: string
    icon: React.ReactNode
  }[] = [
      { type: "about", label: "About Us", icon: <FileText className="h-4 w-4" /> },
      { type: "mission", label: "Mission & Vision", icon: <Target className="h-4 w-4" /> },
      { type: "life", label: "Life at Company", icon: <ImageIcon className="h-4 w-4" /> },
      { type: "values", label: "Our Values", icon: <Heart className="h-4 w-4" /> }
    ]

  // Extract already added section types
  const existingTypes = new Set(sections?.map(section => section.type))

  // Show only sections not yet added
  const availableSections = sectionTypes.filter(
    section => !existingTypes.has(section.type)
  )

  // Optional UX: hide dropdown if nothing left to add
  if (availableSections.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        {availableSections.map(item => (
          <DropdownMenuItem
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="cursor-pointer"
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
