import { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import pin from "../images/pin-small.png";

const defaultImageUrl =
  "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg";

function VenuesListPage() {
  const [venues, setVenues] = useState([]);

  //Get all Venues
  const getAllVenues = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/venues`)
      .then((response) => {
        //console.log(response.data);
        setVenues(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVenues();
  }, []);

  return (
    <>
      <div>
        <section className="py-1 text-center container">
          <div className="row py-lg-3">
            <div className="col-lg-10 col-md-10 mx-auto">
              <h1 className="fw-light">Browse Amazing Venues</h1>
              <p className="lead text-muted">
                Discover a vast selection of amazing venues located in
                breathtaking destinations all over the world, and take the first
                step towards finding your dream location by checking out our
                comprehensive list of options today.
              </p>
            </div>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {venues.map((venueDetails) => {
                return (
                  <div className="col d-flex align-items-stretch" key={venueDetails._id}>
                    <div className="card  shadow-sm">
                      {venueDetails.imageUrl ? (
                        <div className="bd-placeholder-img card-img-top">
                          <Image
                            src={venueDetails.imageUrl}
                            alt={venueDetails.name}
                            style={{ width: "100%", height: "225" }}
                          />
                        </div>
                      ) : (
                        <div className="bd-placeholder-img card-img-top">
                          <Image
                            src={defaultImageUrl}
                            alt={venueDetails.name}
                            style={{ width: "100%", height: "225" }}
                          />
                        </div>
                      )}

                      <div className="card-body">
                        <h2 className="fw-bold">{venueDetails.name}</h2>
                        <h4>
                          {" "}
                          <img src={pin} alt="github" height="30" />{" "}
                          {venueDetails.address}
                        </h4>
                        <h5 className="fst-italic"> € {venueDetails.price}</h5>

                        <Link to={`/venues/${venueDetails._id}`}>
                          <button className="btn btn-purple text-white align-self-end">
                            MORE DETAILS
                          </button>
                        </Link>

                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VenuesListPage;
