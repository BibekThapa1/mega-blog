import React, { useEffect, useState } from 'react'
import service from '../appwrite/configure'
import { Button, PostCard } from '../components'
import { useNavigate,Link } from 'react-router-dom'
import "../App.css"

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
      service.getPosts().then((posts)=>{
        if(posts){
          setPosts(posts.documents)
    // console.log(posts)
        }      
      })

    }

    , [])

    

return  posts.length>0? (
    <div className='flex flex-wrap'>
     <div className="p-3 text-black ">
      <h1 className='text-xl text-center'>All Posts:</h1>
      <div className='all-post gap-3 '>
     {posts.map((post)=>(
     <div key={post.$id}>
      <PostCard {...post}/>
     </div>))}
     </div>
     </div>
    </div>
  ):<h1 className='text-3xl p-4'>Click here to add Posts<Link className='underline text-blue cursor-pointer' to={"/add-post"}>Add Posts</Link></h1>
}

export default AllPosts