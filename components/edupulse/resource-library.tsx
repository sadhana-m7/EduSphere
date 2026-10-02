'use client'

import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  Bot,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Check,
  Download,
  GraduationCap,
  Languages,
  School,
  ShieldCheck,
  ThumbsUp,
  TriangleAlert,
  Users,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { RESOURCES, type Resource } from '@/lib/edupulse-data'
import { COMMUNITY_VERIFIED_THRESHOLD, VERIFICATION_REPORTS } from '@/lib/verification-data'
import { useApp } from './app-provider'
import { AiVerificationDialog, CommunityVerifyDialog } from './resource-verification'

function TrustSignals({ upvotes, reviews }: { upvotes: number; reviews: number }) {
  const communityVerified = reviews >= COMMUNITY_VERIFIED_THRESHOLD
  return (
    <dl className="grid grid-cols-3 divide-x rounded-xl border text-center">
      <div className="flex flex-col items-center gap-0.5 px-1 py-2" title="Popularity and usefulness, not accuracy">
        <dt className="order-2 text-[10px] leading-tight text-muted-foreground">Upvotes · popularity</dt>
        <dd className="flex items-center gap-1 font-mono text-xs font-medium">
          <ThumbsUp className="size-3 text-primary" aria-hidden /> {upvotes.toLocaleString()}
        </dd>
      </div>
      <div className="flex flex-col items-center gap-0.5 px-1 py-2" title="Analyzed by AI against reference sources">
        <dt className="order-2 text-[10px] leading-tight text-muted-foreground">AI analysis</dt>
        <dd className="flex items-center gap-1 text-xs font-medium text-primary">
          <Bot className="size-3" aria-hidden /> AI Checked
        </dd>
      </div>
      <div className="flex flex-col items-center gap-0.5 px-1 py-2" title="Independently reviewed by community members">
        <dt className="order-2 text-[10px] leading-tight text-muted-foreground">
          {reviews} human review{reviews === 1 ? '' : 's'}
        </dt>
        <dd
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            communityVerified ? 'text-success' : 'text-muted-foreground',
          )}
        >
          {communityVerified ? (
            <>
              <ShieldCheck className="size-3" aria-hidden /> Community Verified
            </>
          ) : (
            <>
              <Users className="size-3" aria-hidden /> {reviews}/{COMMUNITY_VERIFIED_THRESHOLD} reviews
            </>
          )}
        </dd>
      </div>
    </dl>
  )
}

function FreshnessBadge({ r }: { r: Resource }) {
  if (r.outdatedNote) {
    const severe = r.freshness < 50
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
          severe ? 'border-destructive/40 bg-destructive/15 text-destructive' : 'border-warning/40 bg-warning/15 text-warning',
        )}
      >
        <TriangleAlert className="size-3" aria-hidden />
        Outdated Alert: {r.outdatedNote}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
      <span className="size-1.5 rounded-full bg-success" aria-hidden />
      {r.freshness}% Fresh
    </span>
  )
}

