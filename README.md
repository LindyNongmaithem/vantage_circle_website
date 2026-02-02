# Employee Dashboard

A simple Angular-based Employee Dashboard that allows users to manage employee records with CRUD operations, search, sorting, filtering, and LocalStorage persistence.

## Features
- List, add, edit, and delete employees
- Form validation with clear error messages
- Search employees by name or email (case-insensitive)
- Filter employees by department
- Sort employees by name and date of joining
- Data stored in LocalStorage using Angular services

 ## Employee Fields
  Each employee includes:
- Name (minimum 3 characters)
- Email (valid email format)
- Department (HR, Engineering, Sales, Marketing, Finance, Operations)
- Date of Joining (future dates not allowed)


## Bonus Features
- Export employee list as CSV
- Dark mode toggle

## Technology Stack
- Angular 15.2.0
- TypeScript 4.9.5
- RxJS
- HTML & CSS

  ## Steps to Run the Project
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`
4. Run `ng serve`
5. Open http://localhost:4200 in the browser

## Assumptions Made
- No backend is used; data is stored in LocalStorage
- Employee IDs are auto-generated
- Department list is fixed
- No authentication is required
- Sample data is added if LocalStorage is empty.



Created as part of a technical assessment for Vantage Circle.
