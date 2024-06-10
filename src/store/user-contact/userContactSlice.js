import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  {
    id: 1,
    name: 'John Doe',
    phone_number: '555-123-4567',
    email: 'johndoe@example.com',
    subject: 'Inquiry about Services',
    message:
      'I am interested in learning more about the services you offer. Please provide more details and pricing information. Thank you!'
  }
];

const fetchUserContact = createAsyncThunk('fetchUserContact', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const userContactSlice = createSlice({
  name: 'userContact',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserContact.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchUserContact.rejected, (state, action) => {
      console.log('User Contact Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchUserContact };
export default userContactSlice.reducer;
