
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import History from './pages/History'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
 

  return (
    <>
    <Header/>
    {/* Landing,Home,History */}
   <Routes>
 <Route path='/' element={<Landing/>}/>
 <Route path='/Home' element={<Home/>}/>
 <Route path='/History' element={<History/>}/>
   </Routes>
   <Footer/>
    </>
  )
}

export default App
