// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import AllEmployeesPage from './pages/AllEmployeesPage';
import EmployeeByIdPage from './pages/EmployeeByIdPage';
import NavBar from './components/NavBar/NavBar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/employees" element={<AllEmployeesPage />} />
        <Route path="/find-employee" element={<EmployeeByIdPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
