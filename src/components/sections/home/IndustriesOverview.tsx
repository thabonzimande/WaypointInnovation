'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { INDUSTRIES } from '@/lib/constants'

export function IndustriesOverview() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      style={{
        backgroundColor: 'var(--color-grey-800)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-labelledby="industries-heading"
    >
      <Container>
        <SectionLabel light>Industries</SectionLabel>
        <h2 id="industries-heading" className="sr-only">Industries we serve</h2>

        <div>
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.id}
              href={`/services#${industry.id}`}
              style={{
                display: 'block',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '28px 0',
                backgroundColor: hovered === industry.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'background-color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={() => setHovered(industry.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 md:col-span-1">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'rgba(255,255,255,0.3)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {industry.number}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-xl)',
                      color: hovered === industry.id ? 'var(--color-red)' : 'var(--color-white)',
                      transition: 'color 0.2s ease',
                      lineHeight: '1',
                    }}
                  >
                    {industry.label}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-5 md:col-start-6 pl-8 md:pl-0">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: '1.5',
                    }}
                  >
                    {industry.descriptor}
                  </span>
                </div>

                <div className="hidden md:block md:col-span-2 text-right">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: hovered === industry.id ? 'var(--color-red)' : 'rgba(255,255,255,0.3)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      </Container>
    </section>
  )
}
