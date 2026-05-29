import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout'
import HomePage from './pages/homepage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
