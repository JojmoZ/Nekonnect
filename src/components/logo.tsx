import { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';

const Logo = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [theme]);

  return (
    <a href={'/'}>
      <img
        src={isDarkMode || className?.split(' ').includes('dark') ? './assets/logo-white.png' : './assets/logo-black.png'}
        alt="NeKonnect Logo"
        className={`${className}`}
      />
    </a>
  );
};

export default Logo;