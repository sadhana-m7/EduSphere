import { AppProvider } from '@/components/edupulse/app-provider'
import { SiteHeader } from '@/components/edupulse/site-header'
import { HeroIntro } from '@/components/edupulse/hero-intro'
import { OmniUpload } from '@/components/edupulse/omni-upload'
import { CareerOnboarding } from '@/components/edupulse/career-onboarding'
import { ResourceLibrary } from '@/components/edupulse/resource-library'
import { Leaderboard } from '@/components/edupulse/leaderboard'
import { ProfileDashboard } from '@/components/edupulse/profile-dashboard'
import { StudyBuddy } from '@/components/edupulse/study-buddy'

export default function Page() {
  return (
    <AppProvider>
      <div className="relative min-h-dvh overflow-x-clip">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[720px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
        <SiteHeader />
        <main className="relative mx-auto flex max-w-7xl flex-col gap-24 px-4 pb-32 md:px-6">
          <HeroIntro />
          <OmniUpload />
          <CareerOnboarding />
          <ResourceLibrary />
          <Leaderboard />
        </main>
        <footer className="relative border-t py-8 text-center text-sm text-muted-foreground">
          EduSphere · Open education for SDG 4 · Content licensed CC BY-SA 4.0
        </footer>
        <ProfileDashboard />
        <StudyBuddy />
      </div>
    </AppProvider>
  )
}
