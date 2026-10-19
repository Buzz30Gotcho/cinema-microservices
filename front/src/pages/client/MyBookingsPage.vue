<template>
  <div class="min-h-screen bg-dark-bg text-light-text flex flex-col">
    <Header />
    
    <main class="flex-1 px-6 md:px-12 py-8">
      <div class="max-w-3xl mx-auto space-y-5">
        <h2 class="text-2xl font-bold text-light-text">Mes réservations</h2>

      <!-- Loading State -->
      <div v-if="bookingsStore.loading" class="flex justify-center py-12">
        <div class="text-muted-text">
          <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
          <p class="mt-2">Chargement...</p>
        </div>
      </div>

      <!-- Bookings List -->
      <div v-else-if="bookingsStore.userBookings.length > 0" class="space-y-4">
        <div
          v-for="booking in bookingsStore.userBookings"
          :key="booking.id"
          class="bg-dark-card rounded-xl border border-dark-border p-4 flex gap-4 items-start"
        >
          <!-- Affiche -->
          <div class="w-16 sm:w-20 aspect-[2/3] rounded-md overflow-hidden flex-shrink-0 bg-dark-bg border border-dark-border">
            <img
              :src="getMovieImage(booking.seance?.movieId, booking.seance)"
              :alt="getMovieTitle(booking.seance?.movieId, booking.seance)"
              class="w-full h-full object-cover"
              @error="(e) => e.target.src = 'https://via.placeholder.com/100x150?text=Film'"
            >
          </div>

          <!-- Détails -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-light-text truncate">{{ getMovieTitle(booking.seance?.movieId, booking.seance) }}</h3>
            <p class="text-muted-text text-sm mt-0.5">
              {{ booking.seance?.room || 'Salle inconnue' }} · {{ formatDateTime(booking.seance?.dateTime) }}
            </p>
            <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
              <span class="text-muted-text">Place <span class="text-light-text font-medium font-mono">{{ booking.seatNumber || 'N/A' }}</span></span>
              <span class="text-muted-text">Réf. <span class="text-light-text font-mono">#{{ booking.id.substring(0, 8) }}</span></span>
            </div>
            <button
              @click="handleCancelBooking(booking.id)"
              class="mt-3 px-3 py-1.5 text-sm rounded-md border border-danger/40 text-danger hover:bg-danger/10 transition-colors"
            >
              Annuler la réservation
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-muted-text mb-4">
          <i class="fa-solid fa-ticket text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-light-text mb-2">Aucune réservation</h3>
        <p class="text-muted-text" v-if="bookingsStore.error">
          {{ bookingsStore.error }}
        </p>
        <p class="text-muted-text" v-else>
          Vous n'avez pas encore effectué de réservation.
        </p>
        <router-link 
          to="/films"
          class="mt-4 inline-block px-4 py-2 bg-primary-accent hover:bg-primary-hover text-light-text rounded-lg transition-colors"
        >
          Voir les films
        </router-link>
      </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { useBookingsStore } from '@/stores/bookings.store'
import { useMoviesStore } from '@/stores/movies.store'

const router = useRouter()
const bookingsStore = useBookingsStore()
const moviesStore = useMoviesStore()

onMounted(async () => {
  await Promise.all([
    bookingsStore.fetchUserBookings(),
    moviesStore.fetchMovies() // Nécessaire pour obtenir les détails des films
  ])
})

const getMovieTitle = (movieId, seance) => {
  if (!movieId) return seance?.nameMovie || 'Film inconnu';
  const movie = moviesStore.movies.find(m => m.id === movieId)
  return movie?.title || seance?.nameMovie || 'Titre non trouvé'
}

const getMovieImage = (movieId, seance) => {
    console.log('getMovieImage - movieId:', movieId, 'seance:', seance);
    
    if (movieId) {
      const movie = moviesStore.movies.find(m => m.id === movieId || m.id == movieId);
      console.log('Film trouvé:', movie);
      if (movie) {
        const posterUrl = movie.posterUrl || movie.poster || movie.image;
        console.log('posterUrl:', posterUrl);
        if (posterUrl) {
          return posterUrl.startsWith('http') ? posterUrl : `/${posterUrl}`;
        }
      }
    }
    
    // Si seance a un nameMovie, essayer de trouver par nom
    if (seance?.nameMovie && moviesStore.movies.length > 0) {
      const movie = moviesStore.movies.find(m => 
        m.title && m.title.toLowerCase() === seance.nameMovie.toLowerCase()
      );
      console.log('Film trouvé par nom:', movie);
      if (movie) {
        const posterUrl = movie.posterUrl || movie.poster || movie.image;
        if (posterUrl) {
          return posterUrl.startsWith('http') ? posterUrl : `/${posterUrl}`;
        }
      }
    }
    
    if (seance?.posterPath) {
      return seance.posterPath.startsWith('http') ? seance.posterPath : `/${seance.posterPath}`;
    }
    
    console.log('Utilisation du placeholder');
    return 'https://via.placeholder.com/100x150';
}

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'Date inconnue'
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
}

const handleCancelBooking = async (bookingId) => {
  if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    try {
      await bookingsStore.cancelBooking(bookingId)
      // Le store rafraîchit déjà la liste, pas besoin d'action supplémentaire ici
    } catch (error) {
      alert('Erreur lors de l\'annulation: ' + (error.response?.data?.message || error.message))
    }
  }
}
</script>
