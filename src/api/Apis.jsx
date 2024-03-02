// Importing the userApi instance from the "../utils/Axios" module
import { userApi } from "../utils/Axios";

// Function to fetch data from the API for all employees
export const getEmployeeDetails = async () => {
    try {
        // Making a GET request to the endpoint for all employees with credentials
        const { data } = await userApi.get(`/all-employee`, { withCredentials: true })
        return data;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to fetch data from the API for a single employee
export const getEmployee = async () => {
    try {
        // Making a GET request to the endpoint for a single employee with credentials
        const response = await userApi.get(`/single-employee`, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to fetch data from the API for an employee by ID
export const getEmployeeById = async (credentials) => {
    try {
        // Making a POST request to the endpoint to get an employee by ID with credentials
        const response = await userApi.post(`/get-employee`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to register a new employee via API
export const employeeRegister = async (credentials) => {
    try {
        // Making a POST request to the endpoint to add a new employee with credentials
        const response = await userApi.post(`/add-employee`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to log in an employee via API
export const employeeLogin = async (credentials) => {
    try {
        // Making a POST request to the endpoint for employee login with credentials
        const response = await userApi.post(`/login-employee`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to delete an employee via API
export const employeeDelete = async (credentials) => {
    try {
        // Making a POST request to the endpoint to delete an employee with credentials
        const response = await userApi.post(`/delete-employee`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};

// Function to update an employee's information via API
export const employeeUpdate = async (credentials) => {
    try {
        // Making a POST request to the endpoint to edit an employee's information with credentials
        const response = await userApi.post(`/edit-employee`, credentials, { withCredentials: true })
        return response;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return error.response;
    }
};