// assets
import { IconStar, IconPhone } from '@tabler/icons-react';

// constant
const icons = {
  IconPhone,
  IconStar
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
    }
  ]
};

export default companyInfo;
