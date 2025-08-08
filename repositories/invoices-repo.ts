'use server';

import { db } from '@/lib/db';
import { invoices } from '@/drizzle/schema';
import { eq, count, or, ilike, gte, lte, and } from 'drizzle-orm';

export async function getAllInvoices({
  limit,
  page,
  query,
  created_from_from,
  created_from_to,
}: {
  limit: number;
  page: number;
  query?: string;
  created_from_from?: string;
  created_from_to?: string;
}) {
  // Create WHERE filter
  const filters = [];
  if (query) {
    filters.push(
      or(
        ilike(invoices.invoiceNumber, `%${query}%`),
        ilike(invoices.clientName, `%${query}%`)
      )
    );
  }
  if (created_from_from) {
    filters.push(gte(invoices.dueDate, created_from_from));
  }
  if (created_from_to) {
    filters.push(lte(invoices.dueDate, created_from_to));
  }

  const totalEntries = (
    await db
      .select({ count: count() })
      .from(invoices)
      .where(filters.length > 0 ? and(...filters) : undefined)
  )[0].count;
  const totalPages = Math.floor(totalEntries / limit) + 1;

  return {
    invoices: await db.query.invoices.findMany({
      limit,
      offset: limit * (page - 1),
      where: and(...filters),
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
