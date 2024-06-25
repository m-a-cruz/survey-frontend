import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/login'
import Home from './components/home'
import Dashboard from './components/dashboard'
import Survey from './components/survey'
import Questions from './components/questions'




function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/survey" element={<Survey />} >
        </Route>
        <Route path="/question" element={<Questions />} />

      </Routes>
  </>
  )
}

export default App
