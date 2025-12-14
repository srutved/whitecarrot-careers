"use client"

import { useState } from "react"
import { ChevronDown, X, Menu, Loader2 } from "lucide-react"
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
import type { Company, PageSection } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { set } from "date-fns"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable"
import { SortableSectionItem } from "./sortable-section-item"

interface EditorSidebarProps {
  company: Company | null
  setCompany: (company: Company) => void
  companyDraft: Company | null
  setCompanyDraft: (company: Company) => void
}

export function EditorSidebar({
  company, setCompany, companyDraft, setCompanyDraft
}: EditorSidebarProps) {
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const [isSaving, setIsSaving] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = companyDraft!.sections.findIndex(
      (s) => s.id === active.id
    )
    const newIndex = companyDraft!.sections.findIndex(
      (s) => s.id === over.id
    )

    const reordered = arrayMove(companyDraft!.sections, oldIndex, newIndex).map(
      (section, index) => ({
        ...section,
        order: index + 1
      })
    )

    setCompanyDraft({
      ...companyDraft!,
      sections: reordered
    })
  }

  const handleSlugBlur = async () => {
    if (!companyDraft?.slug) return;

    if (company && company?.slug === companyDraft.slug) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus("checking");

    const res = await fetch(
      `/api/dashboard/check-slug?slug=${companyDraft?.slug}`
    );

    const data = await res.json();

    if (data.available) {
      setSlugStatus("available");
    } else {
      setSlugStatus("taken");
    }
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      if (slugStatus === "taken") {
        setError("Please choose a different slug. This one is already taken.");
        return;
      }

      fetch("/api/dashboard/save-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyDraft),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save page");
        } else {
          return res.json();
        }
      }).then((data) => {
        setCompanyDraft({ ...companyDraft, id: data?.company?.id, is_published: true } as Company);
        setCompany({ ...companyDraft, id: data?.company?.id, is_published: true } as Company);
      });
    } catch (error) {
      setError("Failed to save page. Please try again.")
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    }
  }

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
      order: (companyDraft?.sections?.length || 0) + 1,
      visible: true,
    }
    setCompanyDraft({
      ...companyDraft!,
      sections: [...(companyDraft?.sections || []), newSection],
    })
  }

  const handleDeleteSection = (id: string) => {
    setCompanyDraft({
      ...companyDraft!,
      sections: companyDraft!.sections.filter((section) => section.id !== id),
    })
  }

  const handleToggleVisibility = (id: string) => {
    setCompanyDraft({
      ...companyDraft!,
      sections: companyDraft!.sections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      ),
    })
  }

  const handleSaveSection = (updatedSection: PageSection) => {
    setCompanyDraft({
      ...companyDraft!,
      sections: companyDraft!.sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      ),
    })
  }

  const handleCompanyDraftChange = (field: keyof Company, value: any) => {
    setCompanyDraft({ ...companyDraft!, [field]: value })
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

      <div className="flex-1 overflow-y-auto py-4 px-4">
        <form className="space-y-4" onSubmit={handleSavePage}>
          {/* Company Details */}
          <span className="font-bold text-md text-foreground">Company Details</span>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm font-medium text-foreground">
                Company Name
              </Label>
              <Input
                required
                id="company-name"
                value={companyDraft?.name || ""}
                onChange={(e) => handleCompanyDraftChange("name", e.target.value)}
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-slug" className="text-sm font-medium text-foreground">
                Company Slug
              </Label>
              <Input
                required
                id="company-slug"
                value={companyDraft?.slug || ""}
                onChange={(e) => handleCompanyDraftChange("slug", e.target.value)}
                placeholder="your-company"
                onBlur={handleSlugBlur}
              />
              {slugStatus === "checking" && (
                <p className="text-sm text-muted-foreground">
                  Checking availability...
                </p>
              )}

              {slugStatus === "available" && (
                <p className="text-sm text-green-600">
                  Slug is available ✅
                </p>
              )}

              {slugStatus === "taken" && (
                <p className="text-sm text-red-600">
                  This slug is already taken ❌
                </p>
              )}

            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website" className="text-sm font-medium text-foreground">
                Website URL
              </Label>
              <Input
                id="company-website"
                value={companyDraft?.website || ""}
                onChange={(e) => handleCompanyDraftChange("website", e.target.value)}
                placeholder="https://www.yourcompany.com"
              />
            </div>
            <ImageUpload
              label="Company Logo (1:1)"
              value={companyDraft?.logo_url || ""}
              onChange={(logo) => handleCompanyDraftChange("logo_url", logo)}
              aspectRatio="logo"
            />
            <ImageUpload
              label="Banner Image (16:9)"
              value={companyDraft?.banner_url || ""}
              onChange={(banner) => handleCompanyDraftChange("banner_url", banner)}
              aspectRatio="banner"
            />
          </div>

          {/* Company Theme */}
          <span className="font-bold text-md text-foreground">Company Theme</span>
          <div className="space-y-4 pt-2">
            <ColorPicker
              label="Primary Color"
              value={companyDraft?.primary_color || ""}
              onChange={(primaryColor) => handleCompanyDraftChange("primary_color", primaryColor)}
            />
            <ColorPicker
              label="Secondary Color"
              value={companyDraft?.secondary_color || ""}
              onChange={(secondaryColor) => handleCompanyDraftChange("secondary_color", secondaryColor)}
            />
            <ColorPicker
              label="Text Color"
              value={companyDraft?.text_color || ""}
              onChange={(textColor) => handleCompanyDraftChange("text_color", textColor)}
            />
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-sm font-medium text-foreground">
                Culture Video URL
              </Label>
              <Input
                id="video-url"
                value={companyDraft?.culture_video_url || ""}
                onChange={(e) => handleCompanyDraftChange("culture_video_url", e.target.value)}
                placeholder="https://youtube.com/embed/..."
              />
              <p className="text-xs">Shown in "Life at Company" page section</p>
            </div>
          </div>

          {/* Page Sections */}
          <span className="font-bold text-md text-foreground">Page Sections</span>
          <div className="space-y-4 pt-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={(companyDraft?.sections || []).map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {(companyDraft?.sections || [])
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <SortableSectionItem
                      key={section.id}
                      section={section}
                      onEdit={() => setEditingSection(section)}
                      onDelete={() => handleDeleteSection(section.id)}
                      onToggleVisibility={() => handleToggleVisibility(section.id)}
                    />
                  ))}
              </SortableContext>
            </DndContext>

            <AddSectionDropdown onAdd={handleAddSection} sections={companyDraft?.sections} />
          </div>

          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isSaving}>{isSaving ? <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </> : "Save Page"}</Button>
        </form>
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
