package com.example.employee.employeeentity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository <Employee, Long>{

    Optional<Employee> findByEmail(String email);

    List<Employee> findAllByIsArchivedFalse();

    Optional<Employee> findByIdAndIsArchivedFalse(Long id);
    
    List<Employee> findAllByIsArchivedTrue();
}



