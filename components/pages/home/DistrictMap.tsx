"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const districts = [
  { name: "Seletar", lat: 1.4043, lng: 103.8678 },
  { name: "Punggol", lat: 1.4044, lng: 103.902 },
  { name: "Sengkang", lat: 1.3911, lng: 103.895 },
  { name: "Hougang", lat: 1.3667, lng: 103.8864 },
  { name: "Geylang", lat: 1.3167, lng: 103.8869 },
  { name: "Bedok", lat: 1.3236, lng: 103.9305 },
  { name: "Tampines", lat: 1.3496, lng: 103.9568 },
  { name: "Pasir Ris", lat: 1.3736, lng: 103.9492 },
  { name: "Paya Lebar", lat: 1.3369, lng: 103.8881 },
];

const vibeStats = [
  { label: "Great Vibes", value: 20000 },
  { label: "Off Vibes", value: 3000 },
  { label: "C. Gentlemen", value: 150 },
  { label: "Lovely Lady", value: 9000 },
];

export default function DistrictMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [hovered, setHovered] = useState<number | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (index: number) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setHovered(index);
  };

  const handleMouseOut = () => {
    if (hideTimeout.current) {
      hideTimeout.current = setTimeout(() => {
        setHovered(null);
      }, 5000); // small delay prevents flickering
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {districts.map((district, index) => (
        <Marker
          key={index}
          position={{ lat: district.lat, lng: district.lng }}
          label={{
            text: district.name,
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
        />
      ))}

      {hovered !== null && (
        <InfoWindow
          position={{
            lat: districts[hovered].lat,
            lng: districts[hovered].lng,
          }}
          onCloseClick={() => setHovered(null)}
        >
          <div
            onMouseEnter={() => {
              if (hideTimeout.current) clearTimeout(hideTimeout.current);
            }}
            onMouseLeave={handleMouseOut}
          >
            {/* <h3 className="font-bold">{districts[hovered].name}</h3> */}
            <div>
              {vibeStats?.map((item) => (
                <div
                  key={item.label}
                  className="flex text-lg text-black font-medium"
                >
                  <p>{item.label} : </p>
                  <p> {item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
