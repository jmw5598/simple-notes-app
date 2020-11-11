export interface NavigationRouteLink {
  label: string;
  iconClasses: string | string[];
  routerLink: string | string[];
}

export const NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Dashboard',
    iconClasses: 'fas fa-chart-bar',
    routerLink: ['dashboard']
  },
  {
    label: 'Topics',
    iconClasses: 'fas fa-book',
    routerLink: ['topics']
  },
  {
    label: 'Documents',
    iconClasses: 'far fa-file-alt',
    routerLink: ['documents']
  },
  {
    label: 'Calendar',
    iconClasses: 'far fa-calendar-alt',
    routerLink: ['calendar']
  },
  {
    label: 'Settings',
    iconClasses: 'far fa-user-circle',
    routerLink: ['accounts']
  },
  {
    label: 'Logout',
    iconClasses: 'fas fa-lock',
    routerLink: ['auth', 'logout']
  }
]