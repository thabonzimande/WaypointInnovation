import Link from 'next/link'

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function ArrowLink({ href, children, className = '', light = false }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        letterSpacing: '0.08em',
        color: light ? 'rgba(255,255,255,0.5)' : 'var(--color-black)',
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'gap 0.25s ease',
      }}
      className={`group ${className}`}
    >
      {children}
      <span
        style={{ transition: 'transform 0.25s ease' }}
        className="group-hover:translate-x-1.5 inline-block"
      >
        →
      </span>
    </Link>
  )
}
