"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PageSection } from "@/lib/types"

interface SectionEditorDialogProps {
  section: PageSection | null
  isOpen: boolean
  onClose: () => void
  onSave: (section: PageSection) => void
}

export function SectionEditorDialog({ section, isOpen, onClose, onSave }: SectionEditorDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (section) {
      setTitle(section.title)
      setContent(section.content)
    }
  }, [section])

  const handleSave = () => {
    if (section) {
      onSave({
        ...section,
        title,
        content,
      })
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Section Title</Label>
            <Input
              id="section-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section-content">Content</Label>
            <Textarea
              id="section-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter section content"
              rows={8}
              className="resize-none"
            />
            {section?.type === "values" && (
              <p className="text-xs text-muted-foreground">For values, use format: Title|Description (one per line)</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
