import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from 'api';
import toast from 'react-hot-toast';

const initialVal = [
  { id: 1, category_name: 'Initial Test Category', category_code: '202', category_icon: 'CategoryIconTest' }
  // { id: 2, category_name: 'Category B', category_code: '203', category_icon: 'CategoryIconB' },
  // { id: 3, category_name: 'Category C', category_code: '204', category_icon: 'CategoryIconC' },
  // { id: 4, category_name: 'Category D', category_code: '205', category_icon: 'CategoryIconD' },
  // { id: 5, category_name: 'Category E', category_code: '206', category_icon: 'CategoryIconE' },
  // { id: 6, category_name: 'Category F', category_code: '207', category_icon: 'CategoryIconF' },
  // { id: 7, category_name: 'Category G', category_code: '208', category_icon: 'CategoryIconG' },
  // { id: 8, category_name: 'Category H', category_code: '209', category_icon: 'CategoryIconH' },
  // { id: 9, category_name: 'Category I', category_code: '210', category_icon: 'CategoryIconI' },
  // { id: 10, category_name: 'Category J', category_code: '211', category_icon: 'CategoryIconJ' },
  // { id: 11, category_name: 'Category K', category_code: '212', category_icon: 'CategoryIconK' },
  // { id: 12, category_name: 'Category L', category_code: '213', category_icon: 'CategoryIconL' },
  // { id: 13, category_name: 'Category M', category_code: '214', category_icon: 'CategoryIconM' },
  // { id: 14, category_name: 'Category N', category_code: '215', category_icon: 'CategoryIconN' },
  // { id: 15, category_name: 'Category O', category_code: '216', category_icon: 'CategoryIconO' }
];

const fetchCategory = createAsyncThunk('fetchCategory', async (url) => {
  const response = await apiService.getData(url);
  if (response.status == !200) {
    toast.error('Erro occured in category api call');
  }
  return response.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      console.log('Categiory Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchCategory };
export default categorySlice.reducer;
