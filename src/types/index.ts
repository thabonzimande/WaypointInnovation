export interface NavLink {
  label: string
  href: string
}

export interface Industry {
  id: string
  label: string
  number: string
  descriptor: string
  copy: string
  draftPending: boolean
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  brief: string
}
