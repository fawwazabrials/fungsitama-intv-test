import { invoiceItems, invoices } from '@/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

export const insertInvoiceSchema = createInsertSchema(invoices)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    invoiceNumber: z.string().min(1, 'Invoice number must be filled'),
    clientName: z.string().min(1, "Client's name must be filled"),
    clientAddress: z.string().min(1, "Client's address must be filled"),
    totalAmount: z.number().min(1, 'Total amount cannot be zero or negative'),
  });

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems)
  .omit({
    id: true,
    invoiceId: true,
  })
  .extend({
    description: z.string().min(1, { message: 'Description is required' }),
    quantity: z.preprocess(
      (val) => Number(val),
      z.number().min(1, 'Minimum quantity is 1')
    ),
    unitPrice: z.preprocess(
      (val) => Number(val),
      z.number().min(1, 'Price cannot be zero or negative')
    ),
    lineTotal: z.preprocess(
      (val) => Number(val),
      z.number().min(1, 'Total price cannot be zero or negative')
    ),
  });

export const insertInvoiceItemWithoutTotalSchema = insertInvoiceItemSchema.omit(
  {
    lineTotal: true,
  }
);
export const createNewInvoiceSchema = insertInvoiceSchema.extend({
  items: insertInvoiceItemSchema.array().min(1, 'Invoice must have items'),
});
