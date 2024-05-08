import React from 'react'
import {Link} from "react-router-dom"
import service from '../appwrite/configure'

const PostCard = ({$id , title ,featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full text-black flex flex-col p-2 m-2 bg-white rounded-xl'>
     <div className=''>
        <img src={`${service.getFilePreview(featuredImage)}`} alt={`${title}`} className='mb-2 max-h-44'  />
     </div>
     <h2 className='text-black font-bold'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard