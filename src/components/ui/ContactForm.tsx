'use client'

import { useState } from 'react'
import type { ContactFormData } from '@/types'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid var(--color-grey-200)',
  borderRadius: '0',
  padding: '12px 0',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  background: 'transparent',
  color: 'var(--color-black)',
  outline: 'none',
  appearance: 'none' as const,
  WebkitAppearance: 'none' as const,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-xs)',
  letterSpacing: '0.1em',
  color: 'var(--color-grey-400)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '4px',
}

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-red)',
  marginTop: '4px',
  display: 'block',
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [values, setValues] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    brief: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactFormData, string>> = {}
    if (!values.name.trim()) next.name = 'Your name is required'
    if (!values.email.trim()) {
      next.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address'
    }
    if (!values.brief.trim()) next.brief = 'Please tell us about the project'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setFormState('loading')

    // TODO: Connect to email service (Resend/Nodemailer/Formspree) before go-live
    // For now, simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('Form submission:', values)
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <div
        style={{ padding: '40px 0' }}
        role="status"
        aria-live="polite"
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-black)',
            marginBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--color-red)' }}>✓</span> Message sent.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-grey-600)',
          }}
        >
          We&apos;ll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Name */}
      <div>
        <label htmlFor="name" style={labelStyle}>Your name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderBottomColor: errors.name
              ? 'var(--color-red)'
              : focusedField === 'name'
              ? 'var(--color-black)'
              : 'var(--color-grey-200)',
            transition: 'border-color 0.25s ease',
          }}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span id="name-error" style={errorStyle} role="alert">{errors.name}</span>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={labelStyle}>Email address</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderBottomColor: errors.email
              ? 'var(--color-red)'
              : focusedField === 'email'
              ? 'var(--color-black)'
              : 'var(--color-grey-200)',
            transition: 'border-color 0.25s ease',
          }}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && <span id="email-error" style={errorStyle} role="alert">{errors.email}</span>}
      </div>

      {/* Company (optional) */}
      <div>
        <label htmlFor="company" style={labelStyle}>
          Company <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => handleChange('company', e.target.value)}
          onFocus={() => setFocusedField('company')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderBottomColor: focusedField === 'company' ? 'var(--color-black)' : 'var(--color-grey-200)',
            transition: 'border-color 0.25s ease',
          }}
        />
      </div>

      {/* Project brief */}
      <div>
        <label htmlFor="brief" style={labelStyle}>Tell us about the project</label>
        <textarea
          id="brief"
          rows={4}
          value={values.brief}
          onChange={(e) => handleChange('brief', e.target.value)}
          onFocus={() => setFocusedField('brief')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            resize: 'none',
            borderBottomColor: errors.brief
              ? 'var(--color-red)'
              : focusedField === 'brief'
              ? 'var(--color-black)'
              : 'var(--color-grey-200)',
            transition: 'border-color 0.25s ease',
          }}
          aria-describedby={errors.brief ? 'brief-error' : undefined}
          aria-invalid={!!errors.brief}
        />
        {errors.brief && <span id="brief-error" style={errorStyle} role="alert">{errors.brief}</span>}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={formState === 'loading'}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            backgroundColor: 'var(--color-red)',
            color: 'var(--color-white)',
            padding: '14px 40px',
            borderRadius: '2px',
            border: 'none',
            cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
            opacity: formState === 'loading' ? 0.7 : 1,
            transition: 'background-color 0.25s ease, opacity 0.25s ease',
            letterSpacing: '0.02em',
          }}
          className="hover:!bg-[#c02028]"
        >
          {formState === 'loading' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
