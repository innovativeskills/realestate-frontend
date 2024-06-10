import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

//protected guard component
import AuthGuard from 'components/shared/Authentication/AuthGuard';
import UtilitiesShadow from 'views/utilities/Shadow';

//client page imports
const EntryPage = Loadable(lazy(() => import('views/client/EntryPage')));
const HomePage = Loadable(lazy(() => import('views/client/home/HomePage')));
const AboutPage = Loadable(lazy(() => import('views/client/about/AboutPage')));

//admin page imports
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const MainBannerDetails = Loadable(lazy(() => import('views/admin/animations/banner/MainBannerDetails')));
const MembershipInfo = Loadable(lazy(() => import('views/admin/animations/membership/MembershipInfo')));
const CompanySummary = Loadable(lazy(() => import('views/admin/company/summary/CompanySummary')));
const ClientReviewInputPage = Loadable(lazy(() => import('views/admin/clients/review/ClientReview')));
const ContactInfo = Loadable(lazy(() => import('views/admin/company/ContactInfo')));
const InvestmentInfo = Loadable(lazy(() => import('views/admin/company/investment/InvestmentInfo')));
const TeamMemberDetails = Loadable(lazy(() => import('views/admin/company/team-member/TeamMemberDetails')));
const UserContact = Loadable(lazy(() => import('views/admin/clients/contact/UserContact')));
const ProjectInfo = Loadable(lazy(() => import('views/admin/project/project-info/ProjectInfo')));
const ProjectSummary = Loadable(lazy(() => import('views/admin/project/project-summary/ProjectSummary')));

// ==============================|| APPLICATION ROUTING ||============================== //

const ClientAdminRoutes = [
  // ===========||  client side routing ||======== //
  {
    path: '/',
    element: <EntryPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      // ===========||  admin panel routing ||======== //
      {
        path: '/admin',
        element: <MainLayout />,
        children: [
          {
            path: '/admin',
            element: <DashboardDefault />
          },
          {
            path: '/admin/dashboard',
            element: (
              <AuthGuard>
                <DashboardDefault />
              </AuthGuard>
            )
          },
          //animation routing---------
          {
            path: '/admin/animation',
            children: [
              {
                path: 'banner',
                element: (
                  <AuthGuard>
                    <MainBannerDetails />
                  </AuthGuard>
                )
              },
              {
                path: 'membership',
                element: (
                  <AuthGuard>
                    <MembershipInfo />
                  </AuthGuard>
                )
              }
            ]
          },
          //company details routing---------
          {
            path: '/admin/company',
            children: [
              {
                path: 'summary',
                element: (
                  <AuthGuard>
                    <CompanySummary />
                  </AuthGuard>
                )
              },
              {
                path: 'contact',
                element: (
                  <AuthGuard>
                    <ContactInfo />
                  </AuthGuard>
                )
              },
              {
                path: 'investment',
                element: (
                  <AuthGuard>
                    <InvestmentInfo />
                  </AuthGuard>
                )
              },
              {
                path: 'team-member',
                element: (
                  <AuthGuard>
                    <TeamMemberDetails />
                  </AuthGuard>
                )
              }
            ]
          },
          //client review routing---------
          {
            path: '/admin/client',
            children: [
              {
                path: 'review',
                element: (
                  <AuthGuard>
                    <ClientReviewInputPage />
                  </AuthGuard>
                )
              },
              {
                path: 'contact',
                element: (
                  <AuthGuard>
                    <UserContact />
                  </AuthGuard>
                )
              }
            ]
          },
          //client project routing---------
          {
            path: '/admin/project',
            children: [
              {
                path: 'projectInfo',
                element: (
                  <AuthGuard>
                    <ProjectInfo />
                  </AuthGuard>
                )
              },
              {
                path: 'summary',
                element: (
                  <AuthGuard>
                    <ProjectSummary />
                  </AuthGuard>
                )
              }
            ]
          }
        ]
      }
    ]
  }
];

export default ClientAdminRoutes;
