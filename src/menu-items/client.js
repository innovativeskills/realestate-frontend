// assets
import { IconStar } from '@tabler/icons-react';

// constant
const icons = {
  IconStar
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
    }
  ]
};

export default client;
