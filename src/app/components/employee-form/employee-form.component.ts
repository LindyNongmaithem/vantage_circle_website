import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Department, DEPARTMENTS } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employee: Employee | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Omit<Employee, 'id'>>();

  employeeForm: FormGroup;
  departments = DEPARTMENTS;
  isEditMode: boolean = false;
  maxDate: string = '';

  constructor(private fb: FormBuilder) {
    // Set max date to today
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    this.maxDate = today.toISOString().split('T')[0];

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      dateOfJoining: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.loadEmployeeData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && this.employeeForm) {
      if (this.employee) {
        this.loadEmployeeData();
      } else {
        this.resetForm();
      }
    }
    if (changes['isVisible'] && this.isVisible && !this.employee) {
      this.resetForm();
    }
  }

  private loadEmployeeData(): void {
    if (this.employee) {
      this.isEditMode = true;
      const dateValue = new Date(this.employee.dateOfJoining).toISOString().split('T')[0];
      this.employeeForm.patchValue({
        name: this.employee.name,
        email: this.employee.email,
        department: this.employee.department,
        dateOfJoining: dateValue
      });
    }
  }

  private resetForm(): void {
    this.isEditMode = false;
    this.employeeForm.reset();
    this.employeeForm.markAsUntouched();
    this.employeeForm.markAsPristine();
  }

  futureDateValidator = (control: any) => {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    return null;
  };

  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors?.['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['futureDate']) {
        return 'Date of joining cannot be a future date';
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      department: 'Department',
      dateOfJoining: 'Date of Joining'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employeeData: Omit<Employee, 'id'> = {
        name: formValue.name.trim(),
        email: formValue.email.trim(),
        department: formValue.department,
        dateOfJoining: formValue.dateOfJoining
      };
      this.save.emit(employeeData);
      this.closeForm();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }

  closeForm(): void {
    this.resetForm();
    this.close.emit();
  }
}
