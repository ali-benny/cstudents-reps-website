let programmaticScrollTimer: number | null = null
export let isProgrammaticScroll = false

export const scrollToSection = (sectionId: string, timeout = 900) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  // Segnala che stiamo scorrendo programmaticamente
  isProgrammaticScroll = true
  if (programmaticScrollTimer) window.clearTimeout(programmaticScrollTimer)

  element.scrollIntoView({ behavior: 'smooth' })

  // Resetta la flag dopo la durata stimata dello smooth scroll
  programmaticScrollTimer = window.setTimeout(() => {
    isProgrammaticScroll = false
    programmaticScrollTimer = null
  }, timeout)
}

const getRepresentativeCategory = (category: string | string[]) => {
  if (Array.isArray(category)) return category[0]
  return category || 'didattica'
}

export const categories = [
  { id: 'didattica', name: 'Didattica', icon: 'heroicons:academic-cap', color: 'primary' },
  { id: 'bandi', name: 'Bandi', icon: 'mingcute:announcement-line', color: 'warning' },
  { id: 'opportunita', name: 'Opportunità', icon: 'heroicons:rocket-launch', color: 'accent' },
  { id: 'eventi', name: 'Eventi', icon: 'heroicons:calendar-days', color: 'secondary' },
  { id: 'assemblee', name: 'Assemblee', icon: 'heroicons:users', color: 'primary' },
  { id: 'sondaggi', name: 'Sondaggi', icon: 'heroicons:document-text', color: 'warning' },
]

export const getCategoryIcon = (category: string | string[]) => {
  const id = getRepresentativeCategory(category)
  const cat = categories.find((c) => c.id === id)
  return cat?.icon || 'heroicons:clipboard-document-list'
}

export function getCategoryColor(category: string | string[], css: string) {
  const id = getRepresentativeCategory(category)
  const cat = categories.find((c) => c.id === id)
  const color = cat?.color || 'primary'

  if (css === 'btn') {
    switch (color) {
      case 'accent':
        return 'btn-accent'
      case 'secondary':
        return 'btn-secondary'
      case 'warning':
        return 'btn-warning'
      default:
        return 'btn-primary'
    }
  } else if (css === 'badge') {
    switch (color) {
      case 'accent':
        return 'badge-accent'
      case 'secondary':
        return 'badge-secondary'
      case 'warning':
        return 'badge-warning'
      default:
        return 'badge-primary'
    }
  }
  return ''
}
