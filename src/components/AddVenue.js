import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function AddVenue(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [offers, setOffers] = useState([]);
    const navigate =  useNavigate();

 // ******** this method handles the file upload ********
 const handleFileUpload = (event) => {
  const uploadData = new FormData();

  // imageUrl => this name has to be the same as in the model since we pass
  // req.body to .create() method when creating a new movie in '/api/houses' POST route
  uploadData.append("imageUrl", event.target.files[0]);

  axios
    .post(`${process.env.REACT_APP_APIURL}/api/upload`, uploadData)
    .then((response) => {
      // response carries "fileUrl" which we can use to update the state
      setImageUrl(response.data.fileUrl);
    })
    .catch((err) => console.log("Error while uploading the file: ", err));
};

const handleSubmit = (event) => {

    event.preventDefault();

        const newVenue = {

            name,
            description,
            address,
            price,
            capacity,
            imageUrl,
            offers
        };
        const storedToken = localStorage.getItem("authToken");
        

        axios.post(`${process.env.REACT_APP_APIURL}/api/venues`, newVenue, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        .then((response)=> {
            setName("");
            setAddress("");
            setDescription("");
            setPrice("");
            setCapacity("");
            setOffers([]);
            setImageUrl("");

            navigate('/venues')
        })
        .catch(e => {
            console.log('There was a problem while adding a new venue', e)
           });

}

return(
<>
     
  
     <h1>Add your Venue</h1>
     <form onSubmit={handleSubmit}> 
     <div>
      <label>
        Name: 
        <input type='text' className="form-to-create" name="name" value={name} onChange={(event) => {setName(event.target.value)}}  /> 
      </label>

      <label>
        Address: 
        <input type='text' className="form-to-create" name="address" value={address} onChange={(event) => {setAddress(event.target.value)}}  /> 
      </label>

      <label>
        Description: 
        <input type='text' className="form-to-create" name="description" value={description} onChange={(event) => {setDescription(event.target.value)}}  /> 
      </label>

      <label>
        Price: 
        <input type='number' className="form-to-create" name="price" value={price} onChange={(event) => {setPrice(event.target.value)}}  /> 
      </label>

      <label>
        Capacity:
        <input type='number' className="form-to-create" name="capacity" value={capacity} onChange={(event) => {setCapacity(event.target.value)}}  /> 
      </label>

      <label>
        ImageUrl:
        <input type='file' className="form-to-create" name="imageUrl" onChange={(event) => handleFileUpload(event)}  /> 
      </label>

      <label>
  Offers: 
  <select className="form-to-create" name="offers" multiple value={offers} onChange={(event) => {setOffers(Array.from(event.target.selectedOptions, option => option.value))}}>
    <option value="dj">DJ</option>
    <option value="jazz band">Jazz Band</option>
    <option value="folk group">Folk Group</option>
    <option value="photo box">Photo Box</option>
    <option value="kids entertainer">Kids Entertainer</option>


    {/* Add other enum values as options */}
  </select>
</label>

    <button> SAVE </button>
    </div>
</form>
    </>

)

}
    

export default AddVenue; 