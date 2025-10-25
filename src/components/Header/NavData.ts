export interface NavItem {
  id: number;
  title: string;
  url: string;
}

const navLinks: NavItem[] = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "About", url: "/about" },
  { id: 3, title: "Blog", url: "/blog" },
  { id: 4, title: "Contact", url: "/contact" },
];

export default navLinks;
