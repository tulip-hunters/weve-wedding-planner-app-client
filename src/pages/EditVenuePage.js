import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import venuesService from "../services/venues.service";

function EditVenuePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [offers, setOffers] = useState("");

  const navigate = useNavigate();
  const { venueId } = useParams();

  useEffect(() => {
    venuesService
      .getVenue(venueId)
      .then((response) => {
        const oneVenue = response.data;
        setName(oneVenue.name);
        setDescription(oneVenue.description);
        setAddress(oneVenue.address);
        setPrice(oneVenue.price);
        setCapacity(oneVenue.capacity);
        setImageUrl(oneVenue.imageUrl);
        setOffers(oneVenue.offers);
      })
      .catch((error) => console.log(error));
  }, [venueId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      description,
      address,
      price,
      capacity,
      imageUrl,
      offers,
    };

    venuesService.updateVenue(venueId, requestBody).then((response) => {
      navigate(`/venues/${venueId}`);
    });
  };

  const deleteVenue = () => {
    venuesService
      .deleteVenue(venueId)
      .then(() => navigate("/venues"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Edit Venue Page</h1>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Address:</label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Price:</label>
        <textarea
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Capacity:</label>
        <textarea
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <label>Image url address:</label>
        <textarea
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Offers:</label>
        <textarea
          name="offers"
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
        />

        <button className="btn btn-primary" type="submit">
          Update Venue
        </button>
      </form>

      <button className="btn btn-primary" onClick={deleteVenue}>
        Delete Venue
      </button>
    </div>
  );
}

export default EditVenuePage;
