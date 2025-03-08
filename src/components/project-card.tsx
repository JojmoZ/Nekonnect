import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LoanPost } from '@/lib/model/entity/loan-post';
import { Link } from 'react-router';
import { timeLeft } from '@/lib/utils/DateString';
import { deserializeImage } from '@/lib/utils/Image';
import { formatCurrency } from '@/lib/utils/Currency';
import { categoryColors, categoryIcons } from '@/components/category-filter';

export function ProjectCard({ project }: { project: LoanPost }) {
  const progress = (project.raised / project.goal) * 100;

  const Icon = categoryIcons[project.category as keyof typeof categoryIcons];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>{project.title}</CardTitle>
          <Icon
            className={`w-5 h-5 ${categoryColors[project.category as keyof typeof categoryColors]}`}
          />
        </div>
        <div
          className={`text-sm ${categoryColors[project.category as keyof typeof categoryColors]}`}
        >
          {project.category}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Image */}
        <div className="h-36 mb-4">
          <img
            src={deserializeImage(project.image)}
            alt={project.title}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {project.description}
        </p>
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>{formatCurrency(project.raised)} raised</span>
          <span>{formatCurrency(project.goal)} goal</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {timeLeft(project.verifiedAt, project.postDuration)}
        </span>
        {timeLeft(project.verifiedAt, project.postDuration) === 'Expired' ? (
          <Button asChild disabled >
            <p>Expired</p>
          </Button>
        ) : (
          <Button asChild>
            <Link to={`/post/${project.loanId}`}>Support</Link>
          </Button>
        )}
       
      </CardFooter>
    </Card>
  );
}
