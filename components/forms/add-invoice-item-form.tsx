'use client';

import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { insertInvoiceItemWithoutTotalSchema } from '@/dtos/invoice-dto';
import z from 'zod';

interface AddInvoiceItemFormProps {
  onAddItem: (
    data: z.infer<typeof insertInvoiceItemWithoutTotalSchema>
  ) => void;
}

const AddInvoiceItemForm = ({ onAddItem }: AddInvoiceItemFormProps) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleAdd = () => {
    if (!description.trim()) return;
    onAddItem({
      description,
      quantity,
      unitPrice,
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

      <div className="flex flex-col gap-2">
        <Label>Quantity</Label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          placeholder="1"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Unit Price</Label>
        <Input
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          type="number"
          placeholder="1000"
        />
      </div>

      <Button onClick={handleAdd}>Add Item</Button>
    </div>
  );
};

export default AddInvoiceItemForm;
