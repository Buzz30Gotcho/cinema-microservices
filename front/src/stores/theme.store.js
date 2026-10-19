import { defineStore } from 'pinia'

// Thème unique : sombre. (Le bouton jour/nuit a été retiré pour un rendu
// cohérent et plus pro ; on force le mode sombre sur toute l'application.)
export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: true
    }),

    getters: {
        theme: () => 'dark'
    },

    actions: {
        initializeTheme() {
            this.applyTheme()
        },

        applyTheme() {
            const html = document.documentElement
            html.classList.remove('light')
            html.classList.add('dark')
        }
    }
})
