import http from './http'

// Microservice Bookings: Gestion des réservations
export const bookingsService = {
    // Récupérer toutes les réservations (Admin)
    getBookings: () => http.get('/booking/reservation'),

    // Récupérer les réservations de l'utilisateur connecté
    getUserBookings: () => http.get('/booking/reservation/my'),

    // Récupérer une réservation spécifique
    getBookingById: (id) => http.get(`/booking/reservation/${id}`),

    // Créer une nouvelle réservation
    createBooking: (bookingData) => http.post('/booking/reservation', bookingData),

    // Mettre à jour une réservation
    updateBooking: (id, bookingData) => http.put(`/booking/reservation/${id}`, bookingData),

    // Annuler une réservation
    cancelBooking: (id) => http.delete(`/booking/reservation/${id}`),

    // Vérifier la disponibilité des places
    checkAvailability: (sessionId, seats) => http.post(`/booking/bookings/check-availability`, { sessionId, seats }),

    // Récupérer les places occupées pour une séance
    getOccupiedSeats: (sessionId) => http.get(`/booking/${sessionId}/occupied-seats`),

    // Traiter un paiement
    processPayment: (paymentData) => http.post('/payment/process', paymentData),

    // Récupérer un paiement
    getPayment: (paymentId) => http.get(`/payment/${paymentId}`),

    // Récupérer les paiements d'une réservation
    getPaymentsByReservation: (reservationId) => http.get(`/payment/reservation/${reservationId}`),

    // Rembourser un paiement
    refundPayment: (paymentId) => http.post(`/payment/${paymentId}/refund`),
}

export default bookingsService
