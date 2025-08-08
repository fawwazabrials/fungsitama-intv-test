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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllInvoices } from '@/repositories/invoices-repo';

const PAGINATION_LIMIT = 2;

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page ?? '1');

  const { invoices, totalEntries, totalPages } = await getAllInvoices({
    limit: PAGINATION_LIMIT,
    page,
  });

  return (
    <main className="py-10 px-16">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold flex-1">Invoices</h1>
        <Link href="/new-invoice">
          <Button>Create</Button>
        </Link>
      </div>
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>{invoice.issueDate}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell className="text-right">Action</TableCell>
            </TableRow>
          ))}
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
    </main>
  );
}
