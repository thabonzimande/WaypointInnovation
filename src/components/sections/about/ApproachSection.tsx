import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'

const APPROACH_STEPS = [
  {
    number: '01',
    title: 'Understand the problem',
    description: 'Before anything is drawn or built, we spend time understanding what the component or system actually needs to do — and what it needs to survive.',
  },
  {
    number: '02',
    title: 'Design with the end use in mind',
    description: 'Every design decision accounts for manufacturing, maintenance, and real-world operating conditions.',
  },
  {
    number: '03',
    title: 'Build and refine',
    description: 'We fabricate, test and refine. Prototyping is part of how we validate — not an afterthought.',
  },
] as const

export function ApproachSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-off-white)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-labelledby="approach-heading"
    >
      <Container>
        <FadeUp><SectionLabel>How we work</SectionLabel></FadeUp>
        <h2 id="approach-heading" className="sr-only">Our approach</h2>

        <div>
          {APPROACH_STEPS.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.1}>
              <div style={{ borderTop: '1px solid var(--color-grey-200)', padding: '32px 0' }}>
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-2 md:col-span-1">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-grey-400)', letterSpacing: '0.05em' }}>
                      {step.number}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--color-black)', lineHeight: '1.1' }}>
                      {step.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-6 md:col-start-7 pl-8 md:pl-0">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-grey-600)', lineHeight: '1.7' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
          <div style={{ borderTop: '1px solid var(--color-grey-200)' }} />
        </div>
      </Container>
    </section>
  )
}
