export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  dateOfJoining: string; // ISO date string
}

export type Department = 'HR' | 'Engineering' | 'Sales' | 'Marketing' | 'Finance' | 'Operations';

export const DEPARTMENTS: Department[] = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations'];
