import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LoanPostContext } from "@/context/loan-post-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { loanPosts, setSelectedPost} = React.useContext(LoanPostContext);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-foreground">
            Posts
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {loanPosts.map((post) => (
                <div
                  key={post.loanId}
                  onClick={() => setSelectedPost(post)}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{post.title}</span>{" "}
                    <span className="ml-auto text-xs">{post.createdAt.toLocaleString()}</span>
                  </div>
                  <span className="font-medium">{post.title}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {post.description}
                  </span>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
