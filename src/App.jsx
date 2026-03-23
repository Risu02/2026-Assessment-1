import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { createContext, useState } from 'react'
import NavMenu from './NavMenu.jsx'
import ScpDetail from './ScpDetail.jsx'
import Welcome from './Welcome.jsx'
import './App.css'

export const NavContext = createContext()

function AppInner() {
  const location = useLocation()
  const onHome = location.pathname === '/'
  const [navLocked, setNavLocked] = useState(true)

  // If not on the home page, nav is always accessible
  const isLocked = onHome ? navLocked : false

  return (
    <NavContext.Provider value={{ navLocked: isLocked, setNavLocked }}>
      <NavMenu />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/scp/:id' element={<ScpDetail />} />
      </Routes>
    </NavContext.Provider>
  )
}

export default function App() {
  return (
    <div>
      <Router>
        <AppInner />
      </Router>
    </div>
  )
}
