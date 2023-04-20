import { Link } from "react-router-dom";
import github from "../images/github white.png";
import linkedin from "../images/linkedin.png";

function Footer() {
  return (
    <>
      <div className="component">
        <div className="container-fluid text-center nav-backgr pt-2">
          <p className="text-white ">
            Built with 🤍 by <br />
            <div className="row justify-content-center">
            <div></div>
              <p className="col-12 col-md-6">
                <h6>Senem N. Osmanova</h6>
                <Link to="https://linkedin.com" className="navbar-brand">
                  <img src={linkedin} alt="linkedin" height="30" />
                </Link>{" "}
                {"   "}
                <Link to="https://github.com/SenemDEV" className="navbar-brand">
                  <img src={github} alt="github" height="30" />
                </Link>
              </p>

              <p className="col-12 col-md-6">
                <h6>Bartosz Dubinski</h6>
                <Link
                  to="https://www.linkedin.com/in/bartek-dubinski-1053amsterdam/"
                  className="navbar-brand"
                >
                  <img src={linkedin} alt="linkedin" height="30" />
                </Link>{" "}
                {"   "}
                <Link
                  to="https://github.com/bartoszde"
                  className="navbar-brand"
                >
                  <img src={github} alt="gitgub" height="30" />
                </Link>
              </p>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
