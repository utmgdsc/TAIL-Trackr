import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const API = process.env.REACT_APP_API_KEY; 
// const API = "AIzaSyCd5DZyTEYIe0a21Uc_LDHGi7j2DjvdU5c";
const mapContainerStyle = {
  width: '80vw',
  height: '100vh',
  
};
const center = {
  lat: 43.595310, // default latitude
  lng: -79.640579, // default longitude
};
const center1 = {
    lat: 43.7315, // default latitude
    lng: -79.766670, // default longitude
  };

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center1} />
        <Marker position={center} />
        <Marker position={center1} />
        <Marker position={center} />

      </GoogleMap>
      <button onClick={e=>(console.log(process.env))}>Click me</button>
    </div>
  );
};

export default Maps;