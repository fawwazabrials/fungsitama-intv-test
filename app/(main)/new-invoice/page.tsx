import CreateInvoiceForm from '@/components/forms/create-invoice-form';
import React from 'react';

const CreateInvoicePage = () => {
  return (
    <main className="py-10 px-96">
      <h1 className="text-4xl font-bold mb-4">Create New Invoice</h1>
      <CreateInvoiceForm invoiceNumber="INVC/123456" />
    </main>
  );
};

export default CreateInvoicePage;
