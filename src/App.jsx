import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavMenu from './NavMenu.jsx'
import ScpDetail from './ScpDetail.jsx'
import Welcome from './Welcome.jsx'
import './App.css'

export default function App() {
  return (
    <div>
      <Router>
        <NavMenu />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/scp/:id' element={<ScpDetail />} />
        </Routes>
      </Router>
    </div>
  )
}