import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "./../services/auth.service";
import Footer from "../components/Footer";
import loginimage from "../images/login-pic.jpeg"

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
    
      <div className="card col-xs-10 col-md-8 col-lg-6 m-5 mx-auto">
        <img src={loginimage} className="card-img-top" alt="loginimage" />
        <div className="card-body text-center">
          <h1 className="card-title">LOGIN</h1>
          <br />
       
  
          <form onSubmit={handleLoginSubmit}>
          <p>
            <label>EMAIL</label>
            </p>
            <p>
            <input className="col-8 " placeholder="email@example.com" type="email" name="email" value={email} onChange={handleEmail} />
            </p>
            <p>
            <label>PASSWORD</label>
            </p>
            <p>
            <input
            className="col-8 " 
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="******"
            />
            </p>
           
  <p><button className="btn btn-purple text-white col-8" type="submit">Login</button></p>
<br />
<br />
            
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
  
          <p>Don't have an account yet?</p>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
