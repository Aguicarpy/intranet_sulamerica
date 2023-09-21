import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import Profile from './Views/Profile/Profile'
import DashboardAdmin from './Components/Dashboard/DashboardAdmin'
import { Convocations } from './Components/Convocations/Convocations'


//RENDERIZAR LAS VIEWS
function App() {
  
  return (
    <>
      <div>
        <>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/inicio' element={<Home />}></Route>
              <Route path="/perfil/:id" element={<Profile />} />
              <Route path="/postulaciones" element={<Convocations />} />
              <Route path="/admin-dashboard" element={<DashboardAdmin />} />

          </Routes>
        </>
      </div>
    </>
  )
}

export default App
