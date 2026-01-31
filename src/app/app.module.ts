import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

// Shared components
import { MetricCardComponent } from './components/shared/metric-card/metric-card.component';
import { ThemeToggleComponent } from './components/shared/theme-toggle/theme-toggle.component';
import { FabButtonComponent } from './components/shared/fab-button/fab-button.component';

// Employee components
import { DashboardHeaderComponent } from './components/employee/dashboard-header/dashboard-header.component';
import { EmployeeFiltersComponent } from './components/employee/employee-filters/employee-filters.component';
import { EmployeeTableComponent } from './components/employee/employee-table/employee-table.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    // Shared components
    MetricCardComponent,
    ThemeToggleComponent,
    FabButtonComponent,
    // Employee components
    DashboardHeaderComponent,
    EmployeeFiltersComponent,
    EmployeeTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
