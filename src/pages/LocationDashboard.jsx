import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const LocationDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("https://dotcombackend-xu8o.onrender.com/api/location");
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
        String(v).toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [locations, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-50 via-sky-100 to-amber-50 px-4 py-12 sm:px-6 lg:px-8 font-[Poppins]">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          User Location Dashboard
        </h2>
        <p className="text-slate-600 mt-2 text-base">
          Track and analyze real-time user-submitted locations 🌍
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ring-1 ring-slate-200">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by address, coordinates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.6-4.4a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        <div className="text-slate-500 text-sm">
          Showing {filteredLocations.length} result(s)
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-600 animate-pulse">
            Loading locations…
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : filteredLocations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-lg">
            No locations found 😕
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                  <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-32">
                    Latitude
                  </th>
                  <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-32">
                    Longitude
                  </th>
                  <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-[32rem]">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-56">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLocations.map((loc, index) => (
                  <tr
                    key={loc._id || index}
                    className={`transition-colors cursor-pointer hover:bg-slate-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-900 border-b border-slate-200 text-sm">
                      {loc.latitude}
                    </td>
                    <td className="px-4 py-3 text-slate-900 border-b border-slate-200 text-sm">
                      {loc.longitude}
                    </td>
                    <td className="px-4 py-3 text-slate-700 border-b border-slate-200 text-sm max-w-2xl break-words">
                      {loc.address || "Not Available"}
                    </td>
                    <td className="px-4 py-3 text-slate-900 border-b border-slate-200 text-sm whitespace-nowrap">
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

      {/* Summary */}
      {!loading && !error && locations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl p-5">
            <p className="text-slate-500 text-sm">Total Locations</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {locations.length}
            </p>
          </div>
          <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl p-5">
            <p className="text-slate-500 text-sm">Most Recent</p>
            <p className="text-base text-slate-700 mt-1 truncate">
              {locations[0]?.address || "N/A"}
            </p>
          </div>
          <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl p-5">
            <p className="text-slate-500 text-sm">Last Updated</p>
            <p className="text-base text-slate-700 mt-1">
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
