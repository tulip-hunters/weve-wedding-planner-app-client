
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function ProfilePage(){
    const { user} = useContext(AuthContext); 
   
  return (
    <div>
        <h1> User Profile</h1>
        <h2>
          Hello  {user && user.name}
        </h2>
        <p>Your e-mail: {user && user.email}</p>
   
   
    </div>
  );
}

export default ProfilePage;