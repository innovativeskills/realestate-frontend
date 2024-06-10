import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import companySummarySlice from './company/companySummary';
import clientReview from './client-review/clientReview';
import membershipDetailsSlice from './membership/membershipDetailsSlice';
import contactInfoSlice from './company/contactInfoSlice';
import investmentSlice from './investment/investmentSlice';
import teamMemberSlice from './company/teamMemberSlice';
import userContactSlice from './user-contact/userContactSlice';
import projectInfoSlice from './project/projectInfoSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  companySummary: companySummarySlice,
  clientReview: clientReview,
  membership: membershipDetailsSlice,
  contactInfo: contactInfoSlice,
  investment: investmentSlice,
  teamMember: teamMemberSlice,
  userContact: userContactSlice,
  projectInfo: projectInfoSlice
});

export default reducer;
