import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router';
import { RouteEnum } from '@/lib/enum/router-enum';

const faqData = [
  {
    id: 'item-1',
    question: 'Is it accessible?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    id: 'item-2',
    question: 'Is it styled?',
    answer:
      "Yes. It comes with default styles that match the other components' aesthetic.",
  },
  {
    id: 'item-3',
    question: 'Is it animated?',
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export function CreateLoanLanding() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <img
          src="https://vetmed.tamu.edu/news/wp-content/uploads/sites/9/2023/05/AdobeStock_472713009.jpeg"
          alt="Loan Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg text-center">
            Nekkonect is here to be with you!
          </h1>
        </div>
      </div>

      <div className="container relative w-full flex justify-end px-10">
        <Card className="absolute -bottom-10 right-10 w-96 p-6 bg-background shadow-2xl rounded-lg">
          <p className="text-foreground text-lg">
            Get the financial support you need with our easy loan application
            process.
          </p>
          <Link to={RouteEnum.CREATE_POST}>
            <Button className="mt-4 px-6 py-3 text-lg bg-primary-to-accent hover:bg-primary-to-accent-hover text-white rounded-lg shadow-md transition-all">
              Create a Loan
            </Button>
          </Link>
        </Card>
      </div>
      <div className="container w-full mt-24 mb-24 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full text-left">
          {faqData.map(({ id, question, answer }) => (
            <AccordionItem
              key={id}
              value={id}
              className="border-b border-foreground"
            >
              <AccordionTrigger className="text-lg font-semibold text-foreground">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
