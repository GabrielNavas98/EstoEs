'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import useProjectsStore from '@/data/useProjectsStore';
import { managers, developers } from './dataMock';

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
  };

  const handleSubmit = () => {
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
      <div className="form-group">
        <label htmlFor="name">Project name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="manager">Project manager</label>
        <select
          id="manager"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
        >
          <option value="">Select manager</option>
          {managers.map((manager) => {
            return <option key={manager.id}>{manager.name}</option>;
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="assignedTo">Assigned to</label>
        <select
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select developer</option>
          {developers.map((dev) => {
            return <option key={dev.id}>{dev.name}</option>;
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
      {isEdit ? (
        <button type="submit" className="submit-button">
          Edit project
        </button>
      ) : (
        <button type="submit" className="submit-button">
          Create project
        </button>
      )}
    </form>
  );
};

export default ProjectForm;
