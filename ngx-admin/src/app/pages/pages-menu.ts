import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
 
  {
    title: 'Events',
    home:true,
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Index',
        link: '/pages/events/index',
      },
      {
        title: 'Create',
        link: '/pages/events/create',
      }
    ],
  },
 
 
];
