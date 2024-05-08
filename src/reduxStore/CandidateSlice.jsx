import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

// Initial state for candidate data
const initialState = {
  data: [],
  status: StatusCode.IDLE, // Initial status is set to IDLE
};

// Async thunk to fetch candidate details
export const getCandidateDetails = createAsyncThunk(
  "candidates/getCandidateDetails",
  async ({ limit, offset }) => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow CORS
          },
          body: JSON.stringify({ limit, offset }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }

      const data = await response.json();
      return data.jdList; // Return the list of job details
    } catch (error) {
      throw new Error("Failed to fetch candidate details");
    }
  }
);

// Slice for managing candidate data
const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidateDetails.pending, (state) => {
        // Set status to LOADING when data fetching starts
        state.status = StatusCode.LOADING;
      })
      .addCase(getCandidateDetails.fulfilled, (state, action) => {
        // Update state with fetched data when data fetching is successful
        state.data.push(...action.payload); // Append fetched data to existing data
        state.status = StatusCode.IDLE; // Set status back to IDLE
      })
      .addCase(getCandidateDetails.rejected, (state) => {
        // Set status to ERROR when data fetching fails
        state.status = StatusCode.ERROR;
      });
  },
});

export default candidateSlice.reducer;
