// src/pages/AllEmployeesPage.tsx
import { useEffect, useState } from 'react';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import type { Employee } from '../components/EmployeeCard/EmployeeCard';

const API_URL = 'https://employeeapi.ameliajarrad.site/api/employees';

const AllEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data: Employee[] = await res.json();
      setEmployees(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Unified archive/unarchive toggle handler
  const handleToggleArchive = async (id: number, isArchived: boolean) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived }),
      });
      if (!res.ok) throw new Error('Failed to update archive status');
      await fetchEmployees(); // Refresh list after update
    } catch (err) {
      console.error(err);
      setError('Failed to update archive status');
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <EmployeeList employees={employees} onToggleArchive={handleToggleArchive} />
    </div>
  );
};

export default AllEmployeesPage;

