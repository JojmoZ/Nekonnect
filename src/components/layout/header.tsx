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
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/Currency';
import { UserService } from '@/services/user.service';
import { User } from '@/lib/model/entity/user';

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

const menuItems = [
  { label: "For Borrowers", links: for_borrowers },
  { label: "For Lenders", links: for_lenders },
  { label: "Admin", links: for_admin },
  // { label: "For All", links: for_all },
  // { label: "All LINKS Available", links: components },
]

function Header() {
  const navigate = useNavigate();
  const { me, login, fetchUser, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const userService = new UserService()
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = async () => {
    let user = await userService.me();
    toast.promise(logout(), {
      loading: 'Logging out...',
      success: () => {
        fetchUser();
        setUser(user)
        navigate('/')
        return 'Logged out successfully.';
      },
      error: 'Failed to log out.',
    });
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Logo className="h-12" />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full py-6">
              <div className="flex-1 space-y-4">
              {menuItems
            .filter((menu) => user && user.role == "Admin") 
            .map((menu) => {
    return (
      <div key={menu.label} className="space-y-2">
        <h4 className="font-medium text-sm">{menu.label}</h4>
        <div className="pl-4 border-l space-y-2">
          {menu.links.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate(route.href);
                setIsMobileMenuOpen(false);
              }}
            >
              {route.title}
            </Button>
          ))}
        </div>
      </div>
    );
  })}



                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(RouteEnum.HOME);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Home
                </Button>
              </div>

              {isAuthenticated && (
                <div className="pt-6 border-t mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {me?.username?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                        <AvatarImage
                          src={deserializeImage(me?.profilePicture ?? [])}
                          alt={me?.username || 'User'}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{me?.username}</p>
                        <p className="text-sm text-muted-foreground">
                          Logged In
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary font-medium px-3 py-1.5 rounded-md" onClick={() => navigate(RouteEnum.TOP_UP)}>
                      <Wallet className="h-4 w-4" />
                      <span>{formatCurrency(me?.balance)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(RouteEnum.PROFILE);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(RouteEnum.TRANSACTION_HISTORY);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Transaction History
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(RouteEnum.MY_LOANS);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      My Loans
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(RouteEnum.TOP_UP);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Top Up
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <div className="pt-6 border-t mt-6">
                  <Button
                    className="w-full"
                    onClick={() => {
                      login();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {menu.links.map((route) => (
                        <ListItem
                          key={route.href}
                          href={route.href}
                          title={route.title}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <a
                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-foreground/5 hover:text-accent-foreground focus:bg-foreground/5 focus:text-accent-foreground"
                  href={RouteEnum.HOME}
                >
                  <div className="text-sm font-medium leading-none">Home</div>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Balance Display for Authenticated Users */}
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <Card className="bg-primary/5 border-none shadow-none">
                <CardContent className="flex items-center gap-2 py-2 px-4 cursor-pointer" onClick={() => navigate(RouteEnum.TOP_UP)}>
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">
                    {formatCurrency(me?.balance)}
                  </span>
                  {/*<Button*/}
                  {/*  variant="ghost"*/}
                  {/*  size="icon"*/}
                  {/*  className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20 p-1"*/}
                  {/*  onClick={() => navigate(RouteEnum.TOP_UP)}*/}
                  {/*>*/}
                  {/*  <span className="sr-only">Top up</span>*/}
                  {/*  <span className="text-xs font-bold text-primary">+</span>*/}
                  {/*</Button>*/}
                </CardContent>
              </Card>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-12 w-12 border-4 cursor-pointer hover:scale-105 transition-all duration-200">
                    <AvatarFallback className="bg-primary text-primary-foreground text-md">
                      {me?.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage
                      src={deserializeImage(me?.profilePicture ?? [])}
                      alt={me?.username || 'User'}
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2 border-b">
                    <p className="font-medium">{me?.username}</p>
                    <p className="text-xs text-muted-foreground">Logged in</p>
                  </div>
                  <DropdownMenuItem onClick={() => navigate(RouteEnum.PROFILE)} className="mt-1">
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
                  <DropdownMenuItem onClick={() => navigate(RouteEnum.TOP_UP)}>
                    Top Up
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Sign In Button for Non-Authenticated Users */}
          {!isAuthenticated && (
            <Button onClick={login} variant="default">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
