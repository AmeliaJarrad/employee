# Employee App


(Replace with your actual workflow badge link once you have it.)

## Demo & Snippets

Live demo: https://employee.ameliajarrad.site/

Screenshots:
(Insert images here, e.g.)




## Requirements / Purpose

This is an Employee Management App — a web‑based application to allow admin users to manage employee records: adding, editing, deleting (or soft‑delete/archive), viewing employee info, perhaps filtering or searching employees. Serves as a CRUD app with a clean front end and a RESTful backend.

### MVP Features

Create, read, update, delete (or archive) employee records

Search or filter employee list

Validation on forms (e.g. required fields)

Responsive UI so it works on different screen sizes

### Stack Used & Why

Frontend: React + TypeScript (or whatever you used)

Backend: Spring Boot REST API

Database: SQL (e.g. PostgreSQL/MySQL) hosted in EC2 environment

Hosting: Backend server on AWS EC2; frontend also deployed (if separate)

 - **Why:**
Spring Boot is reliable for building robust backend services. SQL gives structured relational data support. Hosting on EC2 gives you control over environment and deployment. React & TS for a maintainable front‑end with type checking and component structure.

## Build Steps

```bash
# Clone the repo
git clone https://github.com/AmeliaJarrad/employee.git
cd employee

# Backend setup (Spring Boot)
cd backend
mvn clean install        # or gradle build, depending on your build tool
# Set up any environment variables (e.g. DB_URL, credentials, etc.)

# Run backend
mvn spring-boot:run      # or equivalent

# Frontend setup
cd ../frontend            # if frontend is in its own folder
npm install
npm run dev              # or npm start / yarn start etc.

# Access
# Frontend on http://localhost:<frontend-port>
# Backend on http://localhost:<backend-port> — frontend must be configured to call backend URL
```

## Design Goals / Approach

- Clear separation of concerns: REST API handles business logic & persistence; frontend handles UI/UX
- Form validations to ensure the data integrity
- Clean, minimal UI so users can manage employees without confusion
- Responsive design so it works well on desktop and mobile
- Scalable structure so you can add features later (e.g. roles, permissions, more complex filtering)

## Features

✅ Add new employee

✅ View list of employees

✅ Edit existing employee data

✅ Delete (or archive) employee

✅ Search or filter by name, department, etc.

✅ Responsive UI

## Automated Test
- Update this section

## Known Issues

⚠ Deleting an employee may not show confirmation or soft‑delete behavior

⚠ Form validation may miss some edge cases (e.g. special characters, email formats)

⚠ UI layout / display issues on very narrow screens or mobile devices

⚠ Error handling (e.g. backend failures) may not always show friendly messages

## Future Goals

Add user authentication & role‑based access control (e.g. admin vs viewer)

More advanced filtering / sorting of employees (by role, department, status)

Bulk actions (e.g. delete/archiving multiple employees at once)

More polished UI styling, better responsiveness

Tests (unit + integration) both backend and frontend

Possibly export/import of employee data (e.g. CSV upload/export)

## Change Logs

(Keep this updated with each working session. Example entries below.)

2025‑08‑18

Launched live demo site

Added frontend employee list view + form to add employees

Integrated backend with database on EC2

2025‑08‑17

Set up basic backend API endpoints (create, read, update, delete)

Added form validation for required fields

Implemented delete (or archive) functionality

## What did you struggle with?

Syncing state when updates or deletes happen (front end reflecting backend changes)

Managing database connection / environment configuration on EC2

Form validation & user feedback design

Responsive UI and handling layout for mobile

## Licensing Details

This project is licensed under the MIT License. See the LICENSE
 file for more details.

## Further Details & Related Projects

This project is mostly standalone, designed from scratch

This project has some similarities with Todo which was created earlier
