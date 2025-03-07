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
import Logo from '@/components/logo';

const faqData = [
  {
    id: 'item-1',
    question: 'What is the process for borrowing a loan on nekonnect?',
    answer: 'To borrow a loan, simply create an account, complete your profile verification, and apply for a loan by selecting your desired amount and term. Once approved, funds will be disbursed directly to your account.',
  },
  {
    id: 'item-2',
    question: 'What types of loans do nekonnect offer?',
    answer:
      "We offer flexible loans backed by real-world assets. These loans are designed to provide competitive rates with terms that match your financial needs.",
  },
  {
    id: 'item-3',
    question: 'How is my loan backed by assets?',
    answer:
      "All loans are secured with tangible assets that act as collateral, providing safety for lenders and better rates for borrowers.",
  },
];

export function CreateLoanLanding() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src="./assets/borrower_landing.jpeg"
          alt="Loan Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center">
            <img
              src={
                './assets/logo-white.png'
              }
              alt="NeKonnect Logo"
              className={'h-20'}
            />{' '}
            is here to be with you!
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
