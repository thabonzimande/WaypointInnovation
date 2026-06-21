export const SITE_NAME = 'Waypoint Innovation'
export const SITE_URL = 'https://waypointinnovation.co.za'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const INDUSTRIES = [
  {
    id: 'automotive',
    label: 'Automotive',
    number: '01',
    descriptor: 'Fabrication, jigs, fixtures and custom modifications.',
    copy: `We do fabrication, conceptual mechanical design and prototype development for automotive components, jigs, fixtures and test equipment. We also handle custom modifications and upgrades to vehicles, and work with manufacturers and accessory brands — including packaging design for RSI Smartcap Canopies and project work with Mercedes Benz.`,
    draftPending: true,
  },
  {
    id: 'industrial',
    label: 'Industrial',
    number: '02',
    descriptor: 'Production line equipment, processing machinery and structural fabrication.',
    copy: `We do fabrication, conceptual mechanical design and prototype development for industrial machinery and equipment, including production line equipment, processing machinery and structural fabrication. We also do modifications and upgrades to existing plant equipment.`,
    draftPending: true,
  },
  {
    id: 'agricultural',
    label: 'Agricultural',
    number: '03',
    descriptor: 'Tractor attachments, implements and agro-industrial equipment.',
    copy: `We do attachments for tractors, agricultural trailers and implements, plus modifications and upgrades to existing equipment. We also build agro-industrial products for vegetable processing and packaging plants.`,
    draftPending: false,
  },
] as const

export const CONTACT_DETAILS = {
  phone: '+27 XX XXX XXXX',
  email: 'info@waypointinnovation.co.za',
  location: 'South Africa',
} as const

export const CLIENTS = [
  { name: 'Mercedes Benz', weight: 'primary' as const },
  { name: 'RSI Smartcap Canopies', weight: 'secondary' as const },
] as const
