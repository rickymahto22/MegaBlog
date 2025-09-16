import { useEffect,useState } from 'react';
import {useDispatch} from 'react-redux';
import './App.css'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
function App() {
  // whenever  the app is fetching the data 
  // from a databases or a  network then it is necessary to make a loading state so as to show it to user accordingly

const [loading, setLoading] = useState(true)
const dispatch = useDispatch()

 useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))

 },[])


return !loading ? (
  <div className='min-h-screen flex  content-between bg-gray-400'>
    <div className='w-full block text-xl '>
    <Header/>
    <main className="flex flex-col items-center">
     TODO: <Outlet/>
    </main>
    <Footer />
    </div>
  </div>
) : null
}

export default App