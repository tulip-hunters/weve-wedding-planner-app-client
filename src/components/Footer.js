import { Link } from "react-router-dom";
import github from "../images/github white.png";

function Footer() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center nav-backgr pt-2">
          <p className="text-white">
            Built with 🤍 © 2023 by{" "}
            <img src={github} alt="github" height="30" />{" "}
            <Link to="https://github.com/SenemDEV" className="link-light">Senem N. Osmanova</Link> and{" "}
            <img src={github} alt="github" height="30" />{" "}
            <Link to="https://github.com/bartoszde" className="link-light">Bartosz Dubinski</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
