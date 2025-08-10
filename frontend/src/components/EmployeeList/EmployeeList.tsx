import React from 'react';
import EmployeeCard, { type Employee } from '../EmployeeCard/EmployeeCard'

type EmployeeListProps = {
  employees: Employee[];
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <div>
      {employees.map(emp => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
};

export default EmployeeList;
