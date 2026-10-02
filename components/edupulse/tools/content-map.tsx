'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const TREE = [
  { topic: 'Linear Structures', color: 'var(--chart-1)', subs: ['Arrays & Dynamic Arrays', 'Linked Lists', 'Stacks & Queues'] },
  { topic: 'Trees', color: 'var(--chart-2)', subs: ['Binary Search Trees', 'AVL & Red-Black', 'Heaps & Priority Queues'] },
  { topic: 'Graphs', color: 'var(--chart-3)', subs: ['BFS & DFS', "Dijkstra's Algorithm", 'Minimum Spanning Trees'] },
  { topic: 'Hashing', color: 'var(--chart-4)', subs: ['Hash Functions', 'Collision Resolution', 'Load Factor & Rehashing'] },
]

export function ContentMap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div>
      <div className="flex justify-center">
        <div className="rounded-xl border border-primary/50 bg-primary/15 px-5 py-2.5 text-center shadow-[0_0_24px_var(--glow)]">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Root</p>
          <p className="font-semibold">Data Structures 2026</p>
        </div>
      </div>
      <div className="mx-auto h-6 w-px bg-border" aria-hidden />
      <div className="mx-auto hidden h-px w-3/4 bg-border md:block" aria-hidden />
      <ul className="grid gap-4 md:grid-cols-4">
        {TREE.map((node, i) => {
          const dim = active && active !== node.topic
          return (
            <li
              key={node.topic}
              className={cn(
                'flex flex-col items-center transition-opacity animate-in fade-in slide-in-from-top-2 fill-mode-both',
                dim && 'opacity-40',
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="hidden h-5 w-px bg-border md:block" aria-hidden />
              <button
                type="button"
                onMouseEnter={() => setActive(node.topic)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.topic)}
                onBlur={() => setActive(null)}
                className="w-full rounded-lg border bg-card px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5"
                style={{ borderColor: `color-mix(in oklch, ${node.color} 60%, transparent)` }}
              >
                <span className="mr-2 inline-block size-2 rounded-full" style={{ background: node.color }} aria-hidden />
                {node.topic}
              </button>
              <ul className="mt-2 flex w-full flex-col gap-1.5 border-l pl-3" style={{ borderColor: node.color }}>
                {node.subs.map((s) => (
                  <li key={s} className="rounded-md bg-secondary/60 px-2.5 py-1.5 text-xs text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
