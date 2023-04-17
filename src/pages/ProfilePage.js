import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div>
      {user ? (
        <>
          <p>{user.name}</p>
          <p>Your reservations</p>
          {user.reservations ? 
            user.reservations.map((reservation) => {
              return (<p>{reservation.title}</p>);
            })
           : (
            <p>no reservation</p>
          )}
        </>
      ) : (
        <p>no user</p>
      )}
    </div>
  );
};

export default ProfilePage;
