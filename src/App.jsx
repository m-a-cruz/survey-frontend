import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/login'
import Home from './components/home'
import Dashboard from './components/dashboard'
import Survey1 from './components/surveyForms/survey1'
import Survey2 from './components/surveyForms/survey2'
import Survey from './components/survey'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/survey" element={<Survey />} >
          <Route path="1" element={<Survey1 />} />
          <Route path="2" element={<Survey2 />} />
        </Route>
      </Routes>
  </>
  )
}

export default App
