import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import AddReservation from "../components/AddReservation";

const defaultImageUrl =
  "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg";

function VenueDetailsPage() {
  const { venueId } = useParams();

  const [venueDetails, setVenueDetails] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_APIURL + "/api/venues/" + venueId)
      .then((response) => {
        console.log(response);
        setVenueDetails(response.data);
      })
      .catch((e) => {
        console.log("error loading venues from API...", e);
      });
  }, [venueId]);

  return (
    <>
      {venueDetails ? (
        <div className="col-12">
          <div className="row">
            <div className="col-md-6">
              <div>
                {venueDetails.imageUrl ? (
                  <Image
                    src={venueDetails.imageUrl}
                    alt={venueDetails.name}
                    style={{ width: "600px", height: "auto" }}
                  />
                ) : (
                  <Image
                    src={defaultImageUrl}
                    alt={venueDetails.name}
                    style={{ width: "600px", height: "auto" }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-5">
              <div className="card-body card-details">
                <h3 className="font-weight-bold text-left">
                  {venueDetails.name}
                </h3>
                <p className="fw-lighter"> {venueDetails.description} </p>
                <p className="card-text">📍 {venueDetails.address}</p>
                <p className="fw-semibold">Price: € {venueDetails.price}</p>
                <p className="fw-semibold">
                  Max guests capacity: {venueDetails.capacity}
                </p>

                <p className="fw-semibold">
                  Additional offer:
                  {venueDetails.offers.join(", ")}
                </p>

                {/* <p className="fw-semibold">{venueDetails.comments}</p> */}
                {/* <p className="fw-semibold">{venueDetails.likes}</p> */}
                {/* <p className="fw-semibold">{venueDetails.reservations}</p> */}
                <Link to="/venues">
                  <button>Back to all venues</button>
                </Link>

                <Link to={`/venues/edit/${venueId}`}>
                  <button>Edit Venue</button>
                </Link>
                {/* <Link to={`/venues/${venueId}/reservations`}>
                  <button>Place a reservation</button>
                </Link> */}
              </div>
            </div>
            <section>
              <AddReservation venueId={venueId} />
            </section>
            <section>
              {venueDetails && venueDetails.reservations.length >= 1 && (
                <div className="row mb-2 mx-2">
                  <div className="card align-items-center bg-light">
                    <h4 className="align-items-center text-black">
                      Reservations
                    </h4>
                    {venueDetails &&
                      venueDetails.reservations.map((reservation) => (
                        <div
                          className="card mb-5 text-black"
                          key={reservation._id}
                        >
                          <div className="row ">
                            <div className="row">
                              <p>Reserved for: {reservation.title}</p>
                            </div>
                            <div>
                              <p>
                                {new Date(
                                  reservation.weddingDate
                                ).toLocaleString("en-uk", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      ) : (
        "loading...."
      )}
    </>
  );
}

export default VenueDetailsPage;