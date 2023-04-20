import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import VenuesListPage from "../pages/VenuesListPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CreateVenuePage from "../pages/CreateVenuePage";
import ProfilePage from "../pages/ProfilePage";
import logo from "../images/weve-logo-white.png"

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const handleLogout = () => {
    logOutUser();
  };

  //  Rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid nav-backgr">
          <div className="navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/venues"
                  element={<VenuesListPage />}
                  className="nav-link text-white"
                >
                  ALL VENUES
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    to="/venues/create"
                    element={<CreateVenuePage />}
                    className="nav-link text-white"
                  >
                    ADD NEW VENUE
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-brand mx-auto">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="WeVe logo" height="100" /></Link>
          </div>
          <div className="navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                <li className="nav-item">
                    <span className="nav-link text-white">{`Hello, ${
                      user && user.name
                    }`}</span>
                  </li>
                  <li className="nav-item ">
                    <Link
                      to="/profilepage"
                      element={<ProfilePage />}
                      className="nav-link text-white"
                    >
                      PROFILE PAGE
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link to="/" className="nav-link btn text-white" onClick={handleLogout}>
                    LOGOUT
                  </Link>
                </li>

                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      element={<RegisterPage />}
                      className="nav-link text-white"
                    >
                      REGISTER
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      element={<LoginPage />}
                      className="nav-link text-white"
                    >
                      LOGIN
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
