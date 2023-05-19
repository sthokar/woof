import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../store/locationSlice";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function LocationMap() {
  const mapDetails = useSelector((state) => state.search.mapDetails);
  const customIcon = new Icon({
    iconUrl: require("../../assets/images/marker-icon.png"),
    iconSize: [38, 38],
  });
  let markers = [];
  if (mapDetails) {
    markers = mapDetails
      .map((data) => {
        if (data && data.latitude && data.longitude) {
          return { geocode: [data.latitude, data.longitude], popUp: "Pop Up" };
        }
        return null;
      })
      .filter(Boolean);
  }

  return markers ? (
    <MapContainer
      center={[37.6000, -95.6650]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  ) : null;
}

export default LocationMap;
