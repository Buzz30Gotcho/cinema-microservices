<template>
  <div class="min-h-screen bg-dark-bg">
    <Header />
    <section class="px-4 md:px-12 py-10">
      <!-- Title only, as Header provides main navigation -->
      <h1 class="text-4xl font-heading font-bold text-light-text mb-8">Films à l'affiche</h1>

      <!-- Loading and Error states -->
      <div v-if="loading" class="text-center text-muted-text">Chargement des films...</div>
      <div v-if="error" class="text-center text-danger">Erreur: {{ error }}</div>

      <!-- Movies Grid -->
      <div v-if="!loading && !error" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="`/film/${movie.id}`"
          class="group block rounded-xl overflow-hidden bg-dark-card border border-dark-border transition-all duration-300 hover:border-primary-accent/60 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="relative aspect-[2/3] overflow-hidden bg-dark-bg">
            <img
              :src="movie.image"
              :alt="movie.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              v-if="movie.rating"
              class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-xs font-semibold text-primary-accent"
            >
              {{ movie.rating }}★
            </span>
          </div>
          <div class="p-3">
            <h3 class="font-semibold text-light-text truncate">{{ movie.title }}</h3>
            <p class="text-sm text-muted-text mt-0.5 truncate">
              <span v-if="movie.genre">{{ movie.genre }}</span>
              <span v-if="movie.duration"> • {{ movie.duration }} min</span>
            </p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies.store'
import { storeToRefs } from 'pinia'
import Header from '@/components/common/Header.vue'

const moviesStore = useMoviesStore()
const { movies, loading, error } = storeToRefs(moviesStore)

onMounted(() => {
  moviesStore.fetchMovies()
})
</script>

<style scoped></style>