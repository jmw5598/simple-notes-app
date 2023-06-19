import { NavigationRouteLink } from '@sn/core/framing';

export const NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Dashboard',
    iconClasses: 'heroRectangleGroup',
    routerLink: ['dashboard'],
    tooltip: 'Dashboard'
  },
  {
    label: 'Accounts',
    iconClasses: 'heroUserPlus',
    routerLink: ['accounts'],
    tooltip: 'User Accounts'
  },
  {
    label: 'Invoices',
    iconClasses: 'heroCurrencyDollar',
    routerLink: ['invoices'],
    tooltip: 'Invoicing & Payments'
  },
  {
    label: 'Settings',
    iconClasses: 'heroCog8Tooth',
    routerLink: ['settings'],
    tooltip: 'Settings'
  },
  {
    label: 'Logout',
    iconClasses: 'heroLockOpen',
    routerLink: ['auth', 'logout'],
    tooltip: 'Logout'
  }
]
