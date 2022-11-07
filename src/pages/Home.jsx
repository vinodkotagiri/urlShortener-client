import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { shortenUrlApi } from '../api/url'
import Navbar from '../components/navbar'

const Home = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const [originalUrl, setOriginalUrl] = useState('')
	const [shortUrl, setShortUrl] = useState('')
	const [user, setUser] = useState(null)
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
		} else {
			setVisible(true)
		}
	}, [user])
	const handleShowShortener = () => {
		if (!user) {
			navigate('/login')
		} else {
			setVisible(true)
		}
	}

	const handleShorten = (e) => {
		e.preventDefault()
		shortenUrlApi({ originalUrl })
			.then((response) => {
				console.log(response.data)
				setShortUrl(response.data.shortUrl)
				toast.success('Request Processed Successfully')
			})
			.catch((error) => {
				console.log(error.response.data.error)
				toast.error(error.response.data.error ? error.response.data.error : 'Something went wrong')
			})
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col gap-4 justify-center items-center h-screen w-screen bg-amber-200'>
				<div className='bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 justify-center items-center relative'>
					<p className='text-4xl font-semibold text-gray-100'>An ultimate tool to shorten your long urls</p>
					<button className='bg-amber-200 w-1/4 h-12 rounded-md shadow-lg' onClick={handleShowShortener}>
						Get Started
					</button>
				</div>
				{visible && (
					<div className='flex absolute bg-gray-600 rounded-xl shadow-lg flex-col items-center justify-center gap-3 w-[300px] md:w-[740px] p-6 h-[300px]'>
						<div className='w-full p-4'>
							<input
								className='w-full h-12 rounded-lg shadow-lg outline-none px-4'
								placeholder='Enter a Url'
								onChange={(e) => setOriginalUrl(e.target.value)}
							/>
						</div>
						{shortUrl && (
							<>
								<span className='text-white'>
									ShortUrl:&emsp;
									<a className='cursor-pointer' href={shortUrl}>
										{shortUrl}
									</a>
								</span>
							</>
						)}
						<button
							className='w-1/2 bg-amber-200 p-4 mt-6 font-semibold text-xl rounded-md shadow-sm'
							onClick={handleShorten}>
							Shorten!
						</button>
						<div
							className='text-2xl text-white absolute top-3 right-4 cursor-pointer'
							onClick={() => setVisible(false)}>
							X
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Home
