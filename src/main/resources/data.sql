INSERT INTO employee (first_name, last_name, email, mobile_number, address)
VALUES ('Jamie', 'Smith', 'jamie.smith@example.com', '0400123123', '123 Barkly St');

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('PERMANENT', 'FULL_TIME', '2023-01-01', null, 1);

INSERT INTO employee (first_name, last_name, email, mobile_number, address)
VALUES ('Alex', 'Johnson', 'alex.johnson@example.com', '0400456789', '456 Smith St');

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('CONTRACT', 'PART_TIME', '2024-05-15', '2025-05-14', 2);
