import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
    {
      id: 1,
      name: 'Md. Munna Ahmed',
      email: 'munnaahmed2025@gmail.com',
      phone_number_one: '+8801700000000',
      phone_number_two: '+8801900000000',
      address: '123 Main St, Springfield',
      facebook_link: 'https://www.facebook.com/johndoe',
      instagram_link: 'https://www.instagram.com/johndoe',
      linkedin_link: 'https://www.linkedin.com/in/johndoe',
      youtube_link: 'https://www.youtube.com/user/johndoe'
    }
];

const fetchContactInfo = createAsyncThunk('fetchContactInfo', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchContactInfo.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchContactInfo.rejected, (state, action) => {
      console.log('Contact details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchContactInfo };
export default contactInfoSlice.reducer;
