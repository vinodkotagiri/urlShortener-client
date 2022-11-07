import React, { useState } from 'react'

const ResetPassword = () => {
	const [email, setEmail] = useState('')
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='w-[360px] md:w-[600px] p-6 bg-gray-200 rounded-md shadow-lg flex gap-3 flex-col'>
				<h1 className='text-center p-3 font-bold text-xl text-gray-700'>Forgot Password</h1>
				<input
					className='p-3 rounded-lg shadow-md text-gray-500 outline-none'
					type='email'
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button className='bg-lime-500 p-3 px-8 rounded-md text-white text-lg outline-none shadow-lg mt-6'>
					Confirm Email
				</button>
			</div>
		</div>
	)
}

export default ResetPassword
