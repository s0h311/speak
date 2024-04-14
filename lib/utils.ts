import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function scrollIntoViewUsingPath(path: string, block: ScrollLogicalPosition = 'center'): void {
  if (!path.includes('/#')) {
    // TODO log error
    return
  }

  const elementId = path.replace('/#', '')
  const element = document.getElementById(elementId)

  if (!element) {
    // TODO log error
    return
  }

  element.scrollIntoView({ behavior: 'smooth', block })
}

// FADE IN ANIMATION

let fadeInObserver: IntersectionObserver

function initFadeInObserver(): void {
  fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-fade-in')
        return
      }
      entry.target.classList.remove('show-fade-in')
    })
  })
}

export function initFadeIntoView(): void {
  initFadeInObserver()
  const elements = document.querySelectorAll('.hide-fade-in')
  elements.forEach((el) => fadeInObserver.observe(el))
}

// NUMBER TO MONETARY VALUE

export function toMonetaryValue(value: number): string {
  return value.toFixed(2) + ' €'
}
