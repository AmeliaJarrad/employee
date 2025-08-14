package com.example.employee.employeeentity;

import com.example.employee.contractentity.ContractDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditEmployeeDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private ContractDTO contract;

    @JsonProperty("isArchived")
    private Boolean isArchived;

    // Getters and setters
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public ContractDTO getContract() {
        return contract;
    }
    public void setContract(ContractDTO contract) {
        this.contract = contract;
    }

    @JsonProperty("isArchived")
    public Boolean getIsArchived() {
        return isArchived;
    }
    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }
}
