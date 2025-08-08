CREATE TYPE "public"."invoice_status" AS ENUM('Draft', 'Sent', 'Paid', 'Cancelled');--> statement-breakpoint
CREATE TABLE "invoice_items" (
	"id" varchar(36) NOT NULL,
	"description" varchar(36) NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10) NOT NULL,
	"line_total" numeric(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"created_at" timestamp(6) DEFAULT now(),
	"updated_at" timestamp(6) DEFAULT now(),
	"invoice_number" varchar(36) NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"client_address" text NOT NULL,
	"issue_date" date NOT NULL,
	"due_date" date NOT NULL,
	"total_amount" integer NOT NULL,
	"status" "invoice_status" DEFAULT 'Draft' NOT NULL,
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_id_invoices_id_fk" FOREIGN KEY ("id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;