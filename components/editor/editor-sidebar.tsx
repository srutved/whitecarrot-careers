"use client"

import { useState } from "react"
import { ChevronDown, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ColorPicker } from "@/components/ui/color-picker"
import { ImageUpload } from "@/components/ui/image-upload"
import { SectionItem } from "./section-item"
import { AddSectionDropdown } from "./add-section-dropdown"
import { SectionEditorDialog } from "./section-editor-dialog"
import type { CompanyTheme, PageSection } from "@/lib/types"

interface EditorSidebarProps {
  theme: CompanyTheme
  sections: PageSection[]
  isPublished: boolean
  onThemeChange: (theme: CompanyTheme) => void
  onSectionsChange: (sections: PageSection[]) => void
  onPublishToggle: (published: boolean) => void
  onViewPublic: () => void
  companySlug: string
}

export function EditorSidebar({
  theme,
  sections,
  isPublished,
  onThemeChange,
  onSectionsChange,
  onPublishToggle,
  onViewPublic,
  companySlug,
}: EditorSidebarProps) {
  const [isThemeOpen, setIsThemeOpen] = useState(true)
  const [isSectionsOpen, setIsSectionsOpen] = useState(true)
  const [isPublishOpen, setIsPublishOpen] = useState(true)
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleAddSection = (type: PageSection["type"]) => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type,
      title:
        type === "about"
          ? "About Us"
          : type === "mission"
            ? "Mission & Vision"
            : type === "life"
              ? "Life at Company"
              : type === "values"
                ? "Our Values"
                : "Custom Section",
      content: "",
      order: sections.length + 1,
      visible: true,
    }
    onSectionsChange([...sections, newSection])
  }

  const handleDeleteSection = (id: string) => {
    onSectionsChange(sections.filter((s) => s.id !== id))
  }

  const handleToggleVisibility = (id: string) => {
    onSectionsChange(sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)))
  }

  const handleSaveSection = (updatedSection: PageSection) => {
    onSectionsChange(sections.map((s) => (s.id === updatedSection.id ? updatedSection : s)))
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-lg text-foreground">Page Editor</h2>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Theme Section */}
        <Collapsible open={isThemeOpen} onOpenChange={setIsThemeOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-medium text-sm text-foreground">Company Theme</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isThemeOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <ImageUpload
              label="Company Logo (1:1)"
              value={theme.logo}
              onChange={(logo) => onThemeChange({ ...theme, logo })}
              aspectRatio="logo"
            />
            <ImageUpload
              label="Banner Image 16:9"
              value={theme.banner}
              onChange={(banner) => onThemeChange({ ...theme, banner })}
              aspectRatio="banner"
            />
            <ColorPicker
              label="Primary Color"
              value={theme.primaryColor}
              onChange={(primaryColor) => onThemeChange({ ...theme, primaryColor })}
            />
            <ColorPicker
              label="Secondary Color"
              value={theme.secondaryColor}
              onChange={(secondaryColor) => onThemeChange({ ...theme, secondaryColor })}
            />
            <ColorPicker
              label="Text Color"
              value={theme.textColor}
              onChange={(textColor) => onThemeChange({ ...theme, textColor })}
            />
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-sm font-medium text-foreground">
                Culture Video URL
              </Label>
              <Input
                id="video-url"
                value={theme.cultureVideoUrl}
                onChange={(e) => onThemeChange({ ...theme, cultureVideoUrl: e.target.value })}
                placeholder="https://youtube.com/embed/..."
              />
            </div>
            <Button className="w-full">Save Theme</Button>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Sections */}
        <Collapsible open={isSectionsOpen} onOpenChange={setIsSectionsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-medium text-sm text-foreground">Page Sections</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isSectionsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  onEdit={() => setEditingSection(section)}
                  onDelete={() => handleDeleteSection(section.id)}
                  onToggleVisibility={() => handleToggleVisibility(section.id)}
                />
              ))}
            <AddSectionDropdown onAdd={handleAddSection} />
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Publish */}
        <Collapsible open={isPublishOpen} onOpenChange={setIsPublishOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-medium text-sm text-foreground">Publish Settings</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isPublishOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="publish-toggle" className="text-sm font-medium text-foreground">
                  Published
                </Label>
                <p className="text-xs text-muted-foreground">{isPublished ? "Page is live" : "Page is hidden"}</p>
              </div>
              <Switch id="publish-toggle" checked={isPublished} onCheckedChange={onPublishToggle} />
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={onViewPublic}>
              View Public Page
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <SectionEditorDialog
        section={editingSection}
        isOpen={!!editingSection}
        onClose={() => setEditingSection(null)}
        onSave={handleSaveSection}
      />
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 lg:hidden shadow-lg bg-transparent"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open editor sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border transform transition-transform lg:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 h-screen border-r border-border bg-background shrink-0">
        {sidebarContent}
      </div>
    </>
  )
}
