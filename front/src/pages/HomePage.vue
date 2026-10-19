<template>
  <div class="min-h-screen bg-dark-bg text-light-text flex flex-col">
    <Header />

    <main class="flex-1">

      <!-- HERO SECTION -->
      <section class="relative h-[58vh] md:h-[68vh] flex items-center overflow-hidden">
        <!-- Fond : affiche du film à l'affiche, floutée + dégradé sombre -->
        <div class="absolute inset-0">
          <div
            v-if="featuredMovie.backdropUrl"
            class="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40"
            :style="{ backgroundImage: `url('${featuredMovie.backdropUrl}')` }"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/85 to-dark-bg/50"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/70 to-transparent"></div>
        </div>

        <!-- Contenu -->
        <div class="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
          <div class="max-w-2xl space-y-6">
            <Logo size="xl" class="mb-2" />
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold leading-tight text-light-text">
              Réservez votre séance en quelques clics
            </h1>
            <p class="text-base md:text-lg text-muted-text max-w-xl">
              Films à l'affiche, horaires en temps réel et paiement sécurisé. Votre prochaine soirée ciné commence ici.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <router-link to="/seances" class="px-7 py-3 bg-primary-accent hover:bg-primary-hover rounded-lg font-semibold transition-colors text-center">
                Voir les séances
              </router-link>
              <router-link to="/films" class="px-7 py-3 bg-dark-card hover:bg-dark-border border border-dark-border rounded-lg font-semibold transition-colors text-center">
                Parcourir les films
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- FILMS - Enhanced Movie Listings Grid -->
      <section class="px-4 md:px-12 py-14 md:py-20 bg-dark-card/30 border-t border-dark-border">
        <div class="max-w-7xl mx-auto">

          <div class="flex items-center justify-between gap-4 mb-8 md:mb-12">
            <h2 class="text-2xl md:text-4xl font-heading font-bold text-light-text">À l’affiche en ce moment</h2>
            <router-link to="/films" class="text-base text-primary-accent hover:underline">
              Voir tous les films →
            </router-link>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            <div
              v-for="movie in popularMovies"
              :key="movie.id"
              @click="goToMovie(movie.id)"
              class="group cursor-pointer rounded-xl overflow-hidden bg-dark-card border border-dark-border transition-all duration-300 hover:border-primary-accent/60 hover:-translate-y-1 hover:shadow-xl"
            >
              <div class="relative aspect-[2/3] overflow-hidden bg-dark-bg">
                <img
                  :src="movie.posterUrl"
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-3">
                <h3 class="font-semibold text-light-text truncate">{{ movie.title }}</h3>
                <p class="text-sm text-muted-text mt-0.5 truncate">
                  <span v-if="movie.duration">{{ movie.duration }} min</span>
                  <span v-if="movie.rating"> • {{ movie.rating }}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <!-- HOW IT WORKS - Polished Section -->
      <section class="px-4 md:px-12 py-14 md:py-24 border-t border-dark-border bg-dark-bg">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-2xl md:text-4xl font-heading font-bold text-light-text mb-4">Votre soirée ciné en 3 étapes</h2>
          <p class="text-base md:text-xl text-muted-text mb-10 md:mb-12">C'est simple, rapide et sécurisé.</p>

          <div class="grid md:grid-cols-3 gap-12">
            <div class="flex flex-col items-center space-y-4">
              <div class="flex items-center justify-center w-16 h-16 bg-dark-card border-2 border-primary-accent/50 rounded-full text-2xl font-bold text-primary-accent">1</div>
              <h4 class="font-semibold text-xl text-light-text">Choisissez votre film</h4>
              <p class="text-base text-muted-text">Parcourez notre catalogue et trouvez le film qui vous fait envie.</p>
            </div>
            <div class="flex flex-col items-center space-y-4">
              <div class="flex items-center justify-center w-16 h-16 bg-dark-card border-2 border-primary-accent/50 rounded-full text-2xl font-bold text-primary-accent">2</div>
              <h4 class="font-semibold text-xl text-light-text">Réservez votre séance</h4>
              <p class="text-base text-muted-text">Sélectionnez la date, l'heure et vos sièges préférés.</p>
            </div>
            <div class="flex flex-col items-center space-y-4">
              <div class="flex items-center justify-center w-16 h-16 bg-dark-card border-2 border-primary-accent/50 rounded-full text-2xl font-bold text-primary-accent">3</div>
              <h4 class="font-semibold text-xl text-light-text">Profitez du spectacle</h4>
              <p class="text-base text-muted-text">Présentez votre e-billet et savourez l'expérience Central Cinéma.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PROMO BANNER - Polished Section -->
      <section class="px-4 md:px-12 py-12 md:py-16">
        <div class="max-w-6xl mx-auto bg-primary-accent/10 border border-primary-accent/30 rounded-lg p-8 md:p-12 text-center shadow-lg">
          <h2 class="text-2xl md:text-4xl font-heading font-bold text-light-text mb-3">Offre Spéciale Étudiants</h2>
          <p class="text-base md:text-xl text-primary-accent max-w-xl mx-auto">
            Bénéficiez de -30% sur toutes les séances du lundi au jeudi sur présentation de votre carte étudiante.
          </p>
        </div>
      </section>

    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { moviesService } from '@/api/movies.service'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Logo from '@/components/common/Logo.vue'

const router = useRouter()
const goToMovie = (id) => router.push(`/film/${id}`)

const featuredMovie = ref({
  id: null,
  title: '',
  overview: '',
  backdropUrl: null,
});
const popularMovies = ref([])

onMounted(async () => {
  try {
    const response = await moviesService.getMovies()
    const movies = response.data || response
    popularMovies.value = movies.slice(0, 6).map(movie => ({
      id: movie.id,
      title: movie.title,
      duration: movie.duration,
      rating: movie.ageRating,
      posterUrl: movie.posterUrl || movie.image
    }))
    
    if (popularMovies.value.length > 0) {
      featuredMovie.value = {
        id: popularMovies.value[0].id,
        title: popularMovies.value[0].title,
        overview: popularMovies.value[0].title,
        backdropUrl: popularMovies.value[0].posterUrl,
      }
    }
  } catch (error) {
    console.error('Erreur chargement films:', error)
  }
})
</script>