"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ProjectCard } from "@/components/project-card"
import { useGetLoanPosts } from "@/hooks/loan-post/use-get-loan-posts"
import { timeLeftMs } from "@/lib/utils/DateString"

const categories = ["Education", "Community", "Technology", "Environment", "Arts & Culture", "Wellness"]

export default function LoanBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const { loanPosts } = useGetLoanPosts(true);

  // Filter projects based on search query and category
  const filteredProjects = loanPosts.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "All" || project.category.includes(categoryFilter)

    return matchesSearch && matchesCategory
  })

  // Sort projects based on selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return Number(b.verifiedAt) - Number(a.verifiedAt)
      case "funded":
        return b.raised / b.goal - a.raised / a.goal
      case "ending":
        return timeLeftMs(a.verifiedAt, a.postDuration) - timeLeftMs(b.verifiedAt, b.postDuration)
      default:
        return 0
    }
  })

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Discover Projects</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select value={categoryFilter} defaultValue="All" onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {
                categories.map((category) => (
                  <SelectItem value={category}>{category}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="funded">Most Funded</SelectItem>
              <SelectItem value="ending">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.length > 0 ? (
          sortedProjects.map((project) => (
            <ProjectCard project={project}/>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
