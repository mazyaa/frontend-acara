import { Button } from '@heroui/react';
import { Inter } from 'next/font/google';
import PageHead from '@/components/commons/pageHead';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Acara - Home" />
      <Button color="primary">Hello</Button>
    </main>
  );
}
