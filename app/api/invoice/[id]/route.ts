import { getInvoice } from '@/repositories/invoices-repo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (typeof id !== 'string')
    return NextResponse.json(
      {
        message: 'Request error',
      },
      { status: 400 }
    );

  const invoice = await getInvoice(id);
  return NextResponse.json(invoice, { status: 200 });
}
