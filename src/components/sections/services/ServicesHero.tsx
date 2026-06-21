import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

const SERVICE_PILLARS = [
  {
    title: 'Fabrication',
    description: 'Structural, mechanical and component fabrication to specification.',
  },
  {
    title: 'Conceptual Mechanical Design',
    description: 'From blank-sheet concept through to production-ready design intent.',
  },
  {
    title: 'Prototype Development',
    description:
      'Physical prototypes built to validate design — engineered to perform, not just demonstrate.',
  },
] as const

export function ServicesHero() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-white)',
        paddingTop: 'calc(88px + var(--space-section))',
        paddingBottom: 'var(--space-section)',
      }}
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionLabel>Services &amp; Industries</SectionLabel>

        {/* Headline */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 md:col-span-7">
            <h1
              id="services-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-3xl)',
                lineHeight: '0.92',
                letterSpacing: '-0.03em',
                color: 'var(--color-black)',
              }}
            >
              Three sectors.<br />One standard<br />of work.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-grey-600)',
                lineHeight: '1.7',
              }}
            >
              Fabrication, conceptual mechanical design and prototype development —
              applied across automotive, industrial and agricultural work.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div
          style={{ borderTop: '1px solid var(--color-grey-200)' }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {SERVICE_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              style={{
                padding: '32px 0',
                paddingRight: index < SERVICE_PILLARS.length - 1 ? '32px' : '0',
                paddingLeft: index > 0 ? '32px' : '0',
                borderLeft: index > 0 ? '1px solid var(--color-grey-200)' : 'none',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-black)',
                  lineHeight: '1.1',
                  marginBottom: '12px',
                }}
              >
                {pillar.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-grey-600)',
                  lineHeight: '1.6',
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
