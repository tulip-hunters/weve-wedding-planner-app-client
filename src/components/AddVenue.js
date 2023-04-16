import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";


function AddVenue() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [offers, setOffers] = useState([]);


    // const navigate =  useNavigate();

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
    
        

        axios.post(`${process.env.REACT_APP_APIURL}/api/venues`, newVenue)
        .then(response => {
            setName("");
            setAddress("");
            setDescription("");
            setPrice("");
            setCapacity("");
            setOffers([]);
            setImageUrl("");

            // navigate('/venues')
        })
        .catch(e => {
            console.log('There was a problem while adding a new venue', e)
           });

}

return(
<>
     
  
     <h1>Add your Venue</h1>
     <form onSubmit={handleSubmit} /> 
     
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
        <input type='text' className="form-to-create" name="imageUrl" value={imageUrl} onChange={(event) => {setImageUrl(event.target.value)}}  /> 
      </label>

      <label>
        Offers: 
        <input type='enum' className="form-to-create" name="offers" value={offers} onChange={(event) => {setOffers(event.target.value)}}  /> 
      </label>

    <button type="submit"> SAVE </button>

    </>

)

}
    

export default AddVenue; 