interface FormData {
  name: string;
  description: string;
  manager: string;
  assignedTo: string;
  status: string;
}

interface Errors {
  [key: string]: string;
}

export const validateForm = (formData: FormData): Errors => {
  const errors: Errors = {};

  if (formData.name.length < 8 || formData.name.length > 16) {
    errors.name = 'Name must be between 8 and 16 characters';
  }
  if (formData.description.length < 8 || formData.description.length > 50) {
    errors.description = 'Description must be between 8 and 50 characters';
  }
  if (!formData.manager) {
    errors.manager = 'Manager is required';
  }
  if (!formData.assignedTo) {
    errors.assignedTo = 'Developer is required';
  }

  return errors;
};

export const validateField = (name: string, value: string) => {
  let error = '';
  const trimmedValue = value.trim();
  switch (name) {
    case 'name':
      if (trimmedValue.length < 8 || trimmedValue.length > 16) {
        error = 'Name must be between 8 and 16 characters';
      }
      break;
    case 'description':
      if (trimmedValue.length < 8 || trimmedValue.length > 50) {
        error = 'Description must be between 8 and 50 characters';
      }
      break;
    case 'manager':
      if (!trimmedValue) {
        error = 'Manager is required';
      }
      break;
    case 'assignedTo':
      if (!trimmedValue) {
        error = 'Developer is required';
      }
      break;
    default:
      break;
  }

  return error;
};