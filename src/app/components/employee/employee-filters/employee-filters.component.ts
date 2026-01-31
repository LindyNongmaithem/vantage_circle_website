import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Department, DEPARTMENTS } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-filters',
  templateUrl: './employee-filters.component.html',
  styleUrls: ['./employee-filters.component.css']
})
export class EmployeeFiltersComponent {
  @Input() searchTerm: string = '';
  @Input() selectedDepartment: string = 'all';
  @Input() departments: Department[] = DEPARTMENTS;

  @Output() searchChange = new EventEmitter<string>();
  @Output() departmentChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onDepartmentChange(value: string): void {
    this.departmentChange.emit(value);
  }
}
