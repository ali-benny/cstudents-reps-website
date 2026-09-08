<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { scrollToSection } from '@/utils'

const route = useRoute()

// Nascondi la navbar sulla homepage
const notHomepage = computed(() => route.name !== 'home')
</script>

<template>
  <header v-if="notHomepage" class="bg-gradient-to-br from-[#0097b2] to-[#7ed957] shadow-md">
    <div class="navbar container mx-auto">
      <div class="flex-1">
        <RouterLink
          to="/"
          class="normal-case text-xl flex flex-row items-center gap-4 !text-base-content font-bold"
        >
          <img src="./assets/logo/icon-dark-trasp.png" class="w-20 drop-shadow-lg" />
          <p class="w-auto drop-shadow-lg">Torna alla home</p>
        </RouterLink>
      </div>
      <div class="flex-none">
        <nav class="menu menu-horizontal px-1">
          <!-- <RouterLink to="/" class="btn btn-ghost">Home</RouterLink> -->
          <!-- <RouterLink to="/questionario" class="btn btn-ghost">Questionario</RouterLink> -->
        </nav>
      </div>
    </div>
  </header>

  <main :class="notHomepage ? 'container mx-auto md:p-4' : ''">
    <RouterView />
  </main>

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
        <div class="flex gap-1 md:gap-4">
          <RouterLink v-if="route.name !== 'archive'" to="/archive" class="btn btn-sm btn-outline">
            Archivio Comunicazioni
          </RouterLink>
          <RouterLink v-if="notHomepage" to="/" class="btn btn-sm btn-outline"> Home </RouterLink>
          <button
            v-if="!notHomepage"
            @click="scrollToSection('activities')"
            class="btn btn-sm btn-outline"
          >
            Cosa Stiamo Facendo
          </button>
          <button
            v-if="!notHomepage"
            @click="scrollToSection('communications')"
            class="btn btn-sm btn-outline"
          >
            Comunicazioni
          </button>
          <button
            v-if="!notHomepage"
            @click="scrollToSection('representatives')"
            class="btn btn-sm btn-outline"
          >
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
