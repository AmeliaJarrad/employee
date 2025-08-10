// src/pages/AllEmployeesPage.tsx
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import { type Employee } from '../components/EmployeeCard/EmployeeCard';

const AllEmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://employeeapi.ameliajarrad.site/api/employees');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setEmployees(data);
      } catch (err: any) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <h1>All Employees</h1>
        {loading && <p>Loading employees...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <EmployeeList employees={employees} />}
      </div>
    </>
  );
};

export default AllEmployeesPage;
