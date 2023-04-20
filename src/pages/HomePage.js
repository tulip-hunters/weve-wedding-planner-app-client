import Footer from "../components/Footer";
import React from "react";
import ControlledCarousel from "../components/ControlledCarousel";

function HomePage() {
  return (
    <>
      <div>
        <ControlledCarousel />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 p-3 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">FREE REGISTRATION</div>
              <div className="card-body">
                <h5 className="card-title fw-bold google-color">
                  Register now!
                </h5>
                <p clasNames="card-text">
                  Full access to our platform is available only for registered
                  users. Register for free and book your perfect venue before
                  someone else does!
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 p-3 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">AMAZING VENUES</div>
              <div className="card-body">
                <h5 className="card-title fw-bold google-color">
                  Beautiful places!
                </h5>
                <p className="card-text">
                  Explore stunning wedding venues on WeVe! Dreaming of a French
                  castle or a Spanish beach? Browse our collection and plan your
                  perfect wedding today!{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 p-3 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">UNIQUE LOCATIONS</div>
              <div className="card-body">
                <h5 className="card-title fw-bold google-color">
                  Destination Wedding!
                </h5>
                <p className="card-text">
                  Discover a vast selection of amazing venues located in
                  breathtaking destinations all over the world, and take the
                  first step towards finding your dream location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
