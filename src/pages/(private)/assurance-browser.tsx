"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssuranceCard, LoanAssurance } from "@/components/assurance-card"
import { useGetAssurances } from "@/hooks/assurance/use-get-assurances"
import { assuranceTypes } from '@/components/custom/create-post/assurance-form';

export default function AssuranceBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const { assurances } = useGetAssurances(true)
  console.log(assurances)
  // Filter assurances based on search query and type
  const filteredAssurances = assurances.filter((assurance: LoanAssurance) => {
    const matchesSearch =
      assurance.assuranceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assurance.assuranceType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "All" || assurance.assuranceType === typeFilter

    return matchesSearch && matchesType
  })

  const sortedAssurances = [...filteredAssurances].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.assuranceId.localeCompare(b.assuranceId) // Using ID as proxy for creation date
      case "type":
        return a.assuranceType.localeCompare(b.assuranceType)
      case "debtor":
        return a.debtor.toString().localeCompare(b.debtor.toString())
      default:
        return 0
    }
  })

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Loan Assurances</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assurances..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select value={typeFilter} defaultValue="All" onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Assurance Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              {assuranceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="type">Assurance Type</SelectItem>
              <SelectItem value="debtor">Debtor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assurances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAssurances.length > 0 ? (
          sortedAssurances.map((assurance) => <AssuranceCard key={assurance.assuranceId} assurance={assurance} />)
        ) : (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            No assurances found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}