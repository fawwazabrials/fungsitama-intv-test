import { randomUUID } from 'crypto';
import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  text,
  date,
  integer,
  pgEnum,
  numeric,
} from 'drizzle-orm/pg-core';

export const invoicesStatusEnum = pgEnum('invoice_status', [
  'Draft',
  'Sent',
  'Paid',
  'Cancelled',
]);

export const invoices = pgTable('invoices', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => randomUUID()),
  createdAt: timestamp('created_at', {
    precision: 6,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    mode: 'string',
  }).defaultNow(),

  invoiceNumber: varchar('invoice_number', { length: 36 }).notNull().unique(),
  invoiceDate: date('invoice_date').notNull(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientAddress: text('client_address').notNull(),
  issueDate: date('issue_date').notNull(),
  dueDate: date('due_date').notNull(),
  totalAmount: integer('total_amount').notNull(),
  status: invoicesStatusEnum('status').notNull().default('Draft'),
});

export const invoiceItems = pgTable('invoice_items', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default('gen_random_uuid()'),
  invoiceId: varchar('id', { length: 36 })
    .notNull()
    .references(() => invoices.id),
  description: varchar('description', { length: 36 }).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 10 }).notNull(),
  lineTotal: numeric('line_total', { precision: 10 }).notNull(),
});
