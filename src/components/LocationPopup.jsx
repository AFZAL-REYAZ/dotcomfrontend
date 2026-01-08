import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2 } from "lucide-react";

function LocationPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [location, setLocation] = useState({
    lat: "",
    lon: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  /* ===============================
     GET LOCATION
  =============================== */
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude, address: "" });
        fetchAddress(latitude, longitude);
      },
      () => alert("Location permission denied"),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  /* ===============================
     FETCH ADDRESS (OpenCage)
  =============================== */
  const fetchAddress = async (lat, lon) => {
    try {
      setFetchingAddress(true);

      const key = import.meta.env.VITE_OPENCAGE_KEY;
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${key}`
      );

      const address =
        res.data.results?.[0]?.formatted || "Address not found";

      setLocation((prev) => ({ ...prev, address }));
    } catch (err) {
      console.error("Address fetch failed", err);
    } finally {
      setFetchingAddress(false);
    }
  };

  /* ===============================
     SUBMIT LOCATION (axiosInstance)
  =============================== */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axiosInstance.post("/location", {
        latitude: location.lat,
        longitude: location.lon,
        address: location.address,
      });

      alert("✅ Location saved");
      setShowPopup(false);
    } catch (err) {
      console.error("Save location error", err);
      alert("❌ Failed to save location");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 90 }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 p-5"
        >
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={22} />
                <h3 className="font-semibold">Enable Location</h3>
              </div>
              <button onClick={() => setShowPopup(false)}>
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              We use your location to personalize services.
            </p>

            {/* Location Box */}
            <div className="bg-gray-50 border rounded-lg p-3 text-sm mb-4">
              {fetchingAddress ? (
                <p className="text-gray-500">
                  <Loader2 className="inline animate-spin mr-2" />
                  Fetching address...
                </p>
              ) : (
                <>
                  <p><b>Lat:</b> {location.lat || "--"}</p>
                  <p><b>Lon:</b> {location.lon || "--"}</p>
                  <p><b>Address:</b> {location.address || "--"}</p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-100 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Later
              </button>

              <button
                disabled={loading || fetchingAddress}
                onClick={handleSubmit}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                {loading ? "Saving..." : "Share Location"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LocationPopup;
