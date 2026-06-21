interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.15em',
        color: light ? 'rgba(255,255,255,0.35)' : 'var(--color-grey-400)',
        textTransform: 'uppercase',
        marginBottom: '24px',
      }}
      className={className}
    >
      {children}
    </p>
  )
}
