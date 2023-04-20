import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddReservation from "../components/AddReservation";
import venuesService from "../services/venues.service";
import Footer from "../components/Footer";
import StartMap from "../components/StartMap";
import VenueDetails from "../components/VenueDetails";
import VenueReservations from "../components/VenueReservations";

function VenueDetailsPage() {
  const { venueId } = useParams();
  const [venueDetails, setVenueDetails] = useState(null);

  const getVenue = () => {
    venuesService
      .getVenue(venueId)
      .then((response) => {
        const oneVenue = response.data;
        setVenueDetails(oneVenue);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getVenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VenueDetails />
      <AddReservation refreshVenue={getVenue} venueId={venueId} />
      <StartMap />
      <VenueReservations />
      <Footer />
    </>
  );
}

export default VenueDetailsPage;
