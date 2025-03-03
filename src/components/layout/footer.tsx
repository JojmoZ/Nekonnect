import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // If using Next.js
import Logo from '@/components/logo';

export function Footer() {
  const teamMembers = [
    { name: 'Yenita K.', github: 'https://github.com/berryxxn' },
    {
      name: 'Catherine A.R.',
      github: ' https://github.com/hello-wald',
    },
    { name: 'Steven L.', github: 'https://github.com/StevenLie14' },
    {
      name: 'Vincentius J.T.',
      github: 'github.com/jojmoz',
    },
    { name: 'Marvella V.S.', github: 'https://github.com/Cixilation' },
  ];

  return (
    <footer className="w-full bg-background py-6 mt-10 flex flex-col items-center text-center">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex flex-wrap justify-center mt-2">
          {teamMembers.map((member) => (
            <Button
              key={member.name}
              asChild
              variant="ghost"
              className="flex py-3 my-2 items-center"
            >
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                {member.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        &copy; {new Date().getFullYear()} Crafted for Hackathon 11 using Motoko,
        React TypeScript, and Shadcn.
      </p>
    </footer>
  );
}
