import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { FadeUp } from '@/components/ui/FadeUp'

export function IntroSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-off-white)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-labelledby="intro-heading"
    >
      <Container>
        <FadeUp><SectionLabel>About us</SectionLabel></FadeUp>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
            <FadeUp delay={0.05}>
              <h2
                id="intro-heading"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-2xl)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-black)',
                }}
              >
                Engineering solutions for the real world.
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-grey-600)', lineHeight: '1.7' }}>
                Waypoint Innovation is a South African engineering firm specialising in
                fabrication, conceptual mechanical design and prototype development.
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-grey-600)', lineHeight: '1.7' }}>
                We work across the automotive, industrial and agricultural sectors —
                building components, jigs, test equipment, machinery and attachments
                that need to perform in demanding conditions.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <ArrowLink href="/about">More about us</ArrowLink>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="col-span-12 md:col-span-6" style={{ paddingTop: '4px' }}>
            <Image
              src="/Images/Tractor.jpg"
              alt="Agricultural tractor attachment work by Waypoint Innovation"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ width: '80%', height: 'auto', display: 'block', borderRadius: '4px' }}
            />
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}
