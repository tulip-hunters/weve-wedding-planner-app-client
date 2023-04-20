import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import venuesService from "../services/venues.service";

function VenueReservations() {
  const { venueId } = useParams();
  const [venueDetails, setVenueDetails] = useState(null);
  const { user } = useContext(AuthContext);
  // const [userDetails, setUserDetails] = useState(null);

  const getVenue = () => {
    venuesService
      .getVenue(venueId)
      .then((response) => {
        const oneVenue = response.data;
        setVenueDetails(oneVenue);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getVenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section>
        <div className="container pb-4">
          {venueDetails && venueDetails.reservations.length >= 1 && (
            <div className="row mb-4">
              <div className="card align-items-center pt-3 bg-light ">
                <h4 className="align-items-center text-black">Reservations</h4>

                {venueDetails &&
                  venueDetails.reservations.map((reservation) => (
                    <div
                      className="card mb-2 col-6 text-black"
                      key={reservation._id}
                    >
                      <div className="row d-flex justify-content-between">
                        <div className="col-6">
                          <p>Reserved for: {reservation.title}</p>
                        </div>
                        <div className="col-6">
                          <p>
                            {new Date(reservation.weddingDate).toLocaleString(
                              "en-uk",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default VenueReservations;
