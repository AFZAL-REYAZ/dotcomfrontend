import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const pageSizes = [10, 20, 50];

const RewardDetail = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ key: "createdAt", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get(
          "https://dotcombackend.onrender.com/api/paywithreward"
        );
        const data = res?.data?.data || [];
        setRecords(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching reward data:", err);
        setError("Failed to load reward payments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  // Derived values
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = records;
    if (q) {
      base = base.filter((r) =>
        [r.name, r.mobile, r.amount?.toString(), r.rewardCoins?.toString()]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    const sorted = [...base].sort((a, b) => {
      const dir = sortBy.dir === "asc" ? 1 : -1;
      const ka = a[sortBy.key];
      const kb = b[sortBy.key];
      if (sortBy.key === "amount" || sortBy.key === "rewardCoins") {
        return (Number(ka) - Number(kb)) * dir;
      }
      // default string/date compare
      return (new Date(ka) - new Date(kb)) * dir;
    });
    return sorted;
  }, [records, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {

    setPage(1);
  }, [query, pageSize, sortBy]);

  const summary = useMemo(() => {
    const totalAmount = records.reduce((s, r) => s + Number(r.amount || 0), 0);
    const totalCoins = records.reduce((s, r) => s + Number(r.rewardCoins || 0), 0);
    const avg = records.length ? totalAmount / records.length : 0;
    return { totalAmount, totalCoins, avg };
  }, [records]);

  const toggleSort = (key) => {
    setSortBy((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  const exportCSV = () => {
    const headers = ["Name", "Mobile", "Amount", "Coins", "Date"];
    const rows = filtered.map((r) => [
      r.name ?? "",
      r.mobile ?? "",
      r.amount ?? "",
      r.rewardCoins ?? "",
      r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replaceAll("\"", "\"\"")}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reward-payments-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-10 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Reward Payment Details
            </h1>
            <p className="text-slate-600 mt-1">View transactions, filter, sort, and export data.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm hover:shadow-md text-slate-700 px-4 py-2 rounded-xl transition"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12 12 16.5m0 0L16.5 12M12 16.5V3" />
              </svg>
              Export CSV
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-slate-700 shadow-sm"
            >
              {pageSizes.map((s) => (
                <option key={s} value={s}>{s} / page</option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Total Amount</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{currency.format(summary.totalAmount || 0)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Total Coins</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{summary.totalCoins}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500 text-sm">Avg. Amount / Payment</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{currency.format(summary.avg || 0)}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200 mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, mobile, amount or coins…"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.6-4.4a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>
            <div className="text-slate-500 text-sm">{filtered.length} result(s)</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <Th label="Name" onClick={() => toggleSort("name")} active={sortBy.key === "name"} dir={sortBy.dir} />
                  <Th label="Mobile" onClick={() => toggleSort("mobile")} active={sortBy.key === "mobile"} dir={sortBy.dir} />
                  <Th label="Amount (₹)" onClick={() => toggleSort("amount")} active={sortBy.key === "amount"} dir={sortBy.dir} />
                  <Th label="Coins" onClick={() => toggleSort("rewardCoins")} active={sortBy.key === "rewardCoins"} dir={sortBy.dir} />
                  <Th label="Date" onClick={() => toggleSort("createdAt")} active={sortBy.key === "createdAt"} dir={sortBy.dir} />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-4 py-3"><div className="h-4 w-40 bg-slate-200 animate-pulse rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-32 bg-slate-200 animate-pulse rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-slate-200 animate-pulse rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-16 bg-slate-200 animate-pulse rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-40 bg-slate-200 animate-pulse rounded" /></td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-red-600">{error}</td>
                  </tr>
                ) : pageData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">No payment records found.</td>
                  </tr>
                ) : (
                  pageData.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="px-4 py-3 text-slate-900">{item.name}</td>
                      <td className="px-4 py-3 text-slate-800">{item.mobile}</td>
                      <td className="px-4 py-3 text-slate-900 font-medium">{currency.format(Number(item.amount || 0))}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-sm font-medium ring-1 ring-emerald-200">
                          {/* coin icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm.75 5.25a.75.75 0 0 0-1.5 0v1.5H9a.75.75 0 0 0 0 1.5h2.25V15A2.25 2.25 0 0 1 9 17.25a.75.75 0 0 0 0 1.5 3.75 3.75 0 0 0 3.75-3.75V10.5H15a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                          </svg>
                          {item.rewardCoins}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <div className="text-sm text-slate-600">
              Page <span className="font-semibold">{page}</span> of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Error toast (inline) */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl ring-1 ring-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

const Th = ({ label, onClick, active, dir }) => (
  <th
    onClick={onClick}
    className="py-3 px-4 text-left text-sm font-semibold select-none cursor-pointer"
  >
    <div className="inline-flex items-center gap-1">
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`w-4 h-4 transition ${active ? "opacity-100" : "opacity-40"}`}
      >
        {dir === "asc" ? (
          <path d="M10 5l-4 6h8l-4-6z" />
        ) : (
          <path d="M10 15l4-6H6l4 6z" />
        )}
      </svg>
    </div>
  </th>
);

export default RewardDetail;
