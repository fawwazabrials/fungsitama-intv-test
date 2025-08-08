'use server';

import { invoiceItems, invoices } from '@/drizzle/schema';
import { createNewInvoiceSchema } from '@/dtos/invoice-dto';
import { db } from '@/lib/db';
import z from 'zod';

export const createNewInvoice = async (
  values: z.infer<typeof createNewInvoiceSchema>
) => {
  // TODO; validation

  await db.transaction(async (tx) => {
    const invoiceValues = {
      invoiceNumber: values.invoiceNumber,
      invoiceDate: values.invoiceDate,
      clientName: values.clientName,
      clientAddress: values.clientAddress,
      issueDate: values.issueDate,
      dueDate: values.dueDate,
      totalAmount: values.totalAmount,
      status: values.status,
    };

    const newInvoice = await tx
      .insert(invoices)
      .values(invoiceValues)
      .returning();

    const itemValues = values.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice.toString(),
      lineTotal: item.lineTotal.toString(),
      invoiceId: newInvoice[0].id,
    }));

    await tx.insert(invoiceItems).values(itemValues);
  });
};