function ResourceCard({ r, mode }: { r: Resource; mode: 'student' | 'faculty' }) {
  const { saved, toggleSaved } = useApp()
  const [votes, setVotes] = useState(r.upvotes)
  const [voted, setVoted] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [endorsed, setEndorsed] = useState(false)
  const report = VERIFICATION_REPORTS[r.id]
  const [reviews, setReviews] = useState(report?.communityReviews ?? 0)
  const [reviewed, setReviewed] = useState(false)
  const [dialog, setDialog] = useState<'ai' | 'community' | null>(null)
  const isSaved = saved.includes(r.id)

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_var(--glow)]">
      <div className="flex flex-wrap items-center gap-2">
        <FreshnessBadge r={r} />
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
          <Languages className="size-3" aria-hidden /> {r.language}
        </span>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
          {r.subject} · {r.type}
        </p>
        <h3 className="mt-1 text-pretty font-semibold leading-snug">{r.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          by {r.author} · updated {r.updated}
        </p>
      </div>

      <div key={mode} className="rounded-xl bg-secondary/50 p-3 text-sm animate-in fade-in duration-300">
        {mode === 'student' ? (
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 text-pretty">
              <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {r.studentNote}
            </p>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="size-3.5 text-warning" aria-hidden /> {r.practiceCount} quick-practice questions
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Curriculum alignment</span>
              <span className="font-mono font-medium">{r.curriculumAlignment}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full', r.curriculumAlignment >= 80 ? 'bg-success' : 'bg-warning')}
                style={{ width: `${r.curriculumAlignment}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono">{r.standard}</span>
              <span>{r.endorsements + (endorsed ? 1 : 0)} faculty endorsements</span>
            </div>
          </div>
        )}
      </div>

      <TrustSignals upvotes={votes} reviews={reviews} />

      {report ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDialog('ai')}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 text-xs font-medium text-primary transition hover:bg-primary/20 active:scale-95"
          >
            <Bot className="size-3.5" aria-hidden /> AI Verification
          </button>
          <button
            type="button"
            onClick={() => setDialog('community')}
            disabled={reviewed}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition active:scale-95',
              reviewed ? 'border-success/50 bg-success/15 text-success' : 'hover:border-success/50 hover:text-success',
            )}
          >
            <ShieldCheck className="size-3.5" aria-hidden /> {reviewed ? 'You verified this' : 'Verify Resource'}
          </button>
        </div>
      ) : null}

      {report ? (
        <>
          <AiVerificationDialog open={dialog === 'ai'} onClose={() => setDialog(null)} title={r.title} report={report} />
          <CommunityVerifyDialog
            open={dialog === 'community'}
            onClose={() => setDialog(null)}
            title={r.title}
            reviews={reviews}
            onSubmit={() => {
              setReviews((n) => n + 1)
              setReviewed(true)
            }}
          />
        </>
      ) : null}

      <div className="mt-auto flex items-center gap-2">
        <button
          type="button"
          aria-pressed={voted}
          aria-label={`Upvote, ${votes} votes`}
          onClick={() => {
            setVotes((v) => (voted ? v - 1 : v + 1))
            setVoted((v) => !v)
          }}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 font-mono text-xs transition active:scale-95',
            voted ? 'border-primary/60 bg-primary/15 text-primary' : 'hover:border-primary/50',
          )}
        >
          <ThumbsUp className={cn('size-3.5 transition-transform', voted && '-rotate-12 scale-110')} aria-hidden />
          {votes.toLocaleString()}
        </button>

        {mode === 'faculty' ? (
          <button
            type="button"
            aria-pressed={endorsed}
            onClick={() => setEndorsed((e) => !e)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition active:scale-95',
              endorsed ? 'border-success/60 bg-success/15 text-success' : 'hover:border-success/50',
            )}
          >
            <BadgeCheck className="size-3.5" aria-hidden />
            {endorsed ? 'Endorsed' : 'Endorse'}
          </button>
        ) : null}

        <div className="ml-auto flex gap-1.5">
          <button
            type="button"
            aria-pressed={isSaved}
            aria-label={isSaved ? 'Remove from saved' : 'Save resource'}
            onClick={() => toggleSaved(r.id)}
            className={cn(
              'flex size-8 items-center justify-center rounded-lg border transition active:scale-95',
              isSaved ? 'border-accent/60 bg-accent/15 text-accent' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {isSaved ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
          </button>
          <button
            type="button"
            aria-label={downloaded ? 'Available offline' : 'Download for offline'}
            onClick={() => setDownloaded(true)}
            className={cn(
              'flex size-8 items-center justify-center rounded-lg border transition active:scale-95',
              downloaded ? 'border-success/60 bg-success/15 text-success' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {downloaded ? <Check className="size-4" aria-hidden /> : <Download className="size-4" aria-hidden />}
          </button>
        </div>
      </div>
    </article>
  )
}

export function ResourceLibrary() {
  const { query, filters, setFilter, setQuery } = useApp()
  const [mode, setMode] = useState<'student' | 'faculty'>('student')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RESOURCES.filter((r) => {
      if (q && !`${r.title} ${r.author} ${r.subject}`.toLowerCase().includes(q)) return false
      if (filters.subject !== 'All' && r.subject !== filters.subject) return false
      if (filters.type !== 'All' && r.type !== filters.type) return false
      if (filters.language !== 'All' && r.language !== filters.language) return false
      if (filters.freshness === 'Fresh (90%+)' && (r.freshness < 90 || r.outdatedNote)) return false
      if (filters.freshness === 'Needs Review' && !(r.outdatedNote && r.freshness >= 50)) return false
      if (filters.freshness === 'Outdated' && !(r.outdatedNote && r.freshness < 50)) return false
      return true
    })
  }, [query, filters])

  const hasFilters = query || Object.values(filters).some((v) => v !== 'All')

  return (
    <section id="library" aria-labelledby="library-title" className="scroll-mt-32">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Community Library</p>
          <h2 id="library-title" className="mt-2 text-3xl font-semibold tracking-tight">
            Open resources, verified by peers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {results.length} of {RESOURCES.length} resources
            {hasFilters && (
              <>
                {' · '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    setQuery('')
                    ;(['subject', 'type', 'language', 'freshness'] as const).forEach((k) => setFilter(k, 'All'))
                  }}
                >
                  Clear filters
                </button>
              </>
            )}
          </p>
        </div>
        <div role="radiogroup" aria-label="View mode" className="relative inline-flex self-start rounded-xl border bg-secondary/50 p-1 md:self-auto">
          <span
            className={cn(
              'absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-background shadow-sm transition-all duration-300',
              mode === 'student' ? 'left-1' : 'left-1/2',
            )}
            aria-hidden
          />
          {(
            [
              ['student', 'Student Mode', GraduationCap],
              ['faculty', 'Faculty Mode', School],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={mode === key}
              onClick={() => setMode(key)}
              className={cn(
                'relative inline-flex w-36 items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium transition',
                mode === key ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              <Icon className={cn('size-4', mode === key && 'text-primary')} aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No resources match your search. Try a different filter.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <ResourceCard key={r.id} r={r} mode={mode} />
          ))}
        </div>
      )}
    </section>
  )
}
