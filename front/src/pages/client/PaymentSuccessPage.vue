<template>
  <div class="min-h-screen bg-dark-bg text-light-text flex flex-col">
    <Header />
    
    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
        <!-- Icône + titre -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle :size="36" class="text-success" />
          </div>
          <h1 class="text-2xl font-bold text-light-text">Paiement réussi</h1>
          <p class="text-sm text-muted-text mt-1">Votre réservation est confirmée</p>
        </div>

        <!-- Détails -->
        <div class="divide-y divide-dark-border text-sm">
          <div class="flex justify-between gap-4 py-2.5">
            <span class="text-muted-text">Film</span>
            <span class="font-medium text-light-text text-right">{{ bookingData?.movieTitle || 'Réservation confirmée' }}</span>
          </div>
          <div v-if="bookingData?.sessionDate" class="flex justify-between gap-4 py-2.5">
            <span class="text-muted-text">Date &amp; heure</span>
            <span class="font-medium text-light-text text-right">{{ bookingData.sessionDate }} · {{ bookingData.sessionTime }}</span>
          </div>
          <div v-if="bookingData?.room" class="flex justify-between gap-4 py-2.5">
            <span class="text-muted-text">Salle</span>
            <span class="font-medium text-light-text">{{ bookingData.room }}</span>
          </div>
          <div v-if="bookingData?.seats?.length" class="flex justify-between gap-4 py-2.5">
            <span class="text-muted-text">Places</span>
            <span class="font-medium text-light-text text-right">{{ bookingData.seats.join(', ') }}</span>
          </div>
          <div class="flex justify-between gap-4 py-2.5">
            <span class="text-muted-text">Paiement</span>
            <span class="font-medium text-light-text">{{ getPaymentMethodName() }}</span>
          </div>
          <div class="flex justify-between gap-4 py-3">
            <span class="font-semibold text-light-text">Total payé</span>
            <span class="text-lg font-bold text-primary-accent">{{ (amount || 0).toFixed(2) }} €</span>
          </div>
        </div>

        <p class="text-xs text-muted-text text-center mt-4">Un email de confirmation vous a été envoyé.</p>

        <!-- Boutons -->
        <div class="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            @click="goToBookings"
            class="flex-1 px-5 py-2.5 bg-primary-accent text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2"
          >
            <Ticket :size="18" /> Mes réservations
          </button>
          <button
            @click="goHome"
            class="flex-1 px-5 py-2.5 bg-dark-card border border-dark-border text-light-text font-medium rounded-lg hover:border-primary-accent transition-colors inline-flex items-center justify-center gap-2"
          >
            <Film :size="18" /> Accueil
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { CheckCircle, Ticket, Film } from 'lucide-vue-next'

const router = useRouter()

const bookingData = ref(null)
const paymentMethod = ref(null)
const amount = ref(0)

onMounted(() => {
  // Récupérer les données de la réservation complète
  const savedData = localStorage.getItem('completedBooking')
  console.log('Données de réservation complète:', savedData)
  
  if (savedData) {
    const parsed = JSON.parse(savedData)
    bookingData.value = parsed.bookingData
    paymentMethod.value = parsed.paymentMethod
    amount.value = parsed.amount
    console.log('Données de réservation chargées:', bookingData.value)
    console.log('Montant:', amount.value)
    console.log('Méthode de paiement:', paymentMethod.value)
    
    // Nettoyer après récupération
    localStorage.removeItem('completedBooking')
  } else {
    console.log('Aucune donnée trouvée')
  }
})

const getPaymentMethodName = () => {
  const methods = {
    card: 'Carte bancaire',
    paypal: 'PayPal',
    apple: 'Apple Pay'
  }
  return methods[paymentMethod.value] || 'Non spécifié'
}

const goToBookings = () => {
  console.log('Navigation vers mes réservations...')
  router.push('/client/my-bookings')
}

const goHome = () => {
  console.log('Navigation vers l\'accueil...')
  router.push('/')
}
</script>
