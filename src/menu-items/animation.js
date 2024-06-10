// assets
import { IconSlideshow, IconUser } from '@tabler/icons-react';

// constant
const icons = {
  IconSlideshow,
  IconUser
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const animations = {
  id: 'animation',
  title: 'Animations',
  type: 'group',
  children: [
    {
      id: 'Banner',
      title: 'Banner Details',
      type: 'item',
      url: 'animation/banner',
      icon: icons.IconSlideshow,
      breadcrumbs: false
    },
    {
      id: 'membership',
      title: 'Membership',
      type: 'item',
      url: 'animation/membership',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default animations;
