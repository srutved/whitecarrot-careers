"use client"

import type { PageSection } from "@/lib/types"

interface SectionRendererProps {
  sections: PageSection[]
  text_color: string | null;
  primary_color: string | null;
  culture_video_url: string | null;
  secondary_color: string | null;
}

export function SectionRenderer({ sections, culture_video_url, primary_color, secondary_color, text_color }: SectionRendererProps) {
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case "about":
      case "mission":
        return (
          <div key={section.id} className="py-12 md:py-16">
            <h2 className="text-2xl text-center md:text-3xl font-bold mb-6" style={{ color: primary_color || "black" }}>
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-justify" style={{ color: text_color || "black" }}>{section.content}</p>
          </div>
        )

      case "life":
        return (
          <div key={section.id} className="py-12 md:py-16">
            <h2 className="text-2xl text-center md:text-3xl font-bold mb-6" style={{ color: primary_color || "black" }}>
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-justify" style={{ color: text_color || "black" }}>{section.content}</p>
            {section.images && section.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {section.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-muted">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Life at company ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
            {culture_video_url && (
              <div className="mt-8">
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <iframe
                    src={culture_video_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Company culture video"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case "values":
        const values = section.content
          .split("\n")
          .filter(Boolean)
          .map((line) => {
            const [title, description] = line.split("|")
            return { title: title?.trim(), description: description?.trim() }
          })
        return (
          <div key={section.id} className="py-12 md:py-16">
            <h2 className="text-2xl text-center md:text-3xl font-bold mb-8" style={{ color: primary_color || "black" }}>
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-primary-foreground font-bold"
                    style={{ backgroundColor: secondary_color || "#000000" }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: primary_color || "black" }}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm" style={{ color: text_color || "black" }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-border">
      {visibleSections.map(renderSection)}
    </div>
  )
}
