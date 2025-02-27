import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { LoanPostContext, LoanPostProvider } from "@/context/loan-post-context";
import { useGetLoanPosts } from "@/hooks/loan-post/use-get-loan-posts";
import { useContext } from "react";

function PostVerificationPage() {

  const { loanPosts, getLoanPostsLoading } = useGetLoanPosts();

  return (
    <LoanPostProvider loanPosts={loanPosts}>
      <SidebarProvider       style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <ContentArea />
        </SidebarInset>
      </SidebarProvider>
    </LoanPostProvider>
  )
}

const ContentArea: React.FC = () => {
  const { selectedPost } = useContext(LoanPostContext)!;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {selectedPost ? (
        <div className="selected-content">
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.description}</p>
        </div>
      ) : (
        Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="aspect-video h-12 w-full rounded-lg bg-muted/50"
          />
        ))
      )}
    </div>
  );
};

export default PostVerificationPage;