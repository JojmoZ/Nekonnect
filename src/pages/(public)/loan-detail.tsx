import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Leaf,
  Cpu,
  Palette,
  Heart,
  Users,
  LayoutGrid,
} from 'lucide-react';
import { DonationOverlay } from '@/components/donation-overlay';
import { useGetLoanPost } from '@/hooks/loan-post/use-get-loan-post';
import { useParams } from 'react-router';
import { timeLeft } from '@/lib/utils/DateString';
import { ChatAppSidebar } from '@/components/custom/chat/chat-sidebar';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { ChatButton } from '@/components/custom/chat/chat-button';
import { deserializeImage } from '@/lib/utils/Image';
import LoadingScreen from './loading';
import { ChatProvider, useChat } from '@/context/chat-context';

const categoryIcons = {
  All: LayoutGrid,
  Education: BookOpen,
  Environment: Leaf,
  Technology: Cpu,
  'Arts & Culture': Palette,
  Wellness: Heart,
  Community: Users,
};

const categoryColors = {
  All: 'text-blue-400',
  Education: 'text-purple-400',
  Environment: 'text-green-400',
  Technology: 'text-cyan-400',
  'Arts & Culture': 'text-pink-400',
  Wellness: 'text-red-400',
  Community: 'text-yellow-400',
};

function LoanDetailPage() {
  const { id } = useParams();
  const { loanPost, refetch } = useGetLoanPost(id ?? '');
  const [isDonationOverlayOpen, setIsDonationOverlayOpen] = useState(false);
  const { me } = useGetAuthenticated();
  const { form, rooms, getRoom } = useChat();

  const progress =
    ((loanPost?.raised ?? 0) / (loanPost?.goal ?? 0)) * 100;
  const Icon = categoryIcons[loanPost?.category as keyof typeof categoryIcons];

  const handleDonationSuccess = () => {
    refetch();
    setIsDonationOverlayOpen(false); 
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getRoom(id)
    
  }, [])

  

  return (
    <div className="container py-8 space-y-6">
      {!loanPost ? (
        <LoadingScreen />
      ) : (
        
        <ChatAppSidebar>
          <main className='space-y-4'>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl">{loanPost.title}</CardTitle>
                    
                    <div className="flex flex-col items-center gap-6">
                      
                      <div className='flex items-center'>
                        <Icon
                          className={`w-6 h-6 mr-2 ${categoryColors[loanPost.category as keyof typeof categoryColors]}`}
                        />
                        <span
                          className={`text-lg ${categoryColors[loanPost.category as keyof typeof categoryColors]}`}
                        >
                          {loanPost.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xl mb-6">{loanPost.description}</p>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-between text-lg">
                      <span>${loanPost.raised.toLocaleString()} raised</span>
                      <span>${loanPost.goal.toLocaleString()} goal</span>
                    </div>
                    <p className="text-muted-foreground">
                      {timeLeft(loanPost.verifiedAt, loanPost.postDuration)}
                    </p>
                  </div>
                  <img
                    src={deserializeImage(loanPost.image)}
                    alt={loanPost.title}
                    className="w-full h-64 object-cover rounded-lg mt-6" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setIsDonationOverlayOpen(true)}
                  >
                    Support This Project
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader >
                  <div className='flex justify-between items-center'>
                    <CardTitle>About This Project</CardTitle>
                    { me?.internetIdentity.toString() != loanPost.debtor.toString() && <ChatButton receiver_id={loanPost.debtor} post_id={id!} />}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{loanPost.description}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </p>
                </CardContent>
              </Card>
              {
                me?.internetIdentity.toString() == loanPost.debtor.toString() && (
                  <Card>
                    <CardHeader >
                        <CardTitle>User Chat</CardTitle>
                    </CardHeader>
                    {rooms.map((room,index) => (
                      <ChatButton key={index} receiver_id={room.room_user.at(0)?.user_id!} post_id={id} />
                    ))}
                  </Card>
                )
              }
              
              <DonationOverlay
                isOpen={isDonationOverlayOpen}
                onClose={() => setIsDonationOverlayOpen(false)}
                projectTitle={loanPost.title}
                loanId={loanPost.loanId}
                onDonationSuccess={handleDonationSuccess}
              />
          </main>
        </ChatAppSidebar>
      )}
    </div>
  );
}

export default LoanDetailPage;