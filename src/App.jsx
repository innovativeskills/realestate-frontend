import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { fetchContactInfo } from 'store/company/contactInfoSlice';
import { fetchCompanySummary } from 'store/company/companySummary';
import { fetchBannerDetails } from 'store/banner/bannerDetailsSlice';
import { fetchMembershipDetails } from 'store/membership/membershipDetailsSlice';
import { fetchClientReview } from 'store/client-review/clientReview';
import { fetchUserContact } from 'store/user-contact/userContactSlice';
import { fetchInvestmentDetails } from 'store/investment/investmentSlice';
import { fetchTeamMember } from 'store/company/teamMemberSlice';
import { fetchPosition } from 'store/position/positionSlice';
import { fetchProjectInfo } from 'store/project/projectInfoSlice';
import { fetchProjectSummary } from 'store/project/projectSummarySlice';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    dispatch(fetchContactInfo('https://realestateback.innovativeskillsbd.com/api/contactinfo/'));
    dispatch(fetchCompanySummary('https://realestateback.innovativeskillsbd.com/api/companysummary/'));
    dispatch(fetchBannerDetails('https://realestateback.innovativeskillsbd.com/api/banner/'));
    dispatch(fetchMembershipDetails('https://realestateback.innovativeskillsbd.com/api/membership/'));
    dispatch(fetchClientReview('https://realestateback.innovativeskillsbd.com/api/clientreview/'));
    dispatch(fetchUserContact('https://realestateback.innovativeskillsbd.com/api/usercontact/'));
    dispatch(fetchInvestmentDetails('https://realestateback.innovativeskillsbd.com/api/investment/'));
    dispatch(fetchTeamMember('https://realestateback.innovativeskillsbd.com/api/teammember/'));
    dispatch(fetchPosition('https://realestateback.innovativeskillsbd.com/api/position/'));
    dispatch(fetchProjectInfo('https://realestateback.innovativeskillsbd.com/api/project/'));
    dispatch(fetchProjectSummary('https://realestateback.innovativeskillsbd.com/api/projectsummary/'));
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
