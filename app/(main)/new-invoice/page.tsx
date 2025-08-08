import BackButton from '@/components/buttons/back-button';
import CreateInvoiceForm from '@/components/forms/create-invoice-form';
import { generateInvoiceNumber } from '@/datasource/internals/generate-invoice-number';
import React from 'react';

const CreateInvoicePage = () => {
  return (
    <main className="py-10 px-96">
      <h1 className="text-4xl font-bold mb-4">
        <span>
          <BackButton />
        </span>
        Create New Invoice
      </h1>
      <CreateInvoiceForm invoiceNumber={generateInvoiceNumber()} />
    </main>
  );
};

export default CreateInvoicePage;
