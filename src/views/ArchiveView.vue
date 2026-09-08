<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { categories, getCategoryColor } from '@/utils'

interface Communication {
  id: number | string
  title: string
  content: string
  date: string
  author: string
  category: string[]
  cta?: { text: string; link: string } | null
}

const communications = ref<Communication[]>([])
const search = ref('')
const selectedCategory = ref('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')
const loading = ref(true)

const normalize = (value: string) =>
  value
    .toLocaleLowerCase('it-IT')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const filteredCommunications = computed(() => {
  const query = normalize(search.value.trim())

  return communications.value
    .filter((communication) => {
      const searchableText = normalize(
        `${communication.title} ${communication.content} ${communication.author}`,
      )

      const matchesSearch = !query || searchableText.includes(query)
      const matchesCategory =
        selectedCategory.value === 'all' || communication.category.includes(selectedCategory.value)

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const difference = new Date(a.date).getTime() - new Date(b.date).getTime()

      return sortOrder.value === 'newest' ? -difference : difference
    })
})

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const categoryName = (id: string) => categories.find((category) => category.id === id)?.name || id

const resetFilters = () => {
  search.value = ''
  selectedCategory.value = 'all'
  sortOrder.value = 'newest'
}

onMounted(async () => {
  try {
    const response = await fetch('/communications.json')

    if (!response.ok) return

    const data = await response.json()

    communications.value = Array.isArray(data)
      ? data.map((item: any) => ({
          id: item.id,
          title:
            item.title || (item.content ? `${String(item.content).slice(0, 80)}…` : 'Senza titolo'),
          content: item.content || '',
          date: item.date || new Date().toISOString(),
          author: item.author || 'Telegram',
          category: Array.isArray(item.category)
            ? item.category
            : item.category
              ? [item.category]
              : ['didattica'],
          cta: item.cta || null,
        }))
      : []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="min-h-screen py-8">
    <div class="container mx-auto max-w-6xl px-4">
      <header class="mb-12 text-center">
        <h1 class="mb-4 flex items-center justify-center gap-3 text-4xl md:text-5xl">
          <Icon icon="heroicons:archive-box" class="h-12 w-12" />
          Archivio comunicazioni
        </h1>

        <p class="mx-auto max-w-2xl text-lg text-base-content/70">
          Consulta tutte le comunicazioni del corso di laurea.
        </p>
      </header>

      <!-- Filtri -->
      <section class="mb-10 rounded-xl bg-base-200 p-4 shadow-sm">
        <div class="grid md:grid-cols-2 gap-4">
          <label class="flex justify-start flex-col *:w-full">
            <span class="label-text mb-2 font-medium">Cerca</span>
            <div class="input input-bordered flex items-center gap-2 bg-base-100">
              <Icon icon="heroicons:magnifying-glass" class="h-5 w-5" />
              <input
                v-model="search"
                type="search"
                placeholder="Titolo, contenuto o autore..."
                class="grow bg-transparent outline-none"
              />
            </div>
          </label>

          <label class="flex justify-start flex-col *:w-full">
            <span class="label-text mb-2 font-medium">Ordina per</span>
            <select v-model="sortOrder" class="select select-bordered bg-base-100">
              <option value="newest">Più recenti</option>
              <option value="oldest">Più vecchie</option>
            </select>
          </label>
        </div>
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 my-6">
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

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span class="text-sm text-base-content/70">
            {{ filteredCommunications.length }} comunicazioni trovate
          </span>

          <button class="btn btn-ghost btn-sm" @click="resetFilters">
            <Icon icon="heroicons:x-mark" class="h-4 w-4" />
            Azzera filtri
          </button>
        </div>
      </section>

      <div v-if="loading" class="py-12 text-center">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <div
        v-else-if="filteredCommunications.length === 0"
        class="rounded-xl bg-base-200 py-16 text-center"
      >
        <Icon icon="heroicons:document-magnifying-glass" class="mx-auto mb-4 h-12 w-12" />
        <h2 class="text-xl font-semibold">Nessuna comunicazione trovata</h2>
        <p class="mt-2 text-base-content/60">Prova a modificare i filtri di ricerca.</p>
      </div>

      <div v-else class="grid gap-6">
        <article
          v-for="communication in filteredCommunications"
          :key="communication.id"
          class="collapse collapse-arrow bg-primary/10 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <input type="checkbox" />

          <div class="collapse-title">
            <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 class="text-lg md:text-md" v-html="communication.title"></h2>

                <div class="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                  <Icon icon="heroicons:calendar-days" class="h-4 w-4" />
                  {{ formatDate(communication.date) }}
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="cat in Array.isArray(communication.category)
                    ? communication.category
                    : [communication.category]"
                  :key="cat"
                  :class="['badge', getCategoryColor(cat, 'badge')]"
                >
                  {{ (categories.find((c) => c.id === cat) || { name: cat }).name }}
                </span>
              </div>
            </div>
          </div>

          <div class="collapse-content">
            <div class="leading-relaxed" v-html="communication.content"></div>

            <div
              class="mt-6 flex flex-col gap-4 border-t border-base-300 pt-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span class="flex items-center gap-1 text-sm text-base-content/60">
                <Icon icon="heroicons:pencil-square" class="h-4 w-4" />
                {{ communication.author }}
              </span>

              <RouterLink
                v-if="communication.cta"
                :to="communication.cta.link"
                class="btn btn-primary btn-sm"
              >
                {{ communication.cta.text }}
                <Icon icon="heroicons:arrow-right" class="ml-2 h-4 w-4" />
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>
