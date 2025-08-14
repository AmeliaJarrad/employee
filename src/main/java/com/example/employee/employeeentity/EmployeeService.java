package com.example.employee.employeeentity;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.employee.common.exceptions.NotFoundException;
import com.example.employee.contractentity.Contract;
import com.example.employee.contractentity.ContractRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;
    private final ContractRepository contractRepository;

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

    public List<EmployeeDTO> getAllEmployees() {
    return employeeRepository.findAllByIsArchivedFalse()
        .stream()
        .map(employee -> modelMapper.map(employee, EmployeeDTO.class))
        .collect(Collectors.toList());
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = modelMapper.map(employeeDTO, Employee.class);

        // Ensure bi-directional link is set
        if (employee.getContract() != null) {
            employee.getContract().setEmployee(employee);
        }

        Employee savedEmployee = employeeRepository.save(employee);
        return modelMapper.map(savedEmployee, EmployeeDTO.class);
    }

    public EmployeeDTO updateById(Long id, EditEmployeeDTO data) throws NotFoundException {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Could not update employee with id " + id));

        modelMapper.map(data, employee);

        // Ensure contract still references the employee
        if (employee.getContract() != null) {
            employee.getContract().setEmployee(employee);
        }

        //check for archive
        if (data.getIsArchived() != null) {
            employee.setIsArchived(data.getIsArchived());
        }


        Employee updated = employeeRepository.save(employee);
        return modelMapper.map(updated, EmployeeDTO.class);
    }

    public void archiveEmployee(Long id) throws NotFoundException {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Employee not found"));
        employee.setIsArchived(true);
        employeeRepository.save(employee);
    }

    public void unarchiveEmployee(Long id) throws NotFoundException {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Employee not found"));
        employee.setIsArchived(false);
        employeeRepository.save(employee);
    }

}
