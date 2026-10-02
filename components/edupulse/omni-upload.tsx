'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, CircleCheck, FileText, Headphones, Layers, Network, RotateCcw, Sparkles, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ContentMap } from './tools/content-map'
import { MediaConverter } from './tools/media-converter'
import { FlashcardsQuiz } from './tools/flashcards-quiz'
import { AiSummary } from './tools/ai-summary'
import { StudyPlan } from './tools/study-plan'

const TABS = [
  { id: 'map', label: 'Content Map', icon: Network, Comp: ContentMap },
  { id: 'audio', label: 'PDF → Audio/Video', icon: Headphones, Comp: MediaConverter },
  { id: 'cards', label: 'Flashcards & Quiz', icon: Layers, Comp: FlashcardsQuiz },
  { id: 'summary', label: 'AI Summary & ELI5', icon: Sparkles, Comp: AiSummary },
  { id: 'plan', label: 'Study Plan', icon: CalendarDays, Comp: StudyPlan },
] as const

const STAGES = ['Uploading', 'Extracting text', 'Mapping topics', 'Generating study tools']

export function OmniUpload() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready'>('idle')
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState('Data_Structures_2026.pdf')
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('map')

  useEffect(() => {
    if (status !== 'processing') return
    if (progress >= 100) {
      const done = setTimeout(() => setStatus('ready'), 250)
      return () => clearTimeout(done)
    }
    const id = setTimeout(() => setProgress((p) => Math.min(100, p + 4)), 70)
    return () => clearTimeout(id)
  }, [status, progress])

  const start = (name?: string) => {
    if (status === 'processing') return
    setFileName(name ?? 'Data_Structures_2026.pdf')
    setProgress(0)
    setStatus('processing')
  }

  const ActiveComp = TABS.find((t) => t.id === tab)!.Comp
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress / 25))]

  return (
    <section id="upload" aria-labelledby="upload-title" className="scroll-mt-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Omni-Upload</p>
        <h2 id="upload-title" className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          One upload. Five ways to learn it.
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Drop any study material and EduSphere turns it into a content map, audio lesson, flashcards, summary and a study plan.
        </p>
      </div>

      <div className="relative mx-auto mt-8 max-w-3xl">
        <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-3xl [animation:float-glow_6s_ease-in-out_infinite]" aria-hidden />
        <button
          type="button"
          onClick={() => start()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            start(e.dataTransfer.files[0]?.name)
          }}
          className={cn(
            'glass gradient-border relative flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition',
            dragging ? 'scale-[1.01] border-primary' : 'border-transparent hover:border-primary/40',
          )}
          aria-describedby="upload-hint"
        >
          {status === 'idle' && (
            <>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-[0_0_40px_var(--glow)]">
                <Upload className="size-7" aria-hidden />
              </span>
              <span className="text-lg font-medium">Drop PDF, Lecture Notes, or Slides here</span>
              <span id="upload-hint" className="text-sm text-muted-foreground">
                or click to try a sample: <span className="font-mono text-foreground">Data_Structures_2026.pdf</span>
              </span>
              <span className="flex gap-2 font-mono text-[11px] text-muted-foreground">
                {['PDF', 'PPTX', 'DOCX', 'MD'].map((f) => (
                  <span key={f} className="rounded border px-1.5 py-0.5">
                    {f}
                  </span>
                ))}
              </span>
            </>
          )}
          {status !== 'idle' && (
            <div className="flex w-full max-w-md flex-col gap-3">
              <div className="flex items-center gap-3 text-left">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                  <FileText className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{fileName}</p>
                  <p className="text-xs text-muted-foreground" aria-live="polite">
                    {status === 'ready' ? '4.2 MB · 48 pages · Processed' : `${stage}…`}
                  </p>
                </div>
                {status === 'ready' ? (
                  <CircleCheck className="size-5 text-success" aria-hidden />
                ) : (
                  <span className="font-mono text-xs">{progress}%</span>
                )}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
              {status === 'ready' && (
                <span id="upload-hint" className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <RotateCcw className="size-3" aria-hidden /> Click to process again
                </span>
              )}
            </div>
          )}
        </button>
      </div>

      {status === 'ready' && (
        <div className="gradient-border mt-10 rounded-2xl bg-card p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 md:p-6">
          <div role="tablist" aria-label="Processing tools" className="flex gap-1 overflow-x-auto rounded-xl border bg-secondary/40 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                role="tab"
                type="button"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setTab(id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                  tab === id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className={cn('size-4', tab === id && 'text-primary')} aria-hidden />
                {label}
              </button>
            ))}
          </div>
          <div key={tab} id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6 animate-in fade-in duration-300">
            <ActiveComp />
          </div>
        </div>
      )}
    </section>
  )
}
