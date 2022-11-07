import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
const Navbar = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [visible, setVisible] = useState(false)
	const handleLogout = () => {
		localStorage.clear()
		setVisible(false)
		navigate('/login')
	}
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			const auth = JSON.parse(localStorage.getItem('auth'))
			setUser(auth.user)
			setVisible(true)
		}
	}, [])
	useEffect(() => {
		if (!user) {
			setVisible(false)
		} else setVisible(true)
	}, [user])

	return (
		<>
			<div className='flex w-screen h-16 items-center bg-gray-800 justify-between px-8 x-50 w-max-[360px]'>
				<Link to='/' className='text-xl md:text-3xl md:px-4 font-semibold text-slate-400 cursor-pointer'>
					URL SHORTENER
				</Link>
				<div className='text-white flex gap-6'>
					{!visible ? (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Register</Link>
						</>
					) : (
						<>
							<Link to='/dashboard'>Dashboard</Link>
							<p className='cursor-pointer' onClick={handleLogout}>
								Logout
							</p>
						</>
					)}
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default Navbar
