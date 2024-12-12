"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    instituteName: string;
    employmentStatus: string;
    legalAgreement: string;
    profilePhoto: File | '';
}

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        instituteName: '',
        employmentStatus: '',
        legalAgreement: '',
        profilePhoto: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            // Check if passwords match
            if (formData.password !== formData.confirmPassword) {
                setErrors({ confirmPassword: 'Passwords do not match' });
                return;
            }

            try {
                const formDataObject = new FormData();
                formDataObject.append('fullName', formData.fullName);
                formDataObject.append('userName', formData.userName);
                formDataObject.append('email', formData.email);
                formDataObject.append('password', formData.password);
                formDataObject.append('confirmPassword', formData.confirmPassword);
                formDataObject.append('instituteName', formData.instituteName);
                formDataObject.append('employmentStatus', formData.employmentStatus);
                formDataObject.append('legalAgreement', formData.legalAgreement);
                formDataObject.append('profilePhoto', formData.profilePhoto || '');

                console.log(formDataObject);
                const response = await axios.post('http://localhost:3000/users/auth/register', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                toast.success('Signup successful!');
                router.push('/logintype');

            } catch (error) {
                console.error('Error during signup:', error);
                toast.error('Signup failed. Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto') {
            setFormData({ ...formData, [name]: files ? files[0] : '' });
            setErrors({ ...errors, [name]: '' });
        } else {
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};

        if (!formData.fullName) {
            errors.fullName = 'Name is required';
        }

        if (!formData.userName) {
            errors.userName = 'Username is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <Toaster />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="instituteName" className="block text-gray-700 font-bold mb-2">
                        Institute Name
                    </label>
                    <input
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.instituteName && <p className="text-red-500 text-xs italic">{errors.instituteName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="employmentStatus" className="block text-gray-700 font-bold mb-2">
                        Employment Status
                    </label>
                    <input
                        type="text"
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.employmentStatus && <p className="text-red-500 text-xs italic">{errors.employmentStatus}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="legalAgreement" className="block text-gray-700 font-bold mb-2">
                        Legal Agreement
                    </label>
                    <input
                        type="text"
                        id="legalAgreement"
                        name="legalAgreement"
                        value={formData.legalAgreement}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.legalAgreement && <p className="text-red-500 text-xs italic">{errors.legalAgreement}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePhoto" className="block text-gray-700 font-bold mb-2">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.profilePhoto && typeof errors.profilePhoto === 'string' && (
                        <p className="text-red-500 text-xs italic">{errors.profilePhoto}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}
