"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { getPostsAction } from "@/app/actions/getPostsAction";
import { Loader2 } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "480px",
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125, // Dhaka, Bangladesh
};

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

export default function DistrictMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const res = await getPostsAction({ limit: 100 }); // Get a good number of locations
        if (res.success) {
          // Filter only posts with valid coordinates
          const validPosts = (res.data || []).filter(
            (post: any) =>
              post.location?.coordinates &&
              post.location.coordinates.length === 2,
          );
          setPosts(validPosts);

          // Auto-fit bounds if we have posts and map is loaded
          if (validPosts.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            validPosts.forEach((post: any) => {
              bounds.extend({
                lat: post.location.coordinates[1],
                lng: post.location.coordinates[0],
              });
            });
            mapRef.current.fitBounds(bounds);
          }
        }
      } catch (error) {
        console.error("Fetch map locations error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [isLoaded]);

  const onMapLoad = (map: any) => {
    mapRef.current = map;
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Activity Map</h2>
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-100 relative min-h-[480px] shadow-inner">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <Loader2 className="h-8 w-8 animate-spin text-[#E40004]" />
            <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide">
              Syncing Activities...
            </p>
          </div>
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={{
            styles: mapStyle,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: "hover",
          }}
        >
          {posts.map((post, index) => (
            <Marker
              key={post._id}
              position={{
                lat: post.location.coordinates[1],
                lng: post.location.coordinates[0],
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#E40004",
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: "#ffffff",
                scale: 7,
              }}
              onMouseOver={() => setHovered(index)}
              onMouseOut={() => setHovered(null)}
            />
          ))}

          {hovered !== null && posts[hovered] && (
            <InfoWindow
              position={{
                lat: posts[hovered].location.coordinates[1],
                lng: posts[hovered].location.coordinates[0],
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -10),
              }}
            >
              <div className="p-2 min-w-[220px] bg-white rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="font-bold text-gray-900 text-[13px] line-clamp-1 leading-none">
                    {posts[hovered].address || "Activity Point"}
                  </h3>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2 italic">
                  "{posts[hovered].description || "No description provided."}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="px-2 py-0.5 bg-red-50 text-[9px] font-bold text-[#E40004] rounded-full uppercase tracking-tighter">
                    {posts[hovered].clickerType}
                  </span>
                  <span className="text-[9px] font-medium text-gray-400">
                    {new Date(posts[hovered].createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
