// import Image from "react-bootstrap/Image";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfilePage.css"

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [venues, setVenues] = useState({});

  useEffect(() => {
    // Fetch all venues and store them in state
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/venues`)
      .then((response) => {
        const allVenues = response.data.reduce((acc, venue) => {
          acc[venue._id] = venue.name;
          // acc[venue.imageUrl] = venue.imageUrl;
          return acc;
        }, {});
        setVenues(allVenues);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p className="user">
            {" "}
            {user.name},
            <br /> your email address assosiated with our website is: <p className="email">{user.email}</p>
          </p>{" "}
          <br />
          <br />
          <p className="reservation-title" style={{background:"purple", color:"white"}}>YOUR RESERVATIONS:</p>

          {user.reservations.length ? (
            user.reservations.map((reservation) => {
              const venueName = venues[reservation.venue];
              return (
                <div className="card" key={reservation._id}>
                  <p className="reservation" style={{background:"purple", color:"white"}}>{reservation.title}</p>
                  <p className="reservation-date">
                    {new Date(reservation.weddingDate).toLocaleString("en-uk", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {venueName && <p className="venue-name">{venueName}</p>}
                </div>
              );
            })
          ) : (
            <p className="reservation-title" style={{background:"purple", color:"white"}}>Currently there are no reservations to display</p>
          )}
        </>
      ) : (
        <p className="reservation-title" style={{background:"purple", color:"white"}}> You are currently Loged out. Please Login.</p>
      )}
      <Link to="/venues">
        <button className="btn btn-purple text-white" >Check other options</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
