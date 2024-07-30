import ProjectForm from '@/components/Form/Form';
import React from 'react';

export default function Form() {
  return (
    <div className="w-full flex justify-center align-middle">
      <ProjectForm isEdit={false} />
    </div>
  );
}
