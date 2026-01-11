import './style/App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Connexion from './auth/Connexion'
import Articles from './pages/Articles'
import Dashboard from './pages/Dashboard'
import Favorites from './pages/Favorites'
import ScrollToTopPage from './components/ScrollToTopPage'
import { ToastContainer } from 'react-toastify'


function App() {

    


    return (
        <Router>
            <ScrollToTopPage />
            <ToastContainer position='bottom-right' autoClose={3000}/>
            <Routes>
                <Route path="/" element={<Connexion />} /> 
                <Route path="/articles" element={<Articles />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    )
}

export default App
