'use client'

import { useState } from 'react'
import { Baby, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUMMARY = {
  standard: [
    'Data structures trade memory for speed: arrays give O(1) access, linked lists give O(1) insertion, and hash tables average O(1) lookup.',
    'Balanced trees (AVL, Red-Black) and heaps guarantee O(log n) operations, powering databases, schedulers and priority queues.',
    'Graph algorithms — BFS, DFS, Dijkstra and MST — model real networks such as maps, social graphs and dependency chains.',
  ],
  eli5: [
    'Storing data is like organizing toys: a shelf (array) lets you grab any toy fast, a toy train (linked list) makes adding cars easy.',
    'A tree is like a family tree — you find someone quickly by going down the right branch instead of checking everyone.',
    'A graph is like a map of friends’ houses with roads between them. Algorithms find the shortest way to visit a friend.',
  ],
}

export function AiSummary() {
  const [eli5, setEli5] = useState(false)
  const points = eli5 ? SUMMARY.eli5 : SUMMARY.standard

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-sm font-medium">Executive Summary</h4>
        <button
          type="button"
          role="switch"
          aria-checked={eli5}
          onClick={() => setEli5((v) => !v)}
          className="flex items-center gap-2.5 rounded-full border bg-secondary/50 py-1 pl-3 pr-1 text-sm"
        >
          <span className={cn('flex items-center gap-1.5 transition', eli5 ? 'text-accent' : 'text-muted-foreground')}>
            {eli5 ? <Baby className="size-4" aria-hidden /> : <GraduationCap className="size-4" aria-hidden />}
            Explain Like I&apos;m 5
          </span>
          <span className={cn('relative h-6 w-11 rounded-full transition', eli5 ? 'bg-accent' : 'bg-muted')}>
            <span
              className={cn(
                'absolute top-0.5 size-5 rounded-full bg-background shadow transition-all',
                eli5 ? 'left-[22px]' : 'left-0.5',
              )}
            />
          </span>
        </button>
      </div>
      <ol key={String(eli5)} className="mt-4 flex flex-col gap-3" aria-live="polite">
        {points.map((p, i) => (
          <li
            key={p}
            className="flex gap-3 rounded-xl border bg-secondary/30 p-4 animate-in fade-in slide-in-from-left-2 fill-mode-both"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold',
                eli5 ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary',
              )}
            >
              {i + 1}
            </span>
            <p className="text-pretty text-sm leading-relaxed">{p}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
