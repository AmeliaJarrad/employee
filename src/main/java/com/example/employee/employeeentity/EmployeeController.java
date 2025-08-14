package com.example.employee.employeeentity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.employee.common.exceptions.NotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService; 

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Get all active (non-archived) employees
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllActiveEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Get single employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDto);
    }

    // Get all archived employees
    @GetMapping("/archived")
    public ResponseEntity<List<EmployeeDTO>> getArchivedEmployees() {
        List<EmployeeDTO> archivedEmployees = employeeService.getArchivedEmployees();
        return ResponseEntity.ok(archivedEmployees);
    }

    // Create new employee
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    // Update employee (including toggle archive)
    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployeeById(@PathVariable Long id, @RequestBody EditEmployeeDTO data)
            throws NotFoundException {
        EmployeeDTO dto = employeeService.updateById(id, data);
        return ResponseEntity.ok(dto);
    }

}



