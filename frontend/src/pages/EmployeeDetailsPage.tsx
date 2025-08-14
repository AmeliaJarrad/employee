import { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import type { Employee } from '../types/employee';
import styles from './EmployeeDetailsPage.module.scss'

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${id}`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employee');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!employee) return <p>Employee data unavailable.</p>;

  // Compose container class names based on employee status and contract type
  const containerClass = `${styles.container} ${
    employee.isArchived
      ? styles.archived
      : employee.contract.contractType === 'CONTRACT'
      ? styles.contract
      : styles.permanent
  }`;

  const contractClass = `${styles['contract-card']} ${
    employee.contract.contractType === 'CONTRACT' ? styles.contract : styles.permanent
  }`;

  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    contract,
  } = employee;

  return (
    <div className={containerClass}>
      <h2>Employee Details</h2>

      <div className={styles.field}>
        <span className={styles.lozenge}>{firstName} {lastName}</span>
        <span className={styles.lozenge}>{email}</span>
        <span className={styles.lozenge}>{mobileNumber}</span>
      </div>

      <p className={styles.field}><strong>Address:</strong> {address}</p>

      <div className={styles.section}>
        <h3>Current Contract</h3>
        <div className={contractClass}>
          <p><strong>Type:</strong> {contract.contractType}</p>
          <p><strong>Employment:</strong> {contract.employmentType}</p>
          <p><strong>Start:</strong> {contract.startDate}</p>
          <p><strong>Finish:</strong> {contract.finishDate || '—'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;