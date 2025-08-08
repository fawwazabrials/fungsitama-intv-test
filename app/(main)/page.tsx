import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllInvoices } from '@/repositories/invoices-repo';
import { Eye, Grid2X2Plus, Pencil, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PAGINATION_LIMIT = 10;

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page ?? '1');

  const { invoices, totalEntries, totalPages } = await getAllInvoices({
    limit: 10,
    page,
  });

  return (
    <main className="py-10 px-16">
      <Card>
        <CardHeader className="flex flex-row justify-between align-middle">
          <CardTitle className="text-2xl font-bold mt-1.5">Invoices</CardTitle>
          <Link href="/new-invoice">
            <Button variant="outline">
              <Grid2X2Plus className="size-4 mr-2" /> Create Invoice
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table className="my-4">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalEntries === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="pt-4 text-center font-semibold"
                  >
                    There is no data!
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="flex flex-row gap-2 justify-center">
                      <Link href={`/invoices/${invoice.id}`}>
                        <Eye className="size-6" />
                      </Link>
                      <Pencil className="size-6" />
                      <Printer className="size-6" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex flex-row justify-between align-middle">
            <p className="text-sm">
              Showing <strong>{PAGINATION_LIMIT}</strong> out of{' '}
              <strong>{totalEntries}</strong> invoices.
            </p>
            <Pagination>
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/?page=${page - 1}`} />
                  </PaginationItem>
                )}

                {page > 1 && (
                  <PaginationItem>
                    <PaginationLink href={`/?page=${page - 1}`}>
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink isActive href={`/?page=${page}`}>
                    {page}
                  </PaginationLink>
                </PaginationItem>

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationLink href={`/?page=${page + 1}`}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {page !== totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
