// src/api/booking.service.js
import http from './http'

// Ce service communique avec le microservice des sessions/réservations
export const sessionsService = {
    // === SÉANCES PUBLIQUES ===
    getAllSessions: () => http.get('/booking'),

    // === ADMINISTRATION DES SÉANCES ===

    // Récupérer toutes les séances
    adminGetSessions: () => http.get('/booking'),

    // Récupérer une séance spécifique par son ID
    adminGetSessionById: (id) => http.get(`/booking/${id}`),

    // Créer une nouvelle séance
    createSession: (sessionData) => http.post('/booking', sessionData),

    // Mettre à jour une séance
    updateSession: (id, sessionData) => http.put(`/booking/${id}`, sessionData),

    // Supprimer une séance
    deleteSession: (id) => http.delete(`/booking/${id}`)
}

export default sessionsService
