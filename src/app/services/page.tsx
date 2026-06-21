import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { IndustryTabs } from '@/components/sections/services/IndustryTabs'
import { HomeCTA } from '@/components/sections/home/HomeCTA'

export const metadata: Metadata = {
  title: 'Services & Industries',
  description:
    'Fabrication, mechanical design and prototype development across automotive, industrial and agricultural sectors.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <IndustryTabs />
      <HomeCTA />
    </>
  )
}
