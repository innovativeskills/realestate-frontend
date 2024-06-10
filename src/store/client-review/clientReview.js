import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  { id: 1, name: 'John Doe', description: 'Good to take', image: 'www.example.com/images/8' },
  { id: 2, name: 'Rahim Uddin', description: 'Average', image: 'www.example.com/images/9' }
];

const fetchClientReview = createAsyncThunk('fetchClientReview', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const clientReviewSlice = createSlice({
  name: 'clientReview',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClientReview.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchClientReview.rejected, (state, action) => {
      console.log('Client Review Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchClientReview };
export default clientReviewSlice.reducer;
