import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function EditUser() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/userconfig"); 
    };

    return (
        <div>
            <IconButton sx={{ marginBottom: '20px' }} onClick={handleBackClick}>
                <ArrowBackIcon />
            </IconButton>

            <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                {/* Header */}
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
                    <p className="mt-1 text-sm text-gray-500">
                        ข้อมูลส่วนตัวผู้ใช้
                    </p>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800">User Form</h3>
            <p className="mt-2 text-gray-500">
                Please fill out the form below to update user details.
            </p>

            <form className="mt-4 space-y-4">
                {/* User ID */}
                <div>
                    <label 
                        htmlFor="user-id" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        User ID
                    </label>
                    <input
                        type="text"
                        id="user-id"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter User ID"
                    />
                </div>

                {/* First Name */}
                <div>
                    <label 
                        htmlFor="first-name" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter First Name"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label 
                        htmlFor="last-name" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter Last Name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter Email Address"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label 
                        htmlFor="phone" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter Phone Number"
                    />
                </div>

                {/* Role */}
                <div>
                    <label 
                        htmlFor="role" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter Role"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
            </div>
        </div>
    );
}

export default EditUser;
