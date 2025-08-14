import React, { useState } from 'react';
import { type Employee } from '../components/EmployeeCard/EmployeeCard';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import styles from './EmployeeByIdPage.module.scss';

const EmployeeByIdPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    setError(null);
    setEmployee(null);

    try {
      const res = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${employeeId}`);
      if (!res.ok) throw new Error(`Employee not found: ${employeeId}`);
      const data = await res.json();
      setEmployee(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Find Employee by ID</h1>
      <input
        type="text"
        placeholder="Enter employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className={styles.inputField}
      />
      <button
        onClick={fetchEmployee}
        disabled={!employeeId || loading}
        className={styles.searchButton}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className={styles.errorMsg}>{error}</p>}
      {employee && <EmployeeCard employee={employee} />}
    </div>
  );
};

export default EmployeeByIdPage;
