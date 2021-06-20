import { NavigationRouteLink } from '@sn/core/framing';

export const SETTINGS_NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Roles',
    iconClasses: 'fas fa-user-tag',
    routerLink: ['roles'],
    tooltip: 'Roles & Permissions'
  },
  {
    label: 'Plans',
    iconClasses: 'fas fa-money-check-alt',
    routerLink: ['plans'],
    tooltip: 'Plans'
  },
];
