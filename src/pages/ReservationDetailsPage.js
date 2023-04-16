import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReservationDetailsPage() {

    const {reservationId } = useParams();
//     const [title, setTitle] = useState("");
//   const [weddingDate, setWeddingDate] = useState("");
//   const [guestsNumber, setGuestsNumber] = useState("");

  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_APIURL + "/" + reservationId)
    .then((response) => {
        console.log(response);
        setReservationDetails(response.data)
    })
    .catch((e) => {
        console.log("error loading reservations from API...", e);
      });
  }, [reservationId]);

    return (
        <div>
            
        
      <div
        className='card  h-100 m-5'
        style={{
          width: "20rem",
          borderRadius: "2rem ",
          border: ".2rem solid white",
        }}
      >  
        <div
          className='card-header bg-dark text-white fs-3'
          style={{ borderRadius: "1.9rem 2rem 0rem 0rem" }}
        >
          {reservationDetails.venueDetails ? reservationDetails.venueDetails : <p>Deleted Venue</p>}
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>Your Wedding Title:</p>
            </div>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>{reservationDetails.title}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>CWedding Date:</p>
            </div>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>{new Date(reservationDetails.weddingDate).toDateString("lookup")}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>Number of Guests:</p>
            </div>
            <div className='col-12 col-md-6 col-lg-6 mb-2'>
              <p>{reservationDetails.guestsNumber}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default ReservationDetailsPage;