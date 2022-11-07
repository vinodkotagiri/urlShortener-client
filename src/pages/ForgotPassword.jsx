import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { forgotPasswordApi, resetPasswordApi } from '../api/auth'

const ForgotPassword = () => {
	const [email, setEmail] = useState(null)
	const [newPassword, setNewPassword] = useState(null)
	const [resetCode, setResetCode] = useState(null)
	const [isMailConfirmed, setisMailConfirmed] = useState(false)
	const navigate = useNavigate()
	const confirmEmail = (e) => {
		e.preventDefault()

		forgotPasswordApi({ email })
			.then((response) => {
				toast.success('Sent a reset code to your email address')
				setisMailConfirmed(true)
			})
			.catch((error) => {
				console.log(error)
				toast.error('Something went wrong, try again later')
			})
	}
	const changePassword = (e) => {
		e.preventDefault()
		resetPasswordApi({ email, resetCode, newPassword })
			.then((response) => {
				toast.success('Password changed successfully')
				navigate('/login')
			})
			.catch((error) => {
				console.log(error)
				toast.error(error.response.data.error)
			})
	}
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='w-[360px] md:w-[600px] p-6 bg-gray-200 rounded-md shadow-lg flex gap-3 flex-col'>
				<h1 className='text-center p-3 font-bold text-xl text-gray-700'>
					{!isMailConfirmed ? 'Forgot Password' : 'Reset Password'}
				</h1>
				<input
					className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isMailConfirmed}
				/>
				{isMailConfirmed && (
					<>
						<input
							className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
							type='text'
							placeholder='Reset Code'
							onChange={(e) => setResetCode(e.target.value)}
						/>
						<input
							className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
							type='password'
							placeholder='New Passsword'
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</>
				)}
				{!isMailConfirmed ? (
					<button
						className='bg-lime-500 p-3 px-8 rounded-md text-white text-lg outline-none shadow-lg mt-6'
						onClick={confirmEmail}>
						Confirm Email
					</button>
				) : (
					<button
						className='bg-lime-500 p-3 px-8 rounded-md text-white text-lg outline-none shadow-lg mt-6'
						onClick={changePassword}>
						Change Password
					</button>
				)}
			</div>
		</div>
	)
}

export default ForgotPassword
