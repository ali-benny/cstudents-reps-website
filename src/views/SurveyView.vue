<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import degreesData from '../../config/degrees.json'
import teachingsData from '../../config/teachings.json'
import StarRating from '@/components/StarRating.vue'

const emptyCourse = {
  name: '',
  satisfaction: 0,
  relevance: 0,
  wouldChooseAgain: '',
  workload: 3,
  theoryPracticeBalance: 3,
  idealBalance: '',
  applicability: 0,
  courseDescriptionMatch: 0,
  evaluationCoherence: 0,
  materialQuality: 0,
  professorsEvaluation: [],
  suggestions: '',
  bestCurriculum: '',
}

const courses = ref([{ ...emptyCourse }])

// Lista dei curriculum disponibili
const curriculumOptions = [
  'Tecniche del Software',
  'Sistemi e Reti',
  'Informatica per il Management',
]

// Lista completa dei corsi
const allCourses = computed(() => {
  const informaticaMagistrale = degreesData.find((degree) => degree.id === 'informatica-magistrale')

  if (!informaticaMagistrale) {
    // Fallback se non trovato
    return [
      'Machine Learning',
      'Sistemi Distribuiti',
      // ... altri corsi ...
    ]
  }

  // Estrai i nomi dei corsi e formattali per renderli leggibili
  return informaticaMagistrale.teachings
    .map((teaching) => {
      // Controlla se teaching.name esiste prima di usarlo
      if (!teaching.name) return ''

      // Converte nomi come "machine-learning" in "Machine Learning"
      const formattedName = teaching.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return formattedName
    })
    .filter((name) => name !== '') // Filtra eventuali nomi vuoti
})

function getAvailableCoursesForIndex(currentIndex: number) {
  // Raccoglie i nomi dei corsi selezionati ECCETTO quello corrente
  const selectedCourseNames = courses.value
    .map((course, index) => (index !== currentIndex ? course.name : ''))
    .filter((name) => name !== '')

  // Ritorna tutti i corsi non selezionati o selezionati dal corso corrente
  return allCourses.value.filter((courseName) => !selectedCourseNames.includes(courseName))
}

function getOriginalCourseName(formattedName) {
  if (!formattedName) return ''
  return formattedName.toLowerCase().replace(/\s+/g, '-')
}

// Funzione per ottenere i professori di un corso
function getProfessorsForCourse(courseName) {
  if (!courseName) return []

  // Converte il nome del corso dal formato visualizzato al formato originale
  const originalName = getOriginalCourseName(courseName)

  // Cerca il corso nel file teachings.json
  const teaching = teachingsData.find((t) => t.url === originalName)

  // Se non trovato o non ha professori, ritorna array vuoto
  if (!teaching || !teaching.professors) return []

  return teaching.professors
}

// Funzione per creare un oggetto valutazione professore
function createProfessorEvaluation(professorId) {
  return {
    id: professorId,
    preparation: 0,
    clarity: 0,
    availability: 0,
  }
}

const studentProfile = ref({
  gender: '',
  age: null,
  residence: '',
  distanceKm: null,
  enrollmentYear: null,
  specialStatus: [],
  academicBackground: {
    degree: '',
    university: '',
  },
  curriculum: '',
  motivation: '',
})

const satisfaction = ref({
  general: 0,
  expectations: '',
  workPreparation: 0,
  organization: 0,
  facilities: 0,
})

const curriculumAnalysis = ref<{
  expectedCompetencies: number
  missingPreferences: string
  missingTopics: Record<string, string>
  missingUndergraduateCourses: string
  shortModulesInterest: number
  coursesSuggestions: string
}>({
  expectedCompetencies: 0,
  missingPreferences: '',
  missingTopics: {},
  missingUndergraduateCourses: '',
  shortModulesInterest: 0,
  coursesSuggestions: '',
})

const missingTopics = [
  'Architettura degli elaboratori',
  'Logica',
  'Programmazione',
  'Algoritmi e strutture dati',
  'Linguaggi di programmazione',
  'Sistemi operativi',
  'Tecnologie web',
  'Ingegneria informatica',
  'Informatica teorica',
  'Basi di dati',
  'Reti di calcolatori',
]

const futurePlans = ref({
  intentions: '',
  preparationPerception: 0,
  missingSkills: '',
})

const conclusions = ref({
  additionalFeedback: '',
})

