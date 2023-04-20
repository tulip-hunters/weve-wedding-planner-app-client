import Footer from "../components/Footer";
import React from "react";
import ControlledCarousel from "../components/ControlledCarousel";

function HomePage() {
  return (
    <>
      <div>
        <ControlledCarousel />
      </div>
      <div className="component">
        <div className="container-fluid">
          <div className="row">
            <div className="col m-4">
              <div className="card">
                <div className="card-header">FREE REGISTRATION</div>
                <div className="card-body">
                  <h5 className="card-title">Register now!</h5>
                  <p clasNames="card-text">
                    Full access to our platform is available only for registered
                    users. Register for free and book your perfect venue before
                    someone else does!
                  </p>
                  <a href="/register" className="btn btn-purple text-white">
                    REGISTER
                  </a>
                </div>
              </div>
            </div>
            <div className="col m-4">
              <div className="card">
                <div className="card-header">AMAZING VENUES</div>
                <div className="card-body">
                  <h5 className="card-title">Destination Wedding!</h5>
                  <p className="card-text">
                    Discover a vast selection of amazing venues located in
                    breathtaking destinations all over the world, and take the
                    first step towards finding your dream location.
                  </p>
                  <a href="/venues" className="btn btn-purple text-white">
                    CHECK VENUES
                  </a>
                </div>
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
