import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [{ id: 1, title: 'Default Title', discount: 20, image: 'www.example.com/images/8' }];

const fetchBannerDetails = createAsyncThunk('fetchBannerDetails', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const bannerDetailsSlice = createSlice({
  name: 'bannerDetails',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBannerDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchBannerDetails.rejected, (state, action) => {
      console.log('Banner details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchBannerDetails };
export default bannerDetailsSlice.reducer;
