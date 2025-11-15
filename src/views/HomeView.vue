<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

// Dati reattivi
const communications = ref([])
const representatives = ref([])
const selectedCategory = ref('all')

// Categorie per il filtro
const categories = [
  { id: 'all', name: 'Tutte', icon: 'heroicons:clipboard-document-list' },
  { id: 'questionario', name: 'Questionari', icon: 'heroicons:document-text' },
  { id: 'didattica', name: 'Didattica', icon: 'heroicons:academic-cap' },
  { id: 'opportunita', name: 'Opportunità', icon: 'heroicons:rocket-launch' },
  { id: 'eventi', name: 'Eventi', icon: 'heroicons:calendar-days' }
]

// Comunicazioni filtrate
const filteredCommunications = computed(() => {
  if (selectedCategory.value === 'all') {
    return communications.value
  }
  return communications.value.filter(comm => comm.category === selectedCategory.value)
})

// Funzioni utili
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-4 border-error bg-error/10'
    case 'medium': return 'border-l-4 border-warning bg-warning/10'
    case 'low': return 'border-l-4 border-info bg-info/10'
    default: return 'border-l-4 border-base-300 bg-base-200/50'
  }
}

const getCategoryIcon = (category: string) => {
  const cat = categories.find(c => c.id === category)
  return cat?.icon || 'heroicons:clipboard-document-list'
}

