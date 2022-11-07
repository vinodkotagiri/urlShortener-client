import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/auth'
import toast from 'react-hot-toast'
import { validateRegistration } from '../helpers'
import Spinner from '../components/spinner'
const Register = () => {
	const [registrationInfo, setRegistrationInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})
	const [changed, setChanged] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)
	const [btnDisabled, setbtnDisabled] = useState(true)
	const navigate = useNavigate()
	useEffect(() => {
		let msg = validateRegistration(registrationInfo, changed)
		setErrorMsg(msg)
		setbtnDisabled(msg === 'ok' ? false : true)
	}, [registrationInfo])
	const handleChange = (e) => {
		setRegistrationInfo({ ...registrationInfo, [e.target.name]: e.target.value })
		setChanged(true)
	}

	const handleSubmit = (e) => {
		setLoading(true)
		e.preventDefault()
		registerApi(registrationInfo)
			.then((response) => {
				toast.success('Registration success!')
				setLoading(false)
				navigate('/login')
			})
			.catch((error) => {
				console.log(error.response)
				setLoading(false)
				toast.error(error.response.data.error)
			})
	}
	return (
		<div className='w-screen h-screen flex flex-col text-center gap-2 items-center justify-center relative'>
			{changed && errorMsg !== 'ok' && (
				<div className='w-[360px] md:w-[600px] p-6 bg-red-200 rounded-lg'>{errorMsg}</div>
			)}
			{changed && errorMsg === 'ok' && (
				<div className='w-[360px] md:w-[600px] p-6 bg-green-200 rounded-lg'>Looks good!</div>
			)}
			<div className='w-[360px] md:w-[600px] p-6 bg-gray-200 rounded-md shadow-lg flex gap-3 flex-col'>
				<h1 className='text-center p-3 font-bold text-xl text-gray-700'>Register</h1>
				<div className='flex gap-2'>
					<input
						className='w-1/2 p-3 rounded-lg shadow-md text-gray-500 outline-none'
						type='text'
						placeholder='First Name'
						name='firstName'
						onChange={handleChange}
					/>
					<input
						className='w-1/2 p-3 rounded-lg shadow-md text-gray-500 outline-none'
						type='text'
						placeholder='Last Name'
						name='lastName'
						onChange={handleChange}
					/>
				</div>
				<input
					className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
					type='email'
					placeholder='Email'
					name='email'
					onChange={handleChange}
				/>
				<input
					className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
					type='password'
					placeholder='Password'
					name='password'
					onChange={handleChange}
				/>
				<div className='w-full gap-2 flex'>
					<button
						className='bg-lime-500 w-1/2 p-3 px-8 rounded-md text-white text-lg outline-none shadow-lg disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed'
						onClick={handleSubmit}
						disabled={btnDisabled}>
						Register
					</button>
					<button
						className='bg-slate-500 p-3 w-1/2  px-8 rounded-md text-white text-lg outline-none shadow-lg '
						onClick={() => navigate('/')}>
						Cancel
					</button>
				</div>
				<h4 className='text-lg mt-3 font-light'>
					Already has an account?{' '}
					<Link to='/login' className='font-semibold text-lime-500'>
						Login
					</Link>
				</h4>
			</div>
			{loading && (
				<div className='absolute top-[50%]'>
					<Spinner />
				</div>
			)}
		</div>
	)
}

export default Register
