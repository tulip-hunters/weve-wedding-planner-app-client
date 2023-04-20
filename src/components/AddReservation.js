import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";


function AddReservation(props) {
  const { isLoggedIn, user, setRefresh, refresh } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [guestsNumber, setGuestsNumber] = useState("");
  const [venueDetails, setVenueDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch venueDetails from API or context and set it in state
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/venues/${props.venueId}`)
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
      alert(
        `Number of guests exceeds the maximum venue capacity. Please provide a number under ${venueDetails.capacity}`
      );
      return;
    }

    const requestBody = {
      title,
      weddingDate,
      guestsNumber: guestsNumberInt,
      user: user._id, // Use user._id instead of user, as user is an object
      venue: props.venueId,
    };
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/reservations`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setTitle("");
        setWeddingDate("");
        setGuestsNumber(0);
        setRefresh(!refresh);
        navigate(`/profilepage`);

        // Update venueDetails with new reservation
        const newReservation = response.data;
        setVenueDetails((prevVenueDetails) => {
          // Check if venueDetails is null, return previous state
          if (!prevVenueDetails) {
            return prevVenueDetails;
          }

          // Update venueDetails with new reservation
          const updatedReservations = [
            newReservation,
            ...prevVenueDetails.reservations,
          ];
          return { reservations: updatedReservations, ...prevVenueDetails };
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <div className="card pt-4 d-flex justify-content-center m-5">
      {isLoggedIn ? (
        <>
          <h3>Add New Wedding Reservation</h3>
          <form className="container" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-3">
                <input
                  type="text"
                  name="title"
                  value={title}
                  className="form-control"
                  placeholder="Your names"
                  aria-label="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-3">
                <input
                  type="date"
                  name="weddingDate"
                  value={weddingDate}
                  className="form-control"
                  placeholder="Wedding Date"
                  aria-label="weddingDate"
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </div>
              <div className="col-3">
                <input
                  type="number"
                  name="guestsNumber"
                  className="form-control"
                  value={guestsNumber}
                  min="1"
                  placeholder="Number of guests"
                  aria-label="guestsNumber"
                  onChange={(e) => setGuestsNumber(e.target.value)}
                />
              </div>
              <div className="col-3 mx-auto">
                {user !== user._id ? (
                  <button className="btn btn-purple w-100 text-white" type="submit">
                    Add Reservation
                  </button>
                ) : (
                  <p className="mt-4">You are the owner of this venue</p>
                )}
              </div>
            </div>
          </form>
        </>
      ) : (
        <h3>To add new reservation please  --register-- or --login--</h3>
      )}
    </div>
    </>
  );
}

export default AddReservation;