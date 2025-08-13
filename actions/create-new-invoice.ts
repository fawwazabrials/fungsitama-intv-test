'use server';

import { invoiceItems, invoices } from '@/drizzle/schema';
import { createNewInvoiceSchema } from '@/dtos/invoice-dto';
import { db } from '@/lib/db';
import z from 'zod';

export const createNewInvoice = async (
  values: z.infer<typeof createNewInvoiceSchema>
) => {
  const data = createNewInvoiceSchema.parse(values);

  await db.transaction(async (tx) => {
    const invoiceValues = {
      invoiceNumber: data.invoiceNumber,
      invoiceDate: data.invoiceDate,
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      totalAmount: data.totalAmount,
      status: data.status,
    };

    const newInvoice = await tx
      .insert(invoices)
      .values(invoiceValues)
      .returning();

    const itemValues = data.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toString(),
      lineTotal: item.lineTotal.toString(),
      invoiceId: newInvoice[0].id,
    }));

    await tx.insert(invoiceItems).values(itemValues);
  });
};
