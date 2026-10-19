<template>
  <div class="min-h-screen bg-dark-bg text-light-text">
    <Header />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-40 text-muted-text">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      <p class="mt-4">Chargement du film...</p>
    </div>

    <!-- Error State -->
    <div v-if="error && !movie" class="text-center py-40">
      <p class="text-red-500 text-xl">{{ error }}</p>
    </div>

    <!-- Main Content -->
    <div v-if="movie && !loading" class="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
      <button @click="router.back()" class="text-sm text-muted-text hover:text-light-text mb-6 inline-flex items-center gap-1">
        ← Retour
      </button>

      <!-- En-tête : affiche + infos -->
      <div class="grid grid-cols-[120px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] gap-5 md:gap-8 items-start">
        <!-- Affiche -->
        <div class="aspect-[2/3] rounded-xl overflow-hidden border border-dark-border bg-dark-card">
          <img :src="movie.posterUrl || movie.image" :alt="movie.title" class="w-full h-full object-cover" />
        </div>

        <!-- Infos -->
        <div class="space-y-4 min-w-0">
          <div>
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-light-text">{{ movie.title }}</h1>
            <p class="text-muted-text text-sm mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span v-if="movie.year">{{ movie.year }}</span>
              <span v-if="movie.duration">· {{ movie.duration }} min</span>
              <span v-if="movie.genre">· {{ movie.genre }}</span>
              <span v-if="movie.ageRating">· {{ movie.ageRating }}</span>
              <span v-if="movie.rating" class="text-primary-accent font-semibold">· ★ {{ movie.rating }}/5</span>
            </p>
          </div>

          <p v-if="movie.synopsis || movie.description" class="text-light-text/90 leading-relaxed text-sm md:text-base">
            {{ movie.synopsis || movie.description }}
          </p>

          <!-- Détails condensés -->
          <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm pt-1">
            <div v-if="movie.director">
              <dt class="text-muted-text text-xs uppercase tracking-wide">Réalisateur</dt>
              <dd class="text-light-text font-medium">{{ movie.director }}</dd>
            </div>
            <div v-if="movie.writer">
              <dt class="text-muted-text text-xs uppercase tracking-wide">Scénariste</dt>
              <dd class="text-light-text font-medium">{{ movie.writer }}</dd>
            </div>
            <div v-if="movie.producer">
              <dt class="text-muted-text text-xs uppercase tracking-wide">Producteur</dt>
              <dd class="text-light-text font-medium">{{ movie.producer }}</dd>
            </div>
            <div v-if="movie.studio">
              <dt class="text-muted-text text-xs uppercase tracking-wide">Studio</dt>
              <dd class="text-light-text font-medium">{{ movie.studio }}</dd>
            </div>
          </dl>

          <div class="pt-2">
            <button @click="goToBooking"
              class="px-6 py-2.5 bg-primary-accent hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
              🎫 Réserver des places
            </button>
          </div>
        </div>
      </div>

      <!-- Films similaires -->
      <section v-if="similarMovies.length" class="mt-12 pt-8 border-t border-dark-border">
        <h2 class="text-xl md:text-2xl font-bold text-light-text mb-6">Films similaires</h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <div
            v-for="similar in similarMovies"
            :key="similar.id"
            @click="goToMovie(similar.id)"
            class="group cursor-pointer rounded-lg overflow-hidden bg-dark-card border border-dark-border hover:border-primary-accent/60 transition-colors"
          >
            <div class="aspect-[2/3] overflow-hidden bg-dark-bg">
              <img
                :src="similar.posterUrl || similar.image"
                :alt="similar.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-2">
              <h3 class="text-xs font-medium text-light-text truncate">{{ similar.title }}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies.store'
import { storeToRefs } from 'pinia'
import Header from '@/components/common/Header.vue'

const route = useRoute()
const router = useRouter()
const moviesStore = useMoviesStore()

// Reactive references to the store state
const { selectedMovie: movie, movies, loading, error } = storeToRefs(moviesStore)

// Fetch all movies if the list is empty (for similar movies)
onMounted(() => {
  if (movies.value.length === 0) {
    moviesStore.fetchMovies()
  }
})

// Function to load movie data
const loadMovie = (id) => {
  moviesStore.fetchMovieById(id)
}

// Load movie data when component mounts
onMounted(() => {
  loadMovie(route.params.id)
})

// Watch for route changes to load new movie data
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadMovie(newId)
  }
})

// Computed property for similar movies
const similarMovies = computed(() => {
  if (!movie.value || movies.value.length === 0) return []
  // Exclude current movie and filter by genre, then take top 5
  return movies.value
    .filter(m => m.id !== movie.value.id && m.genre === movie.value.genre)
    .slice(0, 5)
})

// Navigation functions
const goToBooking = () => {
  if (movie.value) {
    router.push(`/client/booking?movieId=${movie.value.id}`)
  }
}
const goToMovie = (id) => {
  router.push(`/film/${id}`)
  window.scrollTo(0, 0)
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>