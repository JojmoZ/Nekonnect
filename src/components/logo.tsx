import { useEffect, useState } from 'react';

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
    <a href='/'>
      <img src={isDark ? './assets/logo-white.svg' : './assets/logo-black.svg'} alt="NeKonnect Logo" className='h-10'/>
    </a>
  );

}

export default Logo;