// Smooth scroll
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <!-- Hero Section -->
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0097b2] to-[#7ed957]"></div>
    
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <div class="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
      <!-- Logo -->
      <div class="mb-8">
        <img 
          src="/public/logo-dark-trasp.png" 
          alt="Logo Rappresentanti Informatica" 
          class="h-24 md:h-32 mx-auto mb-6 drop-shadow-lg"
        >
      </div>

      <!-- Title -->
      <h1 class="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight" style="font-family: 'League Spartan', sans-serif;">
        Rappresentanti<br>Informatica
      </h1>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
        Il punto di riferimento tra studenti e corso di laurea.<br>
        Qui trovi comunicazioni, questionari e tutto quello che ti serve.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <RouterLink 
          to="/questionario"
          class="btn btn-lg bg-white text-[#0097b2] hover:bg-white/90 border-none shadow-lg font-semibold px-8 transform hover:scale-105 transition-all duration-200"
        >
          <Icon icon="heroicons:document-text" class="h-6 w-6 mr-2" />
          Compila il Questionario
        </RouterLink>
        
        <button 
          @click="scrollToSection('communications')"
          class="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-[#0097b2] font-semibold px-8 transform hover:scale-105 transition-all duration-200"
        >
          <Icon icon="heroicons:arrow-down" class="h-6 w-6 mr-2" />
          Scopri le News
        </button>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon icon="heroicons:arrow-down" class="h-6 w-6 text-white/70" />
      </div>
    </div>
  </section>

  <!-- Communications Section -->
  <section id="communications" class="py-20 bg-base-100">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-base-content flex items-center justify-center gap-3" style="font-family: 'League Spartan', sans-serif;">
          <Icon icon="heroicons:megaphone" class="h-12 w-12" />
          Comunicazioni
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
          Resta aggiornato su tutte le novità del corso di laurea
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'btn btn-sm transition-all duration-200',
            selectedCategory === category.id 
              ? 'btn-primary' 
              : 'btn-outline btn-primary hover:btn-primary'
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
            'card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1',
            getPriorityClass(comm.priority)
          ]"
        >
          <div class="card-body">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div class="flex items-start gap-3">
                <Icon :icon="getCategoryIcon(comm.category)" class="h-6 w-6 text-primary" />
                <div>
                  <h3 class="card-title text-lg md:text-xl mb-2 text-base-content">
                    {{ comm.title }}
                  </h3>
                  <div class="flex items-center gap-2 text-sm text-base-content/60">
                    <Icon icon="heroicons:calendar-days" class="h-4 w-4" />
                    {{ formatDate(comm.date) }}
                  </div>
                </div>
              </div>
              
              <div class="badge badge-primary badge-outline">
                {{ comm.category }}
              </div>
            </div>

            <!-- Content -->
            <p class="text-base-content/80 leading-relaxed mb-4">
              {{ comm.content }}
            </p>

            <!-- Footer -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="text-sm text-base-content/60 flex items-center gap-1">
                <Icon icon="heroicons:pencil-square" class="h-4 w-4" />
                {{ comm.author }}
              </div>
              
              <div v-if="comm.cta" class="flex justify-end">
                <RouterLink 
                  :to="comm.cta.link"
                  class="btn btn-primary btn-sm"
                >
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

  <!-- Representatives Section -->
  <section id="representatives" class="py-20 bg-base-200">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-base-content flex items-center justify-center gap-3" style="font-family: 'League Spartan', sans-serif;">
          <Icon icon="heroicons:users" class="h-12 w-12" />
          I Tuoi Rappresentanti
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
          Ecco chi lavora per rappresentare i tuoi interessi nel corso di laurea
        </p>
      </div>

      <!-- Representatives Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="rep in representatives"
          :key="rep.id"
          class="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="card-body text-center">
            <!-- Avatar -->
            <div class="avatar placeholder mb-4">
              <div class="bg-gradient-to-br from-[#0097b2] to-[#7ed957] text-white rounded-full w-20 h-20">
                <span class="text-2xl font-bold">{{ rep.name.split(' ').map((n: string) => n[0]).join('') }}</span>
              </div>
            </div>

            <!-- Info -->
            <h3 class="card-title justify-center text-lg mb-2">{{ rep.name }}</h3>
            <p class="text-base-content/70 text-sm mb-1">{{ rep.role }}</p>
            <p class="text-base-content/60 text-xs mb-4">{{ rep.year }} • {{ rep.curriculum }}</p>

            <!-- Contact Buttons -->
            <div class="flex gap-2 justify-center">
              <a 
                :href="`mailto:${rep.email}`"
                class="btn btn-sm btn-outline btn-primary"
                title="Invia Email"
              >
                <Icon icon="heroicons:envelope" class="h-4 w-4" />
              </a>
              
              <a 
                :href="`https://t.me/${rep.telegram.replace('@', '')}`"
                target="_blank"
                class="btn btn-sm btn-outline btn-primary"
                title="Contatta su Telegram"
              >
                <Icon icon="logos:telegram" class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-base-300 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Logo & Info -->
        <div class="flex items-center gap-4">
          <img 
            src="/logo-dark-trasp.png" 
            alt="Logo Rappresentanti Informatica" 
            class="h-12"
          >
          <div>
            <h3 class="font-bold text-lg">Rappresentanti Informatica</h3>
            <p class="text-sm text-base-content/60">Università di Bologna</p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="flex gap-4">
          <RouterLink to="/questionario" class="btn btn-sm btn-outline">
            Questionario
          </RouterLink>
          <button @click="scrollToSection('communications')" class="btn btn-sm btn-outline">
            Comunicazioni
          </button>
          <button @click="scrollToSection('representatives')" class="btn btn-sm btn-outline">
            Contatti
          </button>
        </div>
      </div>

      <!-- Copyright -->
      <div class="divider"></div>
      <div class="text-center text-sm text-base-content/60">
        <p>&copy; {{ new Date().getFullYear() }} Rappresentanti Informatica - Università di Bologna</p>
      </div>
    </div>
  </footer>

  <!-- Floating Action Button -->
  <RouterLink 
    to="/questionario"
    class="fixed bottom-6 right-6 btn btn-circle btn-lg bg-gradient-to-br from-[#0097b2] to-[#7ed957] border-none text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 z-50"
    title="Vai al Questionario"
  >
    <Icon icon="heroicons:document-text" class="h-6 w-6" />
  </RouterLink>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Custom shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom gradient text */
.text-gradient {
  background: linear-gradient(135deg, #0097b2, #7ed957);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
