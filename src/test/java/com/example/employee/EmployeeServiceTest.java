package com.example.employee;

import com.example.employee.common.exceptions.NotFoundException;
import com.example.employee.common.exceptions.ResourceNotFoundException;
import com.example.employee.employeeentity.Employee;
import com.example.employee.employeeentity.EmployeeRepository;
import com.example.employee.employeeentity.EmployeeService;
import com.example.employee.contractentity.Contract;
import com.example.employee.contractentity.ContractDTO;
import com.example.employee.contractentity.ContractRepository;
import com.example.employee.contractentity.ContractType;
import com.example.employee.contractentity.EmploymentType;
import com.example.employee.employeeentity.EmployeeDTO;
import com.example.employee.employeeentity.EditEmployeeDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


import jakarta.transaction.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ContractRepository contractRepository;

    private Employee demoEmployee;

    @BeforeEach
    public void setup() {
        contractRepository.deleteAll();
        employeeRepository.deleteAll();

        demoEmployee = new Employee();
        demoEmployee.setFirstName("Rusty");
        demoEmployee.setLastName("Shackleford");
        demoEmployee.setEmail("rusty@dale.com");
        demoEmployee.setMobileNumber("0400123123");
        demoEmployee.setAddress("Arlen, Texas");
        demoEmployee.setIsArchived(false);
        employeeRepository.save(demoEmployee);

        Contract contract = new Contract();
        contract.setContractType(ContractType.CONTRACT);
        contract.setEmploymentType(EmploymentType.PART_TIME);
        contract.setStartDate(LocalDate.of(2023, 1, 1));
        contract.setFinishDate(LocalDate.of(2024, 1, 1));
        contract.setEmployee(demoEmployee);
        contractRepository.save(contract);
    }

    @Test
    public void getEmployeeById_ExistingId_ReturnsEmployeeDTO() {
        EmployeeDTO employeeDto = employeeService.getEmployeeById(demoEmployee.getId());
        assertNotNull(employeeDto);
        assertEquals("Rusty", employeeDto.getFirstName());
        assertEquals("Shackleford", employeeDto.getLastName());
    }

    @Test
    public void getEmployeeById_NonExistentId_ThrowsResourceNotFoundException() {
        Long invalidId = 9999L;
        ResourceNotFoundException thrown = assertThrows(ResourceNotFoundException.class, () -> {
            employeeService.getEmployeeById(invalidId);
        });
        assertEquals("Employee not found with ID: " + invalidId, thrown.getMessage());
    }

    @Test
    public void createEmployee_ValidData_SavesSuccessfully() {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setFirstName("Philip");
        employeeDTO.setLastName("Fry");
        employeeDTO.setEmail("p.j.fry@nny.com");
        employeeDTO.setMobileNumber("0400999888");
        employeeDTO.setAddress("New New York");

       ContractDTO contractDTO = new ContractDTO();
        contractDTO.setContractType(ContractType.PERMANENT.name());
        contractDTO.setEmploymentType(EmploymentType.FULL_TIME.name());
        contractDTO.setStartDate(LocalDate.of(2024, 1, 1));

        employeeDTO.setContract(contractDTO);

        EmployeeDTO created = employeeService.createEmployee(employeeDTO);

        assertNotNull(created);
        assertNotNull(created.getId(), "Created employee ID should not be null");
        assertEquals("Philip", created.getFirstName());
        assertEquals("Fry", created.getLastName());
        assertFalse(created.getIsArchived());
        assertNotNull(created.getContract());
        assertEquals(ContractType.PERMANENT.name(), created.getContract().getContractType());
        assertEquals(EmploymentType.FULL_TIME.name(), created.getContract().getEmploymentType());
        assertEquals("p.j.fry@nny.com", created.getEmail());
    }

    @Test
    public void updateEmployee_ChangeArchiveStatus_Succeeds() throws NotFoundException {
        EditEmployeeDTO editEmployeeDTO = new EditEmployeeDTO();
        editEmployeeDTO.setIsArchived(true);

        EmployeeDTO updated = employeeService.updateById(demoEmployee.getId(), editEmployeeDTO);
        assertTrue(updated.getIsArchived());
    }

    @Test
    public void updateEmployee_NonExistentId_ThrowsResourceNotFoundException() {
        EditEmployeeDTO updateDTO = new EditEmployeeDTO();
        updateDTO.setFirstName("Bender");

        Long invalidId = 9999L;
        ResourceNotFoundException thrown = assertThrows(ResourceNotFoundException.class, () -> {
            employeeService.updateById(invalidId, updateDTO);
        });
        assertEquals("Employee not found with ID: " + invalidId, thrown.getMessage());
    }

    @Test
    public void archiveEmployee_ValidId_SetsArchivedTrue() throws NotFoundException {
        EditEmployeeDTO editEmployeeDTO = new EditEmployeeDTO();
        editEmployeeDTO.setIsArchived(true);

        EmployeeDTO updated = employeeService.updateById(demoEmployee.getId(), editEmployeeDTO);
        assertTrue(updated.getIsArchived());

        Employee archivedEmployee = employeeRepository.findById(demoEmployee.getId()).orElseThrow();
        assertTrue(archivedEmployee.isArchived());
    }


   @Test
public void archiveEmployee_InvalidId_ThrowsResourceNotFoundException() {
    Long invalidId = 9999L;
    EditEmployeeDTO editEmployeeDTO = new EditEmployeeDTO();
    // you can set any fields if needed; here we just want to trigger the exception

    ResourceNotFoundException thrown = assertThrows(ResourceNotFoundException.class, () -> {
        employeeService.updateById(invalidId, editEmployeeDTO);
    });

    assertEquals("Employee not found with ID: " + invalidId, thrown.getMessage());
}

}
