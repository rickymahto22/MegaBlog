
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// THIS PROTECTED COMPONENT IS CREATED 
// The Protected component is created to control access to specific routes in your React app based on the user's authentication status. It ensures that:

// ✅ Only authenticated users can access protected routes (like dashboard, profile).

// 🚫 Unauthenticated users are redirected to login.

// ✅ Authenticated users cannot access public-only routes (like login or signup).

// 🔁 Unauthenticated users can still access public pages (like homepage or signup).


export default function Protected({children, authentication = true}) {// AUTHENTICATION SIGNIFIES IF THE PAGE REQUIRES USER TO BE AUTHENTICATED OR NOT

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
