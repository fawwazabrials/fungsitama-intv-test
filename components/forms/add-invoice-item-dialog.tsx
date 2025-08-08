import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { DialogHeader } from '../ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';

interface AddInvoiceItemDialogProps {
  addItem: ({
    description,
    quantity,
    unitPrice,
  }: {
    description: string;
    quantity: number;
    unitPrice: number;
  }) => Promise<void>;
}

const AddInvoiceItemDialog = ({ addItem }: AddInvoiceItemDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleClick = () => {
    setIsLoading(true);

    addItem({
      description,
      quantity,
      unitPrice,
    });

    setIsLoading(false);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button type="button">Add Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-6">
              <Label className="text-sm">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Item name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">Quantity</Label>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                placeholder="1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">Unit Price</Label>
              <Input
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                type="number"
                placeholder="1000"
              />
            </div>

            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Add Item'
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceItemDialog;
