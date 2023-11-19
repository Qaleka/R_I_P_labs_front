import './App.css'
import { Routes, Route, Navigate  } from 'react-router-dom';

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
          .register(`${import.meta.env.BASE_URL}/serviceWorker.js`)
          .then(_ => console.log("service worker registered"))
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })
  
  return (//вопрос
    <>
      <NavigationBar />
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}/`} element={<Navigate to={`${import.meta.env.BASE_URL}/recipients`} />} />
        <Route path={`${import.meta.env.BASE_URL}/recipients`} element={<AllRecipients />} />
        <Route path={`${import.meta.env.BASE_URL}/recipients/:recipient_id`} element={<RecipientInfo />} />
        <Route path={`${import.meta.env.BASE_URL}/notifications`} element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
