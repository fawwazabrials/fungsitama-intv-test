import { getInvoice } from '@/repositories/invoices-repo';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExportInvoiceButton from '@/components/buttons/export-invoice-button';
import { ArrowLeft } from 'lucide-react';
import BackButton from '@/components/buttons/back-button';

interface ProductPageParams {
  params: {
    id: string;
  };
}

const InvoicePage = async ({ params }: ProductPageParams) => {
  const invoice = await getInvoice(params.id);

  if (!invoice) {
    redirect('/');
  }

  return (
    <main className="py-10 px-96">
      <div className="mb-4 flex flex-row justify-between align-middle">
        <BackButton />
        <ExportInvoiceButton invoiceId={params.id} />
      </div>
      <Card id="invoice-print">
        <CardHeader>
          <CardTitle className="text-3xl">
            Invoice #{invoice.invoiceNumber}
          </CardTitle>
          <div className="mt-2 text-muted-foreground text-sm">
            Issued on {invoice.issueDate} • Due by {invoice.dueDate}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Client Info */}
          <div className="text-sm">
            <p className="font-semibold">Billed To:</p>
            <p>{invoice.clientName}</p>
            <p>{invoice.clientAddress}</p>
          </div>

          {/* Status + Dates */}
          <div className="flex items-center gap-4">
            <Badge variant="outline">{invoice.status}</Badge>
            <p className="text-sm text-muted-foreground">
              Created at: {invoice.createdAt}
            </p>
            <p className="text-sm text-muted-foreground">
              Updated at: {invoice.updatedAt}
            </p>
          </div>

          {/* Items Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Line Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {Number(item.unitPrice).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(item.lineTotal).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {/* Total row */}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  {Number(invoice.totalAmount).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default InvoicePage;
