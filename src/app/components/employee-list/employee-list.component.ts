import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ExportService } from '../../services/export.service';
import { Employee, Department, DEPARTMENTS } from '../../models/employee.model';
import { Subscription } from 'rxjs';
import { SortField, SortDirection, FilterOptions, EmployeeFilter } from '../../utils/filter.util';
import { MetricsCalculator, DashboardMetrics } from '../../utils/metrics.util';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments = DEPARTMENTS;
  metrics: DashboardMetrics = {
    totalEmployees: 0,
    activeDepartments: 0,
    newHiresThisMonth: 0,
    totalDepartments: 0
  };
  
  searchTerm: string = '';
  selectedDepartment: string = 'all';
  sortField: SortField = null;
  sortDirection: SortDirection = 'asc';
  
  private subscription: Subscription = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.employeeService.employees$.subscribe(employees => {
        this.employees = employees;
        this.applyFilters();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilters(): void {
    const filterOptions: FilterOptions = {
      searchTerm: this.searchTerm,
      department: this.selectedDepartment,
      sortField: this.sortField,
      sortDirection: this.sortDirection
    };

    this.filteredEmployees = EmployeeFilter.applyFilters(this.employees, filterOptions);
    this.updateMetrics();
  }

  private updateMetrics(): void {
    this.metrics = MetricsCalculator.calculate(this.filteredEmployees);
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  onDepartmentChange(value: string): void {
    this.selectedDepartment = value;
    this.applyFilters();
  }

  onSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  @Output() editEmployee = new EventEmitter<Employee>();

  onDeleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
  }

  onEditEmployee(employee: Employee): void {
    this.editEmployee.emit(employee);
  }

  onExportCSV(): void {
    this.exportService.exportToCSV(this.filteredEmployees);
  }
}
