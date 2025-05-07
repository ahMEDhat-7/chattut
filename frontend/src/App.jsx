import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import { useAuth } from './store/useAuth.js';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';


function App() {
  const {authUser,checkAuth ,isCheckingAuth} = useAuth();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser) { 
    return (
      <div className='flex items-center justify-center h-screen'> 
       <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'} />}/>
        <Route path='/signup' element={(!authUser) ? <Signup/> : <Navigate to={'/'} />}/>
        <Route path='/login' element={(!authUser) ? <Login/> : <Navigate to={'/'} />}/>
        <Route path='/settings' element={<Settings/> }/>
        <Route path='/profile' element={authUser ? <Profile/>: <Navigate to={'/login'} />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App

