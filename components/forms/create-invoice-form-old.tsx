'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import z from 'zod';
import {
  createNewInvoiceSchema,
  insertInvoiceItemSchema,
  insertInvoiceItemWithoutTotalSchema,
} from '@/dtos/invoice-dto';
import { Textarea } from '../ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import AddInvoiceItemForm from './add-invoice-item-form';
import { toast } from 'sonner';
import { useState } from 'react';
import RemoveInvoiceItemForm from './remove-invoice-item-form';

const CreateInvoiceForm = ({ invoiceNumber }: { invoiceNumber: string }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createNewInvoiceSchema>>({
    resolver: zodResolver(createNewInvoiceSchema),
    defaultValues: {
      invoiceNumber,
      invoiceDate: new Date().toLocaleDateString(),
      clientName: '',
      clientAddress: '',
      issueDate: '',
      dueDate: '',
      items: [
        {
          description: 'Bebek Goreng',
          quantity: 1,
          unitPrice: 15.0,
          lineTotal: 15.0,
        },
      ],
    },
  });

  const itemsArray = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onAddItem = ({
    description,
    quantity,
    unitPrice,
  }: z.infer<typeof insertInvoiceItemWithoutTotalSchema>) => {
    console.log(description);
    const result = insertInvoiceItemSchema.safeParse({
      description,
      quantity,
      unitPrice,
      lineTotal: quantity * unitPrice,
    });

    if (!result.success || result.data === undefined) {
      toast(JSON.stringify(result.error.flatten().fieldErrors));
      return;
    }

    // TODO: logic for when there is another item with the same name
    itemsArray.append(result.data);

    // TODO: fix toast
    toast('Successfully added item');
    setAddDialogOpen(false);
  };

  const onRemoveItem = ({
    description,
  }: z.infer<typeof insertInvoiceItemWithoutTotalSchema>) => {
    if (!description) {
      toast('Item description is required');
      return;
    }

    const itemIdx = itemsArray.fields.findIndex(
      (it) => it.description === description
    );

    if (itemIdx === -1) {
      toast('Item does not exist');
      return;
    }

    // TODO: logic for when there is another item with the same name
    itemsArray.remove(itemIdx);

    // TODO: fix toast
    toast('Succesfully removed item');
    setRemoveDialogOpen(false);
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Button disabled className="bg-black">
              DRAFT
            </Button>
            <Button variant="outline" type="submit">
              Generate Invoice
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <Input placeholder={''} {...field} />
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
                  <Textarea placeholder={''} {...field} />
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
                    <Input placeholder={''} type="date" {...field} />
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
                    <Input placeholder={''} type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Invoice items */}
          <div className="flex flex-row">
            <h2 className="mt-4 font-bold">Invoice Items</h2>
            <div className="flex flex-row gap-2 ml-auto">
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button">Add Item</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <AddInvoiceItemForm onAddItem={onAddItem} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog
                open={removeDialogOpen}
                onOpenChange={setRemoveDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button type="button" variant="destructive">
                    Remove Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remove Item</DialogTitle>
                    <RemoveInvoiceItemForm onRemoveItem={onRemoveItem} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoiceForm;
