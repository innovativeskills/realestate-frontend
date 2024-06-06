import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import subCategorySlice from './sub-category/SubCategoryReducer';
import categorySlice from './category/categoryReducer';
import teacherDetailsSlice from './teacher/teacherReducer';
import courseDetailsReducer from './course/courseDetailsReducer';
import courseContentReducer from './course/courseContentReducer';
import bannerDetailsSlice from './banner/banner'
import companySummarySlice from './company/companySummary';
import clientReview from './client-review/clientReview';
import membershipDetailsSlice from './membership/membershipDetailsSlice';
import contactInfoSlice from './company/contactInfoSlice';


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  banner: bannerDetailsSlice,
  companySummary: companySummarySlice,
  clientReview: clientReview,
  membership: membershipDetailsSlice,
  contactInfo : contactInfoSlice,
});

export default reducer;
