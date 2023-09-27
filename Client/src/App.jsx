import './App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import Profile from './Views/Profile/Profile'
import DashboardAdmin from './Components/Dashboard/DashboardAdmin'
import { Convocations } from './Components/Convocations/Convocations'
import { FormNewAddOfficer } from './Components/FormNewAddOfficer/FormNewAddOfficer'
import NavBar from './Components/Home/NavBar/NavBar'
import Footer from './Components/Home/Footer/Footer'


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

              <Route path="/admin-new-officer" element={<FormNewAddOfficer />} />

          </Routes>
          {location.pathname !== '/' && <Footer/>}
        </>
        <ToastContainer></ToastContainer>
      </div>
    </>
  )
}

export default App
