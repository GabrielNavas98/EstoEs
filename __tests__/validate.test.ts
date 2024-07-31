import { validateForm, validateField } from '../utilities/validationForm';

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

describe('validateForm', () => {
    it('should return no errors for valid form data', () => {
        const validFormData: FormData = {
            name: 'ValidName',
            description: 'Valid description with more than 8 characters',
            manager: 'ManagerName',
            assignedTo: 'DeveloperName',
            status: 'enabled',
        };

        const errors: Errors = validateForm(validFormData);
        expect(errors).toEqual({});
    });

    it('should return errors for invalid form data', () => {
        const invalidFormData: FormData = {
            name: 'Short',
            description: 'Short',
            manager: '',
            assignedTo: '',
            status: 'enabled',
        };

        const errors: Errors = validateForm(invalidFormData);
        expect(errors).toEqual({
            name: 'Name must be between 8 and 16 characters',
            description: 'Description must be between 8 and 50 characters',
            manager: 'Manager is required',
            assignedTo: 'Developer is required',
        });
    });
});

describe('validateField', () => {
    it('should return an error for a short name', () => {
        const error: string = validateField('name', 'Short');
        expect(error).toBe('Name must be between 8 and 16 characters');
    });

    it('should return no error for a valid name', () => {
        const error: string = validateField('name', 'ValidName');
        expect(error).toBe('');
    });

    it('should return an error for a short description', () => {
        const error: string = validateField('description', 'Short');
        expect(error).toBe('Description must be between 8 and 50 characters');
    });

    it('should return no error for a valid description', () => {
        const error: string = validateField('description', 'Valid description');
        expect(error).toBe('');
    });

    it('should return an error for an empty manager', () => {
        const error: string = validateField('manager', '');
        expect(error).toBe('Manager is required');
    });

    it('should return no error for a valid manager', () => {
        const error: string = validateField('manager', 'ManagerName');
        expect(error).toBe('');
    });

    it('should return an error for an empty assignedTo', () => {
        const error: string = validateField('assignedTo', '');
        expect(error).toBe('Developer is required');
    });

    it('should return no error for a valid assignedTo', () => {
        const error: string = validateField('assignedTo', 'DeveloperName');
        expect(error).toBe('');
    });
});
