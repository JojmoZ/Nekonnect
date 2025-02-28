import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import confetti from 'canvas-confetti';
import Stepper from './stepper';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { transactionSchema } from '@/lib/model/dto/create-transaction.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DonationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function DonationOverlay({
  isOpen,
  onClose,
  projectTitle,
}: DonationOverlayProps) {
  const transactionForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      loanId: '',
      amount: 0,
      type: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Support {projectTitle}</DialogTitle>
          <DialogDescription>
            Choose your donation amount and method to support this project.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...transactionForm}>
          <form className="space-y-8">
            <FormField
              control={transactionForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={transactionForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Debit", "Credit"].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={handleSubmit}>Donate</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
