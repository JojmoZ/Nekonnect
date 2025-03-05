import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ListItem } from '@/components/ui/list-item';
import Link from 'next/link';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import useServiceContext from '@/hooks/use-service-context';
import { useNavigate } from 'react-router';
import { RouteEnum } from '@/lib/enum/router-enum';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Login',
    href: RouteEnum.LOGIN,
    description: 'Login to access your account.',
  },
  {
    title: 'Home',
    href: '/',
    description: 'Main landing page.',
  },
  {
    title: 'Create Post',
    href: RouteEnum.CREATE_POST,
    description: 'Create a new loan post.',
  },
  {
    title: 'Edit Profile',
    href: RouteEnum.EDIT_PROFILE,
    description: 'Modify your profile details.',
  },
  {
    title: 'Chat',
    href: '/chat',
    description: 'Access your messages.',
  },
  {
    title: 'Post Verification',
    href: RouteEnum.POST_VERIFICATION,
    description: 'Verify posts before publishing.',
  },
  {
    title: 'Loan Detail',
    href: RouteEnum.POST,
    description: 'View details of a loan post.',
  },
  {
    title: 'Transaction History',
    href: RouteEnum.TRANSACTION_HISTORY,
    description: 'Check your past transactions.',
  },
  {
    title: 'User Page',
    href: '/temp',
    description: 'Temporary user page.',
  },
  {
    title: 'Temp Page 2',
    href: '/temp2',
    description: 'Another temporary page.',
  },
  {
    title: 'For Borrowers',
    href: RouteEnum.BORROWER,
    description: 'Borrow money easily.',
  },
  {
    title: 'Profile',
    href: RouteEnum.PROFILE,
    description: 'Manage your profile settings.',
  },
  {
    title: 'Browse Loans',
    href: RouteEnum.BROWSE,
    description: 'Explore available loan posts.',
  },
];

const for_borrowers: { title: string; href: string; description: string }[] = [
  {
    title: 'Borrow',
    href: RouteEnum.BORROWER,
    description: 'Borrow money easily.',
  },
];

const for_all: { title: string; href: string; description: string }[] = [
  {
    title: 'Profile',
    href: RouteEnum.PROFILE,
    description: 'Manage your profile settings.',
  },
  {
    title: 'Transaction History',
    href: RouteEnum.TRANSACTION_HISTORY,
    description: 'Check your past transactions.',
  },
];

const for_lenders: { title: string; href: string; description: string }[] = [
  {
    title: 'Browse Loans',
    href: RouteEnum.BROWSE,
    description: 'Explore available loan posts.',
  },
];
const for_admin: { title: string; href: string; description: string }[] = [
  {
    title: 'Verify Post',
    href: RouteEnum.POST_VERIFICATION,
    description: 'Verify posts before publishing.',
  },
];

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useGetAuthenticated();
  const { userService } = useServiceContext();
  const logout = () => {
    userService.logout();
  };

  const redirect = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Logo className="h-12" />

        <NavigationMenu className="ml-auto hidden gap-6 md:flex">
          <NavigationMenuList>
            {[
              {
                label: 'For Borrowers',
                links: for_borrowers,
              },
              {
                label: 'For Lenders',
                links: for_lenders,
              },
              {
                label: 'Admin',
                links: for_admin,
              },
              {
                label: 'For All',
                links: for_all,
              },
              {
                label: 'All LINKS Available',
                links: components,
              },
            ].map((menu) => (
              <NavigationMenu>
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menu.links.map((route) => (
                      <a key={route.href} href={route.href}>
                        <div>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            style={{ width: 200 }}
                          >
                            {route.title}
                          </NavigationMenuLink>
                        </div>
                      </a>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            ))}
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-4 md:ml-4">
          {!isAuthenticated ? (
            <Button variant="gradient" onClick={redirect}>
              Sign In
            </Button>
          ) : (
            <Button variant="gradient" onClick={logout}>
              Log out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
