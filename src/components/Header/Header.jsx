import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate =useNavigate()
  const navItems = [// we will loop through this array to create buttons on navigation bar and we can add item here only in future
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
   <header className='py-3 shadow bg-gray-500'>
    <Container>
      <nav className='flex items-center justify-between'>
      
      <Link to='/'>
       {/*//link is used for sgtatic navigation without page reload it is predefined and navigate is used for button clicks and dynamic navigation  */}
        <Logo width ='70px'/>
        </Link>
        <ul className='flex items-center gap-4' >
          {navItems.map((item) => (
            item.active ? (
              <li key={item.name}>
                {/* //key here is used to avoid re rendering of entire list instead only for the changed items in the list it uniquely identifies each list entry */}
                <button onClick={()=>navigate(item.slug)}
                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                  {item.name}
                </button>
              </li>
            ):null 
          ))}

          {authStatus && (<li>
            <LogoutBtn />
          </li>) } 
          {/* // used this as it is a common syntax if we want to do a task is first one os true here if authstatus is true then show the logoout btn */}
        </ul>
      
      </nav>
    </Container>
   </header>
  )
}

export default Header
