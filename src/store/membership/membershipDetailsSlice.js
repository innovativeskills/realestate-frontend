import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [{ id: 1, title: 'Default Title', description: 'Good to take', image: 'www.example.com/images/8' }];

const fetchMembershipDetails = createAsyncThunk('fetchMembershipDetails', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const membershipDetailsSlice = createSlice({
  name: 'membershipDetails',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMembershipDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchMembershipDetails.rejected, (state, action) => {
      console.log('Banner details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchMembershipDetails };
export default membershipDetailsSlice.reducer;
