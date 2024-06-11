// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBrandChrome } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBrandChrome
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: 'design/typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: 'design/color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: 'design/shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: 'design/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }
  ]
};

export default utilities;
