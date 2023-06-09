import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Footer from "./Footer";

function AddVenue(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (event) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/venues' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData)
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
      offers,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/venues`, newVenue, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        setName("");
        setAddress("");
        setDescription("");
        setPrice("");
        setCapacity("");
        setOffers([]);
        setImageUrl("");

        navigate("/venues");
      })
      .catch((e) => {
        console.log("There was a problem while adding a new venue", e);
      });
  };

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
          <h1 className="text-center title">Add Your Venue</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label className="form-outline col-12 fw-bold">
                IMAGE
                <input
                  type="file"
                  className="form-control"
                  name="imageUrl"
                  onChange={(event) => handleFileUpload(event)}
                />
              </label>
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
              <button className="btn btn-purple col-12 px-3 py-2 mt-4 text-white">SUBMIT VENUE</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
}

export default AddVenue;