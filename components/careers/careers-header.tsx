"use client"

import type { CompanyTheme } from "@/lib/types"
import { Building2 } from "lucide-react"

interface CareersHeaderProps {
  companyName: string
  theme: CompanyTheme
}

export function CareersHeader({ companyName, theme }: CareersHeaderProps) {
  return (
    <header className="relative">
      {/* Banner & Header */}
      <div
        className="h-48 md:h-64 lg:h-80 w-full bg-linear-to-r from-primary/20 to-accent/20"
        style={{
          backgroundImage: theme?.banner ? `url(${theme?.banner})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 sm:w-24 sm:h-24 rounded-xl border-4 border-background bg-card flex items-center justify-center shadow-lg"
                style={{
                  backgroundImage: theme?.logo ? `url(${theme?.logo})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!theme?.logo && <Building2 className="h-10 w-10 text-muted-foreground" />}
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold" style={{ color: theme?.textColor }}>
                  {companyName}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
