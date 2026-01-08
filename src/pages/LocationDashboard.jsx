import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";

const LocationDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get("/location");
        setLocations(res.data || []);
      } catch (err) {
        console.error("Failed to fetch locations", err);
        setError("Failed to fetch locations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return locations;

    return locations.filter((loc) =>
      Object.values(loc).some((v) =>
        String(v).toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [locations, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-50 via-sky-100 to-amber-50 px-4 py-12 font-[Poppins]">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          User Location Dashboard
        </h2>
        <p className="text-slate-600 mt-2 text-base">
          Track and analyze real-time user-submitted locations 🌍
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row gap-4 mb-6 ring-1 ring-slate-200">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by address, coordinates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
        </div>

        <div className="text-slate-500 text-sm flex items-center">
          Showing {filteredLocations.length} result(s)
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-600">
            Loading locations…
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            {error}
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-lg">
            No locations found 😕
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Latitude</th>
                  <th className="px-4 py-3 text-left text-sm">Longitude</th>
                  <th className="px-4 py-3 text-left text-sm">Address</th>
                  <th className="px-4 py-3 text-left text-sm">Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredLocations.map((loc, index) => (
                  <tr
                    key={loc._id || index}
                    className="hover:bg-slate-50 transition border-b"
                  >
                    <td className="px-4 py-3 text-sm">{loc.latitude}</td>
                    <td className="px-4 py-3 text-sm">{loc.longitude}</td>
                    <td className="px-4 py-3 text-sm max-w-xl break-words">
                      {loc.address || "Not Available"}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {loc.createdAt
                        ? new Date(loc.createdAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SUMMARY */}
      {!loading && !error && locations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Total Locations</p>
            <p className="text-2xl font-semibold">{locations.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Most Recent</p>
            <p className="truncate">{locations[0]?.address || "N/A"}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Last Updated</p>
            <p>
              {locations[0]?.createdAt
                ? new Date(locations[0].createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDashboard;
