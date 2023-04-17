// import { useState, useEffect } from "react";
// import axios from "axios";
// import VenueDetailsPage from "./VenueDetailsPage";

// function MyVenuesPage() {
//   const [venues, setVenues] = useState([]);

//   const getAllVenues = () => {
//     const storedToken = localStorage.getItem("authToken");

//     axios
//       .get(`${process.env.REACT_APP_API_URL}/api/my-venues`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => setVenues(response.data))
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getAllVenues();
//   }, []);

// return (
//     <div>
//     {venues.length >= 1 ? (
//       venues.map((venue) => (
        
//       ))
//     ) : (
//       <div>
    
//           <p className="fs-5 m-2">There are no houses owned by you</p>
   
//       </div>
//     )}
//   </div>
// )
// }


// export default MyVenuesPage;