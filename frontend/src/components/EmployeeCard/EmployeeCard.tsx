// src/components/EmployeeCard/EmployeeCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmployeeCard.module.scss';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // Add more fields as needed
};

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const handleArchive = () => {
    // You can wire this up to a real API call later
    console.log(`Archiving employee with ID: ${employee.id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.name}>
          {employee.firstName} {employee.lastName}
        </h2>
        <p className={styles.email}>{employee.email}</p>
      </div>

      <div className={styles.actions}>
        <button onClick={handleArchive} className={styles.archiveBtn}>
          Archive
        </button>
        <Link to={`/employees/${employee.id}/edit`}>
          <button className={styles.editBtn}>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;
