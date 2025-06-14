import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Start/>}/>
        <Route path = '/UserLogin' element = {<UserLogin/>}/>
        <Route path = '/Riding' element = {<Riding/>}/>
        <Route path = '/Captain-riding' element = {<CaptainRiding/>}/>
        <Route path = '/UserSignup' element = {<UserSignup/>}/>
        <Route path = '/Captain-Login' element = {<CaptainLogin/>}/>
        <Route path = '/Captain-Signup' element = {<CaptainSignup/>}/>
        <Route path = '/home' 
          element = {
          <UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>
        }/>
        <Route path = '/user/logout' 
        element = {
        <UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>}>
      </Route>
      <Route path = '/captain-home' element = {<CaptainProtectWrapper>
        <CaptainHome/>
        </CaptainProtectWrapper>
      }/>
      </Routes>
    </div>
  )
}

export default App
