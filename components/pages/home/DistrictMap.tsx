"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { getPostsAction } from "@/app/actions/getPostsAction";
import { Loader2, Calendar, ChevronDown } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "480px",
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125, // Dhaka, Bangladesh
};

export default function DistrictMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const mapRef = useRef<any>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const payload: any = { limit: 100 };

        if (startDate) {
          payload.startDate = new Date(startDate).toISOString();
        }

        if (endDate) {
          const endD = new Date(endDate);
          endD.setUTCHours(23, 59, 59, 999);
          payload.endDate = endD.toISOString();
        }

        const res = await getPostsAction(payload); // Get a good number of locations
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

    if (isLoaded) {
      const timer = setTimeout(() => {
        fetchLocations();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, startDate, endDate]);

  const onMapLoad = (map: any) => {
    mapRef.current = map;
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  const displayDateText = () => {
    if (startDate && endDate) {
      return `${startDate} to ${endDate}`;
    } else if (startDate) {
      return `From ${startDate}`;
    } else if (endDate) {
      return `Until ${endDate}`;
    }
    return "Filter by Date";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Activity Map</h2>
        <div className="relative" ref={datePickerRef}>
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
              startDate || endDate
                ? "border-red-500/30 bg-red-50/30 text-red-700 font-semibold"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium"
            }`}
          >
            <Calendar className="w-4 h-4 ml-[-2px]" />
            <span>{displayDateText()}</span>
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform ${showDatePicker ? "rotate-180" : ""}`}
            />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 min-w-[300px] origin-top-right animate-in fade-in slide-in-from-top-2">
              <div className="space-y-4">
                <div className="space-y-1.5 focus-within:text-red-600 transition-colors">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 bg-gray-50/50 text-gray-700 font-medium"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 focus-within:text-red-600 transition-colors">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 bg-gray-50/50 text-gray-700 font-medium"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex mt-2">
                  <button
                    onClick={clearDates}
                    className="w-full px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
