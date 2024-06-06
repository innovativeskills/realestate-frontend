// assets
import { IconUser } from '@tabler/icons-react';

// constant
const icons = {
  IconUser
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const teachers = {
  id: 'teachers',
  title: 'Teachers',
  type: 'group',
  children: [
    {
      id: 'teacher',
      title: 'Teacher Details',
      type: 'item',
      url: 'admin/teachers/teacher',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default teachers;
