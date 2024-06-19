import React from 'react'
import Image from 'next/image'
const EventDetailTeacherCard = ({data}) => {
  return (
    <div className='teachersCard'>
      <Image width={400} height={400} className='cardImage' src={data.profile} alt={data.profile} />
      <h2>{data.name}</h2>
      <p>{data.job}</p>
    </div>
  )
}

export default EventDetailTeacherCard
