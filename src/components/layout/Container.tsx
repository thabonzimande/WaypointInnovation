interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: 'var(--container-max)',
        paddingLeft: 'var(--container-pad)',
        paddingRight: 'var(--container-pad)',
      }}
      className={`mx-auto w-full ${className}`}
    >
      {children}
    </div>
  )
}
