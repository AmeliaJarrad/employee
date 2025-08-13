package com.example.employee.employeeentity;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.employee.common.exceptions.NotFoundException;
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

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        Employee savedEmployee = employeeRepository.save(employee);
        return modelMapper.map(savedEmployee, EmployeeDTO.class);
    }


    public EmployeeDTO updateById(Long id, EditEmployeeDTO data) throws NotFoundException {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Could not update employee with id " + id));

        modelMapper.map(data, employee);
        Employee updated = employeeRepository.save(employee);

        return modelMapper.map(updated, EmployeeDTO.class);
    }



}
