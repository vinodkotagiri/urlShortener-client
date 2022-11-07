import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
const Navbar = () => {
	const context = useContext(AuthContext)
	const navigate = useNavigate()
	const [auth, setAuth] = context
	const handleLogout = () => {
		localStorage.clear()
		setAuth({ user: null, token: null })
		navigate('/')
	}
	return (
		<>
			<div className='flex w-screen h-16 items-center bg-gray-800 justify-between px-8 x-50 w-max-[360px]'>
				<Link to='/' className='text-xl md:text-3xl md:px-4 font-semibold text-slate-400 cursor-pointer'>
					URL SHORTENER
				</Link>
				<div className='text-white flex gap-6'>
					{!auth.user ? (
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
