ALTER TABLE "invoice_items" DROP CONSTRAINT "invoice_items_id_invoices_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice_items" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "invoice_items" ADD COLUMN "invoice_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;