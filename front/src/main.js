import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './tailwind.css'
import './theme.css'
import { useAuthStore } from '@/stores/auth.store'
import { useThemeStore } from '@/stores/theme.store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Applique le thème (clair/sombre) dès le démarrage, sur toutes les pages
useThemeStore().initializeTheme()

const authStore = useAuthStore()

// Listen for token changes in other tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'token') {
    authStore.initializeAuth();
  }
});

async function initializeApp() {
  try {
    await authStore.initializeAuth()
  } catch (error) {
  }

  app.use(router)

  await router.isReady()

  app.mount('#app')
}

initializeApp()
