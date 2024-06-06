import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';


const fetchMasterPlanDetails = createAsyncThunk('fetchMasterPlanDetails', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const masterPlanDetailsSlice = createSlice({
  name: 'masterPlanDetails',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMasterPlanDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchMasterPlanDetails.rejected, (state, action) => {
      console.log('Master Plan details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchMasterPlanDetails };
export default masterPlanDetailsSlice.reducer;
