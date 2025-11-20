import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Refresh user from /me when app loads
export const refreshUser = createAsyncThunk("auth/refreshUser", async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // ⭐ Set axios header globally
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const res = await axios.get(
      "https://dotcombackend.onrender.com/api/useroutes/me"
    );

    return res.data.user;
  } catch (err) {
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);

      // ⭐ Set axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    },

    // update user (profile, coins, role)
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // ⭐ remove token from axios
      delete axios.defaults.headers.common["Authorization"];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(refreshUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loginUser, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
