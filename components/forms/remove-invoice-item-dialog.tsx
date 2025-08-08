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

interface RemoveInvoiceItemDialogProps {
  removeItem: ({ description }: { description: string }) => Promise<void>;
}

const RemoveInvoiceItemDialog = ({
  removeItem,
}: RemoveInvoiceItemDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');

  const handleClick = () => {
    setIsLoading(true);

    removeItem({
      description,
    });

    setIsLoading(false);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          Remove Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Removes an Item</DialogTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-6">
              <Label className="text-sm">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Item name"
              />
            </div>

            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Remove Item'
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveInvoiceItemDialog;
