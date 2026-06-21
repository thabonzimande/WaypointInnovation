interface RedLineProps {
  orientation?: 'horizontal' | 'vertical'
  height?: number
  width?: number
  className?: string
}

export function RedLine({
  orientation = 'vertical',
  height = 100,
  width = 60,
  className = '',
}: RedLineProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: 'var(--color-red)',
        width: orientation === 'vertical' ? '2px' : `${width}px`,
        height: orientation === 'vertical' ? `${height}px` : '1px',
        flexShrink: 0,
      }}
      className={className}
    />
  )
}
