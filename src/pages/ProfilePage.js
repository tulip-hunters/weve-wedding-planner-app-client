
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <h2>Hello {user.name}</h2>
          <p>Your e-mail: {user.email}</p>
          <h3>Your Reservations:</h3>
          {user.reservations && user.reservations.length > 0 ? (
            user.reservations.map((reservation) => (
              <p key={reservation._id}>{reservation.title}</p>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;