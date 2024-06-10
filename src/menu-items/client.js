// assets
import { IconStar, IconPhone } from '@tabler/icons-react';

// constant
const icons = {
  IconStar,
  IconPhone
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const client = {
  id: 'client',
  title: 'Client',
  type: 'group',
  children: [
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      url: 'client/review',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    {
      id: 'contact',
      title: 'User Contact',
      type: 'item',
      url: 'client/contact',
      icon: icons.IconPhone,
      breadcrumbs: false
    }
  ]
};

export default client;
