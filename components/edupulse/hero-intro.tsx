import { ArrowRight, Globe, ShieldCheck, Users } from 'lucide-react'

const METRICS = [
  { icon: Users, value: '2.4M', label: 'Learners' },
  { icon: Globe, value: '38', label: 'Languages' },
  { icon: ShieldCheck, value: '184K', label: 'Peer verifications' },
]

export function HeroIntro() {
  return (
    <section id="top" className="relative pt-12 text-center md:pt-20">
      <a
        href="#upload"
        className="group mx-auto inline-flex items-center gap-2 rounded-full border bg-secondary/50 py-1 pl-1 pr-3 text-xs text-muted-foreground transition hover:text-foreground"
      >
        <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">New</span>
        PDF → Audio & Video converter is live
        <ArrowRight className="size-3 transition group-hover:translate-x-0.5" aria-hidden />
      </a>
      <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
        Quality education, built{' '}
        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">by everyone</span>
        , for everyone.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground md:text-lg">
        EduSphere is an open, community-driven learning platform for SDG 4. Share notes, turn them into study tools instantly, and keep
        knowledge fresh with peer fact-checking.
      </p>
      <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-6">
        {METRICS.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="size-4 text-accent" aria-hidden />
            <span className="font-mono font-semibold">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
