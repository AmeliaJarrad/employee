package com.example.employee.employeeentity;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.employee.contractentity.ContractRepository;

@Service
public class EmployeeService {
 
    private EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;
    private ContractRepository contractRepository;

    public EmployeeService(EmployeeRepository employeeRepository, ModelMapper modelMapper, ContractRepository contractRepository) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.contractRepository = contractRepository;
    }

    public EmployeeDTO getEmployeeById(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

    return modelMapper.map(employee, EmployeeDTO.class);
    }


}
