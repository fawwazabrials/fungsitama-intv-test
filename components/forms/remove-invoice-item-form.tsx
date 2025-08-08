'use client';

import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { insertInvoiceItemWithoutTotalSchema } from '@/dtos/invoice-dto';
import z from 'zod';

interface RemoveInvoiceItemFormProps {
  onRemoveItem: (
    data: z.infer<typeof insertInvoiceItemWithoutTotalSchema>
  ) => void;
}

const RemoveInvoiceItemForm = ({
  onRemoveItem,
}: RemoveInvoiceItemFormProps) => {
  const [description, setDescription] = useState('');

  const handleRemove = () => {
    if (!description.trim()) return;
    onRemoveItem({
      description,
      quantity: 0,
      unitPrice: 0,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mt-8">
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item name"
        />
      </div>

      <Button variant="destructive" onClick={handleRemove}>
        Remove Item
      </Button>
    </div>
  );
};

export default RemoveInvoiceItemForm;
