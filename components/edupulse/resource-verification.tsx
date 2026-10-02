'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Bot, ChevronDown, CircleAlert, CircleCheck, CircleX, ExternalLink, Info, ShieldCheck, Users, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  COMMUNITY_VERIFIED_THRESHOLD,
  summarize,
  type ClaimStatus,
  type Confidence,
  type VerificationReport,
} from '@/lib/verification-data'

function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto w-[min(640px,calc(100vw-2rem))] rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95"
    >
      <div className="relative max-h-[85vh] overflow-y-auto p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  )
}

const STATUS_META: Record<ClaimStatus, { label: string; icon: typeof CircleCheck; className: string }> = {
  supported: { label: 'Supported', icon: CircleCheck, className: 'border-success/40 bg-success/15 text-success' },
  review: { label: 'Needs review', icon: CircleAlert, className: 'border-warning/40 bg-warning/15 text-warning' },
  contradiction: { label: 'Potential contradiction', icon: CircleX, className: 'border-destructive/40 bg-destructive/15 text-destructive' },
}

const CONFIDENCE_CLASS: Record<Confidence, string> = {
  High: 'text-success',
  Medium: 'text-warning',
  Low: 'text-destructive',
}

function Stat({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border bg-secondary/40 p-3">
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={cn('font-mono text-xl font-semibold', className)}>{value}</dd>
    </div>
  )
}

export function AiVerificationDialog({
  open,
  onClose,
  title,
  report,
}: {
  open: boolean
  onClose: () => void
  title: string
  report: VerificationReport
}) {
  const titleId = useId()
  const [showEvidence, setShowEvidence] = useState(false)
  const stats = summarize(report)
  const sourceById = new Map(report.sources.map((s) => [s.id, s]))

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="flex items-start gap-3 pr-10">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Bot className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id={titleId} className="text-lg font-semibold">
            AI Verification Report
          </h2>
          <p className="text-pretty text-sm text-muted-foreground">{title}</p>
        </div>
      </div>

      <p className="mt-4 flex gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs leading-relaxed text-foreground/90">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <span>
          This is <strong>AI-assisted verification</strong>, not proof of accuracy. The AI compared extracted claims against the
          reference sources below and can make mistakes. Use it to find evidence and potential issues, then check the sources
          yourself.
        </span>
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Claims analyzed" value={stats.analyzed} />
        <Stat label="Supported" value={stats.supported} className="text-success" />
        <Stat label="Needs review" value={stats.review} className={stats.review ? 'text-warning' : undefined} />
        <Stat
          label="Potential contradictions"
          value={stats.contradictions}
          className={stats.contradictions ? 'text-destructive' : undefined}
        />
        <Stat label="AI confidence" value={report.confidence} className={CONFIDENCE_CLASS[report.confidence]} />
        <Stat label="Last checked" value={<span className="text-sm">{report.lastChecked}</span>} />
      </dl>

      <div className="mt-5">
        <h3 className="text-sm font-medium">Reference sources ({report.sources.length})</h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {report.sources.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/src flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-secondary"
              >
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{s.kind}</span>
                <span className="flex-1 text-pretty">{s.name}</span>
                <ExternalLink className="size-3.5 text-muted-foreground group-hover/src:text-foreground" aria-hidden />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        aria-expanded={showEvidence}
        onClick={() => setShowEvidence((v) => !v)}
        className="mt-5 inline-flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:border-primary/50"
      >
        {showEvidence ? 'Hide evidence' : 'View evidence'} for each claim
        <ChevronDown className={cn('size-4 transition-transform', showEvidence && 'rotate-180')} aria-hidden />
      </button>

      {showEvidence ? (
        <ol className="mt-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {report.claims.map((c, i) => {
            const meta = STATUS_META[c.status]
            const Icon = meta.icon
            return (
              <li key={i} className="rounded-xl border bg-secondary/30 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="flex-1 text-pretty text-sm font-medium">{`"${c.claim}"`}</p>
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                      meta.className,
                    )}
                  >
                    <Icon className="size-3" aria-hidden /> {meta.label}
                  </span>
                </div>
                <p className="mt-1.5 text-pretty text-xs text-muted-foreground">{c.note}</p>
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-muted-foreground">
                    {c.status === 'supported' ? 'Supported by:' : 'Checked against:'}
                  </span>
                  {c.sourceIds.map((id) => {
                    const s = sourceById.get(id)
                    if (!s) return null
                    return (
                      <a
                        key={id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border bg-background px-1.5 py-0.5 text-foreground/80 transition hover:border-primary/50 hover:text-foreground"
                      >
                        {s.name}
                      </a>
                    )
                  })}
                </p>
              </li>
            )
          })}
        </ol>
      ) : null}
    </Modal>
  )
}

const REVIEW_CHECKS = [
  { id: 'accuracy', label: 'I checked the content for factual accuracy' },
  { id: 'sources', label: 'I cross-checked key claims with my own sources' },
  { id: 'current', label: 'The material is current for today’s curriculum' },
] as const

export function CommunityVerifyDialog({
  open,
  onClose,
  title,
  reviews,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  title: string
  reviews: number
  onSubmit: () => void
}) {
  const titleId = useId()
  const [checked, setChecked] = useState<string[]>([])
  const [note, setNote] = useState('')
  const canSubmit = checked.includes('accuracy') && checked.includes('sources')

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="flex items-start gap-3 pr-10">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
          <Users className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id={titleId} className="text-lg font-semibold">
            Verify Resource
          </h2>
          <p className="text-pretty text-sm text-muted-foreground">{title}</p>
        </div>
      </div>

      <p className="mt-4 text-pretty text-sm text-muted-foreground">
        Community verification is a <strong className="text-foreground">human review</strong>, separate from the AI check.
        Please review this resource yourself. Don&apos;t rely on the AI report. {reviews} of {COMMUNITY_VERIFIED_THRESHOLD}{' '}
        independent reviews are needed for the Community Verified badge.
      </p>

      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (!canSubmit) return
          onSubmit()
          setChecked([])
          setNote('')
          onClose()
        }}
      >
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Review checklist</legend>
          {REVIEW_CHECKS.map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition has-[:checked]:border-success/50 has-[:checked]:bg-success/10"
            >
              <input
                type="checkbox"
                checked={checked.includes(c.id)}
                onChange={(e) =>
                  setChecked((prev) => (e.target.checked ? [...prev, c.id] : prev.filter((x) => x !== c.id)))
                }
                className="size-4 accent-[var(--success)]"
              />
              {c.label}
            </label>
          ))}
        </fieldset>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Reviewer notes <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="E.g. Section 3 needs an updated example."
            className="resize-none rounded-xl border bg-background px-3 py-2 text-sm font-normal outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </label>

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="h-9 rounded-lg px-4 text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-success px-4 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShieldCheck className="size-4" aria-hidden /> Submit review
          </button>
        </div>
      </form>
    </Modal>
  )
}
