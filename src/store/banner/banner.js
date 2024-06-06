
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  { title: 'Golden Villa', discount: 20, image: 'www.example.com/images/8' },
  { title: 'Silver Villa', discount: 15, image: 'www.example.com/images/9' },
  { title: 'Bronze Villa', discount: 10, image: 'www.example.com/images/10' },
  { title: 'Emerald Villa', discount: 25, image: 'www.example.com/images/11' },
  { title: 'Ruby Villa', discount: 30, image: 'www.example.com/images/12' },
  { title: 'Diamond Villa', discount: 35, image: 'www.example.com/images/13' }
];




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
