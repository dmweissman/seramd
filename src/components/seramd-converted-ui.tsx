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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type WaitlistFormProps = {
  note?: string
  state?: "neutral" | "success" | "warning" | "error"
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

function WaitlistForm({
  note = "Launch updates only. No spam.",
  state = "neutral",
  onSubmit,
}: WaitlistFormProps) {
  return (
    <form
      className="w-full max-w-[600px] rounded-2xl border border-border bg-muted/70 p-4 backdrop-blur-xl"
      aria-label="Join the waitlist"
      onSubmit={onSubmit}
    >
      <Label htmlFor="email" className="font-heading text-base font-extrabold">
        Join the private launch list
      </Label>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-[1fr_auto]">
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="h-[54px] rounded-[10px] bg-background/70 px-4 text-base"
        />
        <Button className="h-[54px] min-w-[154px] rounded-[10px] bg-[linear-gradient(135deg,#e9fff9_0%,#6ef4e5_54%,#0e848d_100%)] font-heading font-extrabold text-primary-foreground shadow-[0_16px_36px_rgba(105,245,228,0.22)] hover:bg-[linear-gradient(135deg,#f5fffc_0%,#79fff0_54%,#129aa4_100%)]">
          Join waitlist
        </Button>
      </div>
      <p
        className={cn(
          "mt-2.5 min-h-[22px] text-sm text-muted-foreground",
          state === "success" && "text-primary",
          state === "warning" && "text-[#ffd88a]",
          state === "error" && "text-destructive"
        )}
        aria-live="polite"
      >
        {note}
      </p>
    </form>
  )
}

type ClinicalCardProps = {
  kicker: string
  title: string
  children: React.ReactNode
  signals?: string[]
  className?: string
}

function ClinicalCard({
  kicker,
  title,
  children,
  signals = [],
  className,
}: ClinicalCardProps) {
  return (
    <Card
      className={cn(
        "relative border-border bg-card/80 shadow-[0_18px_64px_rgba(0,0,0,0.26)] backdrop-blur-xl",
        className
      )}
    >
      <CardHeader>
        <CardDescription className="font-heading text-xs font-extrabold uppercase tracking-[0.06em] text-primary">
          {kicker}
        </CardDescription>
        <CardTitle className="font-heading text-2xl font-extrabold tracking-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        <div>{children}</div>
        {signals.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {signals.map((signal) => (
              <Badge
                key={signal}
                variant="secondary"
                className="h-[34px] border-primary/20 bg-primary/10 px-3 font-heading font-bold text-[#defdfa]"
              >
                {signal}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

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

function FaqAccordion() {
  return (
    <Accordion
      type="single"
      defaultValue="medical-service"
      collapsible
      className="mx-auto max-w-[860px] gap-3"
    >
      {faqItems.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="rounded-[14px] border border-border bg-card/70 px-5 backdrop-blur-xl"
        >
          <AccordionTrigger className="min-h-[58px] font-heading font-extrabold hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

type AdminComposerProps = {
  defaultSubject?: string
  defaultBody?: string
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

function AdminComposer({
  defaultSubject = "Seramd private beta update",
  defaultBody = "Thanks for joining the Seramd private launch list. We will send early access details as the beta opens.",
  onSubmit,
}: AdminComposerProps) {
  return (
    <Card className="border-border bg-card/90">
      <CardHeader>
        <CardTitle className="font-heading">Send email</CardTitle>
        <CardDescription>
          Choose a captured address or type any recipient.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form className="grid gap-3.5 pt-4" onSubmit={onSubmit}>
          <Label className="grid gap-2 text-muted-foreground">
            Recipient
            <Input name="email" type="email" required />
          </Label>
          <Label className="grid gap-2 text-muted-foreground">
            Subject
            <Input
              name="subject"
              type="text"
              maxLength={140}
              defaultValue={defaultSubject}
              required
            />
          </Label>
          <Label className="grid gap-2 text-muted-foreground">
            Message
            <Textarea name="body" rows={9} defaultValue={defaultBody} required />
          </Label>
          <Button>Save outgoing email</Button>
          <p className="text-sm text-muted-foreground">
            Outgoing emails are saved locally and marked queued.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export { AdminComposer, ClinicalCard, FaqAccordion, WaitlistForm }
