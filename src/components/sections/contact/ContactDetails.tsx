import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ContactForm } from '@/components/ui/ContactForm'
import { CONTACT_DETAILS } from '@/lib/constants'

export function ContactDetails() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-white)',
        paddingTop: '0',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-4">
          {/* Left — contact details */}
          <div className="col-span-12 md:col-span-3">
            <SectionLabel>Find us</SectionLabel>

            <div className="flex flex-col gap-8">
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: 'var(--color-grey-400)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${CONTACT_DETAILS.phone}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--color-black)',
                    transition: 'color 0.25s ease',
                    display: 'block',
                    lineHeight: '1.2',
                  }}
                  className="hover:!text-red-500"
                >
                  {CONTACT_DETAILS.phone}
                </a>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: 'var(--color-grey-400)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-black)',
                    transition: 'color 0.25s ease',
                    display: 'block',
                    wordBreak: 'break-all',
                  }}
                  className="hover:!text-red-500"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: 'var(--color-grey-400)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-grey-600)',
                    lineHeight: '1.5',
                  }}
                >
                  {CONTACT_DETAILS.location}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden md:block md:col-span-1"
            style={{
              borderLeft: '1px solid var(--color-grey-200)',
              marginLeft: '50%',
            }}
            aria-hidden="true"
          />

          {/* Right — form */}
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
