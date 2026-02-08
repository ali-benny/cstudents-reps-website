<script setup lang="ts">
import { ref } from 'vue'
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

    <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
      <!-- Logo -->
      <div class="mb-8">
        <img
          src="/src/assets/logo/logo-dark-trasp.png"
          alt="Logo Rappresentanti Informatica"
          class="h-24 md:h-32 mx-auto mb-6 drop-shadow-lg"
        />
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl leading-tight">Rappresentanti Studenti</h1>
      <h3 class="text-6xl mb-6 leading-tight">Informatica L e LM</h3>
      <h3 class="text-xl mb-6 leading-tight">Alma Mater Studiorum - Università di Bologna</h3>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl mb-8 /90 max-w-3xl mx-auto leading-relaxed">
        La tua voce nel Corso di Laurea: news, bandi, assemblee, opportunità e supporto per
        migliorare insieme il tuo percorso accademico.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <!-- <RouterLink to="/questionario"
          class="btn btn-lg bg-white text-[#0097b2] hover:bg-white/90 border-none shadow-lg font-semibold px-8 transform hover:scale-105 transition-all duration-200">
          <Icon icon="heroicons:document-text" class="h-6 w-6 mr-2" />
          Compila il Questionario
        </RouterLink> -->

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
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-3xl">
      <Icon icon="heroicons:arrow-down" />
    </div>
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
</style>
