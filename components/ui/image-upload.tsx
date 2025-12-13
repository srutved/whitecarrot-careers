"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  label: string
  value: string | null
  onChange: (value: string | null) => void
  aspectRatio?: "square" | "banner" | "logo"
}

export function ImageUpload({ label, value, onChange, aspectRatio = "square" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const aspectClasses = {
    square: "aspect-square",
    banner: "aspect-[3/1]",
    logo: "aspect-[2/1]",
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // In a real app, handle file upload here
    onChange("/uploaded-image-placeholder.jpg")
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        } ${aspectClasses[aspectRatio]}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative w-full h-full">
            <img src={value || "/placeholder.svg"} alt={label} className="w-full h-full object-cover rounded-lg" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => onChange(null)}
              aria-label={`Remove ${label}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm">Drag & drop or click to upload</span>
            <Button variant="outline" size="sm" onClick={() => onChange("/company-logo-modern.jpg")}>
              <Upload className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
