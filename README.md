# Employee Dashboard

A modern, feature-rich Employee Management Dashboard built with Angular and TypeScript. This application allows you to manage employee records with full CRUD operations, advanced filtering, sorting, and search capabilities.

## Features

### Core Features
-  **List Employees** - View all employees in a clean, organized table
-  **Add New Employees** - Create new employee records with validation
-  **Edit Existing Employees** - Update employee information
-  **Delete Employees** - Remove employees with confirmation

### Data Management
-  **Angular Services** - Centralized data management using EmployeeService
-  **LocalStorage Persistence** - All employee data persists across page reloads
-  **Reactive Data Flow** - Uses RxJS Observables for real-time updates

### Employee Fields
Each employee record includes:
- **Name** (minimum 3 characters, required)
- **Email** (valid email format, required)
- **Department** (dropdown selection: HR, Engineering, Sales, Marketing, Finance, Operations)
- **Date of Joining** (cannot be a future date, required)

### UI Features
-  **Sorting** - Sort by Name or Date of Joining (ascending/descending)
-  **Filtering** - Filter employees by Department
-  **Search** - Case-insensitive search by Name or Email
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### Validation
-  **Form Validation** - All fields validated before submission
-  **Real-time Error Messages** - Clear, user-friendly error messages
-  **Visual Feedback** - Invalid fields highlighted with red borders

### Bonus Features
-  **CSV Export** - Export filtered employee list as CSV file
-  **Dark Mode Toggle** - Switch between light and dark themes (persists preference)

## Technology Stack

- **Angular** 15.2.0
- **TypeScript** 4.9.5
- **RxJS** 7.8.0
- **Angular Forms** (Reactive Forms & Template-driven Forms)

  ## Steps to Run the Project
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`
4. Run `ng serve`
5. Open http://localhost:4200 in the browser

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── employee-list/
│   │   │   ├── employee-list.component.ts
│   │   │   ├── employee-list.component.html
│   │   │   └── employee-list.component.css
│   │   └── employee-form/
│   │       ├── employee-form.component.ts
│   │       ├── employee-form.component.html
│   │       └── employee-form.component.css
│   ├── models/
│   │   └── employee.model.ts
│   ├── services/
│   │   └── employee.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.module.ts
├── styles.css
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v15 or higher)

### Installation Steps

1. **Install Angular CLI** (if not already installed):
   ```bash
   npm install -g @angular/cli@15
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open Browser**:
   Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Adding an Employee
1. Click the **+** button (floating action button) in the bottom-right corner
2. Fill in all required fields:
   - Name (minimum 3 characters)
   - Email (valid email format)
   - Department (select from dropdown)
   - Date of Joining (cannot be a future date)
3. Click "Add Employee" button

### Editing an Employee
1. Click the **Edit** button next to the employee in the list
2. Modify the fields as needed
3. Click "Update Employee" button

### Deleting an Employee
1. Click the **Delete** button next to the employee
2. Confirm the deletion in the dialog

### Searching Employees
- Type in the search box to filter by name or email (case-insensitive)

### Filtering by Department
- Select a department from the dropdown to show only employees from that department
- Select "All Departments" to show all employees

### Sorting
- Click on "Name" or "Date of Joining" column headers to sort
- Click again to reverse the sort order
- Visual indicators (↑ ↓) show the current sort direction

### Exporting to CSV
- Click the **Export CSV** button to download the currently filtered employee list as a CSV file

### Dark Mode
- Click the **Dark Mode** / **Light Mode** button to toggle between themes
- Your preference is saved and will persist across sessions

## Assumptions Made

1. **Employee IDs**: Generated automatically using a combination of timestamp and random string
2. **Date Format**: Dates are stored as ISO strings (YYYY-MM-DD) and displayed in medium date format
3. **Sample Data**: The application initializes with 3 sample employees if localStorage is empty
4. **Email Uniqueness**: The application does not enforce unique email addresses (can be added if needed)
5. **Department List**: Fixed list of departments (HR, Engineering, Sales, Marketing, Finance, Operations)
6. **Browser Support**: Modern browsers with LocalStorage support (Chrome, Firefox, Safari, Edge)




Created as part of a technical assessment for Vantage Circle.
