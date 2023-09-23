import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import Profile from './Views/Profile/Profile'
import DashboardAdmin from './Components/Dashboard/DashboardAdmin'
import { Convocations } from './Components/Convocations/Convocations'
import NavBar from './Components/Home/NavBar/NavBar'
import Footer from './Components/Home/Footer/Footer'
import { useLocation } from 'react-router-dom'

//RENDERIZAR LAS VIEWS
function App() {
  const location = useLocation()
  
  return (
    <>
      <div>
        <>
        {location.pathname !== '/' && <NavBar/>}
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/inicio' element={<Home />}></Route>
              <Route path="/perfil/:id" element={<Profile />} />
              <Route path="/postulaciones" element={<Convocations />} />
              <Route path="/admin-dashboard" element={<DashboardAdmin />} />
          </Routes>
          {location.pathname !== '/' && <Footer/>}
        </>
      </div>
    </>
  )
}

export default App
