// src/components/EmployeeCard/EmployeeCard.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './EmployeeCard.module.scss';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isArchived?: boolean;
};

type EmployeeCardProps = {
  employee: Employee;
   onToggleArchive?: (id: number, isArchived: boolean) => void;
  
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onToggleArchive}) => {
  const navigate = useNavigate();
  

  
  return (
  <div className={styles.card}>
    <div>
      <h2 className={styles.name}>
        {employee.firstName} {employee.lastName}
      </h2>
      <p className={styles.email}>{employee.email}</p>
    </div>

    <div className={styles.actions}>
      {onToggleArchive && (
        <button
          onClick={() => onToggleArchive(employee.id, !employee.isArchived)}
          className={styles.archiveBtn}
        >
          {employee.isArchived ? 'Unarchive' : 'Archive'}
        </button>
      )}

      <Link to={`/employees/${employee.id}/edit`}>
        <button className={styles.editBtn}>Edit</button>
      </Link>

      <button
        onClick={() => navigate(`/employees/${employee.id}/details`)}
        className={styles.detailsBtn}
      >
        Details
      </button>
    </div>
  </div>
);

};

export default EmployeeCard;