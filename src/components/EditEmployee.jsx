import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { employeeUpdate, getEmployeeById } from '../api/Apis';
import LoadingSpinner from './LoadingSpinner';

const EditEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        id: '',
        employeeCode: '',
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
        department: '',
    });
    // Fetch employee details when the component mounts or when the location state changes
    useEffect(() => {
        const employeeId = location.state?.employeeId;
        fetchEmployeeDetails(employeeId);
    }, [location.state?.employeeId]);

    // Fetch employee details from the server
    const fetchEmployeeDetails = async (employeeId) => {
        try {
            setLoading(true);
            const response = await getEmployeeById({ employeeId });
            setLoading(false);
            setEmployeeData(response.data);
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    // Handle input changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate form fields
            if (!employeeData.employeeCode || !employeeData.firstName || !employeeData.lastName || !employeeData.emailId || !employeeData.contactNo || !employeeData.department) {
                toast.error('All fields are required');
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(employeeData.emailId)) {
                toast.error('Invalid email format');
                return;
            }
            // Validate phone number format
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(employeeData.contactNo)) {
                toast.error('Invalid phone number format (10 digits only)');
                return;
            }
            // Update employee data
            setLoading(true);
            const response = await employeeUpdate(employeeData);
            setLoading(false);

            // Handle the response from the server
            if (response.data.success) {
                toast.success(response.data.message);
                // Clear form fields on successful update
                setEmployeeData({
                    employeeCode: '',
                    firstName: '',
                    lastName: '',
                    emailId: '',
                    contactNo: '',
                    department: '',
                });
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='flex h-screen'>
            <div className='mx-auto p-8 mt-10'>
                {!loading
                    ?
                    <form onSubmit={handleSubmit}>
                        <div className="border-b border-gray-900/10 pb-10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Employee</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="employeeCode" className="block text-sm font-medium leading-6 text-gray-900">
                                        Employee Code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="employeeCode"
                                            id="employeeCode"
                                            required
                                            value={employeeData.employeeCode}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            value={employeeData.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            value={employeeData.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="emailId" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            id="emailId"
                                            name="emailId"
                                            autoComplete="email"
                                            required
                                            value={employeeData.emailId}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Contact No
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="contactNo"
                                            id="contactNo"
                                            required
                                            value={employeeData.contactNo}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                                        Department
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="department"
                                            id="department"
                                            required
                                            value={employeeData.department}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-sm font-semibold leading-6 text-gray-900">
                                Back
                            </button>
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default EditEmployee;