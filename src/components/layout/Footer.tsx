import Link from 'next/link'
import Image from 'next/image'
import { Container } from './Container'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-grey-200)' }}
      role="contentinfo"
    >
      <Container>
        {/* Top row */}
        <div
          style={{ paddingTop: 'var(--space-block)', paddingBottom: 'var(--space-block)' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center' }}
            className="hover:opacity-70 transition-opacity duration-200"
            aria-label="Waypoint Innovation home"
          >
            <Image
              src="/Images/Logo.png"
              alt="Waypoint Innovation"
              width={140}
              height={40}
              style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  color: 'var(--color-grey-400)',
                  transition: 'color 0.25s ease',
                }}
                className="uppercase hover:!text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-grey-200)' }} />

        {/* Bottom row */}
        <div
          style={{ paddingTop: '24px', paddingBottom: '24px' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-grey-400)',
            }}
          >
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-grey-400)',
            }}
          >
            Fabrication · Mechanical Design · Prototype Development
          </p>
        </div>
      </Container>
    </footer>
  )
}
