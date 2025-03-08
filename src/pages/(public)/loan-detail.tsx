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
  CreditCard,
  Shield,
  User,
  CheckCircle2,
  XCircle,
  Clock,
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
import Header from '@/components/layout/header';
import { useGetLoanAssurance } from '@/hooks/loan-post/use-get-loan-assurance';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/Currency';

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
  const { rooms, getRoom, setPostId } = useChat();
  const { user } = useGetUser(loanPost?.debtor!);
  const { setFooter, setHeader } = useLayout();
  const { assurance } = useGetLoanAssurance(loanPost?.assuranceId!);

  const isDebtor =
    me?.internetIdentity?.toString() === loanPost?.debtor?.toString();
  const isExpired =
    loanPost?.verifiedAt && loanPost?.postDuration && timeLeft(loanPost.verifiedAt, loanPost.postDuration) === 'Expired';
  const hasSufficientBalance = (me?.balance || 0) >= (loanPost?.goal || 0);

  const progress =
    ((loanPost?.raised ?? 0) / (loanPost?.goal ?? 0)) * 100;
  const Icon = categoryIcons[loanPost?.category as keyof typeof categoryIcons];

  const handleDonationSuccess = () => {
    refetch();
    fetchUser();
    setIsDonationOverlayOpen(false); 
  };

  console.log(rooms)   

  useEffect(() => {
    if (!id) {
      return;
    }
    setFooter(false)
    setPostId(id)
    getRoom(id)

  }, [id])

  

  return (
    <div className="container py-8">
      {!loanPost ? null : (
        <ChatAppSidebar>
          <main className="space-y-4 w-full">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl">{loanPost.title}</CardTitle>

                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center">
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
                    <span>
                      {formatCurrency(loanPost.raised)} raised
                    </span>
                    <span>
                      {formatCurrency(loanPost.goal)} goal
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {timeLeft(loanPost.verifiedAt, loanPost.postDuration)}
                  </p>
                </div>
                <img
                  src={deserializeImage(loanPost.image)}
                  alt={loanPost.title}
                  className="w-full h-full object-cover rounded-lg mt-6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-4">
                {me?.internetIdentity.toString() ===
                loanPost.debtor.toString() ? (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Status</span>
                      </div>
                      <Badge className={`px-3 py-1`}>{loanPost?.status}</Badge>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Assurance ID</span>
                      </div>
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {assurance?.assuranceId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Assurance Owner</span>
                      </div>
                      <Badge variant={'outline'}>
                        {me?.internetIdentity?.toString() ===
                        assurance?.debtor?.toString()
                          ? 'You'
                          : 'Given to Nekonnect'}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {hasSufficientBalance ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="font-medium">Balance Status</span>
                      </div>
                      <Badge
                        variant={
                          hasSufficientBalance ? 'default' : 'destructive'
                        }
                      >
                        {hasSufficientBalance ? 'Sufficient' : 'Insufficient'}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Repayment Total</span>
                      </div>
                      <span className="font-mono font-semibold text-foreground">
                        {formatCurrency((loanPost?.goal * loanPost.multiplier) || 0)}
                        {/* Assuming 5% interest if not specified */}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Time Remaining</span>
                      </div>
                      <span className="font-semibold text-primary">
                        {timeLeft(
                          loanPost?.verifiedAt,
                          loanPost?.postDuration + loanPost?.loanDuration,
                        )}
                      </span>
                    </div>
                  </>
                ) : timeLeft(loanPost.verifiedAt, loanPost.postDuration) ===
                  'Expired' ? (
                  <Button size="lg" className="w-full">
                    This Loan has Expired :(
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={loanPost?.status !== 'Funding'}
                    onClick={() => setIsDonationOverlayOpen(true)}
                  >
                    Support This Loan
                  </Button>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>About This Loan</CardTitle>
                  {me?.internetIdentity.toString() !=
                    loanPost.debtor.toString() && (
                    <ChatButton receiver_id={loanPost.debtor} post_id={id!} />
                  )}
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
                <Separator className="mt-4" />
                {/* Loan interest, etc */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold">Loan Interest</h3>
                    <p>{(loanPost.multiplier * 100 - 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Loan Duration</h3>
                    <p>{loanPost.loanDuration.toString()} day(s)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {me?.internetIdentity.toString() == loanPost.debtor.toString() && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>People Who Messaged You</CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <ul className="divide-y">
                    {rooms.filter((room) => room.message.length > 0).map((room, index) => (
                      <ChatCard key={index} room={room} />
                    ))}
                    {rooms.length === 0 && (
                      <p className="px-6 pb-4 text-muted-foreground">
                        There are no messages
                      </p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            <DonationOverlay
              isOpen={isDonationOverlayOpen}
              onClose={() => setIsDonationOverlayOpen(false)}
              projectTitle={loanPost.title}
              loanId={loanPost.loanId}
              multiplier={loanPost.multiplier}
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