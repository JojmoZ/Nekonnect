import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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

interface Project {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  daysLeft: number
  category: string
}

export function ProjectCard({ project }: { project: Project }) {
  const progress = (project.raised / project.goal) * 100
  const Icon = categoryIcons[project.category as keyof typeof categoryIcons]

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>{project.title}</CardTitle>
          <Icon className={`w-5 h-5 ${categoryColors[project.category as keyof typeof categoryColors]}`} />
        </div>
        <div className={`text-sm ${categoryColors[project.category as keyof typeof categoryColors]}`}>
          {project.category}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>${project.raised.toLocaleString()} raised</span>
          <span>${project.goal.toLocaleString()} goal</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{project.daysLeft} days left</span>
        <Button asChild>
          <a href={`/projects/${project.id}`}>Support This Project</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

