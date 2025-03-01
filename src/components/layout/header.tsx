import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <header>
      <Logo />

      <Button variant={"gradient"}>Sign In</Button>
    </header>
  );
}

export default Header;