// Monitora i cambiamenti nei corsi selezionati per aggiornare i professori
watch(
  () => courses.value.map((c) => c.name),
  (newNames) => {
    courses.value.forEach((course, index) => {
      if (course.name) {
        const professors = getProfessorsForCourse(course.name)

        professors.forEach((professor, index) => {
          professors[index] = professor
            .split('.')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        })

        // Aggiorna l'array delle valutazioni dei professori
        course.professorsEvaluation = professors.map((profId) => {
          // Cerca se esiste già una valutazione per questo professore
          const existingEval = course.professorsEvaluation?.find((e) => e.id === profId)
          return existingEval || createProfessorEvaluation(profId)
        })
      }
    })
  },
  { deep: true },
)

function addCourse() {
  courses.value.push({
    ...emptyCourse,
    professorsEvaluation: [],
  })
}

function removeCourse(index: number) {
  if (courses.value.length > 1) {
    courses.value.splice(index, 1)
  }
}

function submitSurvey() {
  const form = document.getElementById('survey-form')
  if (form && !form.checkValidity()) {
    alert('Per favore, compila tutti i campi obbligatori prima di inviare il questionario')
    return
  }

  console.log('Survey submitted:', {
    studentProfile: studentProfile.value,
    satisfaction: satisfaction.value,
    courses: courses.value,
    curriculumAnalysis: curriculumAnalysis.value,
    futurePlans: futurePlans.value,
    conclusions: conclusions.value,
  })

  // Qui si potrebbe implementare il salvataggio in IndexedDB
  alert('Grazie per aver completato il questionario!')
}
</script>

