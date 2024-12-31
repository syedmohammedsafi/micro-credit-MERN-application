import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

const LocationPicker = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [location, setLocation] = useState({ lat: 9.4661, lng: 77.7925 }); // Default to PSR Engineering College
  const [address, setAddress] = useState("PSR Engineering College, Sivakasi");

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current).setView([location.lat, location.lng], 15);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add a draggable marker
    const marker = L.marker([location.lat, location.lng], { draggable: true }).addTo(map);

    // Update location state and fetch address on marker drag
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      setLocation({ lat: position.lat, lng: position.lng });
      fetchAddress(position.lat, position.lng);
    });

    // Save the map instance
    setMapInstance(map);

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures this runs only once

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Failed to fetch address");
    }
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Center the map on user's location and update marker
          if (mapInstance) {
            mapInstance.setView([latitude, longitude], 15);
            L.marker([latitude, longitude], { draggable: true }).addTo(mapInstance);
          }

          // Fetch address
          fetchAddress(latitude, longitude);
        },
        (error) => {
          alert("Unable to retrieve location. Please enable GPS.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <div style={{ width: "100%", height: "400px" }} ref={mapRef}></div>
      <div className="mt-4">
        <p>
          <strong>Selected Address:</strong> {address}
        </p>
        <p>
          <strong>Coordinates:</strong> Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </p>
        <button
          onClick={handleLocate}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Locate Me
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;