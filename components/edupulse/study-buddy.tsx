'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from './app-provider'

type Msg = { role: 'user' | 'bot'; text: string }

const INITIAL: Msg[] = [
  { role: 'bot', text: "Hi Alex! I've read Data_Structures_2026.pdf. What would you like to study?" },
  { role: 'user', text: 'Explain Page 4 in simple terms' },
  {
    role: 'bot',
    text: 'Page 4 covers linked lists. Picture a treasure hunt: each clue (node) holds a prize (data) and tells you where the next clue is (pointer). You can add clues anywhere easily, but to reach clue #10 you must follow clues 1–9 first.',
  },
  { role: 'user', text: 'Generate 3 more flashcards' },
  {
    role: 'bot',
    text: '1) Q: What is a doubly linked list? — A: Each node points to both next and previous.\n2) Q: Cost to access the k-th node? — A: O(k).\n3) Q: What marks the end of a list? — A: A null (None) pointer.',
  },
]

const SUGGESTIONS = ['Quiz me on heaps', 'Summarize chapter 3', 'Make it simpler']

const CANNED: Record<string, string> = {
  'Quiz me on heaps': 'Quick one: in a max-heap, where is the largest element stored? (Hint: think about the top of the tree.)',
  'Summarize chapter 3': 'Chapter 3 introduces trees: BSTs keep left < root < right, and balancing (AVL/Red-Black) keeps lookups at O(log n).',
  'Make it simpler': 'Sure! Data structures are just different kinds of boxes for storing info — each box is good at a different job.',
}

export function StudyBuddy() {
  const { chatOpen, setChatOpen } = useApp()
  const [messages, setMessages] = useState<Msg[]>(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, chatOpen])

  const send = (text: string) => {
    const t = text.trim()
    if (!t || typing) return
    setMessages((m) => [...m, { role: 'user', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: CANNED[t] ?? `Great question about "${t}". In this demo I'm offline, but I'd pull the relevant pages from your upload and explain them step by step.`,
        },
      ])
      setTyping(false)
    }, 900)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label={chatOpen ? 'Close Study Buddy' : 'Open Study Buddy chat'}
        aria-expanded={chatOpen}
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_8px_32px_var(--glow)] transition hover:scale-105 active:scale-95"
      >
        {chatOpen ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
        {!chatOpen && <span className="absolute right-0.5 top-0.5 size-3 rounded-full border-2 border-background bg-success" aria-hidden />}
      </button>

      {chatOpen && (
        <aside
          role="dialog"
          aria-label="Study Buddy chat"
          className="glass fixed bottom-24 right-5 z-40 flex h-[min(600px,calc(100dvh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <header className="flex items-center gap-3 border-b px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Bot className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Study Buddy</p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" aria-hidden /> Context: Data_Structures_2026.pdf
              </p>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <p
                  className={cn(
                    'max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                    m.role === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border bg-card',
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 rounded-2xl rounded-bl-md border bg-card px-3.5 py-3 w-fit" aria-label="Study Buddy is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 120}ms` }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="shrink-0 rounded-full border bg-secondary/60 px-3 py-1 text-xs hover:border-primary/50"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2 border-t p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message Study Buddy
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
              }}
              placeholder="Ask about your notes…"
              className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary/60"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || typing}
              className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>
        </aside>
      )}
    </>
  )
}
