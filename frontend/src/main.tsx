// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import AllEmployeesPage from './pages/AllEmployeesPage';
import EmployeeByIdPage from './pages/EmployeeByIdPage';
import NavBar from './components/NavBar/NavBar';
import CreateEmployeePage from './pages/CreateEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import ArchivedEmployeesPage from './pages/ArchivedEmployeesPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/employees" element={<AllEmployeesPage />} />
        <Route path="/find-employee" element={<EmployeeByIdPage />} />
        <Route path="/employees/new" element={<CreateEmployeePage />} />
        <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
        <Route path="/employees/:id/details" element={<EmployeeDetailsPage />} />
         <Route path="/employees/archived" element={<ArchivedEmployeesPage />} />



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
