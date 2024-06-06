// assets
import { IconCertificate, IconList } from '@tabler/icons-react';

// constant
const icons = {
  IconCertificate,
  IconList
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const courses = {
  id: 'course',
  title: 'Course',
  type: 'group',
  children: [
    {
      id: 'course-details',
      title: 'Course Details',
      type: 'item',
      url: 'admin/courses/course-details',
      icon: icons.IconCertificate,
      breadcrumbs: false
    },
    {
      id: 'course-content',
      title: 'Course Content',
      type: 'item',
      url: 'admin/courses/course-content',
      icon: icons.IconList,
      breadcrumbs: false
    }
  ]
};

export default courses;
