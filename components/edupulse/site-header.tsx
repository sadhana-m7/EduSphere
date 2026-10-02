'use client'

import { useState } from 'react'
import { BadgeCheck, Check, ChevronDown, Moon, Search, Sun, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FILTER_OPTIONS, type FilterKey } from '@/lib/edupulse-data'
import { useApp } from './app-provider'

const FILTER_LABELS: Record<FilterKey, string> = {
  subject: 'Subject',
  type: 'Resource Type',
  language: 'Language',
  freshness: 'Freshness',
}

function FilterPill({ filterKey }: { filterKey: FilterKey }) {
  const { filters, setFilter } = useApp()
  const [open, setOpen] = useState(false)
  const value = filters[filterKey]
  const active = value !== 'All'

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex h-7 items-center gap-1 rounded-full border px-3 text-xs font-medium transition-colors',
          active
            ? 'border-primary/50 bg-primary/15 text-primary'
            : 'border-border bg-secondary/60 text-muted-foreground hover:text-foreground',
        )}
      >
        {active ? value : FILTER_LABELS[filterKey]}
        <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close filter menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label={FILTER_LABELS[filterKey]}
            className="glass absolute left-0 top-9 z-50 min-w-44 rounded-xl border p-1 shadow-2xl animate-in fade-in zoom-in-95"
          >
            {FILTER_OPTIONS[filterKey].map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  onClick={() => {
                    setFilter(filterKey, opt)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-left text-sm hover:bg-secondary"
                >
                  {opt}
                  {value === opt && <Check className="size-3.5 text-primary" aria-hidden />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export function SiteHeader() {
  const { theme, toggleTheme, setProfileOpen, query, setQuery } = useApp()

  return (
    <header className="glass sticky top-0 z-30 border-b">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_24px_var(--glow)]">
              <Zap className="size-4" aria-hidden />
            </span>
            <span className="text-lg font-semibold tracking-tight">EduSphere</span>
          </a>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative mx-auto hidden w-full max-w-md md:block"
          >
            <label htmlFor="global-search" className="sr-only">
              Search resources
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="global-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, slides, authors…"
              className="h-9 w-full rounded-lg border bg-secondary/60 pl-9 pr-12 text-sm outline-none transition focus:border-primary/60 focus:ring-3 focus:ring-primary/20"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
              ↵
            </kbd>
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex size-9 items-center justify-center rounded-lg border bg-secondary/60 text-muted-foreground transition hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
            </button>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="group flex items-center gap-2.5 rounded-xl border bg-secondary/60 py-1 pl-1 pr-3 text-left transition hover:border-primary/50"
              aria-label="Open profile dashboard for Alex Rivera"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
                AR
              </span>
              <span className="hidden flex-col leading-tight lg:flex">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  Alex Rivera
                  <span className="font-mono text-[11px] text-accent">1,450 PTS</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  Level 4 Contributor ·
                  <BadgeCheck className="size-3 text-warning" aria-hidden />
                  <span className="text-warning">Master Fact-Checker</span>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 md:justify-center">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative shrink-0 md:hidden">
            <label htmlFor="mobile-search" className="sr-only">
              Search resources
            </label>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="mobile-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-7 w-32 rounded-full border bg-secondary/60 pl-8 pr-3 text-xs outline-none focus:border-primary/60"
            />
          </form>
          {(Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => (
            <FilterPill key={key} filterKey={key} />
          ))}
        </div>
      </div>
    </header>
  )
}
