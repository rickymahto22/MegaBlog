import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {//$id here is the variable name not the js part it is used by appwrite syntax
    console.log('PostCard - featuredImage prop:', featuredImage);
    console.log('PostCard - Generated Image URL:', appwriteService.getFilePreview(featuredImage));
  return (
    //link here used to make the whole card clickable and one feature of linkn is that pura url pass nhi karna padta balki jahan aap ho wahan se jahan jaana hai utna hi url dena padta hai 
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}//featured img is the the id stored in database 
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard