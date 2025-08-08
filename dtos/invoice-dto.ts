import { invoiceItems, invoices } from '@/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
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
      z.number().min(0, 'Price cannot be negative')
    ),
    lineTotal: z.preprocess(
      (val) => Number(val),
      z.number().min(0, 'Total price cannot be negative')
    ),
  });

export const insertInvoiceItemWithoutTotalSchema = insertInvoiceItemSchema.omit(
  {
    lineTotal: true,
  }
);
export const createNewInvoiceSchema = insertInvoiceSchema.extend({
  items: insertInvoiceItemSchema.array(),
});
