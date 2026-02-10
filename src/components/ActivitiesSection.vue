<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

interface Attachment {
  name: string
  link: string
}

interface Proposal {
  id: number
  title: string
  date: string
  description: string
  attachments: Attachment[]
}

interface Meeting {
  id: number
  title: string
  date: string
  description: string
  attachments: Attachment[]
}

const proposals = ref<Proposal[]>([])
const meetings = ref<Meeting[]>([])

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
    const [proposalsRes, meetingsRes] = await Promise.all([
      fetch('/proposals.json'),
      fetch('/meetings.json'),
    ])
    proposals.value = await proposalsRes.json()
    meetings.value = await meetingsRes.json()
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

      <!-- Consigli di Corso Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-primary text-primary-content p-3 rounded-lg">
            <Icon icon="heroicons:academic-cap" class="h-8 w-8" />
          </div>
          <div>
            <h2 class="text-xl md:text-3xl font-bold text-base-content">
              Consigli di Corso di Studi
            </h2>
            <p class="text-base-content/70">Portiamo la tua voce nelle decisioni importanti</p>
          </div>
          <div class="badge badge-success ml-auto">Attivo</div>
        </div>
        <!-- <div class="alert alert-info">
          <Icon icon="heroicons:information-circle" class="h-6 w-6" />
          <span>
            Partecipiamo attivamente ai Consigli di Corso di Studi per rappresentare gli studenti nelle decisioni
            accademiche. I verbali sono disponibili nella sezione dedicata.
          </span>
        </div> -->
      </div>

      <!-- Proposte Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-accent text-accent-content p-3 rounded-lg">
            <Icon icon="heroicons:light-bulb" class="h-8 w-8" />
          </div>
          <div>
            <h2 class="text-xl md:text-3xl font-bold text-base-content">Proposte Portate</h2>
            <p class="text-base-content/70">Le tue idee diventano realtà</p>
          </div>
        </div>

        <div v-if="proposals.length > 0" class="grid gap-4">
          <div
            v-for="proposal in proposals"
            :key="proposal.id"
            class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="card-body">
              <div class="flex flex-col gap-3">
                <div>
                  <h4 class="card-title text-lg mb-2">{{ proposal.title }}</h4>
                  <p class="text-sm text-base-content/70 mb-2">{{ proposal.description }}</p>
                  <div class="flex items-center gap-2 text-sm text-base-content/60">
                    <Icon icon="heroicons:calendar" class="h-4 w-4" />
                    {{ formatDate(proposal.date) }}
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <a
                    v-for="(attachment, index) in proposal.attachments"
                    :key="index"
                    :href="attachment.link"
                    target="_blank"
                    class="btn btn-sm btn-primary gap-2 !text-base-content"
                    :title="attachment.name"
                  >
                    <Icon icon="heroicons:document-arrow-down" class="h-4 w-4" />
                    {{ attachment.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning">
          <Icon icon="heroicons:exclamation-triangle" class="h-6 w-6" />
          <span>Nessuna proposta disponibile al momento.</span>
        </div>
      </div>

      <!-- Assemblee Section -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-secondary text-secondary-content p-3 rounded-lg">
            <Icon icon="heroicons:document-text" class="h-8 w-8" />
          </div>
          <div>
            <h2 class="text-xl md:text-3xl font-bold text-base-content">Assemblee Studentesche</h2>
            <p class="text-base-content/70">Verbali e documenti delle assemblee</p>
          </div>
        </div>

        <div v-if="meetings.length > 0" class="grid gap-4">
          <div
            v-for="meeting in meetings"
            :key="meeting.id"
            class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="card-body">
              <div class="flex flex-col gap-3">
                <div>
                  <h4 class="card-title text-lg mb-2">{{ meeting.title }}</h4>
                  <p class="text-sm text-base-content/70 mb-2">{{ meeting.description }}</p>
                  <div class="flex items-center gap-2 text-sm text-base-content/60">
                    <Icon icon="heroicons:calendar" class="h-4 w-4" />
                    {{ formatDate(meeting.date) }}
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <a
                    v-for="(attachment, index) in meeting.attachments"
                    :key="index"
                    :href="attachment.link"
                    target="_blank"
                    class="btn btn-sm btn-secondary gap-2 !text-base-content"
                    :title="attachment.name"
                  >
                    <Icon icon="heroicons:document-arrow-down" class="h-4 w-4" />
                    {{ attachment.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning">
          <Icon icon="heroicons:exclamation-triangle" class="h-6 w-6" />
          <span>Nessun verbale disponibile al momento.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card:hover {
  transform: translateY(-2px);
}
</style>
