-- Existing employees
INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Jamie', 'Smith', 'jamie.smith@example.com', '0400123123', '123 Barkly St', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('PERMANENT', 'FULL_TIME', '2023-01-01', null, 1);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Alex', 'Johnson', 'alex.johnson@example.com', '0400456789', '456 Smith St', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('CONTRACT', 'PART_TIME', '2024-05-15', '2025-05-14', 2);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Rusty', 'Shackleford', 'rusty.shackleford@propane.net', '0411000001', 'Arlen, Texas', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('CONTRACT', 'FULL_TIME', '2024-01-10', '2025-01-09', 3);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Tina', 'Belcher', 'tina.belcher@bobsburgers.com', '0411000002', 'Ocean Avenue, NJ', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('PERMANENT', 'PART_TIME', '2023-08-01', null, 4);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Homer', 'Simpson', 'homer.simpson@springfieldpower.com', '0411000003', '742 Evergreen Terrace', TRUE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('PERMANENT', 'FULL_TIME', '1990-01-01', null, 5);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('BoJack', 'Horseman', 'bojack@hollywoodhills.com', '0411000004', 'Laurel Canyon Blvd', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('CONTRACT', 'PART_TIME', '2022-11-01', '2024-11-01', 6);

INSERT INTO employee (first_name, last_name, email, mobile_number, address, is_archived)
VALUES ('Sterling', 'Archer', 'duchess@isis.agency', '0411000005', 'New York City', FALSE);

INSERT INTO contract (contract_type, employment_type, start_date, finish_date, employee_id)
VALUES ('PERMANENT', 'FULL_TIME', '2023-04-01', null, 7);
