'use client';
import CustomTable from '@/components/Table/Table';

export default function Home() {
  return (
    <main className="overflow-hidden mt-3 w-full">
      <section className="w-full px-5">
        <CustomTable />
      </section>
    </main>
  );
}
