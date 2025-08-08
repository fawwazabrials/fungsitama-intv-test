import { db } from '@/lib/db';
import { invoices } from '@/drizzle/schema';
import { count, eq } from 'drizzle-orm';

interface GetAllOptions {
  limit: number;
  page: number;
  query?: string;
}

export const invoiceRepo = {
  async getAll({ limit, page, query }: GetAllOptions) {
    const totalEntries = (await db.select({ count: count() }).from(invoices))[0]
      .count;
    const totalPages = Math.floor(totalEntries / limit) + 1;

    return {
      invoices: await db.query.invoices.findMany({
        limit,
        offset: limit * (page - 1),
      }),
      totalEntries,
      totalPages,
    };
  },

  async get(id: string) {
    return await db.query.invoices.findFirst({
      where: eq(invoices.id, id),
      with: {
        items: true,
      },
    });
  },
};
