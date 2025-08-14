package com.example.employee;

import com.example.employee.employeeentity.Employee;
import com.example.employee.employeeentity.EmployeeRepository;
import com.example.employee.contractentity.Contract;
import com.example.employee.contractentity.ContractRepository;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDate;

import com.example.employee.contractentity.ContractType;
import com.example.employee.contractentity.EmploymentType;


import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EmployeeControllerEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ContractRepository contractRepository;

    private Employee demoEmployee;

    @BeforeEach
    public void setup() {
        RestAssured.port = port;
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
        contract.setStartDate(LocalDate.parse("2023-01-01"));
        contract.setFinishDate(LocalDate.parse("2024-01-01"));
        contract.setEmployee(demoEmployee);
        contractRepository.save(contract);
    }

    @Test
    public void getAllEmployees_ReturnsListWithEmployee() {
        given()
            .when().get("/api/employees")
            .then()
            .statusCode(HttpStatus.OK.value())
            .body("$", hasSize(1))
            .body("[0].firstName", equalTo("Rusty"))
            .body("[0].contract.contractType", equalTo("CONTRACT"));
    }

    @Test
    public void getEmployeeById_ValidId_ReturnsEmployee() {
        given()
            .when().get("/api/employees/" + demoEmployee.getId())
            .then()
            .statusCode(HttpStatus.OK.value())
            .body("email", equalTo("rusty@dale.com"));
    }

    @Test
    public void getEmployeeById_InvalidId_ReturnsNotFound() {
        given()
            .when().get("/api/employees/9999")
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void createEmployee_ValidData_ReturnsCreated() {
        Map<String, Object> contract = new HashMap<>();
        contract.put("contractType", "PERMANENT");
        contract.put("employmentType", "FULL_TIME");
        contract.put("startDate", "2024-01-01");

        Map<String, Object> payload = new HashMap<>();
        payload.put("firstName", "Fry");
        payload.put("lastName", "Philip");
        payload.put("email", "fry@nny.com");
        payload.put("mobileNumber", "0400999888");
        payload.put("address", "New New York");
        payload.put("contract", contract);

        given()
            .contentType(ContentType.JSON)
            .body(payload)
            .when().post("/api/employees")
            .then()
            .statusCode(HttpStatus.CREATED.value())
            .body("firstName", equalTo("Fry"))
            .body("contract.contractType", equalTo("PERMANENT"));
    }

    @Test
    public void updateEmployee_Unarchive_ReturnsSuccess() {
        // Archive it first
        demoEmployee.setIsArchived(true);
        employeeRepository.save(demoEmployee);

        Map<String, Object> update = new HashMap<>();
        update.put("isArchived", false);

        given()
            .contentType(ContentType.JSON)
            .body(update)
            .when().patch("/api/employees/" + demoEmployee.getId())
            .then()
            .statusCode(HttpStatus.OK.value())
            .body("isArchived", equalTo(false));
    }
}
