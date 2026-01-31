import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { SortField, SortDirection } from '../../../utils/filter.util';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Input() sortField: SortField = null;
  @Input() sortDirection: SortDirection = 'asc';

  @Output() sort = new EventEmitter<SortField>();
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<string>();

  onSort(field: SortField): void {
    this.sort.emit(field);
  }

  onEdit(employee: Employee): void {
    this.edit.emit(employee);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.delete.emit(id);
    }
  }

  getSortIcon(field: SortField): string {
    if (this.sortField !== field) {
      return '↕️';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
