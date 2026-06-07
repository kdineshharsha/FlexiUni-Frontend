import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout'
import HomePage from './pages/homepage'
import Login from './pages/Login'
import Register from './pages/register'
import JobDetails from './pages/jobOverview'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/jobs/:id' element={<JobDetails />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
