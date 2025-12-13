export interface CompanyTheme {
  logo: string | null
  banner: string | null
  primaryColor: string
  secondaryColor: string
  textColor: string
  cultureVideoUrl: string
}

export interface PageSection {
  id: string
  type: "about" | "mission" | "life" | "values" | "custom"
  title: string
  content: string
  images?: string[]
  order: number
  visible: boolean
}

export interface Job {
  id: string
  title: string
  location: string
  type: "full-time" | "part-time" | "remote" | "contract"
  department: string
  description: string
  requirements: string[]
  postedDate: string
}

export interface CompanyData {
  slug: string
  name: string
  theme: CompanyTheme
  sections: PageSection[]
  jobs: Job[]
  isPublished: boolean
}
