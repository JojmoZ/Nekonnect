import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LoanPostContext } from '@/context/loan-post-context';
import { timeToDateString } from '@/lib/utils/DateString';

export function PostVerificationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { loanPosts, setSelectedPost } = React.useContext(LoanPostContext);

  return (
    <Sidebar {...props} className='bg-transparent my-20'>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-foreground">Posts</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {
              loanPosts.length > 0 ? (
                loanPosts.map((post) => (
                  <div
                    key={post.loanId}
                    onClick={() => setSelectedPost(post)}
                    className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span>{post.debtor.toString()}</span>{' '}
                      <span className="ml-auto text-xs">
                        {timeToDateString(post.createdAt)}
                      </span>
                    </div>
                    <span className="font-medium">{post.title}</span>
                    <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                      {post.description}
                    </span>
                  </div>
                ))
              ) : (
                <div
                    className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="font-medium">There is No Post</span>

                  </div>
              )
            }
            
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
