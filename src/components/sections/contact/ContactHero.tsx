import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ContactHero() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-white)',
        paddingTop: 'calc(88px + var(--space-section))',
        paddingBottom: 'var(--space-block)',
      }}
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionLabel>Get in touch</SectionLabel>
        <h1
          id="contact-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-3xl)',
            lineHeight: '0.92',
            letterSpacing: '-0.03em',
            color: 'var(--color-black)',
            marginBottom: '20px',
          }}
        >
          Start a<br />conversation.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-grey-600)',
            lineHeight: '1.7',
            maxWidth: '400px',
          }}
        >
          Tell us about your project.<br />We&apos;ll respond promptly.
        </p>
      </Container>
    </section>
  )
}
