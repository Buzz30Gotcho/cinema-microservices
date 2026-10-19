// src/api/catalog/movies.service.js
import http from './http'

// Microservice Movies: Gestion du catalogue de films
export const moviesService = {
    // Récupérer tous les films
    getMovies: () => http.get('/catalog/movies'),

    // Récupérer un film spécifique
    getMovieById: (id) => http.get(`/catalog/movies/${id}`),

    // Créer un nouveau film (Admin)
    createMovie: (movieData) => http.post('/catalog/movies', movieData),

    // Mettre à jour un film (Admin)
    updateMovie: (id, movieData) => http.put(`/catalog/movies/${id}`, movieData),

    // Supprimer un film (Admin)
    deleteMovie: (id) => http.delete(`/catalog/movies/${id}`),

    // Obtenir les statistiques des films
    getMovieStats: () => http.get('/catalog/movies/stats/all')
}

export default moviesService
