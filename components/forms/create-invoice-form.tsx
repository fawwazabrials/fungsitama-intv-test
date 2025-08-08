'use client';

import { createNewInvoiceSchema } from '@/dtos/invoice-dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertInvoice } from '@/repositories/invoices-repo';
import { toast } from 'sonner';

const CreateInvoiceForm = ({ invoiceNumber }: { invoiceNumber: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createNewInvoiceSchema>>({
    resolver: zodResolver(createNewInvoiceSchema),
    defaultValues: {
      invoiceNumber,
      invoiceDate: new Date().toLocaleDateString(),
      clientName: '',
      clientAddress: '',
      dueDate: new Date().toLocaleDateString(),
      issueDate: new Date().toLocaleDateString(),
      status: 'Draft',
      totalAmount: 0,
      items: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof createNewInvoiceSchema>) => {
    setIsLoading(true);

    const newInvoice = await insertInvoice(values);

    console.log(newInvoice);

    form.reset();

    toast.success('Invoice created');
    router.push('/');
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <Button disabled className="bg-black">
            DRAFT
          </Button>
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Generate Invoice'
            )}
          </Button>
        </div>

        {/* First row */}
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder={form.getValues().invoiceNumber}
                    disabled
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Invoice Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder={form.getValues().invoiceDate}
                    {...field}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Second row */}
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder={form.getValues().clientName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Third row */}
        <FormField
          control={form.control}
          name="clientAddress"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Client Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={form.getValues().clientAddress}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fourth row */}
        <div className="flex flex-row gap-4 w-1/2">
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder={form.getValues().issueDate}
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder={form.getValues().dueDate}
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateInvoiceForm;
