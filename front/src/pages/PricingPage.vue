<template>
  <div class="min-h-screen bg-dark-bg flex flex-col">
    <Header />

    <main class="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-10">
      <!-- En-tête -->
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-light-text">Nos tarifs</h1>
        <p class="text-muted-text mt-1 text-sm md:text-base">Vivez le cinéma à votre rythme et à vos conditions</p>
      </div>

      <!-- Cartes tarifs -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex flex-col bg-dark-card border rounded-xl p-5"
          :class="plan.featured ? 'border-primary-accent' : 'border-dark-border'"
        >
          <span
            v-if="plan.featured"
            class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary-accent text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          >
            POPULAIRE
          </span>

          <div class="flex items-center justify-between">
            <h3 class="text-lg font-heading font-bold text-light-text">{{ plan.name }}</h3>
            <span class="text-2xl">{{ plan.icon }}</span>
          </div>
          <p class="text-muted-text text-xs mb-4">{{ plan.tagline }}</p>

          <div class="flex items-baseline gap-2 mb-4">
            <span class="text-3xl font-heading font-extrabold text-primary-accent">{{ plan.price }}</span>
            <span class="text-muted-text text-xs">/ place</span>
            <span v-if="plan.badge" class="ml-auto bg-primary-accent/15 text-primary-accent text-xs px-2 py-0.5 rounded">{{ plan.badge }}</span>
          </div>

          <ul class="space-y-2 mb-5 flex-grow text-sm">
            <li v-for="f in plan.features" :key="f.title" class="flex items-start gap-2">
              <span class="text-primary-accent mt-0.5">✓</span>
              <span>
                <span class="text-light-text font-medium">{{ f.title }}</span>
                <span class="text-muted-text"> — {{ f.sub }}</span>
              </span>
            </li>
          </ul>

          <router-link
            to="/seances"
            class="block w-full py-2.5 rounded-lg text-center font-semibold transition-colors"
            :class="plan.featured ? 'bg-primary-accent text-white hover:bg-primary-hover' : 'border border-dark-border text-light-text hover:border-primary-accent'"
          >
            Réserver
          </router-link>
        </div>
      </div>

      <!-- Infos -->
      <div class="bg-dark-card border border-dark-border rounded-xl p-5">
        <h3 class="font-bold text-light-text mb-3">Informations importantes</h3>
        <ul class="text-muted-text text-sm space-y-2">
          <li>• Les tarifs étudiants nécessitent une carte d'étudiant valide présentée à l'accueil.</li>
          <li>• Les suppléments 3D s'ajoutent au tarif de base choisi.</li>
          <li>• Groupes de 10 personnes et plus : contactez-nous pour des tarifs spéciaux.</li>
        </ul>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

const plans = [
  {
    name: 'Standard', icon: '🎬', tagline: 'Le classique indémodable', price: '10€',
    features: [
      { title: 'Séances 2D', sub: 'Toutes nos salles' },
      { title: 'Choix de la place', sub: 'Disponibilité en temps réel' },
      { title: 'Annulation flexible', sub: "Jusqu'à 2h avant" },
      { title: 'Siège confortable', sub: 'Accoudoirs intégrés' },
    ],
  },
  {
    name: 'Étudiant', icon: '📚', tagline: 'Tarif réduit avec justificatif', price: '7€', badge: '-30%',
    features: [
      { title: 'Séances 2D', sub: 'Toutes les séances' },
      { title: 'Choix de la place', sub: 'Toutes les salles' },
      { title: 'Annulation flexible', sub: "Jusqu'à 2h avant" },
      { title: 'Justificatif requis', sub: 'Carte étudiant valide' },
    ],
  },
  {
    name: 'Premium', icon: '👑', tagline: "L'expérience cinéma ultime", price: '15€', badge: '+50%', featured: true,
    features: [
      { title: 'Séances 2D et 3D', sub: '+2€ pour la 3D' },
      { title: 'Siège premium', sub: 'Fauteuil 4D inclinable' },
      { title: 'Priorité de réservation', sub: 'Les meilleures places' },
      { title: 'Points fidélité x2', sub: 'Programme de récompenses' },
    ],
  },
]
</script>
