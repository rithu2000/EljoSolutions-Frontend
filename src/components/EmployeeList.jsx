import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeDelete, getEmployeeDetails } from '../api/Apis';
import LoadingSpinner from './LoadingSpinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const EmployeeList = () => {
    // React Hooks for managing state and navigation
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // useEffect to fetch employee details when the component mounts
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                setLoading(true);
                // Fetch employee details from the server
                const response = await getEmployeeDetails();
                setLoading(false);
                setEmployeeDetails(response.data);
            } catch (error) {
                console.error("Error fetching salary details:", error);
            }
        };
        // Invoke the fetchEmployeeDetails function when the component mounts
        fetchEmployeeDetails();
    }, []);

    // Handle navigation to the employee edit page
    const handleEdit = async (employeeId) => {
        try {
            navigate(`/edit-employee`, { state: { employeeId } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle employee deletion
    const handleDelete = async (employeeId) => {
        try {
            MySwal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    MySwal.fire({
                        title: "Deleting...",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                    // Perform deletion on the server
                    const response = await employeeDelete({ employeeId });
                    // Update the state to remove the deleted employee
                    setEmployeeDetails((prevDetails) =>
                        prevDetails.filter((employee) => employee.id !== employeeId)
                    );
                    MySwal.fire({
                        title: "Deleted!",
                        text: response.data.message,
                        icon: "success",
                    });
                }
            });
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className='flex h-screen'>
            <div className='mx-auto min-w-[70%] p-8 mt-10'>
                {!loading
                    ?
                    <>
                        <div className='flex justify-between'>
                            <div className=''>
                                <h1 className='text-xl font-medium'>Employees</h1>
                                <h4 className='text-md mt-3'>A list of all the users in your account including their name, email and department.</h4>
                            </div>
                            <div className=''>
                                <button
                                    onClick={() => navigate('/new-employee')}
                                    className='px-3 py-2 bg-violet-700 font-medium text-white rounded mt-5 mr-5'>
                                    Add employee
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='px-3 py-2 bg-violet-700 font-medium text-white rounded mt-5'>
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className='text-right mt-10'>
                            <label className='text-md font-medium'>Filter by Department: </label>
                            <select
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                value={selectedDepartment || ''}
                                className='px-3 py-2 bg-white text-gray-800 border rounded mt-2'>
                                <option value=''>All Departments</option>
                                {Array.from(new Set(employeeDetails.map((employee) => employee.department))).map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='overflow-x-auto'>
                        <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-2">
                            <thead className='bg-slate-800 text-white'>
                                <tr className='text-center'>
                                    <th className="py-2 px-4 border-b">Employee Code</th>
                                    <th className="py-2 px-4 border-b">First Name</th>
                                    <th className="py-2 px-4 border-b">Last Name</th>
                                    <th className="py-2 px-4 border-b">Email Id</th>
                                    <th className="py-2 px-4 border-b">Contact No</th>
                                    <th className="py-2 px-4 border-b">Department</th>
                                    <th className="py-2 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeDetails?.filter((employee) => !selectedDepartment || employee.department === selectedDepartment)
                                    .map((employee) => (
                                        <tr className='text-center' key={employee.id}>
                                            <td className="py-2 px-4 border-b">
                                                {employee.employeeCode}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {employee.firstName}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {employee.lastName}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {employee.emailId}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {employee.contactNo}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {employee.department}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    onClick={() => handleEdit(employee.id)}
                                                    className='text-green-800 hover:text-black font-medium px-2 py-1'>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(employee.id)}
                                                    className='text-red-800 hover:text-black font-medium px-2 py-1'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        </div>
                    </>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default EmployeeList;