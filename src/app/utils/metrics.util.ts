import { Employee } from '../models/employee.model';
import { Department, DEPARTMENTS } from '../models/employee.model';

export interface DashboardMetrics {
  totalEmployees: number;
  activeDepartments: number;
  newHiresThisMonth: number;
  totalDepartments: number;
}

export class MetricsCalculator {
  static calculate(employees: Employee[]): DashboardMetrics {
    return {
      totalEmployees: employees.length,
      activeDepartments: this.getActiveDepartmentsCount(employees),
      newHiresThisMonth: this.getNewHiresThisMonth(employees),
      totalDepartments: DEPARTMENTS.length
    };
  }

  private static getActiveDepartmentsCount(employees: Employee[]): number {
    const uniqueDepts = new Set(employees.map(emp => emp.department));
    return uniqueDepts.size;
  }

  private static getNewHiresThisMonth(employees: Employee[]): number {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return employees.filter(emp => {
      const joinDate = new Date(emp.dateOfJoining);
      return joinDate >= startOfMonth;
    }).length;
  }
}
