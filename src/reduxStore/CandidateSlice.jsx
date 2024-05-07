import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
};

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
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ limit, offset }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }

      const data = await response.json();
      return data.jdList;
    } catch (error) {
      throw new Error("Failed to fetch candidate details");
    }
  }
);

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidateDetails.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getCandidateDetails.fulfilled, (state, action) => {
        state.data.push(...action.payload);
        state.status = StatusCode.IDLE;
      })
      .addCase(getCandidateDetails.rejected, (state) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export default candidateSlice.reducer;
