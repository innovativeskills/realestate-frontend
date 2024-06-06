import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from 'api';
import toast from 'react-hot-toast';

const initialVal = [
  {
    id: 4,
    category: {
      id: 4,
      category_name: 'Business',
      category_code: 'BUS',
      category_icon: 'https://example.com/icons/business.png'
    },
    subcategory_name: 'Marketing',
    code: 'MARK',
    icon: 'https://example.com/icons/marketing.png'
  },
  {
    id: 5,
    category: {
      id: 5,
      category_name: 'Health',
      category_code: 'HEA',
      category_icon: 'https://example.com/icons/health.png'
    },
    subcategory_name: 'Fitness',
    code: 'FIT',
    icon: 'https://example.com/icons/fitness.png'
  }
];

const fetchSubCategories = createAsyncThunk('fetchSubCategories', async (url) => {
  const response = await apiService.getData(url);
  if (response.status == !200) {
    toast.error('Erro occured in Sub category api call');
  }
  return response.data;
});

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      console.log('Sub category story did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchSubCategories };
export default subCategorySlice.reducer;
