export interface NavigationRouteLink {
  label: string;
  iconClasses: string | string[];
  routerLink: string | string[];
  tooltip: string;
}

export const NAVIGATION_ROUTES: NavigationRouteLink[] = [
  {
    label: 'Dashboard',
    iconClasses: 'fas fa-chart-bar',
    routerLink: ['dashboard'],
    tooltip: 'Dashboard'
  },
  {
    label: 'Topics',
    iconClasses: 'fas fa-book',
    routerLink: ['topics'],
    tooltip: 'Dashboard'
  },
  {
    label: 'Documents',
    iconClasses: 'far fa-file-alt',
    routerLink: ['documents'],
    tooltip: 'Documents'
  },
  {
    label: 'Flashcards',
    iconClasses: 'far fa-sticky-note',
    routerLink: ['flashcards'],
    tooltip: 'Flashcards'
  },
  {
    label: 'Todo Lists',
    iconClasses: 'fas fa-clipboard-check',
    routerLink: ['todos'],
    tooltip: 'Todo Lists'
  },
  {
    label: 'Calendar',
    iconClasses: 'far fa-calendar-alt',
    routerLink: ['calendar'],
    tooltip: 'Calendar'
  },
  {
    label: 'Settings',
    iconClasses: 'far fa-user-circle',
    routerLink: ['accounts'],
    tooltip: 'Settings'
  },
  {
    label: 'Logout',
    iconClasses: 'fas fa-lock',
    routerLink: ['auth', 'logout'],
    tooltip: 'Logout'
  }
]