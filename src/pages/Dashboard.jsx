import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { listShortenUrlsApi } from '../api/url'
const Dashboard = () => {
	const [active, setActive] = useState({ stats: true, list: false })
	const [data, setData] = useState(null)
	const [limit, setLimit] = useState(undefined)
	const [skip, setSkip] = useState(undefined)
	const [dayData, setDayData] = useState(null)
	const [monthData, setMonthData] = useState(null)
	const getData = () => {
		listShortenUrlsApi(limit, skip)
			.then((response) => setData(response.data))
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		getData()
	}, [])

	const currentMonth = (new Date().getMonth() + 1).toString()
	console.log(data)
	return (
		<>
			<Navbar />
			<div className='flex  gap-4 h-screen w-screen bg-amber-200 w-max-[360px] '>
				<div className='w-screen h-14 flex  justify-start items-start absolute text-2xl top-12  bg-slate-400 mt-4'>
					<button
						className={`flex flex-col items-center justify-center h-full w-1/2 border-r-2 border-amber-400 ${
							active.stats ? 'bg-amber-300' : ''
						}`}
						onClick={() => {
							setActive({ stats: true, list: false })
						}}>
						STATS
					</button>
					<button
						className={`flex flex-col items-center justify-center h-full w-1/2 border-r-2 border-amber-400 ${
							active.list ? 'bg-amber-300' : ''
						}`}
						onClick={() => {
							setActive({ stats: false, list: true })
						}}>
						LIST
					</button>
				</div>
				{active.stats && (
					<div className='flex flex-col gap-3 items-center justify-center w-full h-screen '>
						<div className='flex flex-col gap-6'>
							<div className='text-xl flex justify-between'>
								<div>Total Number of Urls created today&nbsp;:&emsp;</div>
								<div className='text-2xl font-semibold '>{data?.shortenedToday}</div>
							</div>
							<div className='text-xl flex justify-between'>
								<div>Total Number of Urls created this Month&nbsp;:&emsp;</div>
								<div className='text-2xl font-semibold '>
									{data?.createdInMonths.filter((d) => d._id === currentMonth)[0].createdUrls}
								</div>
							</div>
						</div>
					</div>
				)}
				{active.list && (
					<div className='flex flex-col justify-start w-full h-screen mt-14 '>
						<div className='shadow overflow-hidden rounded border-b border-gray-200'>
							<table className='min-w-full bg-white'>
								<thead className='bg-gray-800 text-white'>
									<th>#</th>
									<th>Original URL</th>
									<th>Short URL CODE</th>
									<th>Clicks</th>
								</thead>
								<tbody className='bor'>
									{data?.urls.map((doc, index) => (
										<tr className='text-center h-12 border-b-2'>
											<td className='text-center'>{index + 1}</td>
											<td>{doc.originalUrl}</td>
											<td className='text-blue-500'>
												<a href={doc.shortUrl}>{doc.urlID}</a>
											</td>
											<td className='text-center'>{doc.clicks}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Dashboard
