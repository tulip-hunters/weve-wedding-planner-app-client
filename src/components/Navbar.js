import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import VenuesListPage from "../pages/VenuesListPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CreateVenuePage from "../pages/CreateVenuePage";

function Navbar() {
   // Subscribe to the AuthContext to gain access to
   // the values from AuthContext.Provider `value` prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

   //  Rendering logic to display different content 
   //  depending on whether the user is logged in or not
    return (
        <nav>
      <Link to="/">WeVe</Link>  | {" "}
      <Link to="/venues" element={ <VenuesListPage /> }> All Venues </Link> | {" "}
      <Link to="/venues/create" element={ <CreateVenuePage /> }>Create a new Venue </Link>
      
      {isLoggedIn && (
        <>
      
      <button onClick={logOutUser}>Logout</button>  | {" "}
          <span>{user && user.name}</span>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/register" element={ <RegisterPage /> } > Register </Link>  | {" "}
          <Link to="/login" element={ <LoginPage /> } > Login </Link>  | {" "}
        </>
      )}      
 
    </nav>
    )
}

export default Navbar;