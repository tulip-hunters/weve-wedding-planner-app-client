import axios from 'axios';

class VenuesService {
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

  // POST /api/venues
  createVenue = requestBody => {
    return this.api.post('/api/venues', requestBody);
  };

  // GET /api/venues
  getAllVenues = () => {
    return this.api.get('/api/venues');
  };

  // GET /api/venues/:id
  getVenue = id => {
    return this.api.get(`/api/venues/${id}`);
  };

  // PUT /api/venues/:id
  updateVenue = (id, requestBody) => {
    return this.api.put(`/api/venues/${id}`, requestBody);
  };

  // DELETE /api/venues/:id
  deleteVenue = id => {
    return this.api.delete(`/api/venues/${id}`);
  };
}

// Create one instance object
const venuesService = new VenuesService();

export default venuesService;
