import { HeroSection } from '@/components/sections/home/HeroSection'
import { IntroSection } from '@/components/sections/home/IntroSection'
import { IndustriesOverview } from '@/components/sections/home/IndustriesOverview'
import { ClientMention } from '@/components/sections/home/ClientMention'
import { HomeCTA } from '@/components/sections/home/HomeCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <IndustriesOverview />
      <ClientMention />
      <HomeCTA />
    </>
  )
}
