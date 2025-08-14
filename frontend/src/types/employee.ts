import type { EmployeeFormData } from '../components/EmployeeForm/EmployeeForm';

export type Employee = EmployeeFormData & {
  id: number;
  isArchived: boolean;
};
