<template>
  <div class="relative w-full mb-8">
    <div
      class="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-60 animate-pulse">
    </div>
    <div
      class="relative bg-gradient-to-br from-secondary to-accent rounded-3xl px-4 py-6 md:px-12 md:py-8 border-2 border-white/30">
      <div class="absolute -top-4 -right-6 md:-right-8 z-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg transform rotate-12">
          <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
          <span class="font-bold text-sm md:text-lg">ONLINE</span>
          <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>

      <div class="relative w-full mb-6 border-b-4 border-base-content/50">
        <h1 class="text-3xl md:text-6xl lg:text-7xl leading-tight">Assemblea Studentesca</h1>
        <h2 class="text-xl md:text-4xl">Proposte per i nuovi Piani Didattici a.a. 2027-2028</h2>

        <h5 class="my-5 text-lg md:text-2xl font-light italic">Un momento di ascolto e confronto per cambiare le cose!</h5>
      <h5 class="text-md md:text-lg text-pretty">Le opinioni raccolte saranno poi raggruppate per approvare o meno le proposte,<br>in modo da dare il parere degli studenti ai docenti della Commissione Piani Didattici.</h5>
      </div>
      <h3 class="text-2xl md:text-xl lg:text-3xl mb-4 leading-tight">
        mercoledì 20 maggio 2026 | dalle 16:00
      </h3>

      <div class="flex flex-col lg:flex-row gap-4 justify-center items-center w-full *:text-md md:*:text-lg">
        <a href="https://teams.microsoft.com/meet/386438130758200?p=AivLAvAF5qWFYUM3g6"
           target="_blank"
           class="btn gap-2 font-semibold min-w-0 w-full lg:w-auto h-auto min-h-0 flex items-center justify-center px-4 py-3 bg-white text-secondary border-none shadow-lg">
          <Icon icon="logos:microsoft-teams" class="h-6 w-6 min-w-fit" />
          <span class="whitespace-normal break-words text-center">Entra in chiamata su Teams</span>
        </a>
      
        <a href="https://forms.office.com/e/mn2W1wKw4a"
           target="_blank"
           class="btn gap-2 font-semibold min-w-0 w-full lg:w-auto h-auto min-h-0 flex items-center justify-center px-4 py-3 border-none shadow-lg hover:scale-105 transition-all duration-200">
          <Icon icon="heroicons:clipboard-document-list" class="h-6 w-6 min-w-fit" />
          <span class="whitespace-normal break-words text-center">Dai la tua opinione tramite il Sondaggio Online</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>