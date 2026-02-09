<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import ComunicationSection from '@/components/ComunicationSection.vue'
import ActivitiesSection from '@/components/ActivitiesSection.vue'

interface Representative {
  id: number | string
  name: string
  email: string
  telegram: string
  year?: string
  curriculum?: string
}
import { Icon } from '@iconify/vue'

const representatives = ref<Representative[]>([
  {
    id: 1,
    name: 'Alice Benatti',
    email: 'alice.benatti4@studio.unibo.it',
    telegram: '@alii_benatti',
    year: '1°',
    curriculum: 'Magistrale',
  },
  {
    id: 2,
    name: 'William Brusa',
    email: 'william.brusa@studio.unibo.it',
    telegram: '@OkGuh',
    year: '2°',
    curriculum: 'Triennale',
  },
  {
    id: 3,
    name: 'Rohan Regmi',
    email: 'rohan.regmi@studio.unibo.it',
    telegram: '@dark24x7',
    year: '2°',
    curriculum: 'Triennale',
  },
])

// Smooth scroll
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Auto-scroll quando l'utente scrolla un po' verso il basso
let hasAutoScrolled = false
const handleScroll = () => {
  const scrollY = window.scrollY
  const scrollThreshold = 10 // per attivare l'auto-scroll
  const resetThreshold = 50 // Torna sotto px per resettare

  // Reset quando torna in cima
  if (scrollY < resetThreshold) {
    hasAutoScrolled = false
    return
  }

  // Auto-scroll quando scrolla giù
  if (!hasAutoScrolled && scrollY > scrollThreshold) {
    hasAutoScrolled = true
    scrollToSection('activities')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Hero Section -->
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0097b2] to-[#7ed957]"></div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <div class="relative z-10 text-center px-4 max-w-7xl mx-auto">
      <!-- Logo -->
      <div class="mb-8">
        <img
          src="/src/assets/logo/logo-dark-trasp.png"
          alt="Logo Rappresentanti Informatica"
          class="h-24 md:h-32 mx-auto mb-6 drop-shadow-lg"
        />
      </div>

      <div class="relative inline-block mb-8">
        <div
          class="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-60 animate-pulse"
        ></div>
        <div
          class="relative bg-gradient-to-br from-[#0097b2] to-[#7ed957] rounded-3xl px-8 py-6 md:px-12 md:py-8 border-2 border-white/30"
        >
          <div class="absolute -top-4 -right-6 md:-right-8 z-10">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg transform rotate-12"
            >
              <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
              <span class="font-bold text-sm md:text-lg">Evento Speciale</span>
              <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>

          <div class="relative inline-block mb-6">
            <h1 class="text-4xl md:text-6xl lg:text-7xl leading-tight">Welcome Back Day</h1>
          </div>
          <h3 class="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
            venerdì 13 febbraio 2026 | 10:00 - 12:00
          </h3>
          <h3 class="text-xl leading-tight">Aula Magna - viale Berti Pichat 5</h3>
        </div>
      </div>

      <!-- Versione originale -->
      <!-- <h1 class="text-4xl md:text-6xl lg:text-7xl leading-tight">Rappresentanti Studenti</h1>
      <h3 class="text-6xl mb-6 leading-tight">Informatica L e LM</h3>
      <h3 class="text-xl mb-6 leading-tight">Alma Mater Studiorum - Università di Bologna</h3> -->

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
        <i>Sei uno studente della magistrale?</i><br />Incontra i docenti degli insegnamenti del
        secondo semestre, presenteranno brevemente il loro corso permettendoti di scegliere al
        meglio!
      </p>
      <!-- <p class="text-xl md:text-2xl mb-8 /90 max-w-3xl mx-auto leading-relaxed">
        La tua voce nel Corso di Laurea: news, bandi, assemblee, opportunità e supporto per
        migliorare insieme il tuo percorso accademico.
      </p> -->

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://teams.microsoft.com/meet/33156573730523?p=PhvuHwBcFDt6dJgJhY"
          target="_blank"
          class="btn btn-lg bg-white text-[#0097b2] hover:bg-white/90 border-none shadow-lg font-semibold px-8 transform hover:scale-105 transition-all duration-200"
        >
          <Icon icon="logos:microsoft-teams" class="h-6 w-6 mr-2" />
          Unisciti su Teams
        </a>

        <button
          @click="scrollToSection('communications')"
          class="btn btn-lg btn-outline font-semibold px-8 transform hover:scale-105 transition-all duration-200"
        >
          <Icon icon="heroicons:arrow-down" />
          Scopri le News
        </button>
      </div>
    </div>
    <!-- Scroll Indicator -->
    <button
      class="absolute cursor-pointer bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-3xl"
      @click="scrollToSection('activities')"
    >
      <Icon icon="heroicons:arrow-down" />
    </button>
  </section>

  <ActivitiesSection></ActivitiesSection>

  <ComunicationSection></ComunicationSection>

  <!-- Representatives Section -->
  <section id="representatives" class="py-20 bg-base-200">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h2
          class="text-4xl md:text-5xl mb-4 text-base-content flex items-center justify-center gap-3"
        >
          <Icon icon="heroicons:users" class="h-12 w-12" />
          I Tuoi Rappresentanti
        </h2>
        <p class="text-xl text-base-content/70 max-w-4xl mx-auto">
          Hai dubbi, idee o problemi da segnalare? Siamo qui per ascoltarti e aiutarti.
          <br />
          Miglioriamo insieme il corso di laurea!
        </p>
      </div>
      <!-- Telegram Group Card - Highlighted -->
      <div class="flex justify-center w-full mb-10">
        <div class="card bg-linear-to-br from-[#0097b2] to-[#7ed957] shadow-2xl w-full">
          <div class="card-body items-center">
            <h3 class="card-title text-3xl">Siamo qui per te</h3>
            <p class="text-center mb-4 text-md">
              Hai bisogno di supporto o vuoi condividere le tue idee? Scrivici su Telegram o alla
              mail dei rappresentanti.
            </p>
            <div class="flex gap-3">
              <a
                href="https://t.me/CStudentReps"
                class="btn btn-lg btn-outline !text-base-content rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
                target="_blank"
              >
                <Icon icon="logos:telegram" class="text-xl mr-2" />
                Unisciti al Gruppo
              </a>
              <a
                href="mailto:Informatica-rappr_stud_L_LM@unibo.it"
                class="btn btn-lg btn-outline !text-base-content rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
                target="_blank"
              >
                <Icon icon="heroicons-solid:mail" class="text-xl mr-2" />
                Scrivici una mail
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Representatives Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="rep in representatives"
          :key="rep.id"
          class="card bg-base-100 shadow-lg hover:shadow-2xl"
        >
          <div class="card-body items-center">
            <!-- Avatar -->
            <div class="avatar placeholder mb-4">
              <div
                class="bg-gradient-to-br from-[#0097b2] to-[#7ed957] rounded-full w-20 h-20 flex items-center justify-center"
              >
                <span class="text-2xl font-bold">{{
                  rep.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                }}</span>
              </div>
            </div>

            <!-- Info -->
            <h3 class="card-title justify-center text-lg mb-2">{{ rep.name }}</h3>
            <p class="text-base-content/60 text-xs mb-4">{{ rep.year }} • {{ rep.curriculum }}</p>

            <!-- Contact Buttons -->
            <div class="flex gap-2 justify-center *:text-lg *:hover:text-xl">
              <a
                :href="`mailto:${rep.email}`"
                class="btn btn-square btn-sm btn-ghost"
                title="Invia Email"
              >
                <Icon icon="heroicons-solid:mail" />
              </a>

              <a
                :href="`https://t.me/${rep.telegram.replace('@', '')}`"
                target="_blank"
                class="btn btn-square btn-sm btn-ghost"
                title="Contatta su Telegram"
              >
                <Icon icon="logos:telegram" />
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
            src="/src/assets/logo/logo-dark-trasp.png"
            alt="Logo Rappresentanti Informatica"
            class="h-12"
          />
          <div>
            <h3 class="text-lg">Rappresentanti Informatica</h3>
            <p class="text-sm text-base-content/60">Università di Bologna</p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="flex gap-4">
          <!-- <RouterLink to="/questionario" class="btn btn-sm btn-outline">
            Questionario
          </RouterLink> -->
          <button @click="scrollToSection('activities')" class="btn btn-sm btn-outline">
            Cosa Stiamo Facendo
          </button>
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
        <p>
          &copy; {{ new Date().getFullYear() }} Rappresentanti Informatica - Università di Bologna
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
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

/* Animazioni per card brillanti */
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }

  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

.sparkle-bg {
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 60% 70%, rgba(255, 165, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, rgba(255, 105, 180, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%);
  animation: sparkle-move 4s ease-in-out infinite;
}

@keyframes sparkle-move {
  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}
</style>
