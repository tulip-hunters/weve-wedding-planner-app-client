import axios from 'axios';

class ReservationsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/reservations
  createReservation = requestBody => {
    return this.api.post('/api/reservations', requestBody);
  };

  // GET /api/reservations
  getAllReservations = () => {
    return this.api.get('/api/reservations');
  };

  // GET /api/reservations/:id
  getReservation = id => {
    return this.api.get(`/api/reservations/${id}`);
  };

  // PUT /api/reservations/:id
  updateReservation = (id, requestBody) => {
    return this.api.put(`/api/reservations/${id}`, requestBody);
  };

  // DELETE /api/reservations/:id
  deleteReservation = id => {
    return this.api.delete(`/api/reservations/${id}`);
  };
}

// Create one instance object
const reservationsService = new ReservationsService();

export default reservationsService;
