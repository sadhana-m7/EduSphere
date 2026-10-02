'use client'

import { useEffect, useState } from 'react'
import { Headphones, Pause, Play, RotateCcw, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

const DURATION = 272
const BARS = Array.from({ length: 56 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 0.75)
const SLIDES = [
  { t: 0, title: 'What is a Data Structure?', body: 'A way of organizing data so operations are efficient.' },
  { t: 60, title: 'Arrays vs Linked Lists', body: 'O(1) random access vs O(1) insertion at the head.' },
  { t: 130, title: 'Trees & Heaps', body: 'Hierarchies that keep search and priority operations fast.' },
  { t: 200, title: 'Graphs', body: 'Nodes and edges — modelling networks, maps and dependencies.' },
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export function MediaConverter() {
  const [mode, setMode] = useState<'audio' | 'video'>('audio')
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setTime((t) => {
        const next = t + 0.25 * speed
        if (next >= DURATION) {
          setPlaying(false)
          return DURATION
        }
        return next
      })
    }, 250)
    return () => clearInterval(id)
  }, [playing, speed])

  const progress = time / DURATION
  const slide = [...SLIDES].reverse().find((s) => time >= s.t) ?? SLIDES[0]

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Output format" className="inline-flex self-start rounded-lg border bg-secondary/50 p-1">
        {(
          [
            ['audio', 'Audio Podcast', Headphones],
            ['video', 'Video Explainer', Video],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition',
              mode === key ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden /> {label}
          </button>
        ))}
      </div>

      {mode === 'video' && (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br from-primary/25 via-card to-accent/20 p-8">
          <div key={slide.title} className="max-w-md text-center animate-in fade-in zoom-in-95 duration-500">
            <p className="font-mono text-xs text-accent">Slide {SLIDES.indexOf(slide) + 1} / {SLIDES.length}</p>
            <p className="mt-2 text-balance text-2xl font-semibold">{slide.title}</p>
            <p className="mt-2 text-pretty text-muted-foreground">{slide.body}</p>
          </div>
          <span className="absolute bottom-3 left-3 rounded bg-background/70 px-2 py-0.5 font-mono text-[11px]">CC · AI Narrator</span>
        </div>
      )}

      <div className="rounded-xl border bg-secondary/30 p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (time >= DURATION) setTime(0)
              setPlaying((p) => !p)
            }}
            aria-label={playing ? 'Pause' : 'Play'}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_var(--glow)] transition hover:scale-105 active:scale-95"
          >
            {playing ? <Pause className="size-5" aria-hidden /> : <Play className="ml-0.5 size-5" aria-hidden />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Data_Structures_2026 — Narrated Summary</p>
            <p className="text-xs text-muted-foreground">AI voice · English · 12 chapters</p>
          </div>
          <button
            type="button"
            onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
            className="rounded-md border bg-background px-2 py-1 font-mono text-xs"
            aria-label={`Playback speed ${speed}x`}
          >
            {speed}x
          </button>
          <button
            type="button"
            onClick={() => {
              setTime(0)
              setPlaying(false)
            }}
            aria-label="Restart"
            className="flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          aria-label="Seek"
          className="mt-4 flex h-14 w-full items-center gap-[3px]"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setTime(((e.clientX - rect.left) / rect.width) * DURATION)
          }}
        >
          {BARS.map((h, i) => {
            const played = i / BARS.length < progress
            return (
              <span
                key={i}
                className={cn('flex-1 rounded-full transition-colors', played ? 'bg-primary' : 'bg-muted-foreground/30', playing && 'wave-bar')}
                style={{ height: `${h * 100}%`, animationDelay: `${(i % 8) * 90}ms` }}
              />
            )
          })}
        </button>
        <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>{fmt(time)}</span>
          <span>{fmt(DURATION)}</span>
        </div>
      </div>
    </div>
  )
}
