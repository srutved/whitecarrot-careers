"use client"

import { Eye, Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PreviewBannerProps {
  viewMode: "desktop" | "mobile"
  onViewModeChange: (mode: "desktop" | "mobile") => void
  onBackToEditor: () => void
}

export function PreviewBanner({ viewMode, onViewModeChange, onBackToEditor }: PreviewBannerProps) {
  return (
    <div className="sticky top-0 z-50 bg-amber-500 text-amber-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          <span className="font-medium">Preview Mode</span>
          <Badge variant="secondary" className="bg-amber-600/30 text-amber-950 border-0">
            Not Public
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-amber-600/30 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-3 ${viewMode === "desktop" ? "bg-white text-amber-950" : "hover:bg-amber-600/30"}`}
              onClick={() => onViewModeChange("desktop")}
              aria-label="Desktop view"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-3 ${viewMode === "mobile" ? "bg-white text-amber-950" : "hover:bg-amber-600/30"}`}
              onClick={() => onViewModeChange("mobile")}
              aria-label="Mobile view"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-amber-950 hover:bg-amber-100"
            onClick={onBackToEditor}
          >
            Back to Editor
          </Button>
        </div>
      </div>
    </div>
  )
}
