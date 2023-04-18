import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";


const defaultImageUrl =
  "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg";

function VenuesListPage() {
  const [venues, setVenues] = useState([]);

  //Get all Venues
  const getAllVenues = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/venues`)
      .then((response) => {
        //console.log(response.data);
        setVenues(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVenues();
  }, []);

  return (
    <div>
      <h1>Our Venues</h1>
      <div>
        {venues.map((venueDetails) => {
          return (
            <div key={venueDetails._id}>
            
              <div>
                {venueDetails.imageUrl ? (
                  <Image src={venueDetails.imageUrl} alt={venueDetails.name} style={{ width: '400px', height: 'auto' }}/>
                ) : (
                  <Image src={defaultImageUrl} alt={venueDetails.name} style={{ width: '400px', height: 'auto' }}/>
                )}
              </div>
              <div>
              <h2>{venueDetails.name}</h2>
              <h4>{venueDetails.address}</h4>
              <p> € {venueDetails.price}</p>
              <Link to={`/venues/${venueDetails._id}`}>More Details</Link>
              <br />
              <br />
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VenuesListPage;
