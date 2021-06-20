import { NavigationRouteLink } from '@sn/core/framing';

export const NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Dashboard',
    iconClasses: 'fas fa-chart-bar',
    routerLink: ['dashboard'],
    tooltip: 'Dashboard'
  },
  {
    label: 'Accounts',
    iconClasses: 'far fa-user-circle',
    routerLink: ['accounts'],
    tooltip: 'User Accounts'
  },
  {
    label: 'Invoices',
    iconClasses: 'fas fa-file-invoice-dollar',
    routerLink: ['invoices'],
    tooltip: 'Invoicing & Payments'
  },
  {
    label: 'Settings',
    iconClasses: 'fas fa-cogs',
    routerLink: ['settings'],
    tooltip: 'Settings'
  },
  {
    label: 'Logout',
    iconClasses: 'fas fa-lock',
    routerLink: ['auth', 'logout'],
    tooltip: 'Logout'
  }
]
