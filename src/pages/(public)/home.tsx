"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { StartProjectOverlay } from "@/components/start-project-overlay"
import { useGetLoanPosts } from "@/hooks/loan-post/use-get-loan-posts"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false)
  const { loanPosts, getLoanPostsLoading } = useGetLoanPosts();
  const categories = Array.from(new Set(loanPosts.map((post) => post.category)))

  const filteredProjects =
    selectedCategory === "All" ? loanPosts : loanPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl tracking-tight">Support Our Community</h1>
        <p className="text-xl text-muted-foreground">
          Discover and fund amazing projects that make a difference in our global community.
        </p>
        <Button size="lg" className="mt-4" onClick={() => setIsStartProjectOpen(true)}>
          Start Your Campaign
        </Button>
      </div>
      {/* <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((post) => (
          <ProjectCard key={post.loanId} project={post} />
        ))}
      </div>
      <StartProjectOverlay isOpen={isStartProjectOpen} onClose={() => setIsStartProjectOpen(false)} />
    </div>
  )
}

