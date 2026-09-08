<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { categories, getCategoryIcon, getCategoryColor } from '@/utils'

interface Communication {
  id: number | string
  title: string
  content: string
  date: string
  author: string
  // now supports multiple categories
  category: string[]
  priority: string
  cta?: { text: string; link: string } | null
}

const communications = ref<Communication[]>([])
const selectedCategory = ref('all')

// Comunicazioni filtrate
const filteredCommunications = computed(() => {
  return communications.value
    .filter(
      (comm) =>
        selectedCategory.value === 'all' ||
        (Array.isArray(comm.category) ? comm.category.includes(selectedCategory.value) : false),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // if (selectedCategory.value === 'all') {
  //   // Ordina per data decrescente e prendi le ultime 5 comunicazioni
  //   return communications.value
  //     .slice()
  //     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //     .slice(0, 5)
  // }
  // return communications.value.filter((comm) => (Array.isArray(comm.category) ? comm.category.includes(selectedCategory.value) : false))
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
            // normalize category to array for backward compatibility
            category: Array.isArray(m.category)
              ? m.category
              : m.category
                ? [m.category]
                : ['didattica'],
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
          Comunicazioni più recenti
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

      <!-- Communications Grid -->
      <div class="grid gap-6 md:gap-8">
        <div
          v-for="comm in filteredCommunications"
          :key="comm.id"
          class="bg-primary/10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 collapse collapse-arrow"
        >
          <input type="checkbox" />
          <!-- Header -->
          <div
            class="collapse-title flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4"
          >
            <div class="flex items-start gap-3">
              <div class="min-w-0">
                <div
                  class="card-title text-lg md:text-xl mb-2 text-base-content break-words whitespace-normal"
                  v-html="comm.title"
                ></div>
                <div class="flex items-center gap-2 text-sm text-base-content/60">
                  <Icon icon="heroicons:calendar-days" class="h-4 w-4" />
                  {{ formatDate(comm.date) }}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="cat in Array.isArray(comm.category) ? comm.category : [comm.category]"
                :key="cat"
                :class="['badge', getCategoryColor(cat, 'badge')]"
              >
                {{ (categories.find((c) => c.id === cat) || { name: cat }).name }}
              </span>
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
        <a class="btn btn-accent btn-outline rounded-lg w-64 mx-auto" href="/archive"
          >Leggi di più nell'archivio
          <Icon icon="heroicons:arrow-right" class="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  </section>
</template>
