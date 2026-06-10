import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const protocolInputs = [
  { className: "intake", label: "Intake" },
  { className: "labs", label: "Lab biomarkers" },
  { className: "goals", label: "Patient goals" },
  { className: "safety", label: "Safety constraints" },
  { className: "review", label: "Clinician review" },
]

const processSteps = [
  {
    label: "Intake",
    number: "01",
    copy: "Health history, goals, medications, and contraindications.",
  },
  {
    label: "Bloodwork",
    number: "02",
    copy: "Upload recent labs or order a panel through the platform.",
  },
  {
    label: "Review",
    number: "03",
    copy: "AI-assisted recommendations are audited by a licensed provider.",
  },
  {
    label: "Ship",
    number: "04",
    copy: "Approved prescriptions are fulfilled by pharmacy partners.",
  },
]

const faqItems = [
  {
    value: "medical-service",
    question: "Is this a medical service?",
    answer:
      "Seramd is planned as a telehealth platform where licensed providers make clinical decisions.",
  },
  {
    value: "ai-prescribe",
    question: "Does AI prescribe medication?",
    answer:
      "No. AI can support protocol recommendations, but every prescription requires licensed clinician review.",
  },
  {
    value: "launch",
    question: "When does it launch?",
    answer:
      "The platform is in development. Private beta details will be announced as the clinical workflow opens.",
  },
]

type FormState = "neutral" | "success" | "warning" | "error"

