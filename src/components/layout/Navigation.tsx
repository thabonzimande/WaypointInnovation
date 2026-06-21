'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import { Container } from './Container'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Outer wrapper — full width, fixed, transparent */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: '16px' }}
      >
        {/*
          Pill navbar — floats centred, hugs its content, has a subtle shadow.
          On scroll it picks up a frosted-glass fill; at the top it is fully transparent
          so it blends into the page hero.
        */}
        <div
          style={{
            backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '9999px',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.10)'
              : '0 2px 12px rgba(0,0,0,0.06)',
            transition: 'background-color 0.35s ease, box-shadow 0.35s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            height: '52px',
            padding: '0 6px 0 16px',
            maxWidth: '900px',
            width: 'calc(100% - 40px)',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ marginRight: '32px', flexShrink: 0, display: 'flex', alignItems: 'center' }}
            className="hover:opacity-70 transition-opacity duration-200"
            aria-label="Waypoint Innovation home"
          >
            <Image
              src="/Images/Logo.png"
              alt="Waypoint Innovation"
              width={700}
              height={200}
              style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center"
            style={{ gap: '2px', flex: 1 }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = mounted && pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    color: isActive ? 'var(--color-white)' : 'var(--color-grey-600)',
                    backgroundColor: isActive ? 'var(--color-black)' : 'transparent',
                    borderRadius: '9999px',
                    padding: '8px 18px',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  className={isActive ? '' : 'hover:!text-black hover:!bg-[rgba(0,0,0,0.05)]'}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Contact CTA pill button */}
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-black)',
              border: '1px solid var(--color-black)',
              borderRadius: '9999px',
              padding: '8px 20px',
              marginLeft: '8px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}
            className="hidden md:inline-flex items-center hover:!bg-[#333] hover:!border-[#333]"
          >
            Contact us
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 ml-auto"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              style={{
                backgroundColor: 'var(--color-black)',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease',
              }}
              className="block w-5 h-px"
            />
            <span
              style={{
                backgroundColor: 'var(--color-black)',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
              className="block w-5 h-px"
            />
            <span
              style={{
                backgroundColor: 'var(--color-black)',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                transition: 'transform 0.3s ease',
              }}
              className="block w-5 h-px"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — drops below the pill */}
      <div
        style={{
          backgroundColor: 'var(--color-white)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          opacity: menuOpen ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          borderBottom: '1px solid var(--color-grey-200)',
          paddingTop: '80px',
        }}
        className="fixed top-0 left-0 right-0 z-40 md:hidden"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-xl)',
                color: mounted && pathname === link.href ? 'var(--color-red)' : 'var(--color-black)',
                borderBottom: '1px solid var(--color-grey-100)',
                padding: '20px var(--container-pad)',
                display: 'block',
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
