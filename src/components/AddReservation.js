import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddReservation(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [guestsNumber, setGuestsNumber] = useState("");
  const [venueDetails, setVenueDetails] = useState(null);

  // Fetch venueDetails from API or context and set it in state
  useEffect(() => {
    // Fetch venueDetails from API or context and set it in state
    axios
      .get(`${process.env.REACT_APP_APIURL}/api/venues/${props.venueId}`)
      .then((response) => {
        setVenueDetails(response.data);
      })
      .catch((error) => console.log(error));
  }, [props.venueId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!venueDetails) {
      // Handle if venueDetails is not available yet
      return;
    }

    // Convert guestsNumber to a number
    const guestsNumberInt = parseInt(guestsNumber, 10);

    // Check if guestsNumber is greater than the maximum venue capacity
    if (guestsNumberInt > venueDetails.capacity) {
      alert(`Number of guests exceeds the maximum venue capacity. Please provider number under ${venueDetails.capacity}`);
      return;
    }

    const requestBody = {
      title,
      weddingDate,
      guestsNumber: guestsNumberInt,
      user,
      venue: props.venueId,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_APIURL}/api/reservations`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setWeddingDate("");
        setGuestsNumber(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card pt-4 d-flex justify-content-center">
      {isLoggedIn ? (
        <>
          <h3>Add New Wedding Reservation</h3>
          <form onSubmit={handleSubmit}>
            <div className="col d-flex flex-column justify-content-center col-12 col-md-12 col-lg-12 mb-2 p-4">
            <label>Reservation title:</label>
              <input
                type="titexttle"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Wedding Date:</label>
              <input
                type="date"
                name="weddingDate"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
              />

              <label>Number of Guests</label>
              <input
                type="number"
                name="guestsNumber"
                value={guestsNumber}
                min="1"
                onChange={(e) => setGuestsNumber(e.target.value)}
              />
              {user !== user._id ? (
                <button className="reservation-btn" type="submit">
                  Add Reservation
                </button>
              ) : (
                <p className="mt-4">You are the owner of this venue</p>
              )}
            </div>
          </form>
        </>
      ) : (
        <h3>Please login to add a reservation</h3>
      )}
    </div>
  );
}

export default AddReservation;

