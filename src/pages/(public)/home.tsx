"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { CategoryFilter } from "@/components/category-filter"
import { useGetLoanPosts } from "@/hooks/loan-post/use-get-loan-posts"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { ActiveLoanHighlight } from "@/components/custom/home/active-loan-highlight"
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { loanPosts, getLoanPostsLoading } = useGetLoanPosts(true);
  const categories = Array.from(new Set(loanPosts.map((post) => post.category)))
  const { thereIsActiveLoan } = useGetMyLoanPosts();

  const filteredProjects =
    selectedCategory === "All" ? loanPosts : loanPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="container py-8 space-y-12">
      {/* If the user has active loan display a highlight or something */}
      {
        thereIsActiveLoan && <ActiveLoanHighlight />
      }
      <div className="text-center space-y-4">
        <h1 className="text-5xl tracking-tight font-bold">
          Support Our Community
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover and fund amazing projects that make a difference in our
          global community.
        </p>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((post) => (
          <ProjectCard key={post.loanId} project={post} />
        ))}
      </div>
    </div>
  );
}

