import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Principal } from '@dfinity/principal';
import Typography from '../typography';

type Loan = {
  loanId: string;
  title: string;
  description: string;
  goal: number;
  createdAt: string;
  category: string;
  loanDuration: bigint;
  debtor: Principal;
};

type LoanDisplayProps = {
  loan: Loan;
};

const LoanDisplay: React.FC<LoanDisplayProps> = ({ loan }) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{loan.title}</CardTitle>
        <CardDescription>Loan ID: {loan.loanId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-fit rounded-lg overflow-hidden">
            <img
              src={"https://placehold.co/800x600/png"}
              alt={loan.title}
              className="w-full h-full object-cover"
            />
        </div>

        <div>
          <Typography variant="subtitle1">Description</Typography>
          <Typography variant="body1">{loan.description}</Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1">Goal</Typography>
            <Typography variant="body1">${loan.goal.toLocaleString()}</Typography>
          </div>

          <div>
            <Typography variant="subtitle1">Applied At</Typography>
            <Typography variant="body1">{loan.createdAt}</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1">Category</Typography>
            <Typography variant="body1">{loan.category}</Typography>
          </div>

          <div>
            <Typography variant="subtitle1">Loan Duration</Typography>
            <Typography variant="body1">{loan.loanDuration.toString()} days</Typography>
          </div>
        </div>

        <div>
          <Typography variant="subtitle1">Debtor</Typography>
          <Typography variant="body1">{loan.debtor.toString()}</Typography>
        </div>

        <div>
          <Typography variant="subtitle1">Assurance Type</Typography>
          <Typography variant="body1">Land Certificate</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanDisplay;