import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import { apiSlice } from "../api/apiSlice";

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  isAdmin: false,
  error: null,
};

// Auth slice now works with RTK Query mutations

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle RTK Query mutations
    builder
      .addMatcher(apiSlice.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.data) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.accessToken;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.data.user.isAdmin;
          state.error = null;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.data.accessToken);
          }
        }
      })
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = action.error.message || "Login failed";
      })
      .addMatcher(apiSlice.endpoints.signup.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.signup.matchFulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.data) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.accessToken;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.data.user.isAdmin;
          state.error = null;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.data.accessToken);
          }
        }
      })
      .addMatcher(apiSlice.endpoints.signup.matchRejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = action.error.message || "Signup failed";
      })
      .addMatcher(apiSlice.endpoints.getCurrentUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        apiSlice.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          if (action.payload.success && action.payload.data) {
            state.user = action.payload.data.user;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.data.user.isAdmin;
          }
        }
      )
      .addMatcher(apiSlice.endpoints.getCurrentUser.matchRejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      });
  },
});

export const {
  setUser,
  setToken,
  clearAuth,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
