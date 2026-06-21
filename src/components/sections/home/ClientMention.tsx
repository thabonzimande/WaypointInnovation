import { Container } from '@/components/layout/Container'

export function ClientMention() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-black)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-label="Client work"
    >
      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-4 items-center">
          {/* Left — clients */}
          <div className="col-span-12 md:col-span-6">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              We have worked with
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                lineHeight: '0.95',
                letterSpacing: '-0.02em',
                color: 'var(--color-white)',
                marginBottom: '16px',
              }}
            >
              Mercedes Benz
            </h2>

            <div
              style={{
                width: '60px',
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                marginBottom: '16px',
              }}
              aria-hidden="true"
            />

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-xl)',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              RSI Smartcap Canopies
            </h2>
          </div>

          {/* Right — description */}
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: '1.7',
              }}
            >
              Our work spans concept to completion — from packaging design to
              prototype components built to manufacturer specification.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
