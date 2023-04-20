import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import pin from "../images/pin-small.png";
import { AuthContext } from "../context/auth.context";
import venuesService from "../services/venues.service";
import Image from "react-bootstrap/Image";


const defaultImageUrl =
  "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg";

function VenueDetails(){
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



    return(
        <>
            <div className="container">
        <div className="row">
          {venueDetails ? (
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    {venueDetails.imageUrl ? (
                      <Image
                        src={venueDetails.imageUrl}
                        alt="image"
                        // style={{ width: "50", height: "auto" }}
                        className="card-img"
                      />
                    ) : (
                      <Image
                        src={defaultImageUrl}
                        alt="image"
                        // style={{ width: "50", height: "auto" }}
                        className="card-img"
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body card-details">
                    <h2 className="font-weight-bold title">
                      {venueDetails.name}
                    </h2>
                    <p className="fw-light fst-italic description"> {venueDetails.description} </p>
                    <p className="fw-bold fs-5">
                      <img src={pin} alt="github" height="30" />{" "}
                      {venueDetails.address}
                    </p>
                    <p className="fw-light fs-5">Price: €{venueDetails.price}</p>
                    <p className="fw-light fs-5">
                      Up to {venueDetails.capacity} guests
                    </p>

                    <p className="">
                      Additional offers:
                      <p></p>
                      {venueDetails.offers.join(", ")}
                    </p>
                    <Link to="/venues">
                      <button className="btn btn-purple text-white">
                        Back to all venues
                      </button>
                    </Link>
                    {venueDetails && user && venueDetails.user === user._id ? (
                      <Link to={`/venues/edit/${venueId}`}>
                        <button className="btn btn-outline-dark">
                          Edit Venue
                        </button>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </div>
        </>
    )
}
export default VenueDetails;