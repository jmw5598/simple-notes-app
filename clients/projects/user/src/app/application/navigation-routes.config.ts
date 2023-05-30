import { NavigationRouteLink } from '@sn/core/framing';

export const NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Dashboard',
    iconClasses: 'heroRectangleGroup',
    routerLink: ['dashboard'],
    tooltip: 'Dashboard'
  },
  {
    label: 'Topics',
    iconClasses: 'heroBuildingLibrary',
    routerLink: ['topics'],
    tooltip: 'Topics'
  },
  {
    label: 'Documents',
    iconClasses: 'heroDocument',
    routerLink: ['documents'],
    tooltip: 'Documents'
  },
  {
    label: 'Flashcards',
    iconClasses: 'heroCreditCard',
    routerLink: ['flashcards'],
    tooltip: 'Flashcards'
  },
  {
    label: 'Todo Lists',
    iconClasses: 'heroClipboardDocumentList',
    routerLink: ['todos'],
    tooltip: 'Todo Lists'
  },
  {
    label: 'Calendar',
    iconClasses: 'heroCalendarDays',
    routerLink: ['calendar'],
    tooltip: 'Calendar'
  },
  {
    label: 'Settings',
    iconClasses: 'heroCog8Tooth',
    routerLink: ['accounts'],
    tooltip: 'Settings'
  },
  {
    label: 'Logout',
    iconClasses: 'heroLockOpen',
    routerLink: ['auth', 'logout'],
    tooltip: 'Logout'
  }
]
