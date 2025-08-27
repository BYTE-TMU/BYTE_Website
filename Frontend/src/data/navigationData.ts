export interface MenuItem {
  label: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Support', href: '/support' }
];