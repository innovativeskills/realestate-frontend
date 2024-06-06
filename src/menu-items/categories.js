// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconCategory, IconCategoryPlus } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCategory,
  IconCategoryPlus
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const categories = {
  id: 'categories',
  title: 'Categories',
  type: 'group',
  children: [
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: 'admin/categories/category',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: 'sub-category',
      title: 'Sub Category',
      type: 'item',
      url: 'admin/categories/sub-category',
      icon: icons.IconCategoryPlus,
      breadcrumbs: false
    }
  ]
};

export default categories;
