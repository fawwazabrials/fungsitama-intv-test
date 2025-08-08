import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PAGINATION_LIMIT = 10;

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const page = Number(searchParams?.page ?? '1');

  const { invoices, totalEntries, totalPages } = await getAllInvoices({
    limit: 10,
    page,
    query: searchParams?.query,
  });

  return (
    <main className="py-8 px-8 flex flex-row items-start gap-4">
      <Card className="w-[20%]">
        <CardHeader>
          <CardTitle className="">Filters</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <form action="/" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-semibold">Search</Label>
              <Input
                name="query"
                placeholder="Number, Client, etc"
                defaultValue={searchParams?.query}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-semibold">Issue Date</Label>
              <div className="flex flex-col gap-2">
                <div>
                  <Label className="text-sm">From</Label>
                  <Input
                    name="created_at_from"
                    placeholder="Start date"
                    type="date"
                  />
                </div>
                <div>
                  <Label className="text-sm">To</Label>
                  <Input
                    name="created_at_to"
                    placeholder="End date"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Filter</Button>
        </CardFooter>
      </Card>
      <div className="w-full h-screen flex flex-col">
        {/* Header */}
        <div className="flex flex-row justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Invoices</h1>
          <Link href="/new-invoice">
            <Button variant="outline">
              <Grid2X2Plus className="size-4 mr-2" /> Create Invoice
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-4">
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
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-between items-center p-4 border-t">
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
      </div>
    </main>
  );
}
