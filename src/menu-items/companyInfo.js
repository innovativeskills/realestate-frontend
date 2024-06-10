// assets
import { IconStar, IconPhone, IconReportMoney, IconUsersGroup } from '@tabler/icons-react';

// constant
const icons = {
  IconPhone,
  IconStar,
  IconReportMoney,
  IconUsersGroup
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const companyInfo = {
  id: 'companyInfo',
  title: 'Company Info',
  type: 'group',
  children: [
    {
      id: 'companySummary',
      title: 'Company Summary',
      type: 'item',
      url: 'company/summary',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    {
      id: 'contactInfo',
      title: 'Contact Information',
      type: 'item',
      url: 'company/contact',
      icon: icons.IconPhone,
      breadcrumbs: false
    },
    {
      id: 'investment',
      title: 'Investment',
      type: 'item',
      url: 'company/investment',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    },
    {
      id: 'teamMember',
      title: 'Team Member',
      type: 'item',
      url: 'company/team-member',
      icon: icons.IconUsersGroup,
      breadcrumbs: false
    }
  ]
};

export default companyInfo;
