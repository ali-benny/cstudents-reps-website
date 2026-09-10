<template>
  <div class="relative w-full mb-8">
    <div
      class="relative bg-base-100/25 rounded-3xl px-4 py-6 md:px-12 md:py-8 border-2 border-white/30">
      <!-- <div class="absolute -top-4 -right-6 md:-right-8 z-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg transform rotate-12"
        >
          <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
          <span class="font-bold text-sm md:text-lg">ONLINE</span>
          <Icon icon="heroicons:sparkles" class="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div> -->

      <div class="relative w-full mb-6">
        <!-- <h1 class="text-3xl md:text-6xl lg:text-7xl leading-tight">Welcome Days</h1> -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="flex items-between flex-col h-full border-b-2 pb-2 md:pb-0 md:border-r-2 md:border-b-0">
            <h2 class="text-3xl md:text-6xl">Welcome Day</h2>

            <h5 class="text-lg md:text-2xl font-light italic"> Matricole a.a. 2026/2027</h5>
            <h5 class="text-md md:text-lg text-pretty">Due chiacchiere con noi per chiarire ogni dubbio<br>e
              presentazione dei gruppi studenteschi del dipartimento<br>(ADMStaff, Cartabinaria, ULISSE)</h5>
            <div class="font-bold text-md md:text-xl lg:text-3xl mt-4 leading-tight bg-secondary/80 rounded-xl mx-4 my-auto">
              martedì 22 settembre 2026
              <h5 class="flex gap-1 justify-center items-baseline flex-wrap">
                <p class="md:text-2xl">dalle 18:00 in Aula Pincherle,</p>
                <p class="md:text-xl font-light">Dip. Matematica</p>
              </h5>
            </div>
          </div>
          <div>
            <h2 class="text-3xl md:text-6xl">How to 3 anno</h2>
            <h5 class="text-lg md:text-2xl font-light italic">Dedicato agli studenti del 3° anno Triennale!</h5>
            <h5 class="text-md md:text-xl text-pretty">Insegnamenti a scelta, piano didattico, tirocinio,
              tesi,<br>esami
              e tutto quello che c'è da sapere per affrontare al meglio il 3° anno.
            </h5>
            <div class="font-bold text-md md:text-xl lg:text-3xl mt-4 leading-tight bg-primary/80 rounded-xl mx-4 mt-auto">
              giovedì 24 settembre 2026
              <h5 class="flex gap-1 justify-center items-baseline flex-wrap">
                <p class="md:text-2xl">dalle 11:00 in Aula G,</p>
                <p class="md:text-xl font-light text-wrap flex flex-wrap">Dip. Giurisprudenza in via Andreatta 8</p>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-4 justify-center items-center w-full *:text-md md:*:text-lg">
        <a href="https://teams.microsoft.com/meet/315942013653168?p=Di5VAhx1L0LIelI3Cv" target="_blank"
          class="btn gap-2 font-semibold min-w-0 w-full lg:w-auto h-auto min-h-0 flex items-center justify-center px-4 py-3 bg-white text-secondary border-none shadow-lg">
          <Icon icon="logos:microsoft-teams" class="h-6 w-6 min-w-fit" />
          <span class="whitespace-normal break-words text-center">Segui gli eventi anche su Teams</span>
        </a>

        <!-- <a
          href="https://forms.office.com/e/mn2W1wKw4a"
          target="_blank"
          class="btn gap-2 font-semibold min-w-0 w-full lg:w-auto h-auto min-h-0 flex items-center justify-center px-4 py-3 border-none shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Icon icon="heroicons:clipboard-document-list" class="h-6 w-6 min-w-fit" />
          <span class="whitespace-normal break-words text-center"
            >Dai la tua opinione tramite il Sondaggio Online</span
          >
        </a> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
