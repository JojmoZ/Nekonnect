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
import useServiceContext from '@/hooks/use-service-context';
import { useNavigate } from 'react-router';
import { RouteEnum } from '@/lib/enum/router-enum';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { deserializeImage } from '@/lib/utils/Image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';

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
  const { me, login, fetchUser, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: 'Logging out...',
      success: () => {
        fetchUser();
        navigate('/')
        return 'Logged out successfully.';
      },
      error: 'Failed to log out.',
    });
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
              <NavigationMenuItem key={menu.label}>
                <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {menu.links.map((route) => (
                      <ListItem key={route.href} href={route.href} title={route.title}>
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <a
                className={"block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-foreground/5 hover:text-accent-foreground focus:bg-foreground/5 focus:text-accent-foreground"}
                href={RouteEnum.HOME}
              >
                <div className="text-sm font-medium leading-none">Home</div>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {!isAuthenticated ? (
                <Button variant="gradient" onClick={login}>
                  Sign In
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-12 w-12 md:h-12 md:w-12 border-4 cursor-pointer hover:scale-105 transition-all duration-200">
                      <AvatarFallback className="bg-primary text-md">
                        {me?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                      <AvatarImage
                        src={deserializeImage(me?.profilePicture ?? [])}
                        alt={me?.username || 'User'}
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="container text-left"
                  >
                    <DropdownMenuItem
                      onClick={() => navigate(RouteEnum.PROFILE)}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate(RouteEnum.TRANSACTION_HISTORY)}
                    >
                      Transaction History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate(RouteEnum.MY_LOANS)}
                    >
                      My Loans
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(RouteEnum.TOP_UP)}>Top Up</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Header;
