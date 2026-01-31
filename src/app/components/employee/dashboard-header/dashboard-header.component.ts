import { Component, Output, EventEmitter } from '@angular/core';
import { ExportService } from '../../../services/export.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  @Output() export = new EventEmitter<void>();

  constructor(private exportService: ExportService) {}

  onExport(employees: Employee[]): void {
    this.exportService.exportToCSV(employees);
    this.export.emit();
  }
}
