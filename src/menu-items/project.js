// assets
import { IconStar, IconPhone, IconReportMoney, IconUsersGroup, IconBook, IconBook2 } from '@tabler/icons-react';

// constant
const icons = {
  IconPhone,
  IconStar,
  IconReportMoney,
  IconUsersGroup,
  IconBook,
  IconBook2
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const project = {
  id: 'project',
  title: 'Project',
  type: 'group',
  children: [
    {
      id: 'projectInfo',
      title: 'Project Info',
      type: 'item',
      url: 'project/ProjectInfo',
      icon: icons.IconBook,
      breadcrumbs: false
    },
    {
      id: 'summary',
      title: 'Project Summary',
      type: 'item',
      url: 'project/summary',
      icon: icons.IconBook2,
      breadcrumbs: false
    }
  ]
};

export default project;
