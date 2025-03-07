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
import { ChatCard } from '@/components/custom/chat/chat-card';
import { deserializeImage } from '@/lib/utils/Image';
import LoadingScreen from './loading';
import { ChatProvider, useChat } from '@/context/chat-context';
import { useAuth } from '@/context/auth-context';
import { useGetUser } from '@/hooks/user/use-get-user';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/layout/footer';
import { useLayout } from '@/context/layout-context';
import { ChatButton } from '@/components/custom/chat/chat-button';

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
  const { me , fetchUser } = useAuth();
  const { form, rooms, getRoom } = useChat();
  const { user } = useGetUser(loanPost?.debtor!);
  const { setFooter } = useLayout();

  const progress =
    ((loanPost?.raised ?? 0) / (loanPost?.goal ?? 0)) * 100;
  const Icon = categoryIcons[loanPost?.category as keyof typeof categoryIcons];

  const handleDonationSuccess = () => {
    refetch();
    fetchUser();
    setIsDonationOverlayOpen(false); 
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setFooter(false)
    getRoom(id)
  }, [])

  

  return (
    <div className="container py-8">
      {!loanPost ? null : (
        <ChatAppSidebar user={user!}>
          <main className='space-y-4 w-full'>
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
                  {/* <p className="text-xl mb-6">{loanPost.description}</p> */}
                  <div className="space-y-4">
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-between text-lg">
                      <span>${loanPost.raised.toFixed(2).toLocaleString()} raised</span>
                      <span>${loanPost.goal.toFixed(2).toLocaleString()} goal</span>
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
                {
                  me?.internetIdentity.toString() === loanPost.debtor.toString() ? (
                    <div className="flex justify-between items-center">
                      <CardTitle>Status</CardTitle>
                      {loanPost.status}
                    </div>
                  ) : (
                    timeLeft(loanPost.verifiedAt, loanPost.postDuration) === "Expired" ? (
                      <Button size="lg" className="w-full">
                        This Project is Expired :(
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => setIsDonationOverlayOpen(true)}
                      >
                        Support This Project
                      </Button>
                    )
                  )
                }

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
                  {/* <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </p> */}
                  <Separator className='mt-4' />
                  {/* Loan interest, etc */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold">Loan Interest</h3>
                      <p>{99.99}%</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Loan Duration</h3>
                      <p>{loanPost.loanDuration.toString()} day(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {
                me?.internetIdentity.toString() == loanPost.debtor.toString() && (
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>People Who Messaged You</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {rooms.map((room,index) => (
                          <ChatCard key={index} room={room} />
                        ))}
                      </ul>
                    </CardContent>
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
              <Footer />
          </main>
        </ChatAppSidebar>
      )}
    </div>
  );
}

export default LoanDetailPage;