
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';



const libraries = ["places", "directions", "places"];
const mapContainerStyle = {
  width: '95vw',
  height: '40vh'
};
const center = {
  lat: 0,
  lng: 0
};

function StartMap() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => null
    );
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCFdH9wPcM21wxo2wa6QKVhFGR7qOLEcww&libraries=places,directions,places",
    libraries
  });

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === "OK" && results[0]) {
        const destinationLocation = results[0].geometry.location;
        setDestination(destinationLocation);
      }
    });
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
      setDuration(response.routes[0].legs[0].duration.text);
      setDistance(response.routes[0].legs[0].distance.text);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className='card d-flex justify-content-center pt-4 m-4 bg-light'>
    <h4 className='google-color'>To estimate duration driving time enter venue address</h4>
      <div className='p-4'>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {duration && distance && (
        <div>
          <p className='fw-bold'>Driving Time: {duration} {" "} | {" "}Distance: {distance}</p>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={location ? location : center}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {destination && (
          <DirectionsService
            options={{
              destination,
              origin: location,
              travelMode: "DRIVING",
              
            }}
            callback={directionsCallback}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default StartMap;









// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


// const libraries = ["places", "directions", "places"];
// const mapContainerStyle = {
//   width: '90vw',
//   height: '70vh'
// };
// const center = {
//   lat: 0,
//   lng: 0
// };

// function StartMap() {
//   const [location, setLocation] = useState(null);
//   const [destination, setDestination] = useState("");
//   const [directions, setDirections] = useState(null);
//   const [places, setPlaces] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       },
//       () => null
//     );
//   }, []);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCFdH9wPcM21wxo2wa6QKVhFGR7qOLEcww&libraries=places,directions,places",
//     libraries
//   });

//   const handleSearch = () => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ address: destination }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         const destinationLocation = results[0].geometry.location;
//         setDestination(destinationLocation);
//       }
//     });
//   };

//   const directionsCallback = (response) => {
//     if (response !== null && response.status === "OK") {
//       setDirections(response);
//     }
//   };

//   if (loadError) return "Error loading maps";
//   if (!isLoaded) return "Loading Maps";

//   return (
//     <div>
//       <div>
//         <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={location ? location : center}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//         {destination && (
//           <DirectionsService
//             options={{
//               destination,
//               origin: location,
//               travelMode: "DRIVING",
              
//             }}
//             callback={directionsCallback}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }

// export default StartMap;









