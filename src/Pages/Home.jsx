import React, { useEffect } from 'react'
import service from "../appwrite/configure"
import { PostCard ,Container} from '../../../chai/src/components'

const Home = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
      service.getPost()
      .then((data)=>{
        console.log(data)
       if(data) setPosts(data.documents)
      })
    }, [])
    
   if(data.length === 0){
    return (
        <div
        className='text-black font-mono p-6'>
            <p className='font-bold'>Please Login to Read Posts</p>
        </div>
    )
   }
   return (
    <div className='w-full py-5'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post)=>(
                        <PostCard 
                        {...post}
                        />
                    ))
                }
            </div>
        </Container>
    </div>
   )   
}

export default Home