'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { FilterKey } from '@/lib/edupulse-data'

type Filters = Record<FilterKey, string>

type AppState = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  skill: string
  setSkill: (skill: string) => void
  profileOpen: boolean
  setProfileOpen: (open: boolean) => void
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  query: string
  setQuery: (q: string) => void
  filters: Filters
  setFilter: (key: FilterKey, value: string) => void
  saved: string[]
  toggleSaved: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [skill, setSkill] = useState('AI & Full-Stack Engineering')
  const [profileOpen, setProfileOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    subject: 'All',
    type: 'All',
    language: 'All',
    freshness: 'All',
  })
  const [saved, setSaved] = useState<string[]>(['r1', 'r3'])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  const setFilter = useCallback((key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      skill,
      setSkill,
      profileOpen,
      setProfileOpen,
      chatOpen,
      setChatOpen,
      query,
      setQuery,
      filters,
      setFilter,
      saved,
      toggleSaved,
    }),
    [theme, toggleTheme, skill, profileOpen, chatOpen, query, filters, setFilter, saved, toggleSaved],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
