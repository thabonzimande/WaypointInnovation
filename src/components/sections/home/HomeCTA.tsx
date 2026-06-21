import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { CONTACT_DETAILS } from '@/lib/constants'

export function HomeCTA() {
  return (
    <section
      aria-label="Contact call to action"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Factory background image */}
      <Image
        src="/Images/Factory.JPG"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        aria-hidden="true"
      />

      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.68)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--space-section)',
          paddingBottom: 'var(--space-section)',
        }}
      >
        <Container>
          <div className="text-center flex flex-col items-center gap-8">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.15em',
                color: 'var(--color-red)',
                textTransform: 'uppercase',
              }}
            >
              Get in touch
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                lineHeight: '0.95',
                letterSpacing: '-0.02em',
                color: 'var(--color-white)',
              }}
            >
              Let&apos;s discuss your project.
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
              <Link
                href="/contact"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'var(--color-red)',
                  color: 'var(--color-white)',
                  padding: '14px 40px',
                  borderRadius: '2px',
                  display: 'inline-block',
                  transition: 'background-color 0.25s ease',
                  letterSpacing: '0.02em',
                }}
                className="hover:!bg-[#c02028]"
              >
                Contact us
              </Link>

              <a
                href={`tel:${CONTACT_DETAILS.phone}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255,255,255,0.55)',
                  transition: 'color 0.25s ease',
                }}
                className="hover:!text-white"
              >
                or call us directly
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
