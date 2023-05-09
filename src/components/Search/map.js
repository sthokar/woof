import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../store/locationSlice";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import MarkerCluster from "react-leaflet-cluster";
import MarkerClusterGroup from "react-leaflet-cluster";
const sampleLocations = [
  {
    latitude: 40.7128,
    longitude: -74.006,
    city: "New York",
    state: "NY",
    zip_code: "10001"
  },
  {
    latitude: 34.0522,
    longitude: -118.2437,
    city: "Los Angeles",
    state: "CA",
    zip_code: "90001"
  },
  {
    latitude: 41.8781,
    longitude: -87.6298,
    city: "Chicago",
    state: "IL",
    zip_code: "60601"
  }
];
const marker = [
    {
        geocode: [48.86, 2.3422],
        popUp: "Pop 1"
    },
    {
        geocode: [48.85, 2.3522],
        popUp: "Pop 2"
    },
    {
        geocode: [48.855, 2.34],
        popUp: "Pop 3"
    }
]

function LocationMap() {
  const dispatch = useDispatch();
  const mapDetails = useSelector((state) => state.search.mapDetails);
  console.log(mapDetails);
  


  
  const customIcon = new Icon({
    iconUrl: require("../../assets/images/marker-icon.png"),
    iconSize: [38, 38]
  })
  let markers = [];
  if (mapDetails) {
    markers = mapDetails.map((data) => {
      if (data && data.latitude && data.longitude) {
        return { geocode: [data.latitude, data.longitude], popUp: "Pop Up" };
      }
      return null;
    }).filter(Boolean);
    
  }


return (
    markers ?
    <MapContainer center={[37.6000, -95.6650]} zoom={4} style={{ height: '500px', width: '60%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>

        {markers.map(marker => (
            <Marker position = {marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup></Marker>
        )

        )}
        </MarkerClusterGroup>
    </MapContainer> : null
  );
}

export default LocationMap;
