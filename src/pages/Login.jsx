import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth'
import toast from 'react-hot-toast'
import { validateLogin } from '../helpers'
import { AuthContext } from '../App'
import Spinner from '../components/spinner'
const Login = () => {
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	})
	const [setAuth] = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [changed, setChanged] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)
	const [btnDisabled, setbtnDisabled] = useState(true)
	const navigate = useNavigate()
	const handleChange = (e) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
		setChanged(true)
	}
	const handleSubmit = (e) => {
		setLoading(true)
		e.preventDefault()
		loginApi(loginInfo)
			.then((response) => {
				toast.success('Login success!')
				navigate('/')
				localStorage.setItem('auth', JSON.stringify(response.data))
				setAuth({ user: response.data.user, token: response.data.token })
				setLoading(false)
			})
			.catch((error) => {
				console.log(error.response)
				toast.error(error.response.data.error ? error.response.data.error : 'Something went wrong')
				setLoading(false)
			})
	}
	useEffect(() => {
		let msg = validateLogin(loginInfo, changed)
		setErrorMsg(msg)
		setbtnDisabled(msg === 'ok' ? false : true)
	}, [loginInfo, errorMsg, handleSubmit])

	return (
		<>
			<div className='w-screen h-screen flex flex-col text-center gap-2 items-center justify-center relative'>
				{changed && errorMsg !== 'ok' && (
					<div className='w-[360px] md:w-[600px] p-6 bg-red-200 rounded-lg'>{errorMsg}</div>
				)}
				{changed && errorMsg === 'ok' && (
					<div className='w-[360px] md:w-[600px] p-6 bg-green-200 rounded-lg'>All good!</div>
				)}
				<div className='w-[360px] md:w-[600px] p-6 bg-gray-200 rounded-md shadow-lg flex gap-3 flex-col'>
					<h1 className='text-center p-3 font-bold text-xl text-gray-700'>Login</h1>
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
					<Link to='/forgot-password' className='my-3 text-lg font-semibold text-lime-500 cursor-pointer'>
						Forgot Password?
					</Link>
					<button
						className='bg-lime-500 p-3 px-8 rounded-md text-white text-lg outline-none shadow-lg disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed'
						disabled={btnDisabled}
						onClick={handleSubmit}>
						Login
					</button>
					<h4 className='text-lg mt-3 font-light'>
						Don't have an account?{' '}
						<Link to='/register' className='font-semibold text-lime-500'>
							Register
						</Link>
					</h4>
				</div>
				{loading && (
					<div className='absolute top-[50%]'>
						<Spinner />
					</div>
				)}
			</div>
		</>
	)
}

export default Login
