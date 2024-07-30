import ProjectForm from '@/components/Form/Form';
import React from 'react';

export default function Form({ params }: { params: { id: string } }) {
  return (
    <div className="w-full flex justify-center align-middle">
      <ProjectForm isEdit={true} id={params.id} />
    </div>
  );
}
