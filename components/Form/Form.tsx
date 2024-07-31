'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import useProjectsStore from '@/store/useProjectsStore';
import { managers, developers } from '@/data/data';
import { validateField, validateForm } from '@/utilities/validationForm';
import './style.css';

interface FormProps {
  isEdit?: boolean;
  id?: string;
}

const ProjectForm = ({ isEdit, id }: FormProps) => {
  const router = useRouter();
  const { addProject, updateProject, getProjectById } = useProjectsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    assignedTo: '',
    status: 'Enabled',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && id) {
      setIsLoading(true);
      const project = getProjectById(id);
      if (project) {
        setFormData({ ...project });
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, [isEdit, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    if (isEdit) {
      updateProject({
        ...formData,
        id: id as string,
        createdAt: new Date(),
        avatarManager: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        designatedAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      });
    } else {
      const newProject = {
        id: uuid(),
        ...formData,
        createdAt: new Date(),
        avatarManager: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        designatedAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      };
      addProject(newProject);
    }
    setFormData({
      name: '',
      description: '',
      manager: '',
      assignedTo: '',
      status: 'Enabled',
    });
    router.push('/');
  };
  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Project name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="manager" className="block text-gray-700 font-bold mb-2">
          Project manager
        </label>
        <select
          id="manager"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.manager ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          <option value="">Select manager</option>
          {managers.map((manager) => (
            <option key={manager.id} value={manager.name}>
              {manager.name}
            </option>
          ))}
        </select>
        {errors.manager && (
          <p className="text-red-500 text-xs italic">{errors.manager}</p>
        )}
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="assignedTo"
          className="block text-gray-700 font-bold mb-2"
        >
          Assigned to
        </label>
        <select
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.assignedTo ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          <option value="">Select developer</option>
          {developers.map((dev) => (
            <option key={dev.id} value={dev.name}>
              {dev.name}
            </option>
          ))}
        </select>
        {errors.assignedTo && (
          <p className="text-red-500 text-xs italic">{errors.assignedTo}</p>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.status ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-red-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto hover:bg-red-700"
      >
        {isEdit ? 'Edit Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
