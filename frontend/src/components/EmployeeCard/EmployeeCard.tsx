import React from 'react';

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
  return (
    <div style={styles.card}>
      <h2>{employee.firstName} {employee.lastName}</h2>
      <p>{employee.email}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
  }
};

export default EmployeeCard;
