import { createNewInvoice } from '@/actions/create-new-invoice';
import { createNewInvoiceSchema } from '@/dtos/invoice-dto';
import { getAllInvoices } from '@/repositories/invoices-repo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const invoices = await getAllInvoices({
    limit: 1000,
    page: 1,
  });
  return NextResponse.json(invoices, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedResult = createNewInvoiceSchema.safeParse(body);

  if (!parsedResult.success)
    return NextResponse.json(
      {
        message: 'Validation error',
        error: parsedResult.error,
      },
      { status: 400 }
    );

  const data = parsedResult.data;
  await createNewInvoice(data);

  return NextResponse.json({ status: 201 });
}
