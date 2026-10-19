/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                // --- Tokens sémantiques (pilotés par theme.css) ---
                'dark-bg': 'var(--bg-primary)',
                'dark-card': 'var(--bg-secondary)',
                'dark-border': 'var(--border)',

                'light-text': 'var(--text-primary)',
                'muted-text': 'var(--text-muted)',
                'dark-text': 'var(--text-muted)',

                'primary-accent': 'var(--accent)',
                'primary-hover': 'var(--accent-hover)',
                'secondary-accent': 'var(--text-muted)',
                'secondary-hover': 'var(--border-strong)',

                // Sémantiques (statut)
                'success': '#3FB950',
                'info': 'var(--accent)',
                'warning': '#E3B341',
                'danger': '#F85149',
                'danger-hover': '#DA3633',

                // --- Remap des couleurs brutes vers le thème ---
                // Permet aux centaines de classes existantes (bg-slate-800,
                // text-white, hover:bg-blue-600, dégradés…) de basculer avec le thème.
                white: 'var(--text-primary)',
                black: 'var(--bg-deep)',

                slate: {
                    50: 'var(--bg-tertiary)',
                    100: 'var(--text-primary)',
                    200: 'var(--text-secondary)',
                    300: 'var(--text-secondary)',
                    400: 'var(--text-muted)',
                    500: 'var(--text-muted)',
                    600: 'var(--border-strong)',
                    700: 'var(--border)',
                    800: 'var(--bg-secondary)',
                    900: 'var(--bg-primary)',
                    950: 'var(--bg-deep)',
                },

                blue: {
                    400: 'var(--accent)',
                    500: 'var(--accent)',
                    600: 'var(--accent-hover)',
                },

                purple: {
                    300: 'var(--accent)',
                    600: 'var(--accent-hover)',
                },

                cinema: {
                    dark: 'var(--bg-primary)',
                    darkAlt: 'var(--bg-secondary)',
                    highlightEdit: '#FFFF00',
                    highlightDelete: '#FF00FF',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
