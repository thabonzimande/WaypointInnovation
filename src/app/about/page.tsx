import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { ApproachSection } from '@/components/sections/about/ApproachSection'
import { HomeCTA } from '@/components/sections/home/HomeCTA'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Waypoint Innovation — who we are and how we approach fabrication, mechanical design and prototype development.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ApproachSection />
      <HomeCTA />
    </>
  )
}
