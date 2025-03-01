import { useEffect, useState } from 'react';
import darkLogo from '@/assets/logo-dark.svg';
import lightLogo from '@/assets/logo-light.svg';

const Logo  = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQueryList.matches);

    const handleDarkModeChange = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
      setIsDark(event.matches);
    };

    mediaQueryList.addEventListener('change', handleDarkModeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  return (
    <img src={isDark ? darkLogo : lightLogo} alt="NeKonnect Logo" />
  );

}

export default Logo;