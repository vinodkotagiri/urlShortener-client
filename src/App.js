import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Register from './pages/Register'
import Activate from './pages/Activate'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
export const AuthContext = createContext()
const App = () => {
	const [auth, setAuth] = useState({
		user: null,
		token: null,
	})
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setAuth(JSON.parse(localStorage.getItem('auth')))
		}
	}, [])
	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/register' element={<Register />} />
				<Route path='/activate/:token' element={<Activate />} />
				<Route path='/login' element={<Login />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset-password' element={<ResetPassword />} />
			</Routes>
			<Toaster />
		</AuthContext.Provider>
	)
}

export default App
