import React, { useEffect, useState } from 'react';
import noProfile from '../assets/noprofile.jpg';
import toast from 'react-hot-toast';
import { employeeUpdate, getEmployee } from '../api/Apis';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const EmployeeProfile = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        id: '',
        imageUrl: '',
        employeeCode: '',
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
        department: '',
    });

    // Fetch employee data on component mount
    useEffect(() => {
        const fetchEmployee = async () => {
            if (localStorage.getItem('employeeToken')) {
                const response = await getEmployee();
                setEmployeeData(response.data);
            }
        }
        fetchEmployee();
    }, []);

    // Enable edit mode
    const handleEditClick = () => {
        setEditMode(true);
    };

    // Save changes and update employee data
    const handleSaveClick = async () => {
        try {
            // Create form data for updating employee
            const formData = new FormData();
            formData.append('id', employeeData.id);
            formData.append('employeeCode', employeeData.employeeCode);
            formData.append('firstName', employeeData.firstName);
            formData.append('lastName', employeeData.lastName);
            formData.append('emailId', employeeData.emailId);
            formData.append('contactNo', employeeData.contactNo);
            formData.append('department', employeeData.department);
            formData.append('image', employeeData.selectedImageFile);

            setLoading(true);
            // Make API call to update employee
            const response = await employeeUpdate(formData);
            setLoading(false);

            // Display success or error message
            if (response.data.success) {
                toast.success(response.data.message);
                setEditMode(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    // Handle input changes for employee data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Logout the employee
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Handle image change for employee profile picture
    const handleImageChange = async (e) => {
        try {
            const imageFile = e.target.files[0];
            // Validate image size
            if (imageFile.size > 1024 * 1024) {
                toast.error('Image size must be less than 1MB');
                return;
            }
            // Update employee data with selected image
            setEmployeeData({
                ...employeeData,
                imageUrl: URL.createObjectURL(imageFile),
                selectedImageFile: imageFile,
            });
        } catch (error) {
            console.error('Error in handleImageChange:', error);
        }
    };

    return (
        <div className='flex min-h-[100vh]'>
            <div className='mx-auto p-8'>
                {!loading
                    ?
                    <>
                        <div className='flex flex-col items-center mt-6 mx-2'>
                            <label htmlFor="profile">
                                {editMode && (
                                    <input
                                        id='profile'
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                )}
                                {
                                    employeeData?.imageUrl
                                        ?
                                        <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={employeeData?.imageUrl} alt="avatar" />
                                        :
                                        <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={noProfile} alt="avatar" />
                                }
                            </label>
                        </div>
                        <div className="border-b border-gray-900/10 pb-10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Employee profile</h2>
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.employeeCode}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.firstName}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.lastName}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.emailId}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.contactNo}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
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
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                            value={employeeData.department}
                                            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${editMode ? 'bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600' : 'bg-gray-50 cursor-pointer'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={handleSaveClick}
                                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleEditClick}
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Edit profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default EmployeeProfile;