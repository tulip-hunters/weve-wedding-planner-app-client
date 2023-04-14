import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';



const defaultImageUrl =
  "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg"; 


function VenueDetailsPage() {
  const { venueId } = useParams();

  const [venueDetails, setVenueDetails] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_APIURL + "/api/venues/" +  venueId)
      .then((response) => {
        console.log(response);
        setVenueDetails(response.data);
      })
      .catch((e) => {
        console.log("error loading venues from API...", e);
      });
  }, [venueId]);

  return (
    <>
   
      {venueDetails ? (
       <div  className="col-12">
        <div className="row">
        
          <div className="col-md-4">
          <div>
                {venueDetails.imageUrl ? (
                  <Image src={venueDetails.imageUrl} alt={venueDetails.name} style={{ width: '400px', height: 'auto' }}/>
                ) : (
                  <Image src={defaultImageUrl} alt={venueDetails.name} style={{ width: '400px', height: 'auto' }}/>
                )}
              </div>
          </div>
          <div className="col-md-8">
            <div className="card-body card-details">
              <h3 className="font-weight-bold text-left">{venueDetails.name}</h3>
              <p className="fw-lighter"> {venueDetails.description} </p>
              <p className="card-text">{venueDetails.address}</p>
              <p className="fw-semibold">{venueDetails.price}</p>
              <p className="fw-semibold">{venueDetails.capacity}</p>
              <p className="fw-semibold">{venueDetails.offers}</p>
              {/* <p className="fw-semibold">{venueDetails.comments}</p> */}
              {/* <p className="fw-semibold">{venueDetails.likes}</p> */}
              {/* <p className="fw-semibold">{venueDetails.reservations}</p> */}
              
            </div>
          </div>
          
        </div>
        </div>
      ) : (
        "loading...."
      )}
    </>
  );
}

export default VenueDetailsPage;