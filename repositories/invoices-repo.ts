'use server';

import { db } from '@/lib/db';
import { invoices } from '@/drizzle/schema';
import { eq, count, or, ilike } from 'drizzle-orm';

export async function getAllInvoices({
  limit,
  page,
  query,
}: {
  limit: number;
  page: number;
  query?: string;
}) {
  const queries = query
      ? or(
          ilike(invoices.invoiceNumber, `%${query}%`),
          ilike(invoices.clientName, `%${query}%`)
        )
      : undefined;

  const totalEntries = (await db.select({ count: count() }).from(invoices).where(queries))[0]
    .count;
  const totalPages = Math.floor(totalEntries / limit) + 1;

  return {
    invoices: await db.query.invoices.findMany({
      limit,
      offset: limit * (page - 1),
      where: queries
    }),
    totalEntries,
    totalPages,
  };
}

export async function getInvoice(id: string) {
  return await db.query.invoices.findFirst({
    where: eq(invoices.id, id),
    with: {
      items: true,
    },
  });
}

export async function insertInvoice(values: typeof invoices.$inferInsert) {
  return await db.insert(invoices).values(values).returning();
}
