import Link from "next/link"
import { Building2, Palette, Layout, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Custom Branding",
      description: "Upload your logo, set your colors, and make the page truly yours.",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Drag & Drop Builder",
      description: "Easily arrange sections with our intuitive editor.",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Job Listings",
      description: "Showcase open positions with filters and detailed job pages.",
    },
  ]

  const benefits = [
    "No coding required",
    "Mobile responsive",
    "SEO optimized",
    "Analytics included",
    "Custom domains",
    "Unlimited jobs",
  ]

  return (
    <main id="main-content" className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/whitecarrot-careers-logo.png" alt="whitecarrot-careers-logo" width={32} height={32} className="h-8 w-8 text-primary-foreground" />
            <span className="font-bold text-lg">Whitecarrot Careers</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/techcorp/careers">
              <Button variant="ghost">Demo</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-linear-to-b from-muted/50 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Build Beautiful
            <span className="text-primary"> Career Pages</span>
            <br />
            in Minutes
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Create stunning, customizable career pages that showcase your company culture and attract top talent. No
            design skills required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="text-base px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/techcorp/careers">
              <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need</h2>
            <p className="mt-4 text-lg text-muted-foreground">Powerful tools to create the perfect careers page</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Hire faster with a professional careers page</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Stand out from the competition and attract qualified candidates with a careers page that reflects your
                brand and culture.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 p-8">
                <div className="w-full h-full rounded-xl bg-card shadow-xl border border-border overflow-hidden">
                  <div className="h-8 bg-muted/50 flex items-center gap-2 px-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-16 rounded bg-muted/50" />
                    <div className="h-4 w-3/4 rounded bg-muted/50" />
                    <div className="h-4 w-1/2 rounded bg-muted/50" />
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <div className="h-20 rounded bg-muted/50" />
                      <div className="h-20 rounded bg-muted/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to attract top talent?</h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Join hundreds of companies already using Whitecarrot Careers to build their employer brand.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="mt-8 text-base px-8">
              Start Hiring Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Whitecarrot Careers. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
