<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Communication {
  id: number | string
  title: string
  content: string
  date: string
  author: string
  category: string
  priority: string
  cta?: { text: string; link: string } | null
}

const communications = ref<Communication[]>([])
const selectedCategory = ref('all')
// Categorie per il filtro
const categories = [
  { id: 'all', name: 'Tutte', icon: 'heroicons:clipboard-document-list' },
  // { id: 'questionari', name: 'Questionari', icon: 'heroicons:document-text' },
  { id: 'didattica', name: 'Didattica', icon: 'heroicons:academic-cap', color: 'primary' },
  { id: 'bandi', name: 'Bandi', icon: 'mingcute:announcement-line', color: 'warning' },
  { id: 'opportunita', name: 'Opportunità', icon: 'heroicons:rocket-launch', color: 'accent' },
  { id: 'eventi', name: 'Eventi', icon: 'heroicons:calendar-days', color: 'secondary' },
]

// Comunicazioni filtrate
const filteredCommunications = computed(() => {
  if (selectedCategory.value === 'all') {
    return communications.value
  }
  return communications.value.filter((comm) => comm.category === selectedCategory.value)
})

// Funzioni utili
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-4 border-error bg-error/10'
    case 'medium':
      return 'border-l-4 border-warning bg-warning/10'
    case 'low':
      return 'border-l-4 border-secondary bg-secondary/10'
    default:
      return 'border-l-4 border-base-300 bg-base-200/50'
  }
}

const getCategoryIcon = (category: string) => {
  const cat = categories.find((c) => c.id === category)
  return cat?.icon || 'heroicons:clipboard-document-list'
}
function getCategoryColor(category: string, css: string) {
  const cat = categories.find((c) => c.id === category)
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

// Load communications from generated JSON
onMounted(async () => {
  try {
    const res = await fetch('/communications.json')
    if (res.ok) {
      const data = await res.json()
      // Basic validation and fallback mapping
      communications.value = Array.isArray(data)
        ? data.map((m: any) => ({
            id: m.id,
            title: m.title || (m.content ? String(m.content).slice(0, 80) + '…' : 'Senza titolo'),
            content: m.content || '',
            date: m.date || new Date().toISOString(),
            author: m.author || 'Telegram',
            category: m.category || 'didattica',
            priority: m.priority,
            cta: m.cta || null,
          }))
        : []
    }
  } catch (e) {
    console.error('Errore caricamento communications.json', e)
  }
})
</script>

<template>
  <!-- Communications Section -->
  <section id="communications" class="py-20 bg-base-100">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl mb-4 text-base-content flex items-center justify-center gap-3"
        >
          <Icon icon="heroicons:megaphone" class="h-12 w-12" />
          Comunicazioni
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
          Resta aggiornato su tutte le novità del corso di laurea
          <a
            href="https://t.me/infoinfounibo"
            target="_blank"
            class="underline inline-flex items-center gap-1"
          >
            entrando nel canale Telegram
            <Icon icon="logos:telegram" class="inline-block" />
          </a>
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'btn btn-sm transition-all duration-200 rounded-lg',
            selectedCategory === category.id
              ? getCategoryColor(category.id, 'btn')
              : 'btn-outline ' + getCategoryColor(category.id, 'btn'),
          ]"
        >
          <Icon :icon="category.icon" class="h-4 w-4 mr-2" />
          {{ category.name }}
        </button>
      </div>

      <!-- Communications Grid -->
      <div class="grid gap-6 md:gap-8">
        <div
          v-for="comm in filteredCommunications"
          :key="comm.id"
          :class="[
            'bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 collapse collapse-arrow',
            getPriorityClass(comm.priority),
          ]"
        >
          <input type="checkbox" />
          <!-- Header -->
          <div
            class="collapse-title flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4"
          >
            <div class="flex items-start gap-3">
              <Icon :icon="getCategoryIcon(comm.category)" class="h-6 w-6 text-primary" />
              <div>
                <div
                  class="card-title text-lg md:text-xl mb-2 text-base-content"
                  v-html="comm.title"
                ></div>
                <div class="flex items-center gap-2 text-sm text-base-content/60">
                  <Icon icon="heroicons:calendar-days" class="h-4 w-4" />
                  {{ formatDate(comm.date) }}
                </div>
              </div>
            </div>

            <div :class="['badge', getCategoryColor(comm.category, 'badge')]">
              {{ comm.category }}
            </div>
          </div>
          <div class="collapse-content">
            <!-- Content -->
            <div class="leading-relaxed mb-4" v-html="comm.content"></div>

            <!-- Footer -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="text-sm text-base-content/60 flex items-center gap-1">
                <Icon icon="heroicons:pencil-square" class="h-4 w-4" />
                {{ comm.author }}
              </div>

              <div v-if="comm.cta" class="flex justify-end">
                <RouterLink :to="comm.cta.link" class="btn btn-primary btn-sm">
                  {{ comm.cta.text }}
                  <Icon icon="heroicons:arrow-right" class="h-4 w-4 ml-2" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
