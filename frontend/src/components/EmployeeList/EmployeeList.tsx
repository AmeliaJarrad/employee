// src/components/EmployeeList/EmployeeList.tsx
import React from 'react';
import EmployeeCard, { type Employee } from '../EmployeeCard/EmployeeCard';

type EmployeeListProps = {
  employees: Employee[];
  onToggleArchive?: (id: number, isArchived: boolean) => void;
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onToggleArchive}) => {
  return (
    <div>
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
