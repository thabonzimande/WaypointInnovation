import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactDetails } from '@/components/sections/contact/ContactDetails'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Waypoint Innovation to discuss your fabrication or engineering project.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
    </>
  )
}
