import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Archived from './pages/Archived';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/archived' element={<Archived/>}/>
          </Routes>
        }/>
      </Routes>
    </Router>
  )
}

export default App