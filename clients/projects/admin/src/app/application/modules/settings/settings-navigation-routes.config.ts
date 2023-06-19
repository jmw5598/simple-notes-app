import { NavigationRouteLink } from '@sn/core/framing';

export const SETTINGS_NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Roles',
    iconClasses: 'heroShieldCheck',
    routerLink: ['roles'],
    tooltip: 'Roles & Permissions'
  },
  {
    label: 'Plans',
    iconClasses: 'heroCurrencyDollar',
    routerLink: ['plans'],
    tooltip: 'Plans'
  },
];
