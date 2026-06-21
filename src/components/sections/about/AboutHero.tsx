'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function AboutHero() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!imgRef.current) return
        const offset = window.scrollY * 0.4
        imgRef.current.style.transform = `translateY(${offset}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      aria-labelledby="about-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(88px + var(--space-section))',
        paddingBottom: 'var(--space-section)',
      }}
    >
      {/* Parallax image container */}
      <div
        ref={imgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          left: 0,
          width: '100%',
          height: '130%',
          willChange: 'transform',
        }}
      >
        <Image
          src="/Images/Tools.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.70)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionLabel light>About Waypoint Innovation</SectionLabel>
          </motion.div>

          <div className="grid grid-cols-12 gap-8 md:gap-4 items-end mb-12">
            <div className="col-span-12 md:col-span-8">
              {['Engineering built', 'on doing it', 'properly.'].map((line, i) => (
                <div key={line} style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.31rem, 3.1vw, 4.62rem)',
                      lineHeight: '0.92',
                      letterSpacing: '-0.03em',
                      color: 'var(--color-white)',
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
              <span id="about-heading" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>About Waypoint Innovation</span>
            </div>

            <div className="hidden md:flex col-span-3 md:col-start-10 flex-col items-end gap-3 pb-2">
              <div
                style={{ width: '2px', height: '80px', backgroundColor: 'var(--color-red)' }}
                aria-hidden="true"
              />
            </div>
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.65, ease: [0.16,1,0.3,1] }} style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: '48px', transformOrigin: 'left' }} />

          <div className="grid grid-cols-12 gap-8 md:gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="col-span-12 md:col-span-5">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.7',
                }}
              >
                Waypoint Innovation is a South African engineering company. We do fabrication,
                conceptual mechanical design and prototype development — work that requires
                precision, practicality and an understanding of how things are actually
                made and used.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }} className="col-span-12 md:col-span-5 md:col-start-7">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.7',
                }}
              >
                We are not a large firm. We keep our scope deliberate so that every project
                gets our full attention. The work we take on tends to be technically demanding —
                exactly where careful design and careful fabrication matter most.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
