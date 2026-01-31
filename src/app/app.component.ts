import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showForm: boolean = false;
  editingEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  openAddForm(): void {
    this.editingEmployee = null;
    this.showForm = true;
  }

  openEditForm(employee: Employee): void {
    this.editingEmployee = employee;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingEmployee = null;
  }

  saveEmployee(employeeData: Omit<Employee, 'id'>): void {
    if (this.editingEmployee) {
      this.employeeService.updateEmployee(this.editingEmployee.id, employeeData);
    } else {
      this.employeeService.addEmployee(employeeData);
    }
    this.closeForm();
  }
}
