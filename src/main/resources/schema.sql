DROP TABLE IF EXISTS contract;
DROP TABLE IF EXISTS employee;

-- Employee table
CREATE TABLE employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(20),
    address TEXT,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE
);

-- Contract table
CREATE TABLE contract (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_type VARCHAR(50) NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    start_date DATE,
    finish_date DATE,
    employee_id BIGINT,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee(id)
);
