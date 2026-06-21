'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { ArrowLink } from '@/components/ui/ArrowLink'

export function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!imgRef.current) return
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '560px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: '80px 1fr 320px',
      }}
    >
      <div
        ref={imgRef}
        aria-hidden="true"
        style={{ position: 'absolute', top: '-15%', left: 0, width: '100%', height: '130%', willChange: 'transform' }}
      >
        <Image
          src="/Images/IndustrialSilo .jpg"
          alt="Industrial silo fabrication"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        <Container>
          <div className="grid grid-cols-12 gap-4 items-end" style={{ marginBottom: '20px' }}>
            <div className="col-span-12 md:col-span-9">
              {['Precision', 'at every', 'point.'].map((line, i) => (
                <div key={line} style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 5vw, 5rem)',
                      lineHeight: '0.93',
                      letterSpacing: '-0.03em',
                      color: 'var(--color-white)',
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </div>

            <div className="hidden md:flex col-span-3 flex-col items-end gap-2 pb-1">
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '2px', height: '60px', backgroundColor: 'var(--color-red)', transformOrigin: 'top' }}
                aria-hidden="true"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.45)', writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)', textTransform: 'uppercase',
                }}
              >
                Fabrication · Design · Prototyping
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '20px', transformOrigin: 'left' }}
          />

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-6">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', color: 'rgba(255,255,255,0.75)', lineHeight: '1.55' }}
              >
                Waypoint Innovation works where<br />precision and practicality meet.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-4 md:col-start-9 flex md:justify-end mt-3 md:mt-0"
            >
              <ArrowLink href="/services" light>See our work</ArrowLink>
            </motion.div>
          </div>
        </Container>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }} />
    </section>
  )
}
