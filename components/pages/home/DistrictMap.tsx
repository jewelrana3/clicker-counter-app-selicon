// components/DistrictMap.tsx
"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
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

export default function DistrictMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // ✅ set this in .env.local
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        mapContainerClassName="w-full !h-[500px]"
      >
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
            // icon={{
            //   path: google.maps.SymbolPath.CIRCLE,
            //   scale: 8,
            //   fillColor: "red",
            //   fillOpacity: 1,
            //   strokeWeight: 0,
            // }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
