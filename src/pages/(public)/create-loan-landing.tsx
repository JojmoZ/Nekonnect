import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router';

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

      <div className="relative w-full flex justify-end px-10">
        <Card className="absolute -bottom-10 right-10 w-96 p-6 bg-white shadow-2xl rounded-lg">
          <p className="text-gray-700 text-lg">
            Get the financial support you need with our easy loan application
            process.
          </p>
          <Link to="/create">
            <Button className="mt-4 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all">
              Create a Loan
            </Button>
          </Link>
        </Card>
      </div>
      <div className="w-full max-w-6xl mt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full text-left">
          {faqData.map(({ id, question, answer }) => (
            <AccordionItem
              key={id}
              value={id}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-900">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
