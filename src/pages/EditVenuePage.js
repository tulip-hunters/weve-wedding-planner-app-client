import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import venuesService from "../services/venues.service";
import Footer from "../components/Footer";
import axios from "axios";

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
    // Move this function outside of handleSubmit function
    const handleOfferChange = (event) => {
      const offerValue = event.target.value;
      if (event.target.checked) {
        // If checkbox is checked, add the offer to the offers state
        setOffers([...offers, offerValue]);
      } else {
        // If checkbox is unchecked, remove the offer from the offers state
        setOffers(offers.filter((offer) => offer !== offerValue));
      }
    };

  return (
    <>
    <div className="container d-flex justify-content-center">
      <div>
        <div className="mb-3">
          <h1 className="text-center">Add Your Venue</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="form-outline mb-4  was-validated ">
              <span htmlFor="validationTextarea" className="form-label fw-bold">
                NAME
              </span>
              <input
                type="text"
                className="form-control  is-valid"
                name="name"
                id="validationTextarea"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter venue name. This field is required.
              </div>
            </div>

            <div className="form-outline mb-4  was-validated">
              <span htmlFor="validationTextarea" className="form-label fw-bold">
                ADDRESS
              </span>
              <input
                type="text"
                className="form-control is-valid"
                name="address"
                id="validationTextarea"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter venue address. This field is required.
              </div>
            </div>

            <div className="form-outline mb-4  was-validated ">
              <span htmlFor="validationTextarea" className="form-label fw-bold">
                DESCRIPTION
              </span>
              <textarea
                type="text"
                className="form-control is-valid"
                name="DESCRIPTION"
                id="validationTextarea"
                rows="4"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter venue description. This field is required.
              </div>
            </div>
            <div className="row">
              <div className="form-outline col-6  was-validated ">
                <span htmlFor="validationTextarea" className="form-label fw-bold">
                  PRICE
                </span>

                <input
                  type="number"
                  className="form-control is-valid"
                  name="price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please enter venue price. This field is required.
                </div>
              </div>{" "}
              <div className="form-outline col-6  was-validated ">
                <span htmlFor="validationTextarea" className="form-labe fw-bold">
                  CAPACITY
                </span>

                <input
                  type="number"
                  className="form-control is-valid"
                  name="capacity"
                  value={capacity}
                  onChange={(event) => {
                    setCapacity(event.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please enter venue capacity. This field is required.
                </div>
              </div>
            </div>

            <label className="container  ">
              <p className="fw-bold">VENUE EXTRA OFFERS</p>
              <div className="">
              <div className="row">
                <div className="col-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="dj"
                      checked={offers.includes("dj")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">DJ</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="jazz band"
                      checked={offers.includes("jazz band")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Jazz Band
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="guestrooms"
                      checked={offers.includes("guestrooms")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Guestrooms
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="photo box"
                      checked={offers.includes("photo box")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Photo Box
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="kids entertainer"
                      checked={offers.includes("kids entertainer")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Kids Entertainer
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="dancefloor"
                      checked={offers.includes("dancefloor")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Dancefloor
                    </label>
                  </div>
                </div>
                <div className="col-4">

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="outdoor ceremeony"
                      checked={offers.includes("outdoor ceremeony")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Outdoor Ceremeony
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="indoor ceremeony"
                      checked={offers.includes("indoor ceremeony")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Indoor Ceremeony
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offers"
                      value="other"
                      checked={offers.includes("other")}
                      onChange={(event) => handleOfferChange(event)}
                    />
                    <label className="form-check-label text-left">
                      Other /check description/
                    </label>
                  </div>
                </div>
              </div>
              </div>
            </label>
            <div>
              <button className="btn btn-purple col-12 px-3 py-2 mt-4 text-white"> UPDATE VENUE </button>
            </div>
            <div>
              <button className="btn btn-outline-primary col-12 px-3 py-2 mt-4 " onClick={deleteVenue}>       DELETE VENUE
    </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
}
//   return (
//     <>
//     <div>
//       <h1>Edit Venue Page</h1>

//       <form onSubmit={handleFormSubmit}>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <label>Address:</label>
//         <textarea
//           name="address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />

//         <label>Price:</label>
//         <textarea
//           name="price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <label>Capacity:</label>
//         <textarea
//           name="capacity"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//         />

//         <label>Image url address:</label>
//         <textarea
//           name="imageUrl"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />

//         <label>Offers:</label>
//         <textarea
//           name="offers"
//           value={offers}
//           onChange={(e) => setOffers(e.target.value)}
//         />

//         <button className="btn btn-outline-primary" type="submit">
//           Update Venue
//         </button>
//       </form>

//       <button className="btn btn-outline-primary" onClick={deleteVenue}>
//         Delete Venue
//       </button>
//     </div>
//     <Footer />
//     </>
//   );
// }



export default EditVenuePage;
