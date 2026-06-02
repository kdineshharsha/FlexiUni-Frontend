import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout'
import HomePage from './pages/homepage'
import Login from './pages/Login'
import Register from './pages/register'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
