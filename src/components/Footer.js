import { Link } from "react-router-dom";
import github from "../images/github white.png";
import linkedin from "../images/linkedin.png";

function Footer() {
  return (
    <>
      <div className="component">
        <div className="container-fluid text-center nav-backgr pt-2">
          <div className="text-white ">
            Built with 🤍 by <br />
            <div className="row justify-content-center">
            <div></div>
              <p className="col-12 col-md-6">
                <h6>Senem N. Osmanova</h6>
                <Link to="https://linkedin.com">
                  <img src={linkedin} alt="linkedin" height="30" />
                </Link>{" "}
                {"   "}
                <Link to="https://github.com/SenemDEV">
                  <img src={github} alt="github" height="30" />
                </Link>
              </p>

              <p className="col-12 col-md-6">
                <h6>Bartosz Dubinski</h6>
                <Link
                  to="https://www.linkedin.com/in/bartek-dubinski-1053amsterdam/"
                
                >
                  <img src={linkedin} alt="linkedin" height="30" />
                </Link>{" "}
                {"   "}
                <Link
                  to="https://github.com/bartoszde"
                
                >
                  <img src={github} alt="gitgub" height="30" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