function App() {
  const [note, setNote] = React.useState("Launch updates only. No spam.")
  const [formState, setFormState] = React.useState<FormState>("neutral")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleWaitlistSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get("email") || "").trim()
    const goals = String(formData.get("goals") || "").trim()

    if (!email || !form.checkValidity()) {
      setNote("Enter a valid email address.")
      setFormState("error")
      form.reportValidity()
      return
    }

    setIsSubmitting(true)
    setNote("Saving your spot...")
    setFormState("neutral")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, goals }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || "Could not save your email.")
      }

      setNote("You're on the private launch list.")
      setFormState("success")
      form.reset()
    } catch {
      setNote(
        "You're on the list locally. Start the server to save emails to the dashboard."
      )
      setFormState("warning")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main id="main" className="shell">
        <section className="hero-panel" aria-labelledby="hero-title">
          <div className="helix-rail" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
          <div className="molecule-field" aria-hidden="true">
            <span style={{ "--x": "7%", "--y": "18%", "--s": "1.18", "--d": "0s" } as React.CSSProperties} />
            <span style={{ "--x": "88%", "--y": "20%", "--s": "0.92", "--d": "1.5s" } as React.CSSProperties} />
            <span style={{ "--x": "84%", "--y": "74%", "--s": "1.34", "--d": "0.6s" } as React.CSSProperties} />
            <span style={{ "--x": "17%", "--y": "75%", "--s": "0.78", "--d": "2.1s" } as React.CSSProperties} />
          </div>

          <nav className="nav" aria-label="Primary">
            <a className="brand" href="#main" aria-label="Seramd home">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" role="img">
                  <path d="M20 4 36 32H25l-5-9-5 9H4L20 4Z" />
                  <path d="M20 13 10 32h6l4-8 4 8h6L20 13Z" />
                </svg>
              </span>
              <span>Seramd</span>
            </a>
            <Button asChild variant="outline" className="nav-cta">
              <a href="#waitlist">Waitlist</a>
            </Button>
          </nav>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Coming soon</p>
              <h1 id="hero-title">Peptide care guided by labs and physicians.</h1>
              <p className="lede">
                AI-assisted protocol recommendations, licensed clinician review, 503A
                pharmacy fulfillment, and 90-day follow-up labs in one telehealth flow.
              </p>

              <form
                id="waitlist"
                className="waitlist"
                aria-label="Join the waitlist"
                onSubmit={handleWaitlistSubmit}
              >
                <Label htmlFor="email">Join the private launch list</Label>
                <div className="input-row">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                  <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Join waitlist"}
                  </Button>
                </div>
                <Separator className="waitlist-separator" />
                <Label htmlFor="goals" className="waitlist-note-label">
                  Optional clinical context
                </Label>
                <Textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  placeholder="Recent labs, peptide interest, or what you want reviewed"
                  className="waitlist-textarea"
                />
                <p className="form-note" data-state={formState} aria-live="polite">
                  {note}
                </p>
              </form>
            </div>

            <div className="vial-stage" aria-label="Product visual preview">
              <picture>
                <source srcSet="/assets/hero-vial-lab.avif" type="image/avif" />
                <img
                  className="hero-art"
                  src="/assets/hero-vial-lab.png"
                  width="1240"
                  height="930"
                  fetchPriority="high"
                  decoding="async"
                  alt="Dark clinical dashboard showing biomarker charts, molecular graphics, and protocol review panels"
                />
              </picture>
              <div className="badge-stack">
                {["Medical Director Oversight", "GMP Pharmacy Partners", "503A Compounded"].map(
                  (label) => (
                    <Badge key={label} variant="outline">
                      {label}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="science" className="content-band">
          <div className="section-heading">
            <p className="section-note">
              Labs, intake data, safety constraints, and clinician review shape the protocol.
            </p>
            <h2>Clinical depth without the clinic friction.</h2>
          </div>
          <div className="info-grid">
            <Card className="info-card large">
              <CardContent>
                <div
                  className="protocol-graphic"
                  role="img"
                  aria-label="Intake, lab biomarkers, goals, safety constraints, and clinician review converging into an approved protocol"
                >
                  <div className="protocol-core">
                    <span>Protocol</span>
                    <strong>Approved</strong>
                  </div>
                  {protocolInputs.map((input) => (
                    <Badge
                      key={input.className}
                      variant="outline"
                      className={`protocol-node ${input.className}`}
                    >
                      {input.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardHeader className="protocol-copy">
                <p className="card-kicker">Personalization engine</p>
                <CardTitle>Personalized peptide protocols</CardTitle>
                <p>
                  The launch experience is designed around intake data, lab biomarkers,
                  safety constraints, patient goals, and physician approval.
                </p>
                <div className="signal-list" aria-label="Protocol inputs">
                  {["Lab markers", "Goals", "Contraindications"].map((signal) => (
                    <Badge key={signal} variant="secondary">
                      {signal}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
            <Card className="info-card compact-card">
              <CardHeader>
                <p className="card-kicker">Sourcing</p>
                <CardTitle>Transparent sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Built for licensed compounding pharmacy partners and documented quality
                  controls.
                </p>
              </CardContent>
            </Card>
            <Card className="info-card compact-card">
              <CardHeader>
                <p className="card-kicker">Onboarding</p>
                <CardTitle>Education-first onboarding</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Clear protocol rationale, medication guidance, and conservative claims
                  language.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="process" className="process-band">
          <div className="section-heading">
            <p className="section-note">
              A conservative path from intake through pharmacy fulfillment.
            </p>
            <h2>From labs to protocol in a guided telehealth workflow.</h2>
          </div>
          <ol className="timeline">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span>{step.label}</span>
                <strong>{step.number}</strong>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className="faq-band">
          <div className="section-heading">
            <p className="section-note">Clear boundaries for a regulated medical category.</p>
            <h2>Built for a regulated category.</h2>
          </div>
          <Accordion
            type="single"
            defaultValue="medical-service"
            collapsible
            className="faq-accordion"
          >
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="bottom-cta">
            <p className="section-note">Private beta</p>
            <h2>Reserve early access to the launch cohort.</h2>
            <Button asChild>
              <a href="#waitlist">Join the waitlist</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Seramd</span>
        <p>Coming soon. Informational only; not medical advice.</p>
      </footer>
    </>
  )
}

export default App
