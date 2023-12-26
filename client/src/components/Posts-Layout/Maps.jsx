import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];
const API = "AIzaSyCd5DZyTEYIe0a21Uc_LDHGi7j2DjvdU5c";
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

const Maps = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
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
    <div className='map-container'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker key={0} position={{lat: props.myLocationLat, lng: props.myLocationLon}} 
        icon={{   
          fillColor: "red",
          fillOpacity: 2,
          strokeWeight: 1,
          rotation: 0,
          scale: 1,
        }}/>
        {props.locations.map((item, index) => (
          <Marker
            key={index}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setSelectedLocation(item)}
          />
        ))}

  
        {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div style={{ padding: '10px', maxWidth: '200px', textAlign: 'center' }}>
            {/* Display additional information here */}
            <h3 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '0', color: 'black' }}></h3>{selectedLocation.name}
            {/* Add more styling and content as needed */}
          </div>
        </InfoWindow>
      )}

      </GoogleMap>
    </div>
  );
};

export default Maps;