"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import type { PageSection } from "@/lib/types"

interface SectionEditorDialogProps {
  section: PageSection | null
  isOpen: boolean
  onClose: () => void
  onSave: (section: PageSection) => void
}

export function SectionEditorDialog({
  section,
  isOpen,
  onClose,
  onSave
}: SectionEditorDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (section) {
      setTitle(section.title)
      setContent(section.content || "")
      setImages(section.images || [])
    }
  }, [section])

  const updateImageAtIndex = (index: number, value: string) => {
    setImages(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleSave = () => {
    if (!section) return

    onSave({
      ...section,
      title,
      content,
      images: section.type === "life" ? images.filter(Boolean) : undefined
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Life at Company Images */}
          {section?.type === "life" && (
            <div className="space-y-3">
              <Label>Life at Company Images</Label>

              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <ImageUpload
                    key={index}
                    label={`Image ${index + 1}`}
                    value={images[index] || ""}
                    onChange={(url) => updateImageAtIndex(index, url || "")}
                    aspectRatio="square"
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Upload up to 4 images showcasing culture, events, or workspace.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
