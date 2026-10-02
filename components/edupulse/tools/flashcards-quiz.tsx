'use client'

import { useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const CARDS = [
  { q: 'Time complexity of binary search?', a: 'O(log n) — the search space halves every step.' },
  { q: 'What does LIFO stand for?', a: 'Last In, First Out — how a stack works.' },
  { q: 'Main advantage of a hash table?', a: 'Average O(1) insert, delete and lookup.' },
  { q: 'What property does a min-heap keep?', a: 'Every parent is ≤ its children; the root is the minimum.' },
]

const QUIZ = [
  { q: 'Which structure is best for BFS traversal?', options: ['Stack', 'Queue', 'Heap', 'Trie'], answer: 1 },
  { q: 'Worst-case lookup in an unbalanced BST?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 2 },
  { q: 'Which algorithm finds shortest paths with non-negative weights?', options: ['Kruskal', 'DFS', "Dijkstra's", 'Prim'], answer: 2 },
]

function FlipCard({ q, a }: { q: string; a: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? `Answer: ${a}. Click to show question.` : `Question: ${q}. Click to reveal answer.`}
      className="group h-40 w-full [perspective:1000px]"
    >
      <div
        className={cn(
          'preserve-3d relative size-full transition-transform duration-500',
          flipped && '[transform:rotateY(180deg)]',
        )}
      >
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-xl border bg-card p-4 text-left group-hover:border-primary/50">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Question</span>
          <p className="text-pretty font-medium">{q}</p>
          <span className="text-[11px] text-muted-foreground">Tap to flip</span>
        </div>
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-xl border border-accent/50 bg-accent/10 p-4 text-left [transform:rotateY(180deg)]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Answer</span>
          <p className="text-pretty text-sm">{a}</p>
          <span className="text-[11px] text-muted-foreground">Tap to flip back</span>
        </div>
      </div>
    </button>
  )
}

export function FlashcardsQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(QUIZ.map(() => null))
  const score = answers.filter((a, i) => a === QUIZ[i].answer).length
  const done = answers.every((a) => a !== null)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h4 className="mb-3 text-sm font-medium">Flashcards</h4>
        <div className="grid grid-cols-2 gap-3">
          {CARDS.map((c) => (
            <FlipCard key={c.q} {...c} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-medium">Practice Quiz</h4>
          <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
            {done ? `Score ${score}/${QUIZ.length}` : `${answers.filter((a) => a !== null).length}/${QUIZ.length} answered`}
          </span>
        </div>
        <ol className="flex flex-col gap-4">
          {QUIZ.map((item, qi) => {
            const picked = answers[qi]
            return (
              <li key={item.q} className="rounded-xl border bg-secondary/30 p-4">
                <p className="text-sm font-medium">
                  {qi + 1}. {item.q}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {item.options.map((opt, oi) => {
                    const isCorrect = oi === item.answer
                    const isPicked = picked === oi
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={picked !== null}
                        onClick={() => setAnswers((prev) => prev.map((p, i) => (i === qi ? oi : p)))}
                        className={cn(
                          'flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition',
                          picked === null && 'bg-background hover:border-primary/60 active:scale-[0.98]',
                          picked !== null && isCorrect && 'border-success/60 bg-success/15 text-success',
                          isPicked && !isCorrect && 'border-destructive/60 bg-destructive/15 text-destructive',
                          picked !== null && !isCorrect && !isPicked && 'opacity-50',
                        )}
                      >
                        {opt}
                        {picked !== null && isCorrect && <Check className="size-3.5" aria-hidden />}
                        {isPicked && !isCorrect && <X className="size-3.5" aria-hidden />}
                      </button>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ol>
        {done && (
          <button
            type="button"
            onClick={() => setAnswers(QUIZ.map(() => null))}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Retake quiz
          </button>
        )}
      </div>
    </div>
  )
}
