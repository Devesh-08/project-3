import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import Register from './pages/Register'
import ProtectedRoute from './components/protectedRoutes'
import AdminRoute from './components/AdminRoute'
import Admin from './pages/Admin'
import QRList from './components/QRList'
import AllQrs from './pages/AllQrs'


``
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/scanner" element={<Scanner/>}/>
      <Route path='/admin/qrcodes' element={<AllQrs/>}/>
      
      <Route path='/dashboard' element={<ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
      }/>
      <Route path='/scanner' element={
        <ProtectedRoute>
          <Scanner/>
        </ProtectedRoute>
      } />
      <Route path='/admin' element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      } />
    </Routes>
    </BrowserRouter>
  )
}

export default App
