package com.example.employee.contractentity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {
     List<Contract> findByContractType(ContractType contractType);
    
} 