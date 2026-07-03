import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout'
import HomePage from './pages/homepage'
import Login from './pages/Login'
import Register from './pages/register'
import JobDetails from './pages/jobOverview'
import { Toaster } from 'react-hot-toast'
import AllJobs from './pages/Jobs'
import MyJobs from './pages/Employer/myJobs'
import PostJob from './pages/Employer/postJob'
import EditJob from './pages/Employer/editJobs'
import ViewApplicants from './pages/Employer/viewApplicants'

function App() {


  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/jobs/:id' element={<JobDetails />} />
          <Route path='/jobs' element={<AllJobs />} />
          <Route path='/employer/my-jobs' element={<MyJobs />} />
          <Route path='/employer/post-jobs' element={<PostJob />} />
          <Route path='/employer/edit-job/:id' element={<EditJob />} />
          <Route path='/application/:id' element={<ViewApplicants />} />


        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
