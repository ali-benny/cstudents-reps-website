<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

interface Attachment {
  name: string
  link: string
}

interface ActivityItem {
  id: number
  title: string
  date: string
  description: string
  attachments: Attachment[]
}

interface ActivitySection {
  id: string
  icon: string
  title: string
  subtitle: string
  colorClass: string
  buttonClass: string
  dataSource?: string
  badge?: {
    text: string
    class: string
  }
  emptyMessage: string
  items: ActivityItem[]
}

const sections = ref<ActivitySection[]>([
  // {
  //   id: 'councils',
  //   icon: 'heroicons:academic-cap',
  //   title: 'Consigli di Corso di Studi',
  //   subtitle: 'Portiamo la tua voce nelle decisioni importanti',
  //   colorClass: 'bg-primary text-primary-content',
  //   buttonClass: 'btn-primary',
  //   badge: {
  //     text: 'Attivo',
  //     class: 'badge-success',
  //   },
  //   emptyMessage: 'Nessuna informazione disponibile al momento.',
  //   items: [],
  // },

  {
    id: 'events',
    icon: 'heroicons:calendar',
    title: 'Eventi Organizzati',
    subtitle: 'Incontri, workshop e iniziative per te',
    colorClass: 'bg-primary text-primary-content',
    buttonClass: 'btn-primary !text-primary-content',
    dataSource: '/events.json',
    emptyMessage: 'Nessun evento disponibile al momento.',
    items: [],
  },
  {
    id: 'proposals',
    icon: 'heroicons:light-bulb',
    title: 'Proposte Portate in Consiglio',
    subtitle: 'Le tue idee diventano realtà',
    colorClass: 'bg-accent text-accent-content',
    buttonClass: 'btn-accent !text-accent-content',
    dataSource: '/proposals.json',
    emptyMessage: 'Nessuna proposta disponibile al momento.',
    items: [],
  },
  {
    id: 'meetings',
    icon: 'heroicons:document-text',
    title: 'Assemblee Studentesche',
    subtitle: 'Verbali e documenti delle assemblee',
    colorClass: 'bg-secondary text-secondary-content',
    buttonClass: 'btn-secondary !text-secondary-content',
    dataSource: '/meetings.json',
    emptyMessage: 'Nessun verbale disponibile al momento.',
    items: [],
  },
])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getAttachmentIcon = (link: string): string => {
  const url = link.toLowerCase()

  // Check file extensions
  if (url.endsWith('.pdf')) return 'heroicons:document-text'
  if (url.match(/\.(doc|docx)$/)) return 'heroicons:document'
  if (url.match(/\.(xls|xlsx)$/)) return 'heroicons:table-cells'
  if (url.match(/\.(ppt|pptx)$/)) return 'heroicons:presentation-chart-bar'
  if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) return 'heroicons:photo'
  if (url.match(/\.(zip|rar|7z|tar|gz)$/)) return 'heroicons:archive-box'
  if (url.match(/\.(mp4|avi|mov|mkv|webm)$/)) return 'heroicons:video-camera'
  if (url.match(/\.(mp3|wav|ogg|flac)$/)) return 'heroicons:musical-note'

  // Check for external links
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('github.com')) return 'mdi:github'
    if (url.includes('drive.google.com') || url.includes('docs.google.com'))
      return 'mdi:google-drive'
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'mdi:youtube'
    return 'heroicons:link'
  }

  // Default icon
  return 'heroicons:document-arrow-down'
}

onMounted(async () => {
  try {
    const fetchPromises = sections.value
      .filter((section) => section.dataSource)
      .map(async (section) => {
        const response = await fetch(section.dataSource!)
        section.items = await response.json()
      })

    await Promise.all(fetchPromises)
  } catch (error) {
    console.error('Errore nel caricamento dei dati:', error)
  }
})
</script>

<template>
  <section id="activities" class="py-20 bg-base-200">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl mb-4 text-base-content flex items-center justify-center gap-3"
        >
          <Icon icon="heroicons:briefcase" class="h-12 w-12" />
          Cosa Stiamo Facendo Per Te
        </h2>
        <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
          Il nostro impegno quotidiano per migliorare il tuo percorso universitario
        </p>
      </div>

      <!-- Dynamic Sections -->
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        :class="index < sections.length - 1 ? 'mb-16' : 'mb-12'"
      >
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-6">
          <div :class="['p-3 rounded-lg', section.colorClass]">
            <Icon :icon="section.icon" class="h-8 w-8" />
          </div>
          <div class="flex-1">
            <h2 class="text-xl md:text-3xl font-bold text-base-content">
              {{ section.title }}
            </h2>
            <p class="text-base-content/70">{{ section.subtitle }}</p>
          </div>
          <div v-if="section.badge" :class="['badge ml-auto', section.badge.class]">
            {{ section.badge.text }}
          </div>
        </div>

        <!-- Section Content -->
        <div v-if="section.items.length > 0" class="grid gap-4">
          <div
            v-for="item in section.items"
            :key="item.id"
            class="card bg-base-100 hover:shadow-xl"
          >
            <div class="card-body">
              <div class="flex flex-col gap-3">
                <div>
                  <h4 class="card-title text-lg mb-2">{{ item.title }}</h4>
                  <p class="text-sm text-base-content/70 mb-2" v-html="item.description"></p>
                  <div class="flex items-center gap-2 text-sm text-base-content/60">
                    <Icon icon="heroicons:calendar" class="h-4 w-4" />
                    {{ formatDate(item.date) }}
                  </div>
                </div>
                <div v-if="item.attachments?.length" class="flex flex-wrap gap-2">
                  <a
                    v-for="(attachment, index) in item.attachments"
                    :key="index"
                    :href="attachment.link"
                    target="_blank"
                    :class="['btn btn-sm gap-2 font-semibold', section.buttonClass]"
                    :title="attachment.name"
                  >
                    <Icon :icon="getAttachmentIcon(attachment.link)" class="h-4 w-4" />
                    {{ attachment.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning">
          <Icon icon="heroicons:exclamation-triangle" class="h-6 w-6" />
          <span>{{ section.emptyMessage }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
