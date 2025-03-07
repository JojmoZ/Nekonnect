"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { CategoryFilter } from "@/components/category-filter"
import { useGetLoanPosts } from "@/hooks/loan-post/use-get-loan-posts"
import { Button } from "@/components/ui/button"
import { CheckCircle, Icon, Link } from "lucide-react"
import { ActiveLoanHighlight } from "@/components/custom/home/active-loan-highlight"
import { useGetMyLoanPosts } from "@/hooks/loan-post/use-get-my-loan-posts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@radix-ui/react-progress"
import { useNavigate } from "react-router"
import { RouteEnum } from "@/lib/enum/router-enum"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { loanPosts } = useGetLoanPosts(true);
  const categories = Array.from(new Set(loanPosts.map((post) => post.category)))
  const { thereIsActiveLoan } = useGetMyLoanPosts();
  const navigate = useNavigate();

  const filteredProjects =
    selectedCategory === "All" ? loanPosts : loanPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="container py-8 space-y-12">
      {/* If the user has active loan display a highlight or something */}
      {thereIsActiveLoan && <ActiveLoanHighlight />}
      <div className="text-center space-y-4">
        <h1 className="text-5xl tracking-tight font-bold">
          Purr-fect Lending and Borrowing
        </h1>
        <p className="text-xl text-muted-foreground">
          Connecting cool cats who want to lend and borrow — with trust,
          transparency, and no cat-astrophic fees.
        </p>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {filteredProjects.length === 0 && (
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>No Project Available</CardTitle>
              <CheckCircle className={`w-5 h-5`} />
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={() => {
                navigate(RouteEnum.CREATE_POST);
              }}
            >
              Create Project
            </Button>
          </CardFooter>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((post) => (
          <ProjectCard key={post.loanId} project={post} />
        ))}
      </div>
    </div>
  );
}

