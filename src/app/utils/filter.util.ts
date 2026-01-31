import { Employee } from '../models/employee.model';

export type SortField = 'name' | 'dateOfJoining' | null;
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
  searchTerm: string;
  department: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export class EmployeeFilter {
  static applyFilters(
    employees: Employee[],
    options: FilterOptions
  ): Employee[] {
    let filtered = [...employees];

    // Apply search filter
    if (options.searchTerm.trim()) {
      const search = options.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search)
      );
    }

    // Apply department filter
    if (options.department !== 'all') {
      filtered = filtered.filter(emp => emp.department === options.department);
    }

    // Apply sorting
    if (options.sortField) {
      filtered.sort((a, b) => {
        let comparison = 0;
        
        if (options.sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (options.sortField === 'dateOfJoining') {
          comparison = new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime();
        }
        
        return options.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }
}
