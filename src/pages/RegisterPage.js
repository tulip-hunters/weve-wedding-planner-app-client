import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Footer from "../components/Footer";
import registerimage from "../images/outdoor-wedding-venue.jpeg";

// const API_URL = "http://localhost:5005";

function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state

    // axios.post(`${API_URL}/auth/signup`, requestBody)

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <>
      <div className="card col-xs-12 col-md-8 col-lg-6 m-5 mx-auto">
        <img src={registerimage} className="card-img-top" alt="loginimage" />
        <div className="card-body text-center">
          <h1 className="card-title">REGISTER</h1>
          <br />
          <br />

          <form onSubmit={handleSignupSubmit}>
          <p>
              <label>NAME</label>
            </p>
            <p>
              <input
                className="col-8"
                placeholder="name"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </p>
            <p>
              <label>EMAIL</label>
            </p>
            <p>
              <input
                className="col-8 "
                placeholder="email@example.com"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
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

            <p>
              <button className="btn btn-purple text-white col-8" type="submit">
                REGISTER
              </button>
            </p>
            <br />
            <br />
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

//   return (
//     <>
//     <div>
//       <h1>Sign Up</h1>

//       <form onSubmit={handleSignupSubmit}>
//         <label>Email:</label>
//         <input type="email" name="email" value={email} onChange={handleEmail} />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={handlePassword}
//         />

//         <label>Name:</label>
//         <input type="text" name="name" value={name} onChange={handleName} />

//         <button className="btn btn-purple text-white" type="submit">Register</button>
//       </form>

//       {errorMessage && <p>{errorMessage}</p>}

//       <p>Already have account?</p>
//       <Link to={"/login"}>Login</Link>
//     </div>
//     <Footer />
//     </>
//   );
// }

export default RegisterPage;
