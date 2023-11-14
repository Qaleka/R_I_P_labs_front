import './App.css'
import { Routes, Route } from 'react-router-dom';

import { AllRecipients } from './pages/AllRecipients'
import { RecipientInfo } from './pages/RecipientInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function() {
        navigator.serviceWorker
          .register("/serviceWorker.js")
          .then(res => console.log("service worker registered"))
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })
  
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/notifications" element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
