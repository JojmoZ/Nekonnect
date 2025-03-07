import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';

const Logo = ({ className }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  const {me} = useAuth();

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQueryList.matches);

    const handleDarkModeChange = (event: { matches: boolean }) => {
      setIsDark(event.matches);
    };

    mediaQueryList.addEventListener('change', handleDarkModeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  return (
    <a href={me ? '/home' : '/'}>
      <img
        src={isDark ? './assets/logo-white.png' : './assets/logo-black.png'}
        alt="NeKonnect Logo"
        className={`${className}`}
      />
    </a>
  );
};

export default Logo;