'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <ArrowLeft className="size-6" />
    </Button>
  );
};

export default BackButton;
