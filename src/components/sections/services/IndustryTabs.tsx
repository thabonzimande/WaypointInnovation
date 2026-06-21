'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { INDUSTRIES } from '@/lib/constants'

export function IndustryTabs() {
  const [active, setActive] = useState<string>('automotive')
  const currentIndustry = INDUSTRIES.find((i) => i.id === active) ?? INDUSTRIES[0]

  return (
    <section
      style={{
        backgroundColor: 'var(--color-off-white)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-label="Industry details"
    >
      <Container>
        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Industries"
          style={{ borderBottom: '1px solid var(--color-grey-200)', marginBottom: '48px' }}
          className="flex gap-0"
        >
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              role="tab"
              aria-selected={active === industry.id}
              aria-controls={`panel-${industry.id}`}
              id={`tab-${industry.id}`}
              onClick={() => setActive(industry.id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.05em',
                color: active === industry.id ? 'var(--color-black)' : 'var(--color-grey-400)',
                padding: '16px 24px 16px 0',
                background: 'none',
                border: 'none',
                borderBottom: active === industry.id ? '2px solid var(--color-red)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.25s ease, border-color 0.25s ease',
                marginBottom: '-1px',
              }}
              className="hover:!text-black"
            >
              {industry.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          id={`panel-${currentIndustry.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentIndustry.id}`}
        >
          <div className="grid grid-cols-12 gap-8 md:gap-4">
            {/* Industry name */}
            <div className="col-span-12 md:col-span-5">
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-3xl)',
                  lineHeight: '0.92',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-black)',
                }}
              >
                {currentIndustry.label}
              </h2>
            </div>

            {/* Copy + draft flag */}
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              {currentIndustry.draftPending && (
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    backgroundColor: 'var(--color-grey-100)',
                    color: 'var(--color-grey-400)',
                    padding: '3px 10px',
                    borderRadius: '2px',
                    marginBottom: '16px',
                    letterSpacing: '0.05em',
                  }}
                >
                  Draft — pending owner review
                </span>
              )}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-grey-600)',
                  lineHeight: '1.75',
                }}
              >
                {currentIndustry.copy}
              </p>
            </div>
          </div>

          {/* Project photo gallery placeholder */}
          <div style={{ marginTop: 'var(--space-block)' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.12em',
                color: 'var(--color-grey-400)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Project photos
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  style={{
                    aspectRatio: n % 3 === 0 ? '3/4' : '4/3',
                    backgroundColor: 'var(--color-grey-100)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                  aria-label={`Project photo placeholder ${n}`}
                >
                  {/* TODO: Replace with next/image when project photos are provided */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-grey-400)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Project photo
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
