import React, { useEffect, useState } from 'react'
import service from '../appwrite/configure'
import { Button, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'

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
      <h1>All Posts:</h1>
     {posts.map((post)=>(
     <div key={post.$id}>
      <PostCard {...post}/>
     </div>))}
     </div>
    </div>
  ):<h1>Click here to add Posts <Button 
    onClick={()=>navigate("../Pages/AddPost.jsx")}
  /></h1>
}

export default AllPosts