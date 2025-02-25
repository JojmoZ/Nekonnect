import { Button } from "@/components/ui/button"
import { BookOpen, Leaf, Cpu, Palette, Heart, Users, LayoutGrid } from "lucide-react"

const categoryIcons = {
  All: LayoutGrid,
  Education: BookOpen,
  Environment: Leaf,
  Technology: Cpu,
  "Arts & Culture": Palette,
  Wellness: Heart,
  Community: Users,
}

const categoryColors = {
  All: "text-blue-400",
  Education: "text-purple-400",
  Environment: "text-green-400",
  Technology: "text-cyan-400",
  "Arts & Culture": "text-pink-400",
  Wellness: "text-red-400",
  Community: "text-yellow-400",
}

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {["All", ...categories].map((category, index) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons]
        return (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full px-3 py-1 text-sm"
            onClick={() => onCategoryChange(category)}
          >
            <Icon className={`w-3 h-3 mr-1 ${categoryColors[category as keyof typeof categoryColors]}`} />
            <span>{category}</span>
          </Button>
        )
      })}
    </div>
  )
}

