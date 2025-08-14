package com.example.employee.employeeentity;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import com.example.employee.common.exceptions.NotFoundException;

import java.util.List;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {


    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService; 

    
    public EmployeeController(EmployeeRepository employeeRepository, EmployeeService employeeService) {
        this.employeeRepository = employeeRepository;
        this.employeeService = employeeService;
        
    }

    //excluding the archived employees from the list 

   @GetMapping
    public List<Employee> getAllActiveEmployees() {
        return employeeRepository.findAllByIsArchivedFalse();
    }


    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping("/archived")
    public List<Employee> getArchivedEmployees() {
        return employeeRepository.findAllByIsArchivedTrue();
    }


    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = employeeService.createEmployee(employeeDTO);
        return ResponseEntity.ok(createdEmployee);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployeeById(@PathVariable Long id, @RequestBody EditEmployeeDTO data)
            throws NotFoundException {
        EmployeeDTO dto = employeeService.updateById(id, data);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archiveEmployee(@PathVariable Long id) throws NotFoundException {
        employeeService.archiveEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/unarchive")
    public ResponseEntity<Void> unarchiveEmployee(@PathVariable Long id) throws NotFoundException {
        employeeService.unarchiveEmployee(id);
        return ResponseEntity.noContent().build();
    }



}