<template>
  <div class="md:py-6 space-y-10">
    <div class="card bg-base-100 shadow-xl m-0">
      <div class="card-body">
        <h1 class="card-title text-3xl mb-4">Questionario Studenti Magistrale</h1>

        <div class="alert alert-info mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span
            >Questo questionario è completamente anonimo e ci aiuterà a migliorare l'offerta
            formativa. Grazie per la tua partecipazione!</span
          >
        </div>

        <form id="survey-form" @submit.prevent="submitSurvey">
          <!-- Profilo dello studente -->
          <section class="divider divider-primary">Profilo dello Studente</section>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Genere</label>
                <select
                  v-model="studentProfile.gender"
                  class="select validator select-bordered w-full"
                >
                  <option disabled selected value="">Seleziona</option>
                  <option value="m">Maschio</option>
                  <option value="f">Femmina</option>
                  <option value="altro">Non in Lista</option>
                </select>
              </div>

              <div>
                <label>Età</label>
                <input
                  type="number"
                  v-model="studentProfile.age"
                  class="input input-bordered w-full validator"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Provenienza</label>
                <select
                  v-model="studentProfile.residence"
                  class="select validator select-bordered w-full"
                >
                  <option disabled selected value="">Seleziona</option>
                  <option value="in_sede">
                    In sede (Bologna o entro i 90min di percorrenza con i mezzi pubblici)
                  </option>
                  <option value="pendolare">
                    Pendolare (oltre i 90min di percorrenza con i mezzi pubblici)
                  </option>
                  <option value="fuorisede">Fuorisede</option>
                </select>
              </div>

              <div>
                <label>Anno di Immatricolazione</label>
                <select
                  v-model="studentProfile.enrollmentYear"
                  class="select validator select-bordered w-full"
                >
                  <option disabled selected value="">Seleziona</option>
                  <option
                    v-for="year in [2024, 2023, 2022, 2021, 2020, 2019]"
                    :key="year"
                    :value="year"
                  >
                    a.a. {{ year }}/{{ year + 1 }}
                  </option>
                  <option value="precedente">Precedente</option>
                </select>
              </div>
            </div>

            <div>
              <label>Status Particolari (seleziona tutti quelli applicabili)</label>
              <div class="flex gap-4 mt-2">
                <label class="cursor-pointer">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-accent checkbox-sm"
                    value="lavoratore"
                    v-model="studentProfile.specialStatus"
                  />
                  Lavoratore
                </label>
                <label class="cursor-pointer">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-accent checkbox-sm"
                    value="atleta"
                    v-model="studentProfile.specialStatus"
                  />
                  Atleta
                </label>
                <label class="cursor-pointer">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-accent checkbox-sm"
                    value="tempo_parziale"
                    v-model="studentProfile.specialStatus"
                  />
                  Studente a tempo parziale
                </label>
              </div>
            </div>
            <div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Corso di Laurea Triennale</label>
                  <input
                    type="text"
                    v-model="studentProfile.academicBackground.degree"
                    class="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label>Ateneo di Provenienza</label>
                  <input
                    type="text"
                    v-model="studentProfile.academicBackground.university"
                    class="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Valutazione complessiva -->
            <section class="divider divider-primary mt-8">
              Valutazione del percorso di studi
            </section>
            <div class="space-y-6">
              <div>
                <label>Quale Curriculum hai scelto?</label>
                <select
                  v-model="studentProfile.curriculum"
                  class="select validator select-bordered w-full"
                >
                  <option disabled selected value="">Seleziona</option>
                  <option
                    v-for="curriculum in curriculumOptions"
                    :key="curriculum"
                    :value="curriculum"
                  >
                    {{ curriculum }}
                  </option>
                </select>
              </div>

              <div>
                <label>Perché hai scelto questo Curriculum?</label>
                <textarea
                  v-model="studentProfile.motivation"
                  class="textarea textarea-bordered w-full h-24"
                ></textarea>
              </div>
            </div>
            <div class="rating-container">
              <label>Quanto sei soddisfatto ad oggi del Curriculum scelto?</label>
              <StarRating v-model="satisfaction.general" />
            </div>

            <div>
              <label>Corrispondenza tra Aspettative Iniziali e Realtà del Percorso</label>
              <textarea
                v-model="satisfaction.expectations"
                class="textarea textarea-bordered w-full h-24"
              ></textarea>
            </div>
          </div>

          <!-- Valutazione dei singoli corsi -->
          <section class="divider divider-primary mt-8">Valutazione dei Corsi</section>
          <div
            v-for="(course, index) in courses"
            :key="index"
            class="mb-6 p-4 bg-base-200 rounded-box"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">
                Corso #{{ index + 1 }} {{ course.name ? '- ' + course.name : '' }}
              </h3>
              <button
                type="button"
                @click.stop.prevent="removeCourse(index)"
                class="btn btn-sm btn-error"
                :disabled="courses.length <= 1"
              >
                Rimuovi
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label>Nome del Corso</label>
                <select v-model="course.name" class="select validator select-bordered w-full">
                  <option disabled selected value="">Seleziona</option>
                  <option v-for="c in getAvailableCoursesForIndex(index)" :key="c" :value="c">
                    {{ c }}
                  </option>
                </select>
              </div>

              <div>
                <label>In quale Anno Accademico hai seguito il corso?</label>
                <select
                  v-model="studentProfile.enrollmentYear"
                  class="select validator select-bordered w-full"
                >
                  <option disabled selected value="">Seleziona</option>
                  <option
                    v-for="year in [2024, 2023, 2022, 2021, 2020, 2019]"
                    :key="year"
                    :value="year"
                  >
                    a.a. {{ year }}/{{ year + 1 }}
                  </option>
                  <option value="precedente">Precedente</option>
                </select>
              </div>

              <div class="rating-container">
                <label>Soddisfazione Generale</label>
                <StarRating v-model="course.satisfaction" />
              </div>

              <div class="rating-container">
                <label>Quanto senti che sia stato importante per il tuo Percorso Formativo?</label>
                <StarRating v-model="course.relevance" />
              </div>

              <div>
                <label>A quale curriculum ritieni che questo corso dovrebbe appartenere?</label>
                <div class="flex gap-4 mt-2">
                  <label
                    v-for="curriculum in curriculumOptions"
                    :key="curriculum"
                    :value="curriculum"
                  >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-accent checkbox-sm"
                      :value="curriculum"
                    />
                    {{ curriculum }}
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-accent checkbox-sm"
                      value="Nessuno"
                    />
                    Nessuno
                  </label>
                </div>
              </div>

              <div>
                <label>Lo Sceglieresti Nuovamente?</label>
                <div class="flex gap-4">
                  <label class="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-choose-again-{{ index }}"
                      class="radio"
                      value="sì"
                      v-model="course.wouldChooseAgain"
                    />
                    <span class="label-text ml-2">Sì</span>
                  </label>
                  <label class="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-choose-again-{{ index }}"
                      class="radio"
                      value="no"
                      v-model="course.wouldChooseAgain"
                    />
                    <span class="label-text ml-2">No</span>
                  </label>
                  <label class="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-choose-again-{{ index }}"
                      class="radio"
                      value="non_so"
                      v-model="course.wouldChooseAgain"
                    />
                    <span class="label-text ml-2">Non so</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label>Il numero dei CFU assegnati sono adeguati al carico di lavoro?</label>
                <div class="w-full flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    v-model="course.workload"
                    class="range range-accent range-xs join-item w-full"
                  />
                </div>
                <div class="grid grid-cols-5 w-full text-xs mt-1">
                  <span
                    v-for="range in 5"
                    :class="range == 5 ? 'text-right' : range == 1 ? 'text-left' : 'text-center'"
                    >{{ range == 1 ? 'Troppo Pochi' : range == 5 ? 'Eccessivi' : '•' }}</span
                  >
                </div>
              </div>

              <div>
                <label>Equilibrio tra Teoria e Pratica</label>
                <div class="flex items-center w-full">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    v-model="course.theoryPracticeBalance"
                    class="range range-accent join-item w-full range-xs"
                  />
                </div>
                <div class="grid grid-cols-5 w-full text-xs mt-1">
                  <span
                    v-for="range in 5"
                    :class="range == 5 ? 'text-right' : range == 1 ? 'text-left' : 'text-center'"
                    >{{ range == 1 ? 'Teorico' : range == 5 ? 'Pratico' : '•' }}</span
                  >
                </div>
              </div>

              <div class="rating-container">
                <label>Corrispondenza tra Descrizione/Titolo del Corso e Contenuti Effettivi</label>
                <StarRating v-model="course.courseDescriptionMatch" />
              </div>

              <div class="rating-container">
                <label>Coerenza tra Contenuti del Corso e Modalità di Valutazione</label>
                <StarRating v-model="course.evaluationCoherence" />
              </div>

              <div class="rating-container">
                <label>Qualità del Materiale Didattico</label>
                <StarRating v-model="course.materialQuality" />
              </div>

              <div>
                <label>Suggerimenti per Migliorare il Corso</label>
                <textarea
                  v-model="course.suggestions"
                  class="textarea textarea-bordered w-full h-24"
                  placeholder="Aggiungeresti/toglieresti qualche argomento? Modificheresti la modalità d'esame?"
                ></textarea>
              </div>

              <div
                class="pt-4 border-t-2 border-base-content/10"
                v-if="course.professorsEvaluation && course.professorsEvaluation.length > 0"
              >
                <p class="text-lg font-bold mb-2">Valutazione dei Docenti</p>

                <div
                  v-for="(professor, profIndex) in course.professorsEvaluation"
                  :key="professor.id"
                  class="p-3 bg-base-300 rounded-box"
                >
                  <h4 class="font-medium mb-2">Docente: {{ professor.id }}</h4>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="rating-container">
                      <label>Preparazione</label>
                      <StarRating v-model="professor.preparation" />
                    </div>

                    <div class="rating-container">
                      <label>Chiarezza</label>
                      <StarRating v-model="professor.clarity" />
                    </div>

                    <div class="rating-container">
                      <label>Disponibilità</label>
                      <StarRating v-model="professor.availability" />
                    </div>

                    <div>
                      <label>Commenti personali</label>
                      <textarea
                        v-model="course.suggestions"
                        class="textarea textarea-bordered w-full md:w-3/1 h-24"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div
                  v-if="course.professorsEvaluation.length === 0"
                  class="text-sm italic text-opacity-70"
                >
                  Seleziona un corso per valutare i docenti.
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <button
              type="button"
              @click.stop.prevent="addCourse"
              class="btn btn-outline btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Aggiungi un altro corso
            </button>
          </div>

          <!-- Analisi curriculare -->
          <section class="divider divider-primary mt-8">Analisi Curriculare e Suggerimenti</section>
          <div class="space-y-4">
            <div class="rating-container">
              <label
                >Ritieni che il tuo curriculum ti abbia fornito le competenze che ti
                aspettavi?</label
              >
              <StarRating v-model="curriculumAnalysis.expectedCompetencies" />
            </div>

            <div>
              <label
                >Vorresti dei corsi aggiuntivi che approfondiscono argomenti già trattati?</label
              >
              <div class="flex gap-4">
                <label class="label cursor-pointer">
                  <input
                    type="radio"
                    class="radio"
                    value="sì"
                    v-model="curriculumAnalysis.missingPreferences"
                  />
                  <span class="label-text ml-2">Sì</span>
                </label>
                <label class="label cursor-pointer">
                  <input
                    type="radio"
                    class="radio"
                    value="no"
                    v-model="curriculumAnalysis.missingPreferences"
                  />
                  <span class="label-text ml-2">No</span>
                </label>
              </div>

              <div
                v-if="curriculumAnalysis.missingPreferences === 'sì'"
                class="mt-2 p-2 rounded-xl bg-base-200"
              >
                <h1 class="mb-2">Tra quelli proposti di seguito quale approfondiresti?</h1>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 p-2"
                  v-for="(course, index) in missingTopics"
                  :key="index"
                >
                  <label>{{ course }}</label>
                  <div class="flex gap-4">
                    <label class="label cursor-pointer">
                      <input
                        type="radio"
                        :name="`radio-choose-again-${index}`"
                        class="radio"
                        value="sì"
                        v-model="curriculumAnalysis.missingTopics[course]"
                      />
                      <span class="label-text ml-2">Sì</span>
                    </label>
                    <label class="label cursor-pointer">
                      <input
                        type="radio"
                        :name="`radio-choose-again-${index}`"
                        class="radio"
                        value="no"
                        v-model="curriculumAnalysis.missingTopics[course]"
                      />
                      <span class="label-text ml-2">No</span>
                    </label>
                  </div>
                  <div></div>
                  <div v-if="index === missingTopics.length - 1" class="w-2/1">
                    <input
                      type="text"
                      v-model="curriculumAnalysis.missingTopics.other"
                      class="input input-bordered w-full"
                      placeholder="Altro"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label>
                Interesse per corsi specifici della triennale non presenti nella magistrale</label
              >
              <textarea
                v-model="curriculumAnalysis.missingUndergraduateCourses"
                class="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div class="rating-container">
              <label>Interesse per moduli brevi (3 CFU) su competenze tecniche specifiche</label>
              <StarRating v-model="curriculumAnalysis.shortModulesInterest" />
            </div>

            <div>
              <label>Suggerimenti per nuovi corsi o modifiche al curriculum</label>
              <textarea
                v-model="curriculumAnalysis.coursesSuggestions"
                class="textarea textarea-bordered w-full h-24"
              ></textarea>
            </div>
          </div>

          <!-- Prospettive future -->
          <section class="divider divider-primary mt-8">Prospettive Future</section>
          <div class="space-y-4">
            <div>
              <label>Intenzioni post-laurea</label>
              <select
                v-model="futurePlans.intentions"
                class="select validator select-bordered w-full"
              >
                <option disabled selected value="">Seleziona</option>
                <option value="lavoro">Lavoro</option>
                <option value="dottorato">Dottorato</option>
                <option value="altro">Altro</option>
              </select>
            </div>

            <div class="rating-container">
              <label
                >Percezione di preparazione rispetto alle richieste del mercato del lavoro</label
              >
              <StarRating v-model="futurePlans.preparationPerception" />
            </div>

            <div>
              <label>Competenze che ritieni manchino nel tuo percorso formativo</label>
              <textarea
                v-model="futurePlans.missingSkills"
                class="textarea textarea-bordered w-full h-24"
              ></textarea>
            </div>

            <div class="rating-container">
              <label>Percezione di Preparazione per il Mondo del Lavoro</label>
              <StarRating v-model="satisfaction.workPreparation" />
            </div>

            <div class="rating-container">
              <label
                >Valutazione dell'Organizzazione Didattica (orari, calendario, distribuzione dei
                corsi)</label
              >
              <StarRating v-model="satisfaction.organization" />
            </div>

            <div class="rating-container">
              <label>Valutazione delle Strutture e dei Servizi di Supporto</label>
              <StarRating v-model="satisfaction.facilities" />
            </div>
          </div>

          <!-- Commenti conclusivi -->
          <section class="divider divider-primary mt-8">Commenti Conclusivi</section>
          <div>
            <label>Feedback aggiuntivi non coperti dalle domande precedenti</label>
            <textarea
              v-model="conclusions.additionalFeedback"
              class="textarea textarea-bordered w-full h-32"
            ></textarea>
          </div>

          <!-- Pulsante di invio -->
          <div class="flex justify-center mt-8">
            <button type="submit" class="btn btn-primary btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Invia Questionario
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: hsl(var(--b1) / var(--tw-bg-opacity, 1));
}

.divider-primary {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
