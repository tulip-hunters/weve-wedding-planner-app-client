import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';



const libraries = ["places", "directions", "places"];
const mapContainerStyle = {
  width: '90vw',
  height: '70vh'
};
const center = {
  lat: 0,
  lng: 0
};

function Map() {
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
    <div>
      <div>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {duration && distance && (
        <div>
          <p>Driving Time: {duration}</p>
          <p>Distance: {distance}</p>
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

export default Map;









// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from 'react-places-autocomplete';


// const libraries = ["places", "directions", "places"];
// const mapContainerStyle = {
//   width: '90vw',
//   height: '70vh'
// };
// const center = {
//   lat: 0,
//   lng: 0
// };

// function Map() {
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

// export default Map;












// import React, { useState, useEffect } from 'react';
// import { GoogleMap, DirectionsRenderer, Marker, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '70vh',
// };

// const center = {
//   lat: 40.712776,
//   lng: -74.005974,
// };

// function StartMap() {
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [origin, setOrigin] = useState(center);
//   const [destination, setDestination] = useState('');

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyCFdH9wPcM21wxo2wa6QKVhFGR7qOLEcww",
//     libraries: ['places'],
//   });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setOrigin({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.log(error);
//         },
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//       );
//     }
//   }, []);

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   const onUnmount = () => {
//     setMap(null);
//   };

//   const handleDirections = () => {
//     const DirectionsService = new window.google.maps.DirectionsService();

//     DirectionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   };

//   const handleSelect = (value) => {
//     setDestination(value);
//   };

//   const handleSearch = () => {
//     const placesService = new window.google.maps.places.PlacesService(map);

//     placesService.textSearch(
//       {
//         query: destination,
//         fields: ['name', 'geometry'],
//       },
//       (results, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setDestination(results[0].geometry.location);
//         }
//       }
//     );
//   };

//   return isLoaded ? (
//     <div>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={13}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         {map && (
//           <Marker
//             position={{
//               lat: origin.lat,
//               lng: origin.lng,
//             }}
//           />
//         )}
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//       <div>
//         <input
//           type="text"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           placeholder="Enter a destination"
//         />
//         <button onClick={handleSearch}>Search</button>
//         <button onClick={handleDirections}>Get Directions</button>
//       </div>
//     </div>
//   ) : (
//     <></>
//   );
// }

// export default StartMap;







// import React from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '600px',
//   height: '400px'
// };

// function StartMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyCFdH9wPcM21wxo2wa6QKVhFGR7qOLEcww"
//   });

//   const [map, setMap] = React.useState(null);
//   const [center, setCenter] = React.useState(null);

//   React.useEffect(() => {
//     navigator.geolocation.getCurrentPosition(position => {
//       setCenter({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       });
//     }, () => {
//       // handle error getting user's location
//     });
//   }, []);

//   const onLoad = React.useCallback(function callback(map) {
//     if (center) {
//       const bounds = new window.google.maps.LatLngBounds(center);
//       map.fitBounds(bounds);
//     }
//     setMap(map);
//   }, [center]);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {center && (
//         <Marker
//           position={center}
//           title="Your Location"
//         />
//       )}
//     </GoogleMap>
//   ) : <></>;
// }

// export default React.memo(StartMap);







// import React from 'react'
// // import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// function StartMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyCFdH9wPcM21wxo2wa6QKVhFGR7qOLEcww"
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(StartMap)