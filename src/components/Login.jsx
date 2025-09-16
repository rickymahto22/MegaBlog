import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'// as is used to give alias name for this file 
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authservice from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()//navigate is used to programatically navigate to some link and link is used to navigate it after some clicking or action
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()//syntax
    const [error, setError] = useState("")//can use this state in many places 

    const login = async(data) => {
        setError("")
        try {
            const session = await authservice.login(data)//await as time is required tofetch the data 
            if (session) {
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")//navigate is used to programatically navigate to some link and link is used to navigate it after some clicking or action
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"//HERE IN JSX COMPONENTS CASE OF ROUTE PATH DOESN'T MATTER
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'> 
    {/* HANDLESUBMIT IS PREDEFINED METHOD HERE IN APPWRITE  */}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"//we have passed props in component those props will identify aal the additional props we passs here 
                type="email"
                {...register("email", {// WE HAVE TO SPREAD THIS REGISTER EVERY TIME WE USE IT IT IS A PART OF SYNTAX
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||//THIS IS THE RRGX PATTERN OF EMAIL
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,//VALIDATION RULE 
                })}
                />
                <Button
                type="submit"//AGAR YE TYPE SUBMIT NHI LIKHENGE TO SUBMIT HOGA NHI
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login