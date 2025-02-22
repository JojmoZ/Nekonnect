import React from 'react';
interface LoginPageProps {
  username: string;
  setUsername: (username: string) => void;
}

const TempPage: React.FC<LoginPageProps> = ({ username, setUsername }) => {
  return <div>TempPage</div>;
};

export default TempPage;
