type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

type Color = `#${string}` | `rgb(${string})` | `rgba(${string})`

export type SVGIconProps = {
  className?: string
  fill?: Color | `fill-${string}` | 'none'
  stroke?: Color | `stroke-${string}` | 'none'
  size?: Size
  mobileSize?: Size
}

export const iconDimensions: Record<Size, number> = {
  xs: 15,
  sm: 20,
  md: 23,
  lg: 28,
  xl: 40,
  '2xl': 70,
  '3xl': 100,
}

export type LinkWithTitle = {
  id: `link-${number}`
  title: string
  path: `/${string}`
}
