'use client';

import html2pdf from 'html2pdf.js';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ExportInvoiceButton = ({ invoiceId }: { invoiceId: string }) => {
  const printOnClick = () => {
    const printable = document.getElementById('invoice-print');
    if (!printable) {
      toast.error('No printable area found!');
      return;
    }

    html2pdf()
      .from(printable)
      .set({
        margin: 0.5,
        filename: `invoice_${invoiceId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save();
  };

  return <Button onClick={printOnClick}>Export to PDF</Button>;
};

export default ExportInvoiceButton;
