'use client';

import { createNewInvoiceSchema } from '@/dtos/invoice-dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AddInvoiceItemDialog from './add-invoice-item-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import RemoveInvoiceItemDialog from './remove-invoice-item-dialog';
import { createNewInvoice } from '@/actions/create-new-invoice';
import { Label } from '../ui/label';

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
  const itemsWatch = form.watch('items');
  const itemsArray = useFieldArray({
    control: form.control,
    name: 'items',
  });

  useEffect(() => {
    const total = itemsWatch.reduce((sum, item) => {
      const value =
        typeof item.lineTotal === 'number'
          ? item.lineTotal
          : parseFloat(item.lineTotal);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    form.setValue('totalAmount', total);
  }, [itemsWatch, form]);

  const onSubmit = async (values: z.infer<typeof createNewInvoiceSchema>) => {
    setIsLoading(true);

    const newInvoice = await createNewInvoice(values);

    console.log(newInvoice);

    form.reset();

    toast.success('Invoice created');
    router.push('/');
    setIsLoading(false);
  };
  const addItem = async ({
    description,
    quantity,
    unitPrice,
  }: {
    description: string;
    quantity: number;
    unitPrice: number;
  }) => {
    console.log({
      description,
      quantity,
      unitPrice,
      lineTotal: quantity * unitPrice,
    });
    itemsArray.append({
      description,
      quantity,
      unitPrice,
      lineTotal: quantity * unitPrice,
    });
    console.log(itemsArray.fields);

    toast.success('Item added!');
  };
  const removeItem = async ({ description }: { description: string }) => {
    const itemIdx = itemsArray.fields.findIndex(
      (it) => it.description === description
    );
    if (itemIdx === -1) return;
    itemsArray.remove(itemIdx);
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

        <div className="flex flex-row justify-between align-middle mt-8">
          <h2 className="font-bold">Invoice Items</h2>
          <div className="flex flex-row gap-2">
            <AddInvoiceItemDialog addItem={addItem} />
            <RemoveInvoiceItemDialog removeItem={removeItem} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsArray.fields.map((item) => (
              <TableRow key={item.description}>
                <TableCell className="font-medium">
                  {item.description}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.lineTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2 className="text-sm ml-auto">
          Total Price:{' '}
          <span className="font-bold">{form.getValues().totalAmount}</span>
        </h2>
      </form>
    </Form>
  );
};

export default CreateInvoiceForm;
