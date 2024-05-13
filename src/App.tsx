import Home from './sections/Home'
import About from './sections/About'
import { Route, Routes } from 'react-router-dom'
import NavBar, { navBarLinks } from './components/ui/NavBar'

function App() {

  const links: navBarLinks = [
    { title: 'Home', route: 'home',},
    { title: 'About', route: 'about',},
  ]

  return (
    <>
        <NavBar links={links} />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home/>} />
        </Routes>
    </>
  )
}

export default App
