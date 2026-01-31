import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

const STORAGE_KEY = 'employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>(this.loadFromStorage());
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor() {
    // Initialize with sample data if storage is empty
    if (this.employeesSubject.value.length === 0) {
      this.initializeSampleData();
    }
  }

  private loadFromStorage(): Employee[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }

  private saveToStorage(employees: Employee[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
      this.employeesSubject.next(employees);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private initializeSampleData(): void {
    const sampleEmployees: Employee[] = [
      {
        id: this.generateId(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        dateOfJoining: '2023-01-15'
      },
      {
        id: this.generateId(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'HR',
        dateOfJoining: '2022-06-20'
      },
      {
        id: this.generateId(),
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        department: 'Sales',
        dateOfJoining: '2023-03-10'
      }
    ];
    this.saveToStorage(sampleEmployees);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getEmployees(): Employee[] {
    return this.employeesSubject.value;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employeesSubject.value.find(emp => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = {
      ...employee,
      id: this.generateId()
    };
    const employees = [...this.employeesSubject.value, newEmployee];
    this.saveToStorage(employees);
    return newEmployee;
  }

  updateEmployee(id: string, employee: Omit<Employee, 'id'>): Employee | null {
    const employees = this.employeesSubject.value.map(emp =>
      emp.id === id ? { ...employee, id } : emp
    );
    const updated = employees.find(emp => emp.id === id);
    if (updated) {
      this.saveToStorage(employees);
      return updated;
    }
    return null;
  }

  deleteEmployee(id: string): boolean {
    const employees = this.employeesSubject.value.filter(emp => emp.id !== id);
    if (employees.length < this.employeesSubject.value.length) {
      this.saveToStorage(employees);
      return true;
    }
    return false;
  }
